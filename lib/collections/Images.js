// import { FilesCollection } from 'meteor/ostrio:files';

// this.Images = new Meteor.Files({
//   debug: true,
//   collectionName: 'Images',
//   allowClientCode: false, // Disallow remove files from Client
//   onBeforeUpload: function (file) {
//     // Allow upload files under 10MB, and only in png/jpg/jpeg formats
//     console.log("Uploaded")
//   }
// });

// // if (Meteor.isServer) {
// //   Images.denyClient();
// //   Meteor.publish('files.images.all', function () {
// //     return Images.find().cursor;
// //   });

// // } else {

// //   Meteor.subscribe('files.images.all');
// // }