function showLogin(){
	let showLogin = Meteor.setInterval(function(){

		$('#login-dropdown-list').length !== 0 ? Meteor.clearInterval(showLogin) : $('#login-sign-in-link').click();
			
	}, 500);
}

Template.backUp.onRendered(function() {

	showLogin();
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
	},
	'click #login-buttons-logout':function(e) {
		showLogin();
	}
})