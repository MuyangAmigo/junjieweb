# Next.js Server Mode Migration Plan

Drafted 2026-03-28. Migrate from static export (`output: "export"` on Azure Static Web Apps) to full Next.js server mode on Azure, enabling API routes, SSR, and middleware.

---

## Current State

- **Framework**: Next.js 16, App Router, `output: "export"` (fully static)
- **Hosting**: Azure Static Web Apps (deploys `site-next/out/`)
- **Media**: Azure Blob Storage (images, videos, documents)
- **CI/CD**: GitHub Actions → build → upload static files
- **Domain**: junjie.li (configured on Azure Static Web Apps)

## Target State

- **Framework**: Next.js 16, App Router, server mode (no `output: "export"`)
- **Hosting**: Azure Container Apps (or Azure App Service)
- **Media**: Azure Blob Storage (unchanged)
- **CI/CD**: GitHub Actions → build Docker image → deploy container
- **Domain**: junjie.li (migrated to new hosting)

---

## Phase 1: Azure Infrastructure Setup

### 1.1 Create Azure Container Apps Environment

Container Apps is the recommended choice — it's serverless, scales to zero, and supports custom domains with managed certificates. Cheaper than App Service for low-traffic sites.

```bash
# Resource group (use existing or create new)
az group create --name rg-junjie-site --location eastus

# Container Apps environment
az containerapp env create \
  --name junjie-site-env \
  --resource-group rg-junjie-site \
  --location eastus

# Azure Container Registry (to store Docker images)
az acr create \
  --name junjiesiteacr \
  --resource-group rg-junjie-site \
  --sku Basic \
  --admin-enabled true
```

### 1.2 Alternative: Azure App Service

If you prefer a more traditional setup or need features like deployment slots:

```bash
az appservice plan create \
  --name junjie-site-plan \
  --resource-group rg-junjie-site \
  --sku B1 \
  --is-linux

az webapp create \
  --name junjie-site \
  --resource-group rg-junjie-site \
  --plan junjie-site-plan \
  --runtime "NODE:20-lts"
```

### 1.3 Comparison

| Factor | Container Apps | App Service (B1) |
|---|---|---|
| Cost (low traffic) | ~$0/mo (scales to zero) | ~$13/mo (always-on) |
| Scale to zero | Yes | No |
| Custom domain + TLS | Managed certs | Managed certs |
| Deployment slots | No | Yes |
| Docker required | Yes | Optional (can deploy code directly) |
| Complexity | Medium | Low |

**Recommendation**: Container Apps for cost efficiency. App Service if you want simpler deployments without Docker.

---

## Phase 2: Next.js Code Changes

### 2.1 Remove Static Export

```ts
// next.config.ts — BEFORE
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

// next.config.ts — AFTER
const nextConfig: NextConfig = {
  // output: removed — use default server mode
  // images: can now use Next.js Image Optimization (optional)
};
```

### 2.2 Add Dockerfile

Create `site-next/Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production=false

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### 2.3 Enable Standalone Output

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "standalone", // produces minimal server bundle for Docker
};
```

### 2.4 Add API Route Example

```
site-next/src/app/api/health/route.ts
```

```ts
export function GET() {
  return Response.json({ status: "ok" });
}
```

This validates that API routes work after migration.

---

## Phase 3: CI/CD Migration

### 3.1 New GitHub Actions Workflow

Replace the current static deploy workflow with a container-based one:

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

env:
  REGISTRY: junjiesiteacr.azurecr.io
  IMAGE_NAME: junjie-site

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          lfs: true

      - name: Login to Azure Container Registry
        uses: azure/docker-login@v1
        with:
          login-server: ${{ env.REGISTRY }}
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}

      - name: Build and push Docker image
        working-directory: site-next
        run: |
          docker build -t ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }} .
          docker build -t ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest .
          docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest

      - name: Deploy to Azure Container Apps
        uses: azure/container-apps-deploy-action@v1
        with:
          containerAppName: junjie-site
          resourceGroup: rg-junjie-site
          imageToDeploy: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

### 3.2 Required GitHub Secrets

| Secret | Source |
|---|---|
| `ACR_USERNAME` | Azure Container Registry admin username |
| `ACR_PASSWORD` | Azure Container Registry admin password |

(Remove `AZURE_STATIC_WEB_APPS_API_TOKEN` after migration is complete.)

---

## Phase 4: Domain Migration

### 4.1 Steps

1. Deploy the container app and verify it works on the default `*.azurecontainerapps.io` URL
2. Add custom domain `junjie.li` to the Container App
3. Configure DNS: update the CNAME/A record from Static Web Apps to Container Apps
4. Verify TLS certificate is provisioned (Container Apps handles this automatically)
5. Test the site on `junjie.li`
6. Delete the old Azure Static Web Apps resource

### 4.2 DNS Cutover

Expect a few minutes of DNS propagation. No downtime if you keep the old Static Web Apps running until DNS fully resolves to the new target.

---

## Phase 5: Cleanup

- [ ] Delete Azure Static Web Apps resource
- [ ] Remove old `azure-static-web-apps.yml` workflow
- [ ] Remove `AZURE_STATIC_WEB_APPS_API_TOKEN` from GitHub Secrets
- [ ] Update CLAUDE.md to reflect new architecture
- [ ] Remove `images: { unoptimized: true }` if using Next.js Image Optimization

---

## What This Unlocks

Once migrated, you can incrementally add:

| Capability | How |
|---|---|
| **API routes** | `src/app/api/*/route.ts` — REST endpoints for any service |
| **Server-side rendering** | Default for server components — dynamic data fetching |
| **Middleware** | `middleware.ts` — auth, redirects, A/B testing, geolocation |
| **Server Actions** | Form handling, mutations without writing API endpoints |
| **Image optimization** | Built-in Next.js `<Image>` with on-demand resizing |
| **Streaming / Suspense** | Progressive page loading for complex pages |
| **Caching controls** | `revalidate`, `cache`, ISR for hybrid static+dynamic |
| **Database access** | Connect to Azure Cosmos DB, PostgreSQL, etc. from server code |
| **Auth** | NextAuth.js / Auth.js with session management |

---

## Risk & Rollback

- **Rollback**: Keep the Static Web Apps resource alive until the new setup is verified. Revert DNS if needed.
- **Cost risk**: Container Apps scales to zero, so idle cost is near $0. Monitor for unexpected traffic spikes.
- **Build time**: Docker builds are slower than static export (~2-3 min vs ~30s). Mitigated by layer caching in CI.
- **Existing pages**: All current pages (Home, About, Posts) will continue to work — they're static by default in server mode. No content changes needed.
