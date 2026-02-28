#!/usr/bin/env node

const path = require("path")
const { fix_json } = require(path.join(__dirname, ".."))
const fs = require("fs")

const args = process.argv.slice(2)
let showHelp = false
let showVersion = false
let outputFile = null
let inputFile = null

for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === "-h" || arg === "--help") {
    showHelp = true
  } else if (arg === "-v" || arg === "--version") {
    showVersion = true
  } else if (arg === "-o" || arg === "--output") {
    outputFile = args[++i]
  } else if (!arg.startsWith("-")) {
    inputFile = arg
  }
}

if (showVersion) {
  const pkg = require(path.join(__dirname, "..", "package.json"))
  console.log(pkg.version)
  process.exit(0)
}

if (showHelp) {
  console.log(`fix-json-format - 修正不正常的 json 資料格式

用法: fix-json-format [選項] [檔案]

選項:
  -h, --help     顯示說明
  -v, --version  顯示版本
  -o, --output   輸出到檔案
  -              從標準輸入讀取

範例:
  fix-json-format input.json
  cat input.json | fix-json-format
  fix-json-format input.json -o output.json`)
  process.exit(0)
}

let input

if (inputFile) {
  try {
    input = fs.readFileSync(inputFile, "utf8")
  } catch (e) {
    console.error(`錯誤: 無法讀取檔案 "${inputFile}"`)
    process.exit(1)
  }
} else {
  if (process.stdin.isTTY) {
    console.error("錯誤: 請提供輸入檔案或使用標準輸入")
    process.exit(1)
  }
  input = fs.readFileSync(0, "utf8")
}

const { result, error } = fix_json(input)

if (error) {
  console.error(error)
  if (outputFile) {
    fs.writeFileSync(outputFile, result, "utf8")
  } else {
    console.log(result)
  }
  process.exit(1)
}

if (outputFile) {
  fs.writeFileSync(outputFile, result, "utf8")
} else {
  console.log(result)
}
