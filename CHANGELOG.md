# CHANGELOG

## 0.1.3

1. 更新 thx/brix-loader

	* 修复：[thx/brix-loader#4](https://github.com/thx/brix-loader/issues/4) 销毁父组件时传入 `remove` 为 `false`，依然会移除掉子组件节点。

## 0.1.2

1. DatePicker & DatePickerWrapper
	* 修复未自动移除的事件；
	* 修复异步 render 的状态。
2. Popover
	* 修复未自动移除的 hover 事件。

## 0.1.1

1. Vue.js
	* 1.0.8 => 1.0.11
2. Brix Event
	* 尝试恢复事件的原始命名空间
3. Dropdown
	* 如果选项 popover 为 true，则自动增加样式 dropdown-ellipsis。
4. DialogView
	* 自动销毁缓存的 Dialog 实例，即不再复用 Dialog 实例。
5. css-tool/minecraft.less Pagination
	* 修复简易模式下『当前页数/总页数』的样式。

## 0.1.0

1. 增加组件
	* cookie
	* textcount
	* vue
	* minicraft-animation
2. 增加入口文件
	* animation.js
	* require-config-css-animation.js
	* require-config-css-animation-debug.js

## 0.0.25

## 0.0.24
