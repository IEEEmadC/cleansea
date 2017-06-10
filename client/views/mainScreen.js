dirtyInit = new ReactiveVar(),
cleanInit = new ReactiveVar();

Template.mainScreen.onRendered(function () {
	
	if ( typeof Chartist === 'undefined' ) return;

    if (!$('#ct-chartA').length)
        return;

    if (!$('#ct-chartB').length)
        return;

    if (!$('#ct-chartD').length)
        return;

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
				if ($('.ct-chart-donut') && $('.ct-chart-donut').length <= 0 ) {
					let chart = new Chartist.Pie('.ct-chart', {
					  series: [count, count2],
					  labels: [1, 2]
					}, {
					  donut: true,
					  showLabel: false
					});

					chart.on('draw', function(data) {
					  if(data.type === 'slice') {
					    let pathLength = data.element._node.getTotalLength();

					    data.element.attr({
					      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
					    });

					    let animationDefinition = {
					      'stroke-dashoffset': {
					        id: 'anim' + data.index,
					        dur: 1000,
					        from: -pathLength + 'px',
					        to:  '0px',
					        easing: Chartist.Svg.Easing.easeOutQuint,
					        fill: 'freeze'
					      }
					    };

					    if(data.index !== 0) {
					      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
					    }

					    data.element.attr({
					      'stroke-dashoffset': -pathLength + 'px'
					    });

					    data.element.animate(animationDefinition, false);
					  }
					});

					chart.on('created', function() {
					  if(window.__anim21278907124) {
					    clearTimeout(window.__anim21278907124);
					    window.__anim21278907124 = null;
					  }
					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
					});
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