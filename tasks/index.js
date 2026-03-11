/**
 * OpenClaw 任务队列 - Agent 端
 *
 * 使用方法:
 * - 每次启动时调用 checkPendingTasks() 检查待处理任务
 * - 完成任务后调用 completeTask(taskId, result)
 */

const fs = require('fs');
const path = require('path');

const TASKS_DIR = path.join(__dirname);
const PENDING_FILE = path.join(TASKS_DIR, 'pending.json');
const COMPLETED_FILE = path.join(TASKS_DIR, 'completed.json');

function getPendingTasks() {
  try {
    const data = fs.readFileSync(PENDING_FILE, 'utf8');
    return JSON.parse(data).filter(t => t.status === 'pending');
  } catch (e) {
    return [];
  }
}

function completeTask(taskId, result) {
  try {
    const pending = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8'));
    const completed = JSON.parse(fs.readFileSync(COMPLETED_FILE, 'utf8'));

    const taskIndex = pending.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return { success: false, error: 'Task not found' };
    }

    const task = pending[taskIndex];
    task.status = 'completed';
    task.completed_at = new Date().toISOString();
    task.result = result;

    pending.splice(taskIndex, 1);
    completed.push(task);

    fs.writeFileSync(PENDING_FILE, JSON.stringify(pending, null, 2));
    fs.writeFileSync(COMPLETED_FILE, JSON.stringify(completed, null, 2));

    return { success: true, task };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

module.exports = { getPendingTasks, completeTask };
