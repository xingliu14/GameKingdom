#!/usr/bin/env bash
# Run from the repo root to push local files to the VPS over SSH.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
VPS_HOST="89.167.72.63"
VPS_USER="root"
DEST="/var/www/gamekingdom"

rsync -avz --delete \
  --exclude='.git/' \
  --exclude='*.md' \
  --exclude='deploy/' \
  --exclude='.github/' \
  "$REPO_DIR/" "$VPS_USER@$VPS_HOST:$DEST/"

echo "Sync complete: local → $VPS_USER@$VPS_HOST:$DEST"
