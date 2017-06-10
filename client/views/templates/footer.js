Template.templateFooter.events({
	'click .btn-left-footer':function(){
		$('button.active').removeClass('active');
		$('.btn-left-footer').addClass('active');
		console.log("Re render", dirtyInit.get())
		Router.go('/');
		cleanInit.set(0);
		dirtyInit.set(0);
	},
	'click .btn-center-footer': function () {
		$('button.active').removeClass('active');
		$('.btn-center-footer').addClass('active');
		Router.go('/listaPraias');
	},
	'click .btn-right-footer':function(){
		$('button.active').removeClass('active');
		$('.btn-right-footer').addClass('active');
		Router.go('/mapa');
	}
});