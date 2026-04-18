#!/usr/bin/env bash
# Deploy GameKingdom to VPS — edit the two variables below, then run once.
set -euo pipefail

# ── Configure these ────────────────────────────────────────────────────────────
VPS_USER="ubuntu"                         # SSH user on your VPS
VPS_HOST="YOUR_VPS_IP_OR_DOMAIN"          # e.g. 203.0.113.42 or vps.example.com
REMOTE_DIR="/var/www/gamekingdom"         # where files land on the VPS
NGINX_CONF_REMOTE="/etc/nginx/conf.d/gamekingdom.conf"
# ──────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")/$(basename "$SCRIPT_DIR")"
# If deploy.sh is inside GameKingdom/, the repo root is the same dir:
REPO_ROOT="$SCRIPT_DIR"

echo "==> Syncing game files to $VPS_USER@$VPS_HOST:$REMOTE_DIR"
rsync -avz --delete \
  --exclude='deploy/' \
  --exclude='.git/' \
  --exclude='*.md' \
  "$REPO_ROOT/" \
  "$VPS_USER@$VPS_HOST:$REMOTE_DIR/"

echo "==> Uploading nginx config"
scp "$SCRIPT_DIR/deploy/nginx-location.conf" \
  "$VPS_USER@$VPS_HOST:/tmp/gamekingdom-nginx.conf"

ssh "$VPS_USER@$VPS_HOST" bash -s << EOF
  sudo mv /tmp/gamekingdom-nginx.conf $NGINX_CONF_REMOTE
  sudo nginx -t && sudo systemctl reload nginx
  echo "nginx reloaded OK"
EOF

echo ""
echo "Done! Your games are live. Visit https://YOUR_DOMAIN/play/"
