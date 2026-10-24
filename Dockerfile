FROM node:22-bookworm-slim AS base

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

# Development stage (used for local development with hot reload)
FROM base AS development

ENV NODE_ENV=development

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Production builder stage
FROM base AS builder

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# Production runtime stage (serves the static build)
FROM base AS runner

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
