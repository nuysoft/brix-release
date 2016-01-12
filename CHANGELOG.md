# CHANGELOG

## 0.1.5

1. 更新 thx/brix-loader
	* 修复 [#6 对选项集 options 执行浅拷贝 Util.extend() 会导致 options 中的对象属性冲突](https://github.com/thx/brix-loader/issues/6)
	* 修复 [#7 早已不支持 options.events，但相关的代码未移除](https://github.com/thx/brix-loader/issues/7)
	* 修复 [#8 新建模块实例时，传入构造函数的配置项 options 中的属性可能不全](https://github.com/thx/brix-loader/issues/8)
2. 升级 jQuery `v1.11.3` ＝> `v1.12.0`
3. 更新 thx/brix-components/css-tool/minecraft.less
	* 移除 `input` 和 `textarea` 的 `.transition(none);`
	* 调整 `.contextual-message` 有背景色时文案透明度 `1` =>`0.8`
	* 增加 `.contextual-message` 中的链接下划线
	* 调整 `.mm-tabs` 鼠标移入标签时文案颜色 `@brand` ＝> `#333`

## 0.1.4

1. 更新 thx/brix-components
	* 修复：下拉框 Dropdown
		* 修复：如果调用 `.data()` 时传入的数组中只有一个元素，那么会导致下拉浮层中的条目不可点选。
		* 修复：调用 `.data()` 时会同步原始元素 `<select>` 的内容，而原始元素会自动初始化一个默认值，进而导致组件在获取当前值时，拿到的是 `<select>` 的默认值，此时应该读取下拉浮层中的选中条目。
	* 完善：菜单 Sidenav
		* 增加：当收起和展开动画结束时，抛出事件 `slideEnd`
	* 修复：上传组件 Uploader
		*  Firefox 中无法通过 `.innerText` 获取 iframe 响应的内容，修正为 `jQuery.text()`。
2. 支持 `https://`
	* `g.tbcdn.cn` ＝> `g.alicdn.com`

3. 更新 thx/brix-loader
	* 修复 [#5 『移除当前组件关联的元素』可能不符合预期](https://github.com/thx/brix-loader/issues/5)

```diff
instance.destroy = function() {
---	destroy(instance)
+++	destroy(false, instance)
}
```

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
