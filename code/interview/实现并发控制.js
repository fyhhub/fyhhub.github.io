async function asyncPool(limit, fns) {
  const res = []
  const exec = []

  for (const item of fns) {
    const p = Promise.resolve().then(() => item())

    res.push(p)

    if (limit <= fns.length) {
      const execute = p.then(() => {
        exec.splice(exec.indexOf(execute), 1)
      })
      exec.push(p)
      console.log(exec.length)
      if (exec.length >= limit) {
        console.log('达到并发数量', limit)
        await Promise.race(exec)
      }
    }
  }

  return Promise.all(res)
}

// 示例测试用例
async function runTest() {
  const taskLimit = 3; // 最大并发数
  const tasks = [
    async () => {
      await sleep(1000); // 模拟异步任务
      console.log('执行完成 1');
      return 1;
    },
    async () => {
      await sleep(1000); // 模拟异步任务
      console.log('执行完成 2');
      return 2;
    },
    async () => {
      await sleep(1000); // 模拟异步任务
      console.log('执行完成 3');
      return 3;
    },
    async () => {
      await sleep(500); // 模拟异步任务
      console.log('执行完成 4');
      return 4;
    },
    async () => {
      await sleep(2000); // 模拟异步任务
      console.log('执行完成 5');
      return 5;
    },
    async () => {
      await sleep(1000); // 模拟异步任务
      console.log('执行完成 6');
      return 6;
    },
    async () => {
      await sleep(3000); // 模拟异步任务
      console.log('执行完成 7');
      return 7;
    },
    async () => {
      await sleep(500); // 模拟异步任务
      console.log('执行完成 8');
      return 8;
    },
  ];

  console.log(`Running asyncPool with a limit of ${taskLimit}`);
  const results = await asyncPool(taskLimit, tasks);
  console.log(`Results: ${results}`);
}

// 辅助函数，模拟异步任务
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 运行测试用例
runTest().then(() => {
  console.log('执行完毕');
}).catch(console.error);