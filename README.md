# 🛠️ fixJson.js
✨ 修正不正常的 JSON 資料格式，並提供強大的偵錯功能！ 🧹

> 💡 **核心優勢：** 當你遇到格式錯誤的 JSON 導致解析失敗時，不需要再辛苦地開啟 IDE 或其他工具進行偵錯。`fixJson.js` 提供了偵錯提示功能，能夠在修復失敗或遇到語法錯誤時，精準指出錯誤發生的行號與位置，幫助你快速定位問題！

![logo](https://img.my-best.tw/press_component/images/c14b4ca9124f4e97dda730eab61dfa43.jpg?ixlib=rails-4.2.0&q=70&lossless=0&w=690&fit=max)

# 📦 安裝
```
npm install fix-json-format
```

# ✨ 功能
- 修正缺少引號的 key/value
- 修正缺少逗號
- 修正多餘逗號
- 修正不平衡括號
- 修正空值欄位
- 支援 null/true/false 布林值
- 支援數字欄位
- 支援時間格式 (ISO/一般格式)
- 支援 IP 格式 (::ffff:x.x.x.x)
- 支援多行 JSON
- 自動修復漏逗號
- **錯誤提示** - 修復失敗時顯示錯誤行號與位置
- **性能優化** - 減少重複 replace 次數
- **TypeScript 支援** - 完整類型定義
- **ESM/CommonJS 支援** - 支援兩種模組系統
- **CLI 工具** - 命令列介面

# 📝 範例

## CLI 命令列
```bash
# 從檔案讀取
fix-json-format input.json

# 從標準輸入讀取
cat input.json | fix-json-format

# 輸出到檔案
fix-json-format input.json -o output.json

# 顯示說明
fix-json-format --help
```

## CommonJS
```javascript
const { fix_json } = require("fix-json-format")
```

## ESM / TypeScript
```javascript
import { fix_json } from "fix-json-format"
```

## 使用方式
```javascript
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

## CLI 測試
```bash
# 本地開發測試
npm link                    # 連結本地指令
fix-json-format --version   # 顯示版本
fix-json-format --help      # 顯示說明
echo '{name:"test"}' | fix-json-format  # 修復 JSON

# 或直接使用 npx (不需安裝)
npx fix-json-format --version
echo '{name:"test"}' | npx fix-json-format
```

# 📋 更新日誌

## v1.0.3
- 新增 CLI 命令列工具

## v1.0.2
- 新增 TypeScript 類型定義 (.d.ts)
- 新增 ESM 模組支援
- 同步版本號

## v1.0.1
- 新增多餘逗號自動修復
- 新增不平衡括號自動修復
- 新增字串值缺少引號修復
- 效能優化 (Stage 分組 + 替換表)

## v1.0.0
- 初始版本
- 修正缺少引號的 key/value
- 修正缺少逗號
- 修正空值欄位
- 支援 null/true/false 布林值
- 支援數字欄位
- 支援時間格式
- 支援 IP 格式
- 支援多行 JSON
- 錯誤提示功能

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
