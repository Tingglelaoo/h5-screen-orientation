## H5 的横竖屏判断

用于 H5 的最佳横竖屏判断方式，兼容多种差异情况。
具体介绍见文章[《探讨判断横竖屏的最佳实现》](https://aotu.io/notes/2017/01/31/detect-orientation/)

## 安装

```js
npm install 'h5-screen-orientation'
```

## 重新编译

```bash
# 安装依赖
npm i

# 执行命令,会在dist文件夹生成编译后的文件，支持import，require，script 引用
npm run build
```

## 简介

屏幕状态一些处理进行统一封装，包括以下内容：

- ✨对DOM结构，进行强制横竖屏显示
- ✨根据需要设置横竖屏翻转提示蒙层，有默认配置（可配置logo和提示文案）
- ✨横竖屏翻转事件回调绑定

## 使用

1. 方式一：import 引入

```javascript
import Screen from '@o2team/screen-orientation'
```

2. 方式二：require 引入

```javascript
const Screen = require('@o2team/screen-orientation')
```

3. 方式三：script 引入

```html
<script src="./dist/index.js"><script>
```

## API

### Screen.lock(config)
> 将指定容器保持横屏/竖屏显示

#### 参数
配置 config {object} 包括以下可配置项：
- mode {string} 显示模式，强制横屏选"landscape"，强制竖屏选"portrait"，必填
- $wrapper {HTMLElement} 被处理的DOM容器，必填
- zIndex {number} 显示的层次，也就是z-index，默认是301，可选


### Screen.inform(config) 
> 在指定场景下（横屏/竖屏）显示提醒蒙层

#### 参数
配置 config {object}  包括以下可配置项：
- mode {string} 显示模式，强制横屏选"landscape"，强制竖屏选"portrait"，必填
- id {string} 提示蒙层id命名，必填
- logo {src} 提示蒙层的logo，默认切换横竖屏的静态logo，可选
- text {string} 提示文案，默认“为了更好的体验，请保持竖屏/横屏显示”可选
- zIndex {number} 显示的层次，也就是z-index，默认是310，可选


### Screen.onOrientationChange(callback, context) 
> 横竖屏切换回调

#### 参数
callback {function} 回调函数
context {context} 上下文

## 具体用法
```javascript
const xScreen = new Screen()
// 强制竖屏
xScreen.lock({
  mode: 'portrait',
  $wrapper: document.getElementById('J_portrait'),
  zIndex: 302,
})

// 强制横屏
xScreen.lock({
  mode: 'landscape',
  $wrapper: document.getElementById('J_landscape'),
  zIndex: 301,
})

// 横屏提示
xScreen.inform({
  mode: 'landscape',
  id: 'J_landscapeTips',
})

// 竖屏提醒
xScreen.inform({
  mode: 'portrait',
  id: 'J_portraitTips',
  text: '竖屏浏览体验更好喔！',
  logo: './img/portrait_logo.png',
})

// 屏幕翻转回调
xScreen.onOrientationChange(orientation => {
  console.log('1', orientation)
}, this)

// 屏幕翻转回调
xScreen.onOrientationChange(orientation => {
  console.log('2', orientation)
}, this)
```
