const { fix_json } = require("./index")

const testCases = [
  {
    name: "正常 JSON",
    input: '{"name":"test","value":123}',
  },
  {
    name: "缺少引號的 key",
    input: '{name:"test",value:123}',
  },
  {
    name: "缺少逗號",
    input: '{"name":"test" "value":123}',
  },
  {
    name: "空值欄位",
    input: '{"currency":,"value":123}',
  },
  {
    name: "null 值",
    input: '{"currency":null,"value":123}',
  },
  {
    name: "最後一筆無逗號",
    input: '{"name":"test","value":123}',
  },
  {
    name: "布林值 true",
    input: '{"active":true,"value":123}',
  },
  {
    name: "布林值 false",
    input: '{"active":false,"value":123}',
  },
  {
    name: "數字欄位",
    input: '{"count":123,"value":456}',
  },
  {
    name: "時間格式 ISO",
    input: '{"date":"2022-02-22T06:32:26.000Z"}',
  },
  {
    name: "時間格式 with space",
    input: '{"date":"2022-02-23 01:15:06.995"}',
  },
  {
    name: "IP 格式",
    input: '{"ip":"::ffff:210.242.152.252"}',
  },
  {
    name: "無法修復的錯誤",
    input: '{"name":,"value":123}',
  },
]

let passed = 0
let failed = 0

console.log("🧪 Running fix_json tests...\n")

testCases.forEach(({ name, input }) => {
  const { result, error } = fix_json(input)
  const isValid = error === null

  if (isValid) {
    try {
      JSON.parse(result)
      console.log(`✅ ${name}`)
      passed++
    } catch (e) {
      console.log(`❌ ${name} - Still invalid: ${e.message}`)
      failed++
    }
  } else {
    console.log(`⚠️  ${name} - Error detected: ${error.split("\n")[0]}`)
    passed++
  }
})

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`)
process.exit(failed > 0 ? 1 : 0)
