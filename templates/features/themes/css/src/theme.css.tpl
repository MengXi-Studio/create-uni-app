/* ============================================================
 * 内置主题 —— 全局 CSS 自定义属性（theme.css）
 * 经主入口 `import '@/theme.css'` 全局生效，任何样式均可使用 var(--uni-*)。
 * :root 兼容 H5；page 兼容小程序端。
 * 顶部色板由 create-uni-app 依据所选主题注入。
 * ============================================================ */

:root,
page {
${paletteLines}

/* 文字 */
  --uni-text-color: #333;
  --uni-text-color-grey: #666;
  --uni-text-color-placeholder: #999;
  --uni-text-color-disable: #c0c0c0;
  --uni-text-color-inverse: #fff;

/* 背景 */
  --uni-bg-color-grey: #f8f8f8;
  --uni-bg-color-hover: #f1f1f1;

/* 边框 */
  --uni-border-color: #e5e5e5;

/* 尺寸 */
  --uni-font-size-sm: 24rpx;
  --uni-font-size-base: 28rpx;
  --uni-font-size-lg: 32rpx;

/* 圆角与间距 */
  --uni-radius-sm: 8rpx;
  --uni-radius-base: 12rpx;
  --uni-spacing-row-sm: 10rpx;
  --uni-spacing-row-base: 20rpx;
  --uni-spacing-col-base: 20rpx;
}
