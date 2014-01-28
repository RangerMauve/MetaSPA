$("body > menu label").click(function () {
	$(this).parent().toggleClass("active");
});

// This is a basic tab that just renders the text it's passed
Tabs.register({
	name: "Text",
	content: "{{source}}",
	init: function () {}
});

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
