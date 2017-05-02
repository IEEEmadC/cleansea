Template.templateHeader.helpers({
	gridDynamic:function(){
		if (Router.current().route.getName() ==="praiaPage") {
			console.log("True")
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
})

Template.templateHeader.onRendered(function(){
	console.log(Router.current().route.getName());
})

Template.templateHeader.events({
	'click .btn-voltar': function(){
		history.back();
	},
});