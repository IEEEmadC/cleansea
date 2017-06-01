Template.mainScreen.onRendered(function () {
	// HTTP.call( 'GET', 'https://praiaget.herokuapp.com/rest/praiasget', function( error, response ) {
 //  		if (error) {
 //  			console.log("ERror:", error);
 //  		}
 //  		else{ 
 //  			console.log("Result:", JSON.parse(response.content));
 //  		}
	// });
});
Template.mainScreen.helpers({
	getEmitido:function(){
		let data = Emitido.findOne();
		return data.emitido;
	},
	totalPraias:function() {
		let praias = Praias.find().fetch();
		console.log("Result", praias.length)
		return praias.length;
	},
	totalPraiasLimpas:function() {
		let count = 0,
			count2 = 0,
			praias = Praias.find().fetch();

			praias.forEach(function(item, index){
				if (item.qualidade === "Própria") {
					count++;
				}
				else{
					count2++;
				}
			});
			Session.set("praiasSujas", count2);
			return count;
	},
	totalPraiasSujas:function() {
		return Session.get("praiasSujas");
	},
});

Template.mainScreen.events({
	'click .callTeste': function(){
		console.log("Call teste!");
		Meteor.call('callGet', function(error, result){
			if (error) { console.log("error", error); }
			else if (result) {
				console.log("result", result);
				Meteor.call('bdPopulate', result, function(error, result){
					console.log("sucesso!", result)
				});
			}
		});
	},
});