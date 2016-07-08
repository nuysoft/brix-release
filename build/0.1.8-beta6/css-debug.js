/* global require, document, location */
(function() {
	// 基于 Bootstrap
	require(['css!dependencies/bootstrap/dist/css/bootstrap.min.css'])
	
	// 所有组件样式
	require(['css!dependencies/brix-components/dist/css-tool/components.css'])
	require(['css!dependencies/parsleyjs/src/parsley.css'])

	// MineCraft 规范样式
	require(['css!dependencies/brix-components/dist/css-tool/minecraft.css'])
})();