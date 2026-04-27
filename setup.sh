#!/bin/bash

# Usage: ./setup.sh <project-name>
# Example: ./setup.sh healthcare-saas

PROJECT_NAME=${1:-healthcare-saas}

echo "🚀 Setting up React + Vite + TypeScript project: $PROJECT_NAME"
echo ""


# ===== STEP 2: Install all dependencies =====
echo ""
echo "📦 Step 2/4: Installing core dependencies..."
npm install \
  react-router-dom \
  zustand \
  firebase \
  react-hook-form \
  @hookform/resolvers \
  zod \
  recharts \
  lucide-react \
  clsx \
  tailwind-merge \
  date-fns \
  react-hot-toast

echo ""
echo "📦 Installing dev dependencies..."
npm install -D \
  tailwindcss@3 \
  postcss \
  autoprefixer \
  @types/node \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier \
  vite-plugin-pwa \
  workbox-window

echo ""
echo "📦 Installing optional (MSW + testing)..."
npm install -D \
  msw \
  vitest \
  @testing-library/react \
  @testing-library/jest-dom \
  jsdom
# ===== STEP 3: Initialize Tailwind =====
echo ""
echo "🎨 Step 3/4: Initializing Tailwind..."
npx tailwindcss init -p

