Player = function() {

	this.stat = function(name, description) {
		this.name = name;
		this.description = description;
		this.value = 0;
		
		this.getName = function() {return this.name};
		this.getDescription = function() {return this.description};
		this.getValue = function() {return this.value};
	}

	
	
	this.creation = function() {
	
		this.points = 10;
		
		this.start = function() {	
			console.log("creation started")
			player.stats = {
				"Strength": new player.stat("Сила", "Сила отображает развитость мускуллов персонажа. Чем выше сила, тем выше сила ударов и поднимаемый вес."),
				"Dexterity":new player.stat("Ловкость", "Ловкость отображает способность персонажа к уворотам и трюкам, а также отвечает за сложные движения."),
				"Intelligence":new player.stat("Интеллект", "Интеллект показывает общую развитость мышления персонажа, а также накопленный запас знаний.")
			};
			this.draw();
		};
		
		this.draw = function() {
			console.log("creation draw")
			var str = "Распределите характеристики вашего персонажа. Осталось очков: "+this.points+"<br>";
			$.each(
				player.stats, 
				function(stat, val) {
					str +='<input class="stat_creation" id = "'+stat+'" type = "number" max="10" min="1" value="1"></input>'+val.name+'<br>'
				}
			);
			$("#main").html(str);
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
					creation.draw();
				}			
			)
		};
	};
	
};

player = new Player();
creation = new player.creation();