# Start from the official Node.js Alpine image
FROM node:18.17.1-alpine As builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the backend files (this avoids copying unnecessary files from monorepo)
COPY . .

# Install Node.js dependencies
RUN yarn install --frozen-lockfile


# Build the backend
RUN yarn build

WORKDIR /usr/src/app

ENV NODE_ENV production
EXPOSE 443

# Start the application
CMD ["node", "dist/main"]
