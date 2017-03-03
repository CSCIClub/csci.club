
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY mainpage /var/www/app
COPY api /app
WORKDIR /app

ENV PG_DATABASE csci_club
ENV PG_USER csci_club
ENV PG_PASS secret
ENV PG_HOST localhost
ENV PG_PORT 5432
ENV PG_MAX_CLIENTS 10
ENV PG_IDLE_TIMEOUT 30000

COPY entrypoint.sh /usr/local/bin/
ENTRYPOINT["/usr/local/bin/entrypoint.sh"]

CMD ["npm run production"]

# CMD ["nginx", "-g", "daemon off;"]
