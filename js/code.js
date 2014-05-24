var things = [];

function rand(n) {
	return Math.round(Math.random(n));
};

function get_bit() {
	var str='';
	for(var i; i<8; i++) {
		str+=rand(1);
	};
	return str;
};

Thing = function() {
	this.advantages = get_bit();
	this.disadvantages = get_bit();
};

function ini() {
	for(var i; i<1000; i++) {
		things.push(
			new Thing()
		);
	};
	
	
};