/* global require, document, location */
(function() {
	// 基于 Bootstrap
	require(['css!dependencies/bootstrap/dist/css/bootstrap'])
	
	// 所有组件样式
	require(['css!css-tool/all.css'])

	// MineCraft 规范样式
	// require(['css!css-tool/mm.css'])
	require(['css!css-tool/minecraft.css'])

	// 动画 Animation
	require(['css!http://g.tbcdn.cn/thx/minecraft-animation/0.0.1/css/animate.css'])
})();