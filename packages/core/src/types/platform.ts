/**
 * 目标编译平台：全端多选，或指定单一平台
 */
export type TargetPlatform =
  | 'multi'
  | 'h5'
  | 'app'
  | 'mp-weixin'
  | 'mp-alipay'
  | 'mp-baidu'
  | 'mp-toutiao'
  | 'mp-qq'
  | 'mp-lark'
  | 'mp-jd'
  | 'mp-kuaishou'
  | 'mp-xhs'
  | 'quickapp-webview'
  | 'quickapp-webview-huawei'
  | 'quickapp-webview-union';

/**
 * 平台选择项：真实平台 + 分组快捷项。
 *  - mp-group：全部小程序
 *  - quickapp-group：全部快应用
 * 勾选分组项后由生成引擎展开为组内具体平台。
 */
export type PlatformChoice = TargetPlatform | 'mp-group' | 'quickapp-group';