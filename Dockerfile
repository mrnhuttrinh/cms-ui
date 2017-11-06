FROM alpine:latest
RUN apk add --update nginx && rm -rf /var/cache/apk/

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY build/index.html /usr/share/nginx/html/index.html
COPY build/static/ /usr/share/nginx/html/static/
COPY build/asset-manifest.json /usr/share/nginx/html/asset-manifest.json
COPY build/service-worker.js /usr/share/nginx/html/service-worker.js
COPY build/favicon.ico /usr/share/nginx/html/favicon.ico
COPY build/assets/ /usr/share/nginx/html/assets/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
