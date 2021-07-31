项目通过npm集成npm

1.当本地没有package.json时，可以通过如下命令，一路回车，初始化环境，并生成package.json,有该文件，会覆盖重新生成
```js
npm init
```


2.在项目的根目录下，也就是project.config.json文件所在的目录下，执行如下命令
```js
npm i @vant/weapp -S --production
```

3.通过小程序开发工具进行构建


补充：指定vant版本
```js
npm i @vant/weapp@1.5.2 -S --production
```
