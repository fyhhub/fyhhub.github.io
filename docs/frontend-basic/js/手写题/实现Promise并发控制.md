# 实现Promise并发控制

## 方式一
```js
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
      if (exec.length >= limit) {
        await Promise.race(exec)
      }
    }
  }

  return Promise.all(res)
}
```


```js

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
```

## 方式二
```js
function asyncPool(fn, arr, limit = 10) {
  let args = [...arr]   //不修改原参数数组
  let results = []      //存放最终结果
  let runningCount = 0  //正在运行的数量
  let resultIndex = 0   //结果的下标，用于控制结果的顺序
  let resultCount = 0   //结果的数量

  return new Promise((resolve) => {
    function run() {
      while(runningCount < limit && args.length > 0) {
        runningCount++
        ((i)=> {        //闭包用于保存结果下标，便于在resolve时把结果放到合适的位置
          let v = args.shift()
          console.log('正在运行' + runningCount)
          fn(v).then(val => {
            results[i] = val
          }, () => {
            throw new Error(`An error occurred: ${v}`)
          }).finally(() => {
            runningCount--
            resultCount++
            if(resultCount === arr.length) {  //这里之所以用resultCount做判断，而不用results的长度和args的长度，是因为这两个都不准确
              resolve(results)
            } else {
              run()
            }
          })          
        })(resultIndex++)
      }
    }
    run()
  })
}
```


```js

//测试
function getWeather(city) {
  console.log(`开始获取${city}的天气`)
  return fetch(`https://api2.jirengu.com/getWeather.php?city=${city}`).then(res=> res.json())
}

let citys = ['北京', '上海', '杭州', '成都', '武汉', '天津', '深圳', '广州', '合肥', '郑州']
asyncPool(getWeather, citys, 2).then(results => console.log(results))

```