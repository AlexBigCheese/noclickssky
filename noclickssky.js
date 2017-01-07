var nlg=localStorage;
function loadITM(key) {
	if (nlg[key] == null) nlg[key]=window[key];
	window[key]=nlg[key];
}
var game = {
	time: {
		seconds: 0,
		minutes: 0,
		hours: 0
	},
	player: {
		plutonium: 0,
		allTimeP: 0,
		veridium: 0,
		allTimeV: 0,
		heridium: 0,
		allTimeH:0,
		darkFragment:0,
		allTimeDF:0,
		darkMatter:0,
		allTimeDM:0,
		runes: 0,
		damage: 1,
		weapons: {
			earth: {
				beamFocus: {
					cost: 10,
					count: 0,
					dam: 0,
					inc: 1
				},
				beamInt: {
					cost: 150,
					count: 0,
					dam: 0,
					inc: 10
				},
				coolSys: {
					cost: 50,
					count:0,
					dam:0,
					inc: 500
				},
				amp: {
					cost:500,
					count:0,
					dam:0,
					inc:20e3
				}
			}
		}
	},
	planet: {
		earth: {
			zone: 1
		},
		grudnock: {
			zone: 1
		},
		gazorpazorp: {
			zone: 1
		}
	}
};
loadITM("game");
var	beamFocusCost = 10, beamFocusCounter = 0, beamFocusDamage = 0, beamFocusIncrement = 1;
var beamIntensifierCost = 150, beamIntensifierCounter = 0, beamIntensifierDamage = 0, beamIntensifierIncrement = 10;
var coolingSystemCost = 50, coolingSystemCounter = 0, coolingSystemDamage = 0, coolingSystemIncrement = 500;
var amplifierCost = 500, amplifierCounter = 0, amplifierDamage = 0, amplifierIncrement = 20000;

var darkFragment = 0,
	allTimeDarkFragment = 0,
	darkMatter = 0,
	allTimeDarkMatter = 0,
	runes = 0,
	damage = 1,
	//Zone
	zone = 1;
loadITM("zone");
var	zoneHealth = (zone + 2) * (zone * 2),
	zoneMaxHealth = (zone + 2) * (zone * 2),
	healthWidth = 100,
	plutonium = 0,
	allTimePlutonium = 0,
	//Grudnock
	grudnockZone = 1;
loadITM("grudnockZone");
var	grudnockMaxZone = 1,
	grudnockHealth = 1000000 + (grudnockZone + 2) * (grudnockZone * 3),
	grudnockMaxHealth = 1000000 + (grudnockZone + 2) * (grudnockZone * 3),
	grudnockArmor = 15000,
	grudnockHealthWidth = 100,
	viridium = 0,
	allTimeViridium = 0,
	//Gazorpazorp
	gazorpazorpZone = 1;
loadITM("gazorpazorpZone")
var	gazorpazorpMaxZone = 1,
	gazorpazorpHealth = 1000000000000 + (gazorpazorpZone + 10000) * (gazorpazorpZone * 10000),
	gazorpazorpMaxHealth = 1000000000000 + (gazorpazorpZone + 10000) * (gazorpazorpZone * 10000),
	gazorpazorpHealthWidth = 100,
	heridium = 0,
	allTimeHeridium = 0,
	//Multipliers
	globalMultiplier = 0,
	achievementsUnlocked = 0,
	//Player
	playerLevel = 1,
	playerExperience = 0,
	experienceRequired = playerLevel * playerLevel + playerLevel,
	playerWidth = 0,
	runes = 0,
	agilityRune = 50,
	strengthRune = 50,
	intellectRune = 50;
	
var achievement1 = false,
	achievement2 = false,
	achievement3 = false,
	achievement4 = false,
	achievement5 = false;

var idle = false;
var idleDamage;
var muted = false;
var planetID = "1";

var totalCriticalHits = 0;
var totalClicks = 0;
var totalTicks = 0;
/*==================================================
	GAME LOADED
==================================================*/
function gameLoad(){
	loadGame();
	
	generateAchievements();
	generateCraftingItems();
	generateLaserBeam();
	
	var timer = setInterval(gameTimer, 1000);
	var saveTimer = setInterval(function () {
		nlg["game"] = game;
	}, 60000);
	
	checkAchievements();
	document.getElementById("defaultTab").click();
	document.getElementById("defaultPlanet").click();
}

