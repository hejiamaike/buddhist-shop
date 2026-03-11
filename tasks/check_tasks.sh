#!/bin/bash

# OpenClaw Task Queue - Check & Complete Tasks
# Usage: ./check_tasks.sh

PENDING_FILE="/Users/myairbook/.openclaw/workspace/buddhist-shop/tasks/pending.json"
COMPLETED_FILE="/Users/myairbook/.openclaw/workspace/buddhist-shop/tasks/completed.json"

# Check for pending tasks
PENDING=$(cat "$PENDING_FILE" | node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/dev/stdin', 'utf8'));
console.log(JSON.stringify(data));
")

if [ "$PENDING" = "[]" ]; then
    echo "暂无待处理任务"
    exit 0
fi

echo "待处理任务:"
echo "$PENDING" | node -e "
const fs = require('fs');
const tasks = JSON.parse(fs.readFileSync('/dev/stdin', 'utf8'));
tasks.forEach((t, i) => {
    console.log((i+1) + '. [' + t.id + '] ' + t.description);
});
"
