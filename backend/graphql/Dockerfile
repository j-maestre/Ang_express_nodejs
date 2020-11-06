FROM node:latest

COPY ./* /graphql/

WORKDIR /graphql
RUN npm install

EXPOSE 3002
CMD ["npm","run","dev"]