function loadGame(){
  let toLoad = [
		"plutonium",
		"damage",
		"playerLevel",
		"playerExperience",
		"playStyle"
		/*add more shit here!!!!!!!!!!!!!!!!!!!*/
	];
	for (var i in toLoad) {
		loadITM(i);
	}
}

function gameTimer(){
	game.time.seconds ++;
	
	if(game.time.seconds > 59){
		game.time.seconds = 0;
		game.time.minutes ++;
	}
	if(game.time.minutes > 59){
		game.time.minutes = 0;
		game.time.hours ++;
	}
	
	document.getElementById("seconds").innerHTML = game.time.seconds;
	document.getElementById("minutes").innerHTML = game.time.minutes;
	document.getElementById("hours").innerHTML = game.time.hours;
}

var meditation = 0;
var ricochet = 0;
var criticalChance = 0;
var criticalHit = false;
var blaster = 0;
var gemMastery = 0;

function runeMeditation(){
	if(agilityRune >= 1){
		agilityRune --;
		meditation ++;
		document.getElementById("meditationstat").innerHTML = 1000 - meditation * 10 + "ms";
	}else{
		return;
	}
}
function runeRicochet(){
	if(agilityRune >= 1){
		agilityRune --;
		ricochet ++;
		document.getElementById("ricochetstat").innerHTML = ricochet + "%";
	}else{
		return;
	}
}
function runeOverheat(){
	if(strengthRune >= 1){
		strengthRune --;
		criticalChance ++;
		document.getElementById("overheatstat").innerHTML = criticalChance + "%";
	}else{
		return;
	}
}
function runeBlaster(){
	if(strengthRune >= 1){
		strengthRune --;
		blaster ++;
		document.getElementById("blasterstat").innerHTML = (200 + (blaster * 10)) + "%";
	}else{
		return;
	}
}
function yGemMastery(){
	if(intellectRune >= 1){
		intellectRune --;
		gemMastery ++;
		document.getElementById("gemmasterystat").innerHTML = (gemMastery * 10) + "%";
	}else{
		return;
	}
}

var laserBeamNames = [ "Beam Focus", "Beam Intensifier", "Beam Coolant System" ];
var laserBeamInfo = [ 
	"- <span class=\"fgreen\">2x damage</span> <span class=\"fwhite\">@Lv 10, 25, 50, 75, 100</span>",
	"- <span class=\"fgreen\">2x damage</span> <span class=\"fwhite\">@Lv 10, 25, 75, 100</span><br>- <span class=\"forange\">Runes</span> <span class=\"fwhite\">@Lv 50</span>",
	"- <span class=\"fgreen\">2x damage</span> <span class=\"fwhite\">@Lv 50, 75, 100</span><br>- <span class=\"forange\">+25% global damage</span> <span class=\"fwhite\">@Lv 10, 25</span>"
];
var laserBeamCost = [ beamFocusCost, beamIntensifierCost, coolingSystemCost ];
function generateLaserBeam(){
	var boxes = "";
	for(i = 0; i < 3; i ++){
		boxes += "<div class=\"shopbox\" onclick=\"laserBeamId" + i + "()\"><img src=\"img/lkd.png\"><div class=\"shoptooltip fblue\"><div class=\"header\"><span class=\"fgreen\">" + laserBeamNames[i] + "</span> <span class=\"fwhite\" id=\"laserbeam" + i + "owned\">0</span></div><div class=\"tooltipcontent\">Cost: <span class=\"fwhite\" id=\"laserbeam" + i + "cost\">" + laserBeamCost[i] + "</span><br>Damage: <span class=\"fwhite\" id=\"laserbeam" + i + "damage\">0</span><br>" + laserBeamInfo[i] + "</div></div></div>";
	}
	
	document.getElementById("laserbeamboxes").innerHTML = boxes;
}

function generateAchievements(){
	var boxes = "";
	for(i = 0; i < 55; i ++){
		boxes += "<div class=\"achievement\" id=\"achievement" + i +"\"><img src=\"img/lkd.png\"><div class=\"achievementtooltip fwhite\"><div class=\"header\">Locked</div><div class=\"tooltipcontent\">?</div></div></div>";
	}
	
	document.getElementById("achievements").innerHTML = boxes;
}

