# Mom Hub

A Next.js application serving as a central hub for moms.

## Deploying to Vercel

This project is configured to deploy to Vercel with zero configuration.

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New" → "Project"
4. Import this repository (`mankiel/mom-hub`)
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run deploy command
vercel
```

### Option 3: Deploy via GitHub Integration

1. Connect your GitHub repository to Vercel
2. Enable automatic deployments
3. Every push to the main branch will automatically deploy

## Development

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

## Project Structure

```
mom-hub/
├── app/
│   ├── components/
│   │   └── Sidebar.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```
