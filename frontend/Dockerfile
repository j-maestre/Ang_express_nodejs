FROM node:latest

COPY ./package.json /frontend/
WORKDIR frontend

RUN npm install
EXPOSE 4000
CMD ["gulp"]
