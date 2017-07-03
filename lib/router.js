Router.configure({
  layoutTemplate: 'appLayout', //set default layout to basic
});

Router.route('/', {
	action: function () {
		this.render('listaPraias');
	},
});
Router.route('/listaPraias', {
	action: function () {
		this.render('mainScreen');
	},
});
Router.route('/mapa', {
	action: function () {
		let arrayReactive = new ReactiveVar([]);
		return this.render('mapaTemplate', {
			data: {
				praias: Praias.find().fetch(),
				markerArray: arrayReactive,
			}
		});
	},
});
Router.route('/praiaPage/:_id', {
	name:'praiaPage',
	data:function(){
		var currentList = this.params._id;
		return this.render('praiaPage', {
        data: {
          model: Praias.findOne({ _id: currentList })
        }
      });
	},
	onAfterAction: function() {
		Session.set("lastRoute", Router.current().route.getName());
	},
});