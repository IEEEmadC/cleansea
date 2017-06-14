Template.listaPraias.onRendered(function () {

	let instance = this;

	window.scroll(0,0);

	if (Session.equals("notifyUser", true)) {
		$('.praias-header-wrapper').css('height', '72px');

		instance.timeOutVar = Meteor.setTimeout(function(){
			console.log("set time out");
			$('.praias-header-wrapper').css('height', '0');
			Session.set('notifyUser', false);
		}, 6000);
	}

	let lastRoute = Session.get("lastRoute");
	console.log("lastRoute", lastRoute);
	if (lastRoute === 'praiaPage') {
		let zona = Session.get("zona");
		console.log("zona", zona);
		if (zona === '1') {
			$('.town.zona1-show').click();
		}
		else if(zona === '2') {
			$('.town.zona2-show').click();
		}
		else if (zona === '3') {
			$('.town.zona3-show').click();
		}
		else if (zona === '4') {
			$('.town.zona4-show').click();
		}
		Session.set("lastRoute", '');
	}

});	

Template.listaPraias.onDestroyed(function(){
	let instance = this;

	Meteor.clearTimeout(instance.timeOutVar);
});

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

Template.listaPraias.events({
	'keyup .search': function(e, t) {
		e.preventDefault();
		Router.current().search(t);
	},
	'click .town':function(e, t){
		e.preventDefault();
		window.scroll(0,0);
		
		// t.$('.show-praias-all').css('height', 'auto');
		t.$('.pseudo-back-btn').css('display', 'block');
		t.$('.show-praias-all').css('display', 'block');
		t.$('.section-lista-praias').toggle();
		t.$('.show-praias-all').css('height', '100%');
	},
	'click .pseudo-back-btn':function(e){
		e.preventDefault();
		console.log("height 100%")
		window.scroll(0,0);
		// $('.show-praias-all').css('height', '0');
		$('.show-praias-all').css('display', 'none');
		$('.pseudo-back-btn').css('display', 'none');
		$('.section-lista-praias').toggle();
		$('.show-praias-all').css('height', '0');
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