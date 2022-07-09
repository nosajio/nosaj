FROM node:16

WORKDIR /usr/src/nosaj.io

# Copy and install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy and build the app
COPY . .
RUN yarn build

# This makes the container smaller
RUN yarn cache clean

# Start the app
EXPOSE 8181
CMD ["yarn", "start"]