Template.templateHeader.helpers({
	gridDynamic:function(){
		if (Router.current().route.getName() ==="praiaPage" || Router.current().route.getName() === "mapa") {
			return 'col-xs-8';
		}
		else{
			return 'col-xs-12';
		}
	},
	renderBtnBack:function () {
		if (Router.current().route.getName() ==="praiaPage") {
			return true;
		}
		else{
			return false;
		}
	},
	renderSearch:function () {
		if (Router.current().route.getName() === "mapa") {
			return true;
		}
		else{
			return false;
		}
	},
})

Template.templateHeader.events({
	'click .btn-voltar': function(){
		Router.go('/');
	},
	'click .btn-search': function(){
		$('.list-section').css('width', '260px');
		$('.btn-mapa-interaction').removeClass('btn-search');
		$('.btn-mapa-interaction').addClass('closebtn');
	},
	'click .closebtn':function(){
        $('.list-section').css('width', '0');
		$('.btn-mapa-interaction').addClass('btn-search');
		$('.btn-mapa-interaction').removeClass('closebtn');
    },
});