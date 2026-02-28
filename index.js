/**
 * 格式化 json 字串
 *
 * @param {string} str
 * @param {object} options
 * @param {boolean} options.returnObject - 回傳物件格式 { result, error }，預設 true
 * @param {boolean} options.fixMissingComma - 自動修復漏逗號，預設 true
 * @returns {string | { result: string, error: string | null }}
 */
function fix_json(str, options = {}) {
  const { returnObject = true, fixMissingComma = true } = options

  if (!str || typeof str !== "string") {
    const error = "Input is not a valid string"
    return returnObject ? { result: str, error } : str
  }

  str = str.trim()

  // Stage 1: 預處理 (時間、IP、底線)
  str = str.replace(/\\/g, "")
  str = str.replace(/_/g, "0bottomLine0")
  str = str.replace(/::ffff:(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/, "@@ffff@$1.$2.$3.$4")
  str = str.replace(/(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2}).(\d{3})Z/, "$1-$2-$3T$4@$5@$6.$7Z")
  str = str.replace(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2}).(\d{3})/, "$1-$2-$3=$4@$5@$6.$7")
  str = str.replace(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/, "$1-$2-$3=$4@$5@$6")
  str = str.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, "$1-$2-$3")

  // Stage 2: 修補常見錯誤 (使用替換表減少重複)
  const fixes = [
    [/([a-zA-Z0-9-]+):,/g, '"$1":"",'],
    [/([a-zA-Z0-9-]+):null,/g, '"$1":null,'],
    [/([a-zA-Z0-9-]+):NULL,/g, '"$1":NULL,'],
    [/([a-zA-Z0-9-]+):true/g, '"$1":true'],
    [/([a-zA-Z0-9-]+):false/g, '"$1":false'],
    [/([a-zA-Z0-9-]+):TRUE/g, '"$1":TRUE'],
    [/([a-zA-Z0-9-]+):FALSE/g, '"$1":FALSE'],
    [/([a-zA-Z0-9-]+):([0-9-]+),/g, '"$1":$2,'],
    [/([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)}/g, '"$1":"$2"}'],
    [/([a-zA-Z0-9-]+):/g, '"$1":'],
  ]

  fixes.forEach(([regex, replacement]) => {
    str = str.replace(regex, replacement)
  })

  // Stage 3: 修補字串值缺少引號
  str = str.replace(/:\s*([a-zA-Z][a-zA-Z0-9_-]*)\s*([,}\]])/g, ':"$1"$2')
  str = str.replace(/:\s*([a-zA-Z][a-zA-Z0-9_-]*)\s*$/gm, ':"$1"')

  // Stage 4: 還原預處理
  str = str.replace(/@@ffff@(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/, '"::ffff:$1.$2.$3.$4"')
  str = str.replace(/(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2})@(\d{1,2})@(\d{1,2}).(\d{3})Z/, `"$1-$2-$3T$4:$5:$6.$7Z"`)
  str = str.replace(/(\d{4})-(\d{1,2})-(\d{1,2})=(\d{1,2})@(\d{1,2})@(\d{1,2}).(\d{3})/, `"$1-$2-$3 $4:$5:$6.$7"`)
  str = str.replace(/:(\d{4})-(\d{1,2})-(\d{1,2})=(\d{1,2})@(\d{1,2})@(\d{1,2})/, ':"$1-$2-$3 $4:$5:$6"')
  str = str.replace(/:(\d{4})-(\d{1,2})-(\d{1,2})/, ':"$1-$2-$3"')
  str = str.replace(/0bottomLine0/g, "_")

  // Stage 5: 修復多餘逗號
  str = str.replace(/,+\s*}/g, "}")
  str = str.replace(/,+\s*]/g, "]")
  str = str.replace(/,\s*,/g, ",")

  // Stage 6: 修復漏逗號
  if (fixMissingComma) {
    str = fixMissingCommas(str)
  }

  // Stage 7: 修復不平衡括號
  str = fixUnbalancedBrackets(str)

  let error = null
  try {
    JSON.parse(str)
  } catch (e) {
    error = parseJsonError(e.message, str)
  }

  if (returnObject) {
    return { result: str, error }
  }
  return str
}

/**
 * 自動修復漏逗號
 * @param {string} str
 * @returns {string}
 */
function fixMissingCommas(str) {
  let result = str
  let before, i = 0
  do {
    before = result
    result = result.replace(/("[\w-]+":[^,}\]]+)\s*("[\w-]+":)/g, "$1,$2")
    i++
  } while (result !== before && i < 10)
  return result
}

/**
 * 修復不平衡括號
 * @param {string} str
 * @returns {string}
 */
function fixUnbalancedBrackets(str) {
  let result = str
  let openBrace = 0, openBracket = 0

  for (const char of result) {
    if (char === "{") openBrace++
    else if (char === "}") openBrace--
    else if (char === "[") openBracket++
    else if (char === "]") openBracket--
  }

  while (openBrace > 0) {
    result += "}"
    openBrace--
  }
  while (openBrace < 0) {
    result = "{" + result
    openBrace++
  }

  while (openBracket > 0) {
    result += "]"
    openBracket--
  }
  while (openBracket < 0) {
    result = "[" + result
    openBracket++
  }

  return result
}

/**
 * 解析 JSON 錯誤訊息
 * @param {string} message
 * @param {string} str
 * @returns {string}
 */
function parseJsonError(message, str) {
  const match = message.match(/position (\d+)/)
  if (match) {
    const pos = parseInt(match[1], 10)
    const lines = str.substring(0, pos).split("\n")
    const line = lines.length
    const column = lines[lines.length - 1].length + 1
    const contextStart = Math.max(0, pos - 20)
    const contextEnd = Math.min(str.length, pos + 20)
    const context = str.substring(contextStart, contextEnd).replace(/\n/g, "\\n")
    return `JSON Syntax Error at line ${line}, column ${column}: ${message}\nContext: ...${context}...`
  }
  return `JSON Syntax Error: ${message}`
}

module.exports = { fix_json }
