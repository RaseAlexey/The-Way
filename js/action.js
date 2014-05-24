
/*

actions = {
	"TheCave": {
		"Cliff" : {
			"enter":{			
				"return inv.has('Candle')" : "console.log('entered_with_candle');"
			}		
		},
		"MirrorRoom" : {
			"enter":{			
				"return inv.has('Stone')" : "console.log('entered_with_stone');",
				"return (!cur_place.isVisited)" : ""
			},
			"take_candle": new Action("take_candle", "Взять свечу в руки", "inv.addItem(items['candle']); delete actions['TheCave']['MirrorRoom'] ")
		}
	}
};
		
run = function(loc, place, event) {
	$.each(
		code[loc][place][event],
		function(cond, action) {
			if( new Function(cond)() ){
				eval(code[loc][place][event][cond])
			}
		}
	);
};


run_once = function(loc, place, func_name) {
	eval(code[loc][place][func_name]);
	delete code[loc][place][func_name];
	delete locs[loc][place][actions][func_name];
}

var run_enter = function(event) {	
	run(cur_loc.getSysName(), cur_place.getSysName(), "enter")
}


var run_cur = function(action) {	
	run(cur_loc.getSysName(), cur_place.getSysName(), event)
}
*/

Action = function(sysname, name, action, cond) {
	this.name = name;	
	this.sysname = sysname;	
	this.action = action;
	//this.action = action + "; main.displayLoc()";
	this.cond = cond || true;
	
	this.getName = function() {return this.name};
	this.getSysName = function() {return this.sysname };
	this.getAction = function() {return this.action};
	this.getCond = function() {return this.cond};
	
	this.run = function() {	
		eval(this.getAction());
	};
};

Action_panel = function() {

	this.bindClicks = function() {
		$(".action").click(
			function() {
				eval( $(this).data("action") )
		});
	};
	
	this.block = function() {
		$(".action").unbind();
	};
}

act_panel = new Action_panel();