/* global require */
(function() {
	// 基于 Bootstrap
	require(['css!brix/deps/bootstrap/dist/css/bootstrap.min.css'])
	
	// 所有组件样式
	require(['css!brix/styles/components.css'])
	require(['css!brix/deps/parsleyjs/src/parsley.css'])

	// MineCraft 规范样式
	require(['css!brix/styles/minecraft.css'])
})();