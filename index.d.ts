export interface FixJsonOptions {
  /**
   * 回傳物件格式 { result, error }，設為 false 回傳字串
   * @default true
   */
  returnObject?: boolean
  /**
   * 自動修復漏逗號
   * @default true
   */
  fixMissingComma?: boolean
}

export interface FixJsonResult {
  /** 修復後的 JSON 字串 */
  result: string
  /** 錯誤訊息，修復失敗時會包含行號與位置 */
  error: string | null
}

/**
 * 格式化 json 字串，修正不正常的 json 資料格式
 *
 * @param str - 待修復的 JSON 字串
 * @param options - 選項
 * @returns 修復後的結果
 *
 * @example
 * // 回傳物件格式
 * const { result, error } = fix_json('{name:"test"}')
 *
 * @example
 * // 向後相容 - 回傳字串
 * const result = fix_json('{name:"test"}', { returnObject: false })
 */
export function fix_json(str: string, options?: FixJsonOptions): FixJsonResult | string

export default fix_json
