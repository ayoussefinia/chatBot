# ---- build stage ----
FROM node:lts-alpine AS builder
WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build


# ---- run stage ----
FROM node:lts-alpine AS runner
WORKDIR /app

# Copy everything from builder
COPY --from=builder /app ./

# Next.js runs on port 3000
EXPOSE 3000

# Disable telemetry in prod
ENV NEXT_TELEMETRY_DISABLED=1

# Start the app
CMD ["npm", "run", "start"]

