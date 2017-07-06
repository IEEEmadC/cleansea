Session.set('notifyUser', true);

Template.registerHelper('englishSetter', function () {
	if (Session.get('englishSet')) {
		return true;
	}
	else{
		return false;
	}
});