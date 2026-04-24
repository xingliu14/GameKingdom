#!/usr/bin/env bash
# Runs on the VPS (or any host where /root/workspace/GameKingdom and /var/www/gamekingdom exist).
# Direct rsync — no SSH tunnel needed.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="/var/www/gamekingdom"

rsync -avz --delete \
  --exclude='.git/' \
  --exclude='*.md' \
  --exclude='deploy/' \
  --exclude='.github/' \
  "$REPO_DIR/" "$DEST/"

echo "Sync complete: $REPO_DIR → $DEST"
