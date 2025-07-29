FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/

EXPOSE 3000

# El auto-seed está integrado
CMD ["npm", "start"]
