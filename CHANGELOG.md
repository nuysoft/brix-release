# CHANGELOG

## 0.1.4

1. 更新 thx/brix-components
	* 修复：下拉框 Dropdown
		* 修复：如果调用 `.data()` 时传入的数组中只有一个元素，那么会导致下拉浮层中的条目不可点选。
		* 修复：调用 `.data()` 时会同步原始元素 `<select>` 的内容，而原始元素会自动初始化一个默认值，进而导致组件在获取当前值时，拿到的是 `<select>` 的默认值，此时应该读取下拉浮层中的选中条目。
	* 完善：菜单 Sidenav
		* 增加：当收起和展开动画结束时，抛出事件 `slideEnd`

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