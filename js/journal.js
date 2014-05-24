Note = function(theme, text) {
	this.text = text;
	this.theme = theme;
	
	this.getText = function(){return this.text};
	this.getTheme = function(){return this.theme};
}

Journal = function() {
	this.history = [];
	
	this.write = function(theme, text) {
		this.history.push(new Note(theme, text)); 
	};
	
	this.getCode = function() {
		var str = '';
		this.history.forEach(
			function(note){
				str+='<div class="note">'+'<span class="note_theme">'+note.getTheme()+'</span><br>'+'<span class="note_text">'+note.getText()+'</span>'+'</div>';
			}
		);
		return str;
	}
};

var journal = new Journal();