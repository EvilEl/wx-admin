FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Environment variables
ENV VITE_API_URL=http://backend:3000
ENV VITE_API_PORT=3000

EXPOSE 5173

# Start development server
CMD [ "pnpm", "dev", "--host", "0.0.0.0" ]
