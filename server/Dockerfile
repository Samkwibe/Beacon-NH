FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY schema.sql default-events.json ./
COPY src ./src

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "src/index.js"]
