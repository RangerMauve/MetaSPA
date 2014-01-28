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
