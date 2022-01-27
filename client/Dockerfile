FROM node:16-alpine
 
# This line is needed by docker for react app to work
ENV CI=true
 
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
 
CMD ["npm", "start"]
