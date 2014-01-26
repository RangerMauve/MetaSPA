$("menu label").click(function () {
	$(this).parent().toggleClass("active");
});

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

// The Tabs module used for creating new tabs and allowing them to be customized
var Tabs = (function () {
	// A list of the current tabs is kept for easy access, and the types of tabs should be registered by plugins
	var current = [],
		types = {};

	// Registering a tab adds it to the types map, and its template content gets compiled by ICH
	function register(data) {
		types[data.name] = data;
		ich.addTemplate(data.name, data.content);
	}

	// When labels are clicked they make their referenced tab active
	function makeLabel(id, contents) {
		var dom = $("<label data-tab-id=\"t" + id + "\">" + contents + "</label>");
		$("body > nav").append(dom);
		dom.click(function () {
			$("nav > label, main > section").removeClass("active");
			$("#" + this.dataset.tabId).addClass("active");
			$(this).addClass("active");
			$(".tabInfo").text("Tab: " + this.dataset.tabId);
		});
		dom.trigger("click");
	}

	// When tabs are created the tab content is rendered with ICH and added to <main>
	function makeTab(id, source, label) {
		var dom = $("<section id=\"t" + id + "\">\n" + source + "\n</section>");
		$("main").append(dom);
		dom.addClass("active");
		return dom;
	}

	// Tabs can be opened by specifying a name and adding initialization data
	// The init data is used to render the content and is passed to the
	// Tab's init() function along with the tab's DOM nodes
	function open(name, data) {
		var type = types[name];

		var id = document.querySelectorAll("main section").length + 1;
		var content = ich[name](data||{});
		var label = "Tab" + id + " | " + name;

		var tab = makeTab(id, content, makeLabel(id, label));
		type.init(tab, data, label);
		return tab;
	}

	return {
		current: current,
		types: types,
		register: register,
		open: open
	}
})();

// This is a basic tab that just renders the text it's passed
Tabs.register({
	name: "Text",
	content: "{{source}}",
	init: function () {}
})

// This is a Codemirror tab for editing javascript. You can specify the default script data
Tabs.register({
	name: "JS",
	content: "<textarea autofocus>{{source}}</textarea>",
	init: function (tab, data) {
		var ta = tab[0].querySelector("textarea");
		CodeMirror.fromTextArea(ta, {
			mode: "text/javascript",
			theme: "monokai",
			autofocus: true
		});
	}
});

Tabs.open("JS", {
	source: '$("nav > label").click(function () {\n$("nav > label, main > section").removeClass("active");\n$("#" + this.dataset.tabId).addClass("active");\n$(this).addClass("active");\n$(".tabInfo").text("Tab: " + this.dataset.tabId);\n});'
});

Tabs.open("Text", {
	source: "Test"
});
Tabs.open("Text", {
	source: "Test"
});
Tabs.open("Text", {
	source: "Test"
});
