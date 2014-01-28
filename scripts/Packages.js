// This is a module used for managing packages
var Packages = (function () {
	// Packages are split into libraries and plugins
	var plugins = {}, libraries = {};

	// Must be called at load time to initialize all the plugins
	function initPlugins() {
		Object.keys(plugins).forEach(initPlugin(name));
	}

	// Iniialize individual plugins for easy use
	function initPlugin(name) {
		var plugin = plugins[name];
		plugin.init(plugin);
	}

	// This is used for adding new plugins or adding libraries,
	// The package should be JSON data with a unique "name" attribute
	// Plugins can have a function called init that will be parsed out from
	// the JSON string and turned into a full function, it will be passed
	// The plugin's data when it's called This is called once per plugin
	function register(data) {
		if (data.type.toLowerCase() === "plugin") {
			plugins[data.name] = data;
			data.init = (new Function("plugin", data.init));
			initPlugin(data.name);
		} else libraries[data.name] = data;
	}

	// The public methods and properties of the module are returned here
	return {
		plugins: plugins,
		libraries: libraries,
		initPlugin: initPlugin,
		initPlugins: initPlugins,
		register: register
	};
})();
