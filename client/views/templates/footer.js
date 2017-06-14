Template.templateFooter.events({
	'click .btn-left-footer':function(){
		$('button.active').removeClass('active');
		$('.btn-left-footer').addClass('active');
		Router.go('/listaPraias');
	},
	'click .btn-center-footer': function () {
		$('button.active').removeClass('active');
		$('.btn-center-footer').addClass('active');
		Router.go('/');
	},
	'click .btn-right-footer':function(){
		$('button.active').removeClass('active');
		$('.btn-right-footer').addClass('active');
		Router.go('/mapa');
	}
});