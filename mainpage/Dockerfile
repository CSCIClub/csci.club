FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /static /static
COPY /index.html /index.html
CMD ["nginx", "-g", "daemon off;"]