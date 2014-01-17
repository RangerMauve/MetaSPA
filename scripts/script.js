$("menu label").click(function(){
	$(this).parent().toggleClass("active");
});

$("nav > label").click(function(){
	$("nav > label, main > section").removeClass("active");
	$(this).addClass("active");
	$("#"+this.dataset.tabId).addClass("active");
	$(".tabInfo").text("Tab: " + this.dataset.tabId);
})
