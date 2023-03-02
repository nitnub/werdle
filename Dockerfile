FROM node:14-alpine

# Create Directory for the Container
WORKDIR /usr/src/werdle

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install

# Copy all other source code to work directory
ADD . /usr/src/werdle

# ENV MONGO_CONNECTION_STRING mongodb_data_container:/data/db

# TypeScript
RUN npm run build

EXPOSE 6000

# Start
CMD [ "npm", "start" ]

# EXPOSE 4000