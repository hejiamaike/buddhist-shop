#!/bin/bash

# OpenClaw Task Queue - Complete Task
# Usage: ./complete_task.sh 任务ID "执行结果"

PENDING_FILE="/Users/myairbook/.openclaw/workspace/buddhist-shop/tasks/pending.json"
COMPLETED_FILE="/Users/myairbook/.openclaw/workspace/buddhist-shop/tasks/completed.json"

if [ -z "$1" ]; then
    echo "用法: ./complete_task.sh 任务ID \"执行结果\""
    exit 1
fi

TASK_ID=$1
RESULT=${2:-"已完成"}

node -e "
const fs = require('fs');
const pending = JSON.parse(fs.readFileSync('$PENDING_FILE', 'utf8'));
const completed = JSON.parse(fs.readFileSync('$COMPLETED_FILE', 'utf8'));

// Find and move task
const taskIndex = pending.findIndex(t => t.id == $TASK_ID);
if (taskIndex === -1) {
    console.log('未找到任务: $TASK_ID');
    process.exit(1);
}

const task = pending[taskIndex];
task.status = 'completed';
task.completed_at = new Date().toISOString();
task.result = '$RESULT';

// Remove from pending, add to completed
pending.splice(taskIndex, 1);
completed.push(task);

fs.writeFileSync('$PENDING_FILE', JSON.stringify(pending, null, 2));
fs.writeFileSync('$COMPLETED_FILE', JSON.stringify(completed, null, 2));
console.log('任务已完成: ' + task.description);
"
