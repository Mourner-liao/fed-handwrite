class ConcurrencyController {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.runningCount = 0;
    this.queue = [];
  }

  async runAsyncTask(asyncTaskFunction) {
    if (this.runningCount < this.maxConcurrency) {
      this.runningCount++;
      return this.executeAsyncTask(asyncTaskFunction);
    } else {
      return new Promise((resolve, reject) => {
        this.queue.push({ asyncTaskFunction, resolve, reject });
      });
    }
  }

  async executeAsyncTask(asyncTaskFunction) {
    try {
      const result = await asyncTaskFunction();
      this.completeTask();
      return result;
    } catch (error) {
      this.completeTask();
      throw error;
    }
  }

  completeTask() {
    this.runningCount--;
    console.log(this.queue.length);
    if (this.queue.length > 0) {
      const { asyncTaskFunction, resolve, reject } = this.queue.shift();
      this.executeAsyncTask(asyncTaskFunction).then(resolve).catch(reject);
    }
  }
}

// 创建一个并发控制器，限制同时执行的任务数量为3
const controller = new ConcurrencyController(3);

// 定义一个异步任务函数
function asyncTask(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      resolve(`Result from Task ${id}`);
    }, 1000);
  });
}

// 启动多个任务
for (let i = 1; i <= 10; i++) {
  controller
    .runAsyncTask(() => asyncTask(i))
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}
