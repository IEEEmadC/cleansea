Praias = new Mongo.Collection("praias");

var schemas = new SimpleSchema({
	codigo: {
		type: String,
		label: "Codigo",
		unique:true
	},
	praia: {
		type: String,
		label: "Nome da Praia",
	},
	qualidade: {
		type: String,
		label: "Qualidade",
	},
	local: {
		type: String,
		label: "Local",
	},
	latitude: {
	  type: String,
	  label: 'Latitude',
	  defaultValue: '-12.8809348',
	  optional:true,
	},
	longitude: {
	  type: String,
	  label: 'Longitude',
	  defaultValue: '-38.4175336',
	  optional:true,
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

Praias.attachSchema(schemas);

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