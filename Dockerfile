# Use the official Nginx image as a parent image
FROM nginx:alpine

# Copy your HTML files to the default Nginx public directory
COPY ./docs /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
