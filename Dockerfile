FROM node:14-alpine AS builder

# Create Directory for the Container
WORKDIR /usr/src/werdle

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install

# Copy all other source code to work directory
COPY . /usr/src/werdle

# ENV MONGO_CONNECTION_STRING mongodb_data_container:/data/db

EXPOSE 3601

# Start
CMD [ "npm", "start" ]
