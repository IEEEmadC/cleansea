Template.praiaPage.helpers({
	setColor: function(praia){
		console.log("this", praia);
		if (praia.qualidade === 'Própria') {
			return 'color:#1d463c; font-weight:bold;';
		}
		else{
			return 'color:#94000F; font-weight:bold;';
		}
	},
});