#!/bin/bash
set -e
git add -A
COMMIT_MSG="${1:-Update store: size guide modal, drop date 12.25.26, and email templates}"
git commit -m "$COMMIT_MSG" || echo "Nothing new to commit"
git push origin main
echo "Successfully pushed to GitHub!"
