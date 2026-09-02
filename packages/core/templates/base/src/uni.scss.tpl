/* ============================================================
 * 全局混入的 uni.scss
 * 该文件被 uni-app 全局注入，任何页面/组件的 scss 中均可直接使用下列变量与 mixin。
 * 顶部色板由 create-uni-app 依据所选主题注入；未选主题时为默认色板。
 * ============================================================ */

${paletteLines}

/* 文字 */
$uni-text-color: #333;
$uni-text-color-grey: #666;
$uni-text-color-placeholder: #999;
$uni-text-color-disable: #c0c0c0;
$uni-text-color-inverse: #fff;

/* 背景 */
$uni-bg-color-grey: #f8f8f8;
$uni-bg-color-hover: #f1f1f1;

/* 边框 */
$uni-border-color: #e5e5e5;

/* 尺寸 */
$uni-font-size-sm: 24rpx;
$uni-font-size-base: 28rpx;
$uni-font-size-lg: 32rpx;

/* 圆角与间距 */
$uni-radius-sm: 8rpx;
$uni-radius-base: 12rpx;
$uni-spacing-row-sm: 10rpx;
$uni-spacing-row-base: 20rpx;
$uni-spacing-col-base: 20rpx;

/* 常用 mixin：单行省略 */
@mixin uni-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 常用 mixin：多行省略 */
@mixin uni-ellipsis-lines($lines: 2) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
  overflow: hidden;
}