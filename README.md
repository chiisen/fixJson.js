# 🛠️ fixJson.js
✨ 修正不正常的 json 資料格式 🧹

![logo](https://img.my-best.tw/press_component/images/c14b4ca9124f4e97dda730eab61dfa43.jpg?ixlib=rails-4.2.0&q=70&lossless=0&w=690&fit=max)

# 📦 安裝
```
npm install fix-json-format
```

# ✨ 功能
- 修正缺少引號的 key/value
- 修正缺少逗號
- 修正空值欄位
- 支援 null/true/false 布林值
- 支援數字欄位
- 支援時間格式 (ISO/一般格式)
- 支援 IP 格式 (::ffff:x.x.x.x)
- 支援多行 JSON
- 自動修復漏逗號
- **錯誤提示** - 修復失敗時顯示錯誤行號與位置

# 📝 範例
```
const { fix_json } = require("fix-json-format")

// 回傳物件格式 (預設) - 包含錯誤資訊
const { result, error } = fix_json(str)
if (error) {
  console.error(error)
  // 輸出: JSON Syntax Error at line 1, column 10: ...
}

// 向後相容 - 回傳字串
const strResult = fix_json(str, { returnObject: false })
```

# ⚙️ 選項
| 參數 | 類型 | 預設 | 說明 |
|------|------|------|------|
| returnObject | boolean | true | 回傳 `{ result, error }` 物件，設為 false 回傳字串 |
| fixMissingComma | boolean | true | 自動修復漏逗號 |

# 🧪 測試
```
npm test        # Jest 單元測試
npm run test:legacy  # 原有測試
```

# 🚀 npm 版本發佈
* 🔑 首次登入 npm
```
npm login
```

* 📤 發佈 npm
📝 修改 package.json 的 version 後
```
npm publish
```