function generateCraftingItems(){
	var boxes = "";
	for(i = 0; i < 5; i ++){
		boxes += "<div class=\"craftingitem\" id=\"craft" + i +"\"><img src=\"img/lkd.png\"><div class=\"craftingtooltip fwhite\">Locked</div></div>";
	}
	
	document.getElementById("crafts").innerHTML = boxes;
}
/*==================================================
	PLAYSTYLE
==================================================*/
function playStyle(){
	if(idle){
		document.getElementById("playstyle").innerHTML = "Active";
		document.getElementById("imagewrapper").className = "cursorpointer";
		document.getElementById("oreimage").className = "";
		
		idle = false;
		clearInterval(idleDamage);
	}else{
		document.getElementById("playstyle").innerHTML = "Idle";
		document.getElementById("imagewrapper").className = "cursornotallowed";
		document.getElementById("oreimage").className = "disabled";
		
		idle = true;
		idleDamage = setInterval(doDamage, 1000 - meditation * 10);
	}
}
/*==================================================
	MUTE SOUNDS
==================================================*/
function muteSounds(){
	if(muted){
		muted = false;
		document.getElementById("mutesounds").innerHTML = "On";
	}else{
		muted = true;
		document.getElementById("mutesounds").innerHTML = "Off";
	}
}
/*==================================================
	CHANGE BACKGROUND
==================================================*/
var backgroundSwitch = 1;
function changeBackground(){
	backgroundSwitch ++;
	
	if(backgroundSwitch > 4){
		backgroundSwitch = 1;
	}
	
	switch (backgroundSwitch){
		case 1:	document.getElementById("background").style.backgroundImage = "url(\"img/mainbg.jpg\")";
				document.getElementById("backgroundchange").innerHTML = "BG 1";
				break;
		case 2:	document.getElementById("background").style.backgroundImage = "url(\"img/bg2.jpg\")";
				document.getElementById("backgroundchange").innerHTML = "BG 2";
				break;
		case 3:	document.getElementById("background").style.backgroundImage = "url(\"img/bg3.jpg\")";
				document.getElementById("backgroundchange").innerHTML = "BG 3";
				break;
		case 4:	document.getElementById("background").style.backgroundImage = "url(\"img/bg4.jpg\")";
				document.getElementById("backgroundchange").innerHTML = "BG 4";
				break;
	}
}
/*==================================================
	CHANGE PLANET
==================================================*/
function changePlanet(evt, planetName){
	var planetcontent = document.getElementsByClassName("planetcontent");
	var i;
	for(i = 0; i < planetcontent.length; i ++){
		planetcontent[i].style.display = "none";
	}
	
	planetID = planetName;
	document.getElementById(planetName).style.display = "initial";
	document.getElementById("oreimage").src = "img/" + planetID + ".jpg";
	updateHealthBar();
}
/*==================================================
	CHANGE TAB
==================================================*/
function changeTab(evt, tabName){
	var tabcontent = document.getElementsByClassName("tabcontent");
	var i;
	for(i = 0; i < tabcontent.length; i ++){
		tabcontent[i].style.display = "none";
	}

	document.getElementById(tabName).style.display = "initial";
}
/*==================================================
	DO DAMAGE
==================================================*/
function doDamage(){
	damage = 1 + beamFocusDamage + beamIntensifierDamage + coolingSystemDamage + amplifierDamage + Math.floor(damage * globalMultiplier) + Math.floor(darkMatter * 10);
	
	checkCritical();
	
	if(criticalHit){
		damage *= 2;
		criticalHit = false;
	}
	
	switch(planetID){
		case "1":	zoneHealth -= damage;
					break;
		case "2":	grudnockHealth -= damage - grudnockArmor;
					break;
		case "3":	gazorpazorpHealth -= damage;
					break;
	}
	
	healthBar();
	
	if(!idle){
		checkDarkFragment();
	}
	
	if(idle){ totalTicks ++; }else if(!idle){ totalClicks ++; }
	
	document.getElementById("alltimeclicks").innerHTML = nFormatter(totalClicks, 3);
	document.getElementById("alltimeticks").innerHTML = nFormatter(totalTicks, 3);
	
	checkLevel();
	updateHud();
}
/*==================================================
	HEALTH BAR
==================================================*/
function healthBar(){
	var health = document.getElementById("healthpoints");
	
	switch(planetID){
		case "1" :	healthWidth -= (damage * 100) / zoneMaxHealth;
					break;
		case "2":	healthWidth -= ((damage - grudnockArmor) * 100) / grudnockMaxHealth;
					break;
		case "3":	healthWidth -= (damage * 100) / gazorpazorpMaxHealth;
					break;
	}
	
	health.style.width = healthWidth + '%';
}
function updateHealthBar(){
	var health = document.getElementById("healthpoints");
	
	switch(planetID){
		case "1":	healthWidth = (zoneHealth * 100) / zoneMaxHealth;
					break;
		case "2":	healthWidth = (grudnockHealth * 100) / grudnockMaxHealth;
					break;
		case "3":	healthWidth = (gazorpazorpHealth * 100) / gazorpazorpMaxHealth;
					break;
	}
	
	health.style.width = healthWidth + '%';
}
function resetHealthBar(){
	var health = document.getElementById("healthpoints");
	healthWidth = 100;
	health.style.width = healthWidth + '%';
}
/*==================================================
	CHECK ZONE
==================================================*/
function checkLevel(){
	if(zoneHealth <= 0){
		document.getElementById("log1").innerHTML = "Earth: Zone " + zone + " cleared!<br>Reward: " + ((zone * 2) + Math.floor((zone * 2) + gemMastery * 0.1)) + " Plutonium"; 
		plutonium += (zone * 2) + Math.floor((zone * 2) + gemMastery * 0.1);
		allTimePlutonium += (zone * 2) + Math.floor((zone * 2) + gemMastery * 0.1);
		zone ++;
		zoneHealth = (zone + 2) * (zone * 2);
		zoneMaxHealth  = (zone + 2) * (zone * 2);
		localStorage.setItem("plutonium", plutonium);
		playerExperience ++;
		checkPlayerLevel();
		resetHealthBar();
		updateHud();
	}else if(grudnockHealth <= 0){
		document.getElementById("log1").innerHTML = "Grudnock: Zone " + grudnockZone + " cleared!<br>Reward: " + Math.floor(grudnockZone * 5) + " Viridium <img src=\"img/viridium.png\">"; 
		viridium += Math.floor((grudnockZone * 5));
		allTimeViridium += Math.floor((grudnockZone * 5));
		grudnockZone ++;
		grudnockHealth = 1000000 + (grudnockZone + 2) * (grudnockZone * 3);
		grudnockMaxHealth  = 1000000 + (grudnockZone + 2) * (grudnockZone * 3);
		playerExperience ++;
		checkPlayerLevel();
		resetHealthBar();
		updateHud();
	}else if(gazorpazorpHealth <= 0){
		document.getElementById("log1").innerHTML = "Gazorpazorp: Zone " + gazorpazorpZone + " cleared!<br>Reward: " + Math.floor(gazorpazorpZone * 20) + " Heridium <img src=\"img/heridium.png\">"; 
		heridium += Math.floor((gazorpazorpZone * 20));
		allTimeHeridium += Math.floor((gazorpazorpZone * 20));
		gazorpazorpZone ++;
		gazorpazorpHealth = 1000000000000 + (gazorpazorpZone + 10000) * (gazorpazorpZone * 10000);
		gazorpazorpMaxHealth  = 1000000000000 + (gazorpazorpZone + 10000) * (gazorpazorpZone * 10000);
		playerExperience ++;
		checkPlayerLevel();
		resetHealthBar();
		updateHud();
	}
}
/*==================================================
	CHECK PLAYER LEVEL
==================================================*/
function checkPlayerLevel(){
	if(playerExperience >= experienceRequired){
		playerExperience = 0;
		playerLevel ++;
		darkMatter ++;
		allTimeDarkMatter ++;
		experienceRequired = playerLevel * playerLevel + playerLevel;
		document.getElementById("log2").innerHTML = "Level up! Level " + playerLevel + "(+1 Dark Matter)";
	}
}
/*==================================================
	CHECK FOR DARK FRAGMENT
==================================================*/
function checkDarkFragment(){
	var number = Math.random() * 100 + 1;
	var req = 100 - ricochet;
	if(number > req){
		darkFragment ++;
		allTimeDarkFragment ++;
	}
}
/*==================================================
	CHECK CRITICAL
==================================================*/
function checkCritical(){
	var crit = Math.random() * 100 + 1;
	var hit = 100 - criticalChance;
	if(crit > hit){
		criticalHit = true;
		totalCriticalHits ++;
		document.getElementById("alltimecriticalhits").innerHTML = nFormatter(totalCriticalHits, 3);
	}
}
/*==================================================
	BUY BEAM FOCUS
==================================================*/
function laserBeamId0(){
	if(plutonium < beamFocusCost){
		return;
	}
	else{
		beamFocusCounter ++;
		plutonium -= beamFocusCost;
		beamFocusCost += Math.floor(beamFocusCost * 0.1);
		beamFocusDamage += beamFocusIncrement;
		
		if(!muted){
			var audio = new Audio('sounds/buy.wav');
			audio.play();
		}
		
		switch(beamFocusCounter){
			case 10: case 25: case 50: case 100:
				beamFocusDamage *= 2;
				beamFocusIncrement *= 2;
				break;
		}
		
		document.getElementById("laserbeam0cost").innerHTML = beamFocusCost;
		document.getElementById("laserbeam0damage").innerHTML = beamFocusDamage;
		document.getElementById("laserbeam0owned").innerHTML = beamFocusCounter;
		updateHud();
	}
}
/*==================================================
	BUY BEAM INTENSIFIER
==================================================*/
function laserBeamId1(){
	if(plutonium < beamIntensifierCost){
		return;
	}
	else{
		beamIntensifierCounter ++;
		plutonium -= beamIntensifierCost;
		beamIntensifierCost += Math.floor(beamIntensifierCost * 0.1);
		beamIntensifierDamage += beamIntensifierIncrement;
		
		if(!muted){
			var audio = new Audio('sounds/buy.wav');
			audio.play();
		}
		
		switch(beamIntensifierCounter){
			case 10: case 25: case 50: case 100:
				beamIntensifierDamage *= 2;
				beamIntensifierIncrement *= 2;
				break;
		}
		
		document.getElementById("laserbeam1cost").innerHTML = beamIntensifierCost;
		document.getElementById("laserbeam1damage").innerHTML = beamIntensifierDamage;
		document.getElementById("laserbeam1owned").innerHTML = beamIntensifierCounter;
		updateHud();
	}
}
/*==================================================
	BUY BEAM COOLANT SYSTEM
==================================================*/
function laserBeamId2(){
	if(plutonium < coolingSystemCost){ return; }
	else{
		coolingSystemCounter ++;
		plutonium -= coolingSystemCost;
		coolingSystemCost += Math.floor(coolingSystemCost * 0.1);
		coolingSystemDamage += coolingSystemIncrement;
		
		if(!muted){
			var audio = new Audio('sounds/buy.wav');
			audio.play();
		}
		
		switch(coolingSystemCounter){
			case 10: case 25: case 50: case 100:
				coolingSystemDamage *= 2;
				coolingSystemIncrement *= 2;
				break;
		}
		
		document.getElementById("laserbeam2cost").innerHTML = coolingSystemCost;
		document.getElementById("laserbeam2damage").innerHTML = coolingSystemDamage;
		document.getElementById("laserbeam2owned").innerHTML = coolingSystemCounter;
		updateHud();
	}
}
/*==================================================
	NUMBER FORMATTER
==================================================*/
function nFormatter(num, digits){
	var si = [
		{ value: 1E45, symbol: " E45"},
		{ value: 1E42, symbol: " E42"},
		{ value: 1E39, symbol: " E39"},
		{ value: 1E36, symbol: " E36"},
		{ value: 1E33, symbol: " decillion"},
		{ value: 1E30, symbol: " nonillion"},
		{ value: 1E27, symbol: " octillion"},
		{ value: 1E24, symbol: " septillion"},
		{ value: 1E21, symbol: " sextillion" },
		{ value: 1E18, symbol: " quintillion" },
		{ value: 1E15, symbol: " quadrillion" },
		{ value: 1E12, symbol: " trillion" },
		{ value: 1E9, symbol: " billion" },
		{ value: 1E6, symbol: " million" },
		{ value: 1E3, symbol: " k" }
	], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
	
	for(i = 0; i < si.length; i++){
		if(num >= si[i].value){
			return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
		}
	}
	
	return num.toFixed(digits).replace(rx, "$1");
}
/*==================================================
	UPDATE HUD
==================================================*/
function updateHud(){
	document.getElementById("stashplutonium").innerHTML = nFormatter(plutonium, 3);
	document.getElementById("stashviridium").innerHTML = nFormatter(viridium, 3);
	document.getElementById("stashheridium").innerHTML = nFormatter(heridium, 3);
	document.getElementById("alltimeplutonium").innerHTML = nFormatter(allTimePlutonium, 3);
	document.getElementById("alltimeviridium").innerHTML = nFormatter(allTimeViridium, 3);
	document.getElementById("alltimeheridium").innerHTML = nFormatter(allTimeHeridium, 3);
	document.getElementById("stashdarkfragment").innerHTML = darkFragment;
	document.getElementById("stashdarkmatter").innerHTML = darkMatter;
	document.getElementById("alltimedarkfragment").innerHTML = allTimeDarkFragment;
	document.getElementById("alltimedarkmatter").innerHTML = allTimeDarkMatter;
	document.getElementById("globalmultiplier").innerHTML = Math.floor(globalMultiplier * 100);
	document.getElementById("hitpoints").innerHTML = nFormatter(zoneHealth, 3);
	document.getElementById("maxhitpoints").innerHTML = nFormatter(zoneMaxHealth, 3);
	document.getElementById("level").innerHTML = nFormatter(zone, 3);
	document.getElementById("grudnockhealth").innerHTML = nFormatter(grudnockHealth, 3);
	document.getElementById("grudnockmaxhealth").innerHTML = nFormatter(grudnockMaxHealth, 3);
	document.getElementById("grudnockzone").innerHTML = nFormatter(grudnockZone, 3);
	document.getElementById("gazorpazorphealth").innerHTML = nFormatter(gazorpazorpHealth, 3);
	document.getElementById("gazorpazorpmaxhealth").innerHTML = nFormatter(gazorpazorpMaxHealth, 3);
	document.getElementById("gazorpazorpzone").innerHTML = nFormatter(gazorpazorpZone, 3);
	document.getElementById("damage").innerHTML = nFormatter(damage, 3);
	document.getElementById("criticalhitchance").innerHTML = criticalChance;
	document.getElementById("runes").innerHTML = runes;
	document.getElementById("playerlevel").innerHTML = nFormatter(playerLevel, 3);
	document.getElementById("playerexperience").innerHTML = playerExperience;
	document.getElementById("experiencerequired").innerHTML = experienceRequired;
	document.getElementById("achievementsunlocked").innerHTML = achievementsUnlocked;
}
/*==================================================
	CHECK FOR UNLOCKED ACHIEVEMENTS
==================================================*/
function checkAchievements(){
	if(allTimePlutonium >= 100 && !achievement1){
		achievement1 = true;
		document.getElementById("achievement0").innerHTML = "<img src=\"img/unlkd.png\"><div class=\"achievementtooltip fwhite\"><div class=\"header fblue\">Miner</div><div class=\"tooltipcontent\">Mine 100 plutonium</div></div>";
		document.getElementById("log2").innerHTML = "Achievement: 100 Plutonium unlocked";
		achievementsUnlocked ++;
	}
	if(allTimePlutonium >= 1000 && !achievement2){
		achievement2 = true;
		document.getElementById("achievement1").innerHTML = "<img src=\"img/unlkd.png\"><div class=\"achievementtooltip fwhite\"><div class=\"header fblue\">Grinder</div><div class=\"tooltipcontent\">Mine 1k plutonium</div></div>";
		document.getElementById("log2").innerHTML = "Achievement: 1000 Plutonium unlocked";
		achievementsUnlocked ++;
	}
	if(allTimePlutonium >= 10000 && !achievement3){
		achievement3 = true;
		document.getElementById("achievement2").innerHTML = "<img src=\"img/unlkd.png\"><div class=\"achievementtooltip fwhite\"><div class=\"header fblue\">Determined</div><div class=\"tooltipcontent\">Mine 10k plutonium</div></div>";
		document.getElementById("log2").innerHTML = "Achievement: 10000 Plutonium unlocked";
		achievementsUnlocked ++;
	}
	if(allTimePlutonium >= 100000 && !achievement4){
		achievement4 = true;
		document.getElementById("achievement3").innerHTML = "<img src=\"img/unlkd.png\"><div class=\"achievementtooltip fwhite\"><div class=\"header fblue\">Obsession</div><div class=\"tooltipcontent\">Mine 100k plutonium</div></div>";
		document.getElementById("log2").innerHTML = "Achievement: 100000 Plutonium unlocked";
		achievementsUnlocked ++;
	}
	if(allTimePlutonium >= 1000000 && !achievement5){
		achievement5 = true;
		document.getElementById("achievement4").innerHTML = "<img src=\"img/unlkd.png\"><div class=\"achievementtooltip fwhite\"><div class=\"header fblue\">Why?</div><div class=\"tooltipcontent\">Mine 1million plutonium</div></div>";
		document.getElementById("log2").innerHTML = "Achievement: 1000000 Plutonium unlocked";
		achievementsUnlocked ++;
	}
	if(damage > 15000){
		document.getElementById("changegrudnock").className = "planetbtn";
	}
	
	updateHud();
	setTimeout(checkAchievements, 1000);
}

function setUsername(){
	var getName = document.getElementById("username").value;
	document.getElementById("displayuser").innerHTML = getName;
}