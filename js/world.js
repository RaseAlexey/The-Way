var next_button = '<div id="next">Продолжить</div>';


parse_dest = function(dest_str) {	
	split_dest = dest_str.split(":");	
	if(split_dest.length>1) {
		var new_dest = [split_dest[0],split_dest[1]];
	} else {
		var new_dest = [null, split_dest[0]];
	}
	return new_dest
};

get_way_code = function(dest) {
	new_dest = parse_dest(dest)
	dest_loc = new_dest[0] ? new_dest[0] : map.getCurLoc().getSysName();
	return '<div class="dest" data-dest-loc="'+dest_loc+'" data-dest-place="'+new_dest[1]+'">'+map.getLoc(dest_loc).getPlace(new_dest[1]).text["go"]+'</div>'
}

Loc = function(id, sys_name, name, places) {

	this.id = id;	
	this.sys_name = sys_name;
	this.name = name;
	this.places = places;	

	this.getId = function(){
		return this.id;
	};
	this.getSysName = function(){
		return this.sys_name;
	};
	this.getName = function(){
		return this.name;
	};
	this.getPlaces = function(){
		return this.places;
	};
	
	this.getPlace = function(place_name){
		return this.getPlaces()[place_name]
	};
};

Place = function(id, sys_name, name, text, actions, ways) {

	this.id = id;	
	this.sys_name = sys_name;
	this.name = name;
	this.text = text;
	this.ways = ways;
	this.actions = actions;
	
	this.isVisisted = false;
	
	this.getId = function(){
		return this.id;
	};
	
	this.getSysName = function(){
		return this.sys_name;
	};		

	this.getName = function(){
		return this.name;
	};
	
	this.getActions = function(){
		return this.actions;
	};
	this.getAction = function(action_name){
		return this.actions[action_name];
	};
	
	this.getWays = function() {
		return this.ways;
	};

	this.getWaysCode = function() {
		var str = '<div id="way_block"><br>';
		this.getWays().forEach(
			function(way) {
				str+=get_way_code(way);
			}
		);
		return str+"</div>";
	};	

	this.getActionsCode = function() {
		var str = '<div id="actions_block"><br>';
		$.each(this.getActions(), function(sysname, action) {
				str+='<div class="action" data-action="'+action.getAction()+'">'+action.getName()+'</div>'
		
		});
		return str+"</div>";
	};
	
	this.getText = function() {
		if(this.isChecked) {
			return this.text["main"];
		} else {
			this.isChecked = true;
			journal.write(map.getCurPlace().getName(), this.text["first_time"])
			return this.text["first_time"];
		};
	};
	
	this.getCode = function(){
		var str='';
		str += '<div id="text">'
		str += this.getText()+"</div>";
		
		str += this.getWaysCode();
		str += this.getActionsCode();

		
		return str;
	}

};

Map = function() {
	this.cur_loc = null;
	this.cur_place = null;
	this.locs = {
		"TheCave": new Loc(
			1,
			"TheCave",
			"Пещера",
			{
				"Cliff": 
					new Place(
						1,
						"Cliff",
						"Склон", 
						{
							"main": "Холодный камень под небольшим углом уходит вниз, местами попадаются горизонтальные участки и крупные камни. Слабый свет проникает сквозь ровные круглые отверствия в потолке где-то высоко наверху. В самом низу склона пол врезается в покрытую кварцевыми кристаллами стену. Недалеко от места, где вы впервые очнулись, в стене можно увидеть проход, который ведет к постаменту с зеркалом.",
							"first_time": "<h3>Здравствуй, путник.</h3><br>Ты очнулся в сырой пещере. Среди окружающей темноты можно было выделить ровный тусклый свет из-за угла туннеля, который начинался в стене чуть ниже по склону.",
							"go": "Вернуться в пещеру со склоном"
						},
						{
						},
						["MirrorRoom"]
					),
				"MirrorRoom": 
					new Place(
						2,
						"MirrorRoom",
						"Комната с зеркалом",
						{
							"main": "Вы не замечаете ничего нового. Зеркало на постаменте в конце прохода выглядит необьяснимо пугающим.",
							"first_time": "Аккуратно разминая затекшие ноги и бесшумно двигаясь вдоль влажной стены, ты заметил в конце этого короткого прохода постамент из темного камня, на котором стояло зеркало и горящая перед ним свеча. В отличие от предыдущей части пещеры, здесь было довольно тесно. Пламя свечи позволяло увидеть потолок, покрытый беспорядочно свисающими сталактитами.",
							"go":"Пойти по коридору"
						
						},
						{
						"approach_mirror": new Action("approach_mirror", "Подойти к зеркалу", "map.go([null, 'NearMirror'])")
						},
						["Cliff"]
					),
				"NearMirror":
					new Place(
						3,
						"NearMirror",
						"Около зеркала",
						{
							"main": "Среди царапин на постаменте зеркала можно было разобрать ваше имя.",
							"first_time": "Зеркало стоит на постаменте из какого-то темно-синего камня. Свеча прилеплена низом к поверхности крышки постамента, вы можете взять её с собой. Увидеть свое отражение вы смогли бы лишь когда подошли к зеркалу вплотную: оно смотрело прямо на стену пещеры, которая была за за два локтя от постамента. Только сейчас вы начали понимать, что вы даже не представляете кто вы и как вы выглядите...",
							"go":"Подойти к зеркалу" //kinda reserve
						
						},
						{
						"take_candle": new Action("take_candle", "Взять свечу в руки", "console.log('took a candle'); inv.addItem(items['Candle']); delete map.getLoc('TheCave').getPlace('NearMirror').actions['take_candle']; main.displayLoc()"),
						"go_away": new Action("go_away", "Отойти от зеркала", "map.go([null, 'MirrorRoom'])"),
						"close": new Action("close", "Подойти к зеркалу вплотную и посмотреть в него", "main.displayCreation();  delete map.getLoc('TheCave').getPlace('NearMirror').actions['close']")
						
						},
						[]
					)
			}
		),
		"ThePassage": new Loc(
			1,
			"ThePassage",
			"Проход",
			{
				"Room1": 
					new Place(
						1,
						"Room1",
						"Комната1", 
						{
							"main": "Комната 1.",
							"first_time":"Комната 1, первый раз",
							"go":"Пойти по коридору в 1"
						},
						[],
						["Room4", "Room2", "TheCave:Cliff"]
					),
				"Room2": 
					new Place(
						2,
						"Room2",
						"Комната1", 
						{
							"main": "Комната 2.",
							"first_time":"Комната 2, первый раз",
							"go":"Пойти по коридору в 2"
						},
						[],
						["Room1", "Room3"]
					),
				"Room3": 
					new Place(
						3,
						"Room3",
						"Комната3", 
						{
							"main": "Комната 3.",
							"first_time":"Комната 3, первый раз",
							"go":"Пойти по коридору в 3"
						},
						[],
						["Room2", "Room4", ]
					),
				"Room4": 
					new Place(
						4,
						"Room4",
						"Комната4", 
						{
							"main": "Комната 4.",
							"first_time":"Комната 4, первый раз",
							"go":"Пойти по коридору в 4"
						},
						[],
						["Room3", "Room1"]
					)
			}
		)
	}

	this.getLoc = function(locname) {
		return this.locs[locname];
	};
	
	this.getCurLoc = function(locname) {
		return this.cur_loc;
	};	
	this.getCurPlace = function(locname) {
		return this.cur_place;
	};	


	this.go = function(dest) {
		
		var destloc = dest[0];
		var destplace = dest[1];
		this.cur_loc = destloc ? this.getLoc(destloc) : this.cur_loc;
		this.cur_place = this.getCurLoc().getPlace(destplace);
		
		main.displayLoc();		
		load_footer();
	};
};


Navigation_panel = function() {

	this.bindClicks = function() {
		$(".dest").click(
			function() {
				console.log("dest clicked")
				dest = [$(this).data("dest-loc"), $(this).data("dest-place")];
				map.go(dest);
			}
		)
	};
	
	this.block = function() {
		$(".dest").unbind();
	}
};

var nav_panel = new Navigation_panel();
var map = new Map();
