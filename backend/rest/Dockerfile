FROM ubuntu:latest

COPY ./* /rest/

WORKDIR /rest
RUN apt-get update -y && apt-get install node -y
RUN apt-get install mongodb
RUN npm install

EXPOSE 3002
CMD ["npm","run","dev"]
