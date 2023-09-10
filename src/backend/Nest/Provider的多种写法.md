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