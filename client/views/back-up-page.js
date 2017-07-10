Template.backUp.onRendered(function() {
	
});

Template.backUp.events({
	'change #myFile':function(e) {

		let dataObj = e.currentTarget.files[0],
			reader = new FileReader();
	    
		reader.onload = function(){
			let dataURL = reader.result;
			console.log("dataURL", dataURL);
			Meteor.call('pdfUpload', dataURL);
		};

	    reader.readAsDataURL(dataObj);
	}
})