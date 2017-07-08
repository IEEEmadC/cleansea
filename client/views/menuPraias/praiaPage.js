

Template.praiaPage.onRendered(function(){
	window.scroll(0,0);
});

Template.praiaPage.helpers({
	setEnglish:function(text){
		if (Session.get('englishSet')) {
            if (text === 'Imprópria') {
                return 'Unsuitable';
            }
            else{
                return 'Suitable';
            }
        }
        else{
        	return text;
        }
	},
})