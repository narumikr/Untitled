#!/bin/bash
set -e

echo
echo "🚀 Starting publish build"

npm ci
npm run clean
npm run build:gen
npm run build:bundle
npm run build:typecheck
npm run build:package-json

echo
echo "✅ Completed publish build"
