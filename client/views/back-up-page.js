Template.backUp.onRendered(function() {
	
});

Template.backUp.events({
	'change #myFile':function(e) {

		let dataObj = e.currentTarget.files[0],
			reader = new FileReader();
	    
		reader.onload = function(){
			let dataURL = reader.result;

			dataURL = dataURL.split(',')[1];

			console.log("dataURL", dataURL);

			Meteor.call('pdfUpload', dataURL);
		};

	    reader.readAsDataURL(dataObj);
	}
})