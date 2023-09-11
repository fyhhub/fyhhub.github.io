# Provider的多种写法

## 1. 基础写法

1. 声明一个Provider
```js
@Injectable()
class AppService {

}
```

2. Module中注册

```js
@Module({
  providers: [
    AppService
  ]
})
export class AppModule {}
```

3. 依赖注入

```js
@Controller()
class AppController {
  constructor(private readonly appService: AppService){}
}
```
或者
```js
@Controller()
class AppController {
  @Inject(AppService)
  private readonly appService: AppService
}
```

## 2. provide、useClass

1. 基础写法等同于以下写法：
```js
@Module({
  providers: [
    {
      provide: AppService,
      useClass: AppService
    }
  ]
})
export class AppModule {}
```


2. 字符串注入
```js
@Module({
  providers: [
    {
      provide: 'app_service',
      useClass: AppService
    }
  ]
})
```

```js
@Controller()
class AppController {
  constructor(@Inject('app_service') private readonly appService: AppService){}
}
```

## 3. useValue
```js
@Module({
  providers: [
    {
      provide: 'app_service',
      useValue: {
        a: '123'
      }
    }
  ]
})
```

```js
@Controller()
class AppController {
  constructor(@Inject('app_service') private readonly appService: { a: string }){}
}
```


## 4. useFactory

1. 基础用法
```js
@Module({
  providers: [
    {
      provide: 'app_service',
      useFactory() {
        return {
          a: '123'
        }
      }
    }
  ]
})
```

```js
@Controller()
class AppController {
  constructor(@Inject('app_service') private readonly appService: { a: string }){}
}
```

2. 参数注入

useFactory可以接受其他被注入的Service对象

```js
@Module({
  providers: [
    {
      provide: 'app_service',
      useFactory(otherService, otherService1, otherService2) {
        return {
          a: '123'
        }
      },
      inject: [OtherService, 'service_xxx']
    }
  ],
})
```


3. 异步useFactory

```js
@Module({
  providers: [
    {
      provide: 'app_service',
      async useFactory(otherService, otherService1, otherService2) {

        await fn()...
        return {
          a: '123'
        }
      }
    }
  ]
})
```


## 5. useExisting

provider 还可以通过 useExisting 来指定别名, 比如下面的，给`app_service` 起了个别名叫`app_service_1`

```js
@Module({
  providers: [
    {
      provide: 'app_service_1',
      useExisting: 'app_service'
    }
  ]
})
```
