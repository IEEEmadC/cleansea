Template.listaPraias.helpers({
	populatePraias: function(){
		return Praias.find().fetch();
	}
});

Template.sectionPraia.helpers({
	setColor: function(praia){
		console.log("this", praia);
		if (praia.qualidade === 'Própria') {
			console.log("border")
			return 'border-left: solid 10px #4AB096;';
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
	
});

Template.listaPraias.events({
	'keyup .search': function(e, t) {
		e.preventDefault();
		Router.current().search(t);
	},
	'click .uptown-show':function(e){
		e.preventDefault();
		
		if ($('.uptown').css('height') !== '0px') {
			console.log("height 100%")
			$('.uptown').css('height', '0');
		}
		else{
			console.log("height 0")
			$('.uptown').css('height', '100%');
		}
		$('.button-cities-holder').toggle();
	},
	'click .downtown-show':function(){
		if ($('.downtown').css('height') !== '0px') {
			console.log("height 100%")
			$('.downtown').css('height', '0');
		}
		else{
			console.log("height 0")
			$('.downtown').css('height', '100%');
		}
	},
});