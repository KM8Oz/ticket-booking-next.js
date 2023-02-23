# Use a small Alpine-based image as the base
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json yarn.lock ./

# Install the dependencies
RUN yarn install --frozen-lockfile --production=true

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js app for production
RUN yarn build

# Expose the port that the app will listen on
EXPOSE 3200

# Start the app
CMD ["yarn", "start"]
