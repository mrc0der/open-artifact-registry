// Define the YAML file path
const yamlFilePath = "repos.yaml";

let repos = []; // Declare repos as a global variable

// Function to fetch and parse the YAML file
async function fetchAndParseYAML() {
  try {
    const response = await fetch(yamlFilePath);
    const yamlText = await response.text();
    return jsyaml.load(yamlText);
  } catch (error) {
    console.error("Error fetching or parsing YAML:", error);
    return [];
  }
}

// Function to render the repositories
function renderRepos(repos) {
  const reposContainer = document.getElementById("repos");
  reposContainer.innerHTML = "";

  //added sort
  repos.forEach((repo) => {
    if (repo.description) {
      repo_desc = repo.description.substring(0, 149) + "...";
    } else {
      repo_desc = repo.name;
    }
    const repoCard = document.createElement("div");
    repoCard.classList.add("col-md-3", "mb-4");
    console.log(repo.name);
    repoCard.innerHTML = `
            <div class="card bg-light">
                <div class="card-body">
                    <h5 class="card-title"><a href="${repo.url}">${
      repo.name
    }</a></h5>
                    <p class="card-text">${repo_desc}</p>

                    <!-- Display tags inside the repo card -->
                    <div class="tags">
                        Tags: ${repo.tags
                          .sort()
                          .map(
                            (tag) =>
                              `<span class="badge badge-primary" onclick="filterReposByTag('${tag}', repos)">${tag}</span>`
                          )}
                    </div>
                </div>
            </div>
        `;
    reposContainer.appendChild(repoCard);
  });
}

// Function to render the filters (tags)
function renderFilters(tags) {
  const filtersContainer = document.getElementById("filters");
  const hyperscalerContainer = document.getElementById("hyperscalers");
  const verticalContainer = document.getElementById("verticals");
  filtersContainer.innerHTML = "";

  // Render the filters at the top
  filtersContainer.innerHTML = `
        <div class="filters">
            Filters:
            <span class="badge badge-primary mr-2 cursor-pointer" onclick="filterReposByTag(null, repos)">All</span>
            ${tags
              .sort()
              .map(
                (tag) => `
                <span class="badge badge-primary mr-2 cursor-pointer" onclick="filterReposByTag('${tag}', repos)">${tag}</span>
            `
              )
              .join(" ")}
        </div>
        <div class="clear-filters">
            Clear Filters: <span class="badge badge-secondary mr-2 cursor-pointer" onclick="filterReposByTag(null, repos)">Clear All</span>
        </div>
    `;

  hyperScalers = ["AWS", "Azure", "GCP", "vmware", "openstack"].sort();
  // Render the filters at the top
  hyperscalerContainer.innerHTML = `
        <div class="hyperscalers">
            Hyperscaler:
            ${hyperScalers
              .map(
                (tag) => `
                <span class="badge badge-success mr-2 cursor-pointer" onclick="filterReposByTag('${tag}', repos)">${tag}</span>
            `
              )
              .join(" ")}
            <br>
        </div>
    `;

  techVerticals = [
    "AI & ML",
    "Analytics",
    "Compute",
    "App Services",
    "Databases",
    "Development",
    "Identity & Security",
    "Storage",
    "Networking",
    "Tools",
  ].sort();

  // Render the filters at the top
  verticalContainer.innerHTML = `
        <div class="tags">
            Use Cases:
            ${techVerticals
              .map(
                (tag) => `
                <span class="badge badge-danger mr-2 cursor-pointer" onclick="filterReposByTag('${tag}', repos)">${tag}</span>`
              )
              .join(" ")}
            <br>
        </div>
    `;
}

// Function to filter and display repos by tag
function filterReposByTag(tag, repos) {
  // const filteredRepos = tag ? repos.filter(repo => repo.tags.includes(tag)) : repos;
  const filteredRepos = tag
    ? repos.filter((repo) =>
        repo.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      )
    : repos;
  renderRepos(filteredRepos);
}

// Initialize the app
(async function () {
  repos = await fetchAndParseYAML(); // Assign the fetched data to the global repos variable
  const tags = [...new Set(repos.flatMap((repo) => repo.tags))];
  renderFilters(tags);
  renderRepos(repos);
})();

// Function to perform fuzzy text search and filter repositories
function searchRepos(query) {
  if (!query) {
    renderRepos(repos); // If the query is empty, show all repositories
    return;
  }

  // Use Fuse.js for fuzzy searching
  const options = {
    keys: ["name", "description", "tags"], // Define the fields to search
    threshold: 0.3, // Adjust the threshold as needed
  };

  const fuse = new Fuse(repos, options);
  const result = fuse.search(query);

  renderRepos(result);
}
