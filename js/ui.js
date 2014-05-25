spinboxes_by_id = [];
spinbox_groups_by_id = [];
spinbox_group_by_spinbox_id = {};

SpinBoxGroup = function(name, spinboxes, max, min) {

	spinbox_groups_by_id.push(this);
	
	this.name = name || "Группа спинбоксов";
	this.spinboxes = spinboxes;	
	this.max = max || this.spinboxes.length*10;
	this.min = min || 0;

	SpinBoxGroup.counter = (SpinBoxGroup.counter || 0)  //счетчик обьектов конструктора, по сути ID
	this.id = SpinBoxGroup.counter;
	
	this.spinboxes.forEach(                    //привязывание к спинбоксам группы
		function(spinbox){			
			spinbox_group_by_spinbox_id[spinbox.id] = spinbox_groups_by_id[SpinBoxGroup.counter];
		}
	); 
	
	SpinBoxGroup.counter++; 
	
	this.getSum = function() {
		var sum = 0;
			this.spinboxes.forEach(
				function(spinbox) {
				sum += spinbox.getValue();
				}
			)
		return sum;
	};
	
	this.canPlus = function() {
		console.log(this.getSum(), this.max)
		if(this.getSum() > this.max) {console.log("group: fatal shit, cur this.getSum() > max"); return false};
		if(this.getSum() == this.max) {console.log("group: this.getSum() = max; cant be plus'd"); return false};
		if(this.getSum() < this.max) {console.log("group: alright; this.getSum()<max; can be plus'd"); return true};
	};
	
	this.canMinus = function() {
		if(this.getSum() < this.min) {console.log("group: fatal shit, cur this.getSum() < min"); return false};
		if(this.getSum() == this.min) {console.log("group: this.getSum() = min; cant be minus'd"); return false};
		if(this.getSum() > this.min) {console.log("group: alright; this.getSum()>min; can be minus'd"); return true};
	};
	
	this.getHeader = function() {
		var header = ''+
		this.name+', Осталось '+(this.max-this.getSum())+' очков, (min='+this.min+';max='+this.max+')';
		return header;
	};
	this.loadHeader = function() {
		$("#spinbox_group_"+this.id+" .spinbox_group_header").html(this.getHeader());
	}
	
	this.getCode = function() {
		var spinboxes_code ='';
		this.spinboxes.forEach(
			function(spinbox){
				spinboxes_code += spinbox.getCode()
			}
		)
		console.log(spinboxes_code)
		var code = ''+
			'<div class="spinbox_group" id="spinbox_group_'+this.id+'">'+
				'<div class="spinbox_group_header">'+this.getHeader()+'</div><br>'+
				spinboxes_code+
			'</div>'
		return code;
	};	
};



SpinBox = function(name, start, min, max, step, group) {

	spinboxes_by_id.push(this);

	this.name =	name || "Спинбокс";
	
	this.start = start || 0;
	this.min = min || 0;
	this.max = max || 10;
	this.step = step || 1;
	this.value = this.start;
	
	this.getValue = function() {
		return this.value;
	};
	SpinBox.counter = (SpinBox.counter || 0)
	this.id = SpinBox.counter;
	SpinBox.counter++;   //счетчик обьектов конструктора, по сути ID
	
	this.getGroup = function() {
		return spinbox_group_by_spinbox_id[this.id];
	};
	
	this.getHeader = function() {
		return (this.name+' (min='+this.min+';max='+this.max+')')
	};
	this.loadHeader = function() {
		$("#spinbox_"+this.id+" .spinbox_header").html(this.getHeader());
	};
	this.canPlus = function() {
		if(this.value > this.max) {console.log('fatal shit; value > max'); return false};
		if(this.value == this.max) {console.log('cant plus; value = max'); return false};
		if(this.value < this.max) {console.log('can plus; value < max'); return true};
	};	
	this.canMinus = function() {
		if(this.value < this.min) {console.log('fatal shit; value < min'); return false};
		if(this.value == this.min) {console.log('cant minus; value = min'); return false};
		if(this.value > this.min) {console.log('can minus; value > min'); return true};
	};
	
	this.plus = function() {
		if(this.canPlus()) {
			if(this.getGroup()) {
				if(this.getGroup().canPlus()) {
					this.value += this.step;
					this.getGroup().loadHeader();
				}
			} else {
				this.value += this.step;
			}
		}
		this.loadHeader();
		$("#spinbox_"+this.id+" .spinbox_value").html(this.value);
	};
	
	this.minus = function() {
	
		if(this.canMinus()) {
			if(this.getGroup()) {
				if(this.getGroup().canMinus()) {
					this.value -= this.step;
					this.getGroup().loadHeader();
				}
			} else {
				this.value -= this.step;
			}
		}
		this.loadHeader();
		$("#spinbox_"+this.id+" .spinbox_value").html(this.value);		
	};
	
	
	this.getCode = function() {
		var code = '<div class="spinbox" id="spinbox_'+this.id+'">' +
			'<div class="spinbox_value">' +
			this.value+
			'</div>' +
			'<div class="spinbox_arrows">'+
				'<div class="spinbox_arrow" id="up" onclick="spinboxes_by_id['+this.id+'].plus()"></div>'+
				'<br>'+
				'<div class="spinbox_arrow" id="down" onclick="spinboxes_by_id['+this.id+'].minus()"></div>'+
			'</div>' +
		'</div>'+
		'<span class="spinbox_header">'+this.getHeader()+'</span><br>'
		return code;
	}
	
};
var test_spinbox_group1 = new SpinBoxGroup(
	"Характеристики орка",
	[
		new SpinBox("Сила", 		7, 5, 12, 1),
		new SpinBox("Ловкость", 	5, 3, 10, 1),
		new SpinBox("Интеллект", 	3, 1, 8, 1)
	], 20, 8
);
var test_spinbox_group2 = new SpinBoxGroup(
	"Характеристики эльфа",
	[
		new SpinBox("Сила",			3, 1, 8, 1),
		new SpinBox("Ловкость", 	5, 3, 10, 1),
		new SpinBox("Интеллект", 	7, 5, 12, 1)
	], 20, 8
);