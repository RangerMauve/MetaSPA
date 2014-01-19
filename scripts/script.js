$("menu label").click(function () {
	$(this).parent().toggleClass("active");
});

var Packages = (function () {
	var plugins = {}, libraries = {};

	function initPlugins() {
		Object.keys(plugins).forEach(initPlugin(name));
	}

	function initPlugin(name) {
		var plugin = plugins[name];
		plugin.init(plugin);
	}

	function register(data) {
		if (data.type.toLowerCase() === "plugin") {
			plugins[data.name] = data;
			data.init = (new Function("plugin", data.init));
			initPlugin(data.name);
		} else libraries[data.name] = data;
	}

	return {
		plugins: plugins,
		libraries: libraries,
		initPlugin: initPlugin,
		initPlugins: initPlugins,
		register: register
	};
})();

var Tabs = (function () {
	var current = [],
		types = {};

	function register(data) {
		types[data.name] = data;
		ich.addTemplate(data.name, data.content);
	}

	function makeLabel(source) {
		var dom = $(source);
		$("body > nav").append(dom);
		dom.click(function () {
			$("nav > label, main > section").removeClass("active");
			$("#" + this.dataset.tabId).addClass("active");
			$(this).addClass("active");
			$(".tabInfo").text("Tab: " + this.dataset.tabId);
		});
		dom.trigger("click");
	}

	function makeTab(source, label) {
		var dom = $(source);
		$("main").append(dom);
		dom.addClass("active");
		return dom;
	}

	function open(name, data) {
		var type = types[name];

		var id = document.querySelectorAll("main section").length + 1;
		var content = ich[name](data);
		var label = "<label data-tab-id=\"t" + id + "\">Tab" + id + " | " + name + "</label>";

		var tab = makeTab("<section id=\"t" + id + "\">\n" + content + "\n</section>", makeLabel(label););
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

Tabs.register({
	name: "Text",
	content: "{{source}}",
	init: function () {}
})

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
		tab.find("CodeMirror").addClass("CodeMirror-focused");
	}
});

Tabs.open("JS", {
	source: '$("nav > label").click(function () {\n$("nav > label, main > section").removeClass("active");\n$("#" + this.dataset.tabId).addClass("active");\n$(this).addClass("active");\n$(".tabInfo").text("Tab: " + this.dataset.tabId);\n});'
});

Tabs.open("Text", {source: "Test"});
Tabs.open("Text", {source: "Test"});
Tabs.open("Text", {source: "Test"});
