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
Router.route('/admin', {
	name: 'adminRoute',
	layoutTemplate: false,
	action: function () {
		this.render('backUp');
	},
});
Router.route('/mapa', {
	action: function () {
		let arrayReactive = new ReactiveVar([]);
		return this.render('mapaTemplate', {
			data: {
				praias: Praias.find({},{ sort:{codigo:1} }).fetch(),
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

// requireCordova = function () {
// 	console.log("Meteor.isCordova", Meteor.isCordova);
// 	if (!Meteor.isCordova) {
// 		Router.go('adminRoute');
// 	}
// 	this.next();
// }

// Router.onBeforeAction(requireCordova, {
// 	except: 'adminRoute'
// });