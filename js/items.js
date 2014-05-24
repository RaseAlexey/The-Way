var inventory;

Item = function() {
	
	this.getName = function() {return this.name};
	this.getType = function() {return this.type};
	this.getSlot = function() {return this.slot};
	this.getDamage = function() {return this.damage};
};

Weapon = function(name, type, damage) {
	this.name = name;
	this.damage = damage;
	this.slot = "hand";
	this.type = type;
};

var item = new Item();
Weapon.prototype = item;
var test = new Weapon("sword", "blade", 3);

Inventory = function(){

	this.items = [];
	
	this.getItems = function() {return this.items};
	
	this.getCode = function() {
		var str = '';
		str+='<div id="bag">';
		str+='<span class="header">В рюкзаке:</span><br>';
		this.items.forEach(
			function(item) {
				str+="<span class='item'>";
				str+=item.getName();
				str+="</span> ";
			}
		);		
		str+='</div>';
		str+='<div id="equip">';
		str+='<span class="header">Надето:</span><br>';
		str+='</div>';
		return str;
	};
	
	this.addItem = function(item) {
		this.items.push(item);
	};
	
	this.removeItem = function(index) {
		this.items.splice(index, 1);
	};
	
	this.has = function(item_name) {
		//return (this.items.indexOf(item)<0 ? false : true)
		var has = false;
		this.items.forEach(
			function(item, i) {
				if(item.getName()==item_name) {has = true}
			}
		)
		return has;
	};
};

inv = new Inventory