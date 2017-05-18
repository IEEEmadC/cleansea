Template.listaPraias.helpers({
	populatePraias: function(){
		let zonaSet = Session.get("zona");
		return Praias.find({zona:zonaSet}).fetch();
	},
	getPraiaImg: function(){
		console.log("which praia?", Session.get("zona"))	
		if (Session.get("zona") === "1") {
			return 'suburbio';
		}	
		if (Session.get("zona") === "2") {
			return 'pelourinho4';
		}	
		if (Session.get("zona") === "3") {
			return 'farolBarra2';
		}	
		if (Session.get("zona") === "4") {
			return 'farolitapua';
		}
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
		console.log("height 0");
		window.scroll(0,0);
		$('.show-praias-all').css('height', '100%');
		$('.pseudo-back-btn').css('display', 'block');
		$('.show-praias-all').css('display', 'block');
		$('.section-lista-praias').toggle();
	},
	'click .pseudo-back-btn':function(e){
		e.preventDefault();
		console.log("height 100%")
		window.scroll(0,0);
		$('.show-praias-all').css('height', '0');
		$('.show-praias-all').css('display', 'none');
		$('.pseudo-back-btn').css('display', 'none');
		$('.section-lista-praias').toggle();
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