Emitido = new Mongo.Collection("emitido");

var schemas = new SimpleSchema({
	emitido: {
		type: String,
		label: "Emitido em",
	},
	updatedAt: {
		type: Date,
		label: "Updated Date",
		autoValue: function() {
			return new Date();
		},
		optional: true
	},
});

Emitido.attachSchema(schemas);

// Praias.allow({
// 	// insert: function (userId, doc) {
// 	// 	return (Roles.userIsInRole(userId, ["Parceiro", "Admin"]));
// 	// },
// 	// update: function (userId,doc) {
// 	// 	return doc && ((doc.createdUserId === userId) || (Roles.userIsInRole(userId, ["Admin"])));
// 	// },
// 	// remove: function (userId,doc) {
// 	// 	return doc && ((doc.createdUserId === userId) || (Roles.userIsInRole(userId, ["Admin"])));
// 	// }
// });

// Praias.helpers({
// 	// image: function() {
// 	// 	return Images.findOne(this.imageId);
// 	// },
// 	// createdUser: function() {
// 	// 	return Meteor.users.findOne(this.createdUserId);
// 	// },
// 	// updatedUser: function() {
// 	// 	return Meteor.users.findOne(this.updatedUserId);
// 	// },
// });