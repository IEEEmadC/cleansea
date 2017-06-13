dirtyInit = new ReactiveVar(),
cleanInit = new ReactiveVar();

Template.mainScreen.onRendered(function () {
	chart = {
		target: 'chart1',
		type: 'PieChart',
		columns: [
			['string', 'Topping'],
			['number', 'Slices']
		],
		rows: [
			['Próprias', count],
			['Impróprias', count2],
		],
		options: {
		// is3D: true,
		pieSliceText: 'none',
		legend: 'none',
		slices: {
				0: { color: '#006994' },
				1: { color: '#94000F' }
			}
		}
	};

	drawChart(chart);

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

			// cleanInit.set(count);
			// dirtyInit.set(count2);
			let intervalChart = Meteor.setInterval(function(){
				if ($('svg') && $('svg').length <= 0 ) {
					chart = {
				      target: 'chart1',
				      type: 'PieChart',
				      columns: [
				        ['string', 'Topping'],
				        ['number', 'Slices']
				      ],
				      rows: [
				        ['Próprias', count],
				        ['Impróprias', count2],
				      ],
				      options: {
				      	// is3D: true,
				      	pieSliceText: 'none',
				      	legend: 'none',
				      	slices: {
				            0: { color: '#006994' },
				            1: { color: '#94000F' }
				          }
				      }
				    };

					drawChart(chart);
				}
		else{
			Meteor.clearInterval(intervalChart);
		}
	}, 1);
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