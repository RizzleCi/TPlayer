window.onload = function () {
	var player = document.getElementById('player');
	voiceControl(player)

	control(player)
	timeControl(player)
}
var control = function (player) {
	var control = document.getElementById('control');
	var button = control.getElementsByTagName('span');

	button[0].onclick = function () {
		if (player.paused) {
			player.play();
			this.innerHTML = "&#xe750;"
		}else{
			player.pause();
			this.innerHTML = "&#xe74f;"
		};
	}
}
var timeControl = function (player,event) {
	var nowtime = document.getElementById('now');
	var fulltime = document.getElementById('full');
	var timeline = document.getElementById('timeline');
	var timediv = timeline.getElementsByTagName('div')[0];
	var dot = timediv.getElementsByTagName('span')[0];
	
	fulltime.innerHTML = Math.ceil(player.duration);
	setInterval(function () {
		nowtime.innerHTML = Math.ceil(player.currentTime);
		timediv.style.width = player.currentTime/player.duration*100+"%";
	},300)	
}
var voiceControl = function (player,event) {
	var voice = document.getElementById('voice');
	var sounddiv = document.getElementById('sound');
	var insidediv = sounddiv.getElementsByTagName('div')[0];
	var dot = insidediv.getElementsByTagName('span')[0];
	insidediv.style.width = sounddiv.style.width;
	var sound = parseInt(insidediv.style.width)/parseInt(sounddiv.style.width);
	console.log(sound)

	voice.onclick = function () {
		if (player.volume) {
			player.volume = 0;
		}else{
			player.volume = sound;
		};
	}

	sounddiv.onclick = function (event) {
		sound = (event.clientX-sounddiv.offsetLeft)/parseInt(sounddiv.style.width);
		player.volume = sound;
		insidediv.style.width = sound * parseInt(sounddiv.style.width) + "px";
		console.log(event.clientX);
		console.log(sounddiv.offsetLeft);
	}
}