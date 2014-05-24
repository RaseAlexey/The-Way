

function load_footer() {
	$("footer").html("Локация: "+map.getCurLoc().getName()+", "+map.getCurPlace().getName())
};

ini = function() {
	map.go(["TheCave", "Cliff"]);
	menu.bind_clicks();
	menu.select("loc");
};
/*
function bind_clicks() {
	$(".dest").click(
		function() {
			console.log("dest clicked")
			dest = [$(this).data("dest-loc"), $(this).data("dest-place")];
			map.go(dest);
		}
	);
	$(".action").click(
		function() {
			console.log("action clicked")
			eval( $(this).data("action") )
	});
	console.log("clicks are binded")
};
*/

Main = function() {
	
	this.tab = null;
	
	this.displayCreation = function() {
		act_panel.block();
		nav_panel.block();
		menu.block();
		creation.start();
	};
	
	this.displayJournal = function() {
		this.tab = "Journal";
		this.drawTab();
	};
	this.displayLoc = function() {
		this.tab = "Loc";		
		this.drawTab();
	};	
	this.displayInv = function() {
		this.tab = "Inv";
		this.drawTab();
	};	
	this.displayStats = function() {
		this.tab = "Stats";
		this.drawTab();
	};
	
	this.drawTab = function() {
		var tab_code = '';
		
		switch(this.tab) {
		
			case "Loc":
				console.log("drawing loc "+map.getCurPlace().getName())
				tab_code = map.getCurPlace().getCode();
			break;
						
			case "Inv":
				console.log("drawing inv")
				tab_code = inv.getCode();
			break;
			
			case "Journal":
				console.log("drawing journal")
				tab_code = journal.getCode();
			break;
			
			case "Stats":
				console.log("drawing journal")
				//tab_code = stats.getCode();
			break;
			
		};
		$("#main").html(tab_code ? tab_code : "");
		nav_panel.bindClicks();
		act_panel.bindClicks();
	};
	
	this.addToText = function(text) {
		$("#text").append(text);
	};
	
	
}
var main = new Main();

/*

function bind_menu_clicks() {
	$(".menu_btn").click(
		function() {
			console.log("menu click");
			switch($(this).attr("id")) {
				case "loc":
					main.displayLoc();
					console.log("loc")
					break;
				case "inv":
					main.displayInv();
					console.log("inv")
					break;
				case "stats":
					main.displayStats();
					console.log("stats")
					break;
				case "journal":
					main.displayJournal();
					console.log("journal")
					break;
			}
		}
	)
};

*/

Menu = function() {

	this.bind_clicks = function() {
		$(".menu_btn").click(
			function() {
				if($(this).hasClass("selected")) { return 0;console.log("already selected")}
				menu.unselect();
				menu.select($(this).attr("id"));
				switch($(this).attr("id")) {
					case "loc":
						main.displayLoc();
						console.log("loc")
						break;
					case "inv":
						main.displayInv();
						console.log("inv")
						break;
					case "stats":
						main.displayStats();
						console.log("stats")
						break;
					case "journal":
						main.displayJournal();
						console.log("journal")
						break;
				}
			}
		)
	};
	
	this.select = function(id) {
		$("#"+id).addClass("selected");
	};
	
	this.unselect = function() {
		$(".menu_btn").removeClass("selected");
	};
	
	this.block = function() {
		$(".menu_btn").unbind();
	};
}

menu = new Menu();