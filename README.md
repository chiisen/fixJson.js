# fixJson.js
修正不正常的 json 資料格式

![logo](https://img.my-best.tw/press_component/images/c14b4ca9124f4e97dda730eab61dfa43.jpg?ixlib=rails-4.2.0&q=70&lossless=0&w=690&fit=max)

# 安裝
安裝方式如下:
```
npm install fix-json-format
```
安裝後，可以用下列指令查詢安裝過的套件:
```
npm list --depth=0
```

[fixJson.js : npm 說明頁面連結](https://www.npmjs.com/package/fix-json-format)

![npm list](https://i.imgur.com/a56xdBl.png)

# 範例
```
const { fix_json } = require("fix-json-format")

console.log(fix_json(str))
```

# npm 版本發佈
* 首次登入 npm
```
npm login
```
![](https://i.imgur.com/ncvwdmS.png)

* 發佈 npm
修改 package.json 的 version 後
```
npm publish
```
![npm publish](https://i.imgur.com/QDYx7NG.png)
