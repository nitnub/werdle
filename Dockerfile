FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . ./

RUN npm run build

##########
# Stage 2 
##########

FROM nginx

#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

# Copies static resources from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]