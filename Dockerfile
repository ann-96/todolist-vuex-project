FROM node:latest as builder

RUN mkdir /build
COPY . /build/
WORKDIR /build

RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /build/dist/. /usr/share/nginx/html/
COPY ./.env /usr/share/nginx/html/
