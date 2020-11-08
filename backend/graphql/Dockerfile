FROM ubuntu

RUN apt-get update && apt-get install nodejs -y
RUN apt-get install npm -y && apt-get install mongodb -y

WORKDIR /conduit

COPY . .

EXPOSE 27017
EXPOSE 3000
RUN npm install

CMD ["service", "mongodb", "start", "&&", "npm", "run", "dev"]