/**
 * 内置主题枚举
 */
export enum Theme {
  /** 默认紫 */
  Default = 'default',
  /** 清新蓝 */
  Blue = 'blue',
  /** 自然绿 */
  Green = 'green',
  /** 温暖橙 */
  Orange = 'orange',
}

/** 主题选择：'none' 表示不使用内置主题 */
export type ThemeOption = Theme | 'none';