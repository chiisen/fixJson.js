const { fix_json } = require("./index")

describe("fix_json", () => {
  describe("基本功能", () => {
    test("正常 JSON", () => {
      const { result, error } = fix_json('{"name":"test","value":123}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ name: "test", value: 123 })
    })

    test("缺少引號的 key", () => {
      const { result, error } = fix_json('{name:"test",value:123}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ name: "test", value: 123 })
    })

    test("空值欄位", () => {
      const { result, error } = fix_json('{"currency":,"value":123}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ currency: "", value: 123 })
    })

    test("null 值", () => {
      const { result, error } = fix_json('{"currency":null,"value":123}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ currency: null, value: 123 })
    })
  })

  describe("布林值", () => {
    test("布林值 true", () => {
      const { result, error } = fix_json('{"active":true,"value":123}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ active: true, value: 123 })
    })

    test("布林值 false", () => {
      const { result, error } = fix_json('{"active":false,"value":123}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ active: false, value: 123 })
    })
  })

  describe("數字欄位", () => {
    test("數字欄位", () => {
      const { result, error } = fix_json('{"count":123,"value":456}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ count: 123, value: 456 })
    })
  })

  describe("時間格式", () => {
    test("時間格式 ISO", () => {
      const { result, error } = fix_json('{"date":"2022-02-22T06:32:26.000Z"}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ date: "2022-02-22T06:32:26.000Z" })
    })

    test("時間格式 with space", () => {
      const { result, error } = fix_json('{"date":"2022-02-23 01:15:06.995"}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ date: "2022-02-23 01:15:06.995" })
    })
  })

  describe("IP 格式", () => {
    test("IP 格式", () => {
      const { result, error } = fix_json('{"ip":"::ffff:210.242.152.252"}')
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ ip: "::ffff:210.242.152.252" })
    })
  })

  describe("多行 JSON", () => {
    test("多行 JSON", () => {
      const input = `{
  "name": "test",
  "value": 123
}`
      const { result, error } = fix_json(input)
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ name: "test", value: 123 })
    })

    test("多行缺少逗號", () => {
      const input = `{
  "name": "test"
  "value": 123
}`
      const { result, error } = fix_json(input)
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ name: "test", value: 123 })
    })
  })

  describe("向後相容性", () => {
    test("回傳字串格式", () => {
      const result = fix_json('{"name":"test"}', { returnObject: false })
      expect(result).toBe('{"name":"test"}')
    })

    test("回傳物件格式 (預設)", () => {
      const result = fix_json('{"name":"test"}')
      expect(result).toEqual({ result: '{"name":"test"}', error: null })
    })
  })

  describe("自動修復漏逗號", () => {
    test("自動修復漏逗號", () => {
      const { result, error } = fix_json('{"name":"test" "value":123}', { fixMissingComma: true })
      expect(error).toBeNull()
      expect(JSON.parse(result)).toEqual({ name: "test", value: 123 })
    })

    test("關閉自動修復", () => {
      const { error } = fix_json('{"name":"test" "value":123}', { fixMissingComma: false })
      expect(error).not.toBeNull()
    })
  })

  describe("錯誤處理", () => {
    test("無法修復的錯誤應回傳 error", () => {
      const { result, error } = fix_json('{"name":,"value":123}')
      expect(error).not.toBeNull()
      expect(error).toContain("JSON Syntax Error")
    })

    test("無效輸入應回傳 error", () => {
      const { result, error } = fix_json("")
      expect(error).not.toBeNull()
    })

    test("錯誤訊息包含位置資訊", () => {
      const { error } = fix_json('{"name":}')
      expect(error).toContain("line")
      expect(error).toContain("column")
    })
  })
})
