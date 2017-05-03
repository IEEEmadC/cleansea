Template.listaPraias.helpers({
	populatePraias: function(){
		let zonaSet = Session.get("zona");
		return Praias.find({zona:zonaSet}).fetch();
	}
});

Template.sectionPraia.helpers({
	setColor: function(praia){
		console.log("this", praia);
		if (praia.qualidade === 'Própria') {
			return 'border-left: solid 10px #006994;';
		}
		else{
			return 'border-left: solid 10px #94000F;';
		}
	},
	// setColor: function(praia){
	// 	console.log("this", praia);
	// 	if (praia.qualidade === 'Própria') {
	// 		return 'background:#4AB096;';
	// 	}
	// 	else{
	// 		return 'background:#94000F;';
	// 	}
	// },
	returnIcon:function(qld){
		if (qld === 'Própria') {
			return 'check';
		}
		else{
			return 'times';
		}

	},
	idCaller:function () {
		return {_id: this._id};	
	},
});
Template.listaPraias.onRendered(function () {
	window.scroll(0,0);
});	

Template.listaPraias.events({
	'keyup .search': function(e, t) {
		e.preventDefault();
		Router.current().search(t);
	},
	'click .town':function(e){
		e.preventDefault();

		if ($('.show-praias-all').css('height') !== '0px') {
			console.log("height 100%")
			$('.show-praias-all').css('height', '0');
		}
		else{
			console.log("height 0")
			$('.show-praias-all').css('height', '100%');
		}
		$('.button-cities-holder').toggle();
	},
	'click .zona1-show':function(){
		Session.set("zona", "1");
	},
	'click .zona2-show':function(){
		Session.set("zona", "2");
	},
	'click .zona3-show':function(){
		Session.set("zona", "3");
	},
	'click .zona4-show':function(){
		Session.set("zona", "4");
	},
});