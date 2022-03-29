FROM node:lts-slim

# App work directory
WORKDIR /usr/src/app

# Get app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --loglevel=error

# Bundle app source into container
COPY /src/server.js src/server.js
COPY /public public/

# Port exposed
EXPOSE 5500

# Run app
CMD [ "npm", "start" ]