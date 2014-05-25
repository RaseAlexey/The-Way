Player = function() {
	
	this.race = null;
	this.race_sys = null;
	this.skills = [];

	this.stat = function(name, description) {
		this.name = name;
		this.description = description;
		this.value = 0;
		
		this.getName = function() {return this.name};
		this.getDescription = function() {return this.description};
		this.getValue = function() {return this.value};
	}

	this.state = function(rate_list) {
		this.rate_list = rate_list;
		this.rate = this.rate_list.length-1;
		
		this.minus = function(amount) {
			var amount = amount || 1;
			this.rate = ( ((this.rate - amount) < 0) ? 0 : this.rate - amount);
		};
		
		this.plus = function(amount) {
			var amount = amount || 1;
			this.rate = ( (this.rate + amount)>this.rate_list.length-1 ? this.rate_list.length-1 : this.rate + amount);
		};
		
	};
	
	this.hunger = new this.state(
		[
			"Вы сыты.",
			"Вы проголодались.",
			"Вы голодны.",
			"Ваш желудок крутит от голода.",
			"Вы умираете от голода."
		]
	);
	this.thirst = new this.state(
		[
			"Вы не хотите пить.",
			"Вы чувствуете легкую жажду.",
			"У вас сухо во рту.",
			"Вы чувствуете сильную жажду.",
			"Вы умираете от жажды."
		]
	);
	this.insanity = new this.state(
		[
			"Вы спокойны.",
			"Вы немного взволнованы.",
			"Вы напуганы.",
			"Вы в ужасе.",
			"Вы сходите с ума."
		]
	);			
	this.stats = {
				"Strength": new this.stat("Сила", "Сила отображает развитость мускуллов персонажа. Чем выше сила, тем выше сила ударов и поднимаемый вес."),
				"Dexterity":new this.stat("Ловкость", "Ловкость отображает способность персонажа к уворотам и трюкам, а также отвечает за сложные движения."),
				"Intelligence":new this.stat("Интеллект", "Интеллект показывает общую развитость мышления персонажа, а также накопленный запас знаний.")
	};
	
//	this.hunger.prototype = this.state;
//	this.thirst.prototype = this.state;
//	this.psychic.prototype = this.state;
	
	this.creation = function() {
	
		this.points = 10;
		
		this.stats = {
		
			"Strength":{"max":6, "min":0}
		
		}
		
		this.bindInputs = function() {
			$(".stat_creation").change(
				function() {
					var total_sum = 0;
					
					if(this.value > 10) {
						$(this).val(10)
					} else {
							if(this.value < 1) {$(this).val(1)}
					};
					
					$(".stat_creation").each(
						function() {
							console.log($(this).val())
							total_sum += $(this).val();
						}
					)
					this.points = 13 - total_sum;
					console.log("total sum = "+total_sum);
					this.reload();
				}			
			);
		};
		
		this.start = function() {	
			console.log("creation started");
			this.draw();
		};
		
		//str += "Распределите характеристики вашего персонажа. Осталось очков: "+this.points+"<br>";
		
		
		this.draw = function() {     //изначальная отрисовка макета: 3 вертикальных пары инфа-инпат;
			console.log("creation draw");
			var str = '<div id="creation_block">';
				str += '<div id="creation_info">';					
					str += '<div class = "creation_info_block" id = "race">'+
						'Раса вашего персонажа влияет на абсолютно все его параметры: характеристики, навыки, поведение и особенные черты зависят именно от расы. Тем не менее, не стоит воспринимать это как жесткое ограничение, решение за вами.'+
					'</div>'					
					str += '<div class = "creation_info_block" id = "stats">'+
					'Характеристики вашего персонажа определяют его физические и умственные способности. У каждой расы есть свои уникальные базовые характеристики, вы распределяете оставшиеся очки по своему усмотрению.'+
					'</div>'					
					str += '<div class = "creation_info_block" id = "skills">'+
					'Навыки -  уникальные знания или умения, влияющий на игровой процесс. Все навыки зависят от определенных характеристик.'+
					'</div>'				
				str += '</div>';
				
				str += '<div id="creation_input">';									
					str += '<div class = "creation_input_block" id = "race"><span class="header">Выберите расу:</span><div id="race_inputs"></div></div>'									
					str += '<div class = "creation_input_block" id = "stats"><span class="header">Распределите характеристики:</span><div id="stats_inputs"></div></div>'									
					str += '<div class = "creation_input_block" id = "skills"><span class="header">Выберите навыки:</span><div id="skills_inputs"></div></div>'	
				str += '</div>';			
			str += "</div>";
			
			$("#main").html(str);
			this.drawRaceInput();
			
		};
		
		this.drawRaceInput = function() {
			var str ='';
			str += '<select id="race_select" size="11" autofocus>'+
				'<option name="Human">Человек</option>'+
				'<option name="Gnome">Гном</option>'+
				'<option name="Elf">Эльф</option>'+
				'<option name="Troll">Тролль</option>'+
				'<option name="Orc">Орк</option>'+
			 "</select>";
			$("#race div").html(str);
			
			$("#race_select").change(   //Биндинг селектов
				function() {
					player.race_sys = $(this).find(":selected").attr("name");
					player.race = $(this).val();
					creation.drawStatsInput();
					$("#skills div").html('');
					
				}
			)
		};
		
		this.drawStatsInputs = function() {     //Изначальная отрисовка спин-боксов со статами,
			var str ='';
			$.each(
				player.stats, 
				function(stat, val) {
					str +='<div><input class="creation_stat" id = "'+stat+'" type = "number" maxlength="2" max="10" min="1" value="'+val+'"></input>'+val.name+'</div>';
				}
			);			
			$("#skills div").html(str);
			
			$("#skills div input").change( 
				function() {
				
				}
			);
			
		}
		
		this.reload = function() {
			$("#creation_info").html("Распределите характеристики вашего персонажа. Осталось очков: "+this.points);
			this.bindInputs();
		};
		
	};
	
};

player = new Player();
creation = new player.creation();