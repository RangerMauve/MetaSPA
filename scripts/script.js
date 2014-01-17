$("menu label").click(function(){
	var par = $(this).parent();
	console.log(par);
	par.toggleClass("active");
});
