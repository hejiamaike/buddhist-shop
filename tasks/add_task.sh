#!/bin/bash

# OpenClaw Task Queue - Add Task
# Usage: ./add_task.sh "任务描述"

TASK_FILE="/Users/myairbook/.openclaw/workspace/buddhist-shop/tasks/pending.json"

if [ -z "$1" ]; then
    echo "用法: ./add_task.sh \"任务描述\""
    exit 1
fi

TASK=$(cat <<EOF
{
    "id": $(date +%s),
    "description": "$1",
    "status": "pending",
    "created_at": "$(date -Iseconds)",
    "result": null
}
EOF
)

# Add task to queue
node -e "
const fs = require('fs');
const tasks = JSON.parse(fs.readFileSync('$TASK_FILE', 'utf8'));
tasks.push($(echo $TASK | tr -d '\n'));
fs.writeFileSync('$TASK_FILE', JSON.stringify(tasks, null, 2));
console.log('任务已添加到队列: $1');
"
