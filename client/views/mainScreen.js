import Chart from 'chart.js';

Template.mainScreen.onRendered(function () {

	let count  	= Session.get("praiasLimpas"),
		count2 	= Session.get("praiasSujas"),
		ctx 	= document.getElementById("myChart").getContext('2d'),
		myChart = new Chart(ctx, {
		    type: 'pie',
		    data: {
			    datasets: [{
			        data: [count, count2],
			        backgroundColor: ['#006994', '#b20000'],
			    }],
			},
			options: {
		        legend: {
		            display: false
		        },
		        title: {
		            display: false
		        },
		        tooltips:{
		        	enabled: false
		        }
	    	}
		});
});

Template.mainScreen.helpers({
	getEmitido:function(){
		let data = Emitido.findOne();
		if (Session.get('englishSet')) {
			return data.emitido.replace('Emitido em', 'Issued in');
		}
		else{
			return data.emitido;
		}
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

			Session.set("praiasLimpas", count);
			Session.set("praiasSujas", count2);

			return count;

	},
	totalPraiasSujas:function() {
		return Session.get("praiasSujas");
	},
});

Template.mainScreen.events({
	'click .brasil-anil':function(){
		Session.set('englishSet', false);
	},
	'click .english-teapot':function(){
		Session.set('englishSet', true);
	},
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