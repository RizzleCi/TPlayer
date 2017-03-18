var createPlayer = (function (window) {
	var controls = {};
	var myPlayer = {};

	myPlayer.render = function () {
		myPlayer.player = document.getElementById(controls.playername);
		timeInit();
		controlBut();
		change()
		voiceControl();
	}
	myPlayer.init = function(argument) {
		controls = argument;
		myPlayer.render()
	}; 	
	//控制播放的按钮
	var controlBut = function () {
		var playButton = document.getElementById(controls.playbut);	
		playButton.addEventListener("click",function () {
			if (myPlayer.player.paused) {
				if (myPlayer.player.src) {
					myPlayer.player.play()
				}else changeSong(player);
				
				this.innerHTML = "&#xe750;"
			}else{
				myPlayer.player.pause();
				this.innerHTML = "&#xe74f;"
			};
		},false) 
	}
	//转换时间格式的函数
	var secToMin = function (sec) {
		if (typeof sec === "number" && sec === sec) {
			var min = Math.floor(sec/60);
			var newsec = sec%60;
			if (min<10) {
				var realmin = "0" + min.toString();
			}else{
				var realmin = min.toString();
			};
			if (newsec<10) {
				var realsec = "0" + newsec.toString();
			}else{
				var realsec = newsec.toString();
			};
			var time = realmin+":"+realsec;
			return time
		}else{return "00:00"};	
	}
	//时间显示的函数
	var timeInit = function () {
		var nowtime = document.createElement('span');
		var fulltime = document.createElement('span');
		nowtime.className = "now pl10";

		var showtime = document.getElementById('showtime');
		fulltime.innerHTML = secToMin(Math.ceil(myPlayer.player.duration));
		nowtime.innerHTML = secToMin(Math.ceil(myPlayer.player.currentTime));		
		//console.log(secToMin(80))
		var span = document.createElement('span');
		span.innerHTML = "/";
		showtime.appendChild(nowtime);
		showtime.appendChild(span);
		showtime.appendChild(fulltime);

		var timeline = document.getElementById('timeline');
		var timediv = document.createElement('div');
		var dot = document.createElement('span');
		dot.className = "dot"
		timediv.className = "inside";
		timediv.style.width = "0px"
		timeline.appendChild(timediv);
		timeline.appendChild(dot);
		
		var time = myPlayer.player.currentTime;
		setInterval(function () {
			nowtime.innerHTML = secToMin(Math.ceil(myPlayer.player.currentTime)) ;
			timediv.style.width = myPlayer.player.currentTime/myPlayer.player.duration*100+"%";
			dot.style.left = myPlayer.player.currentTime/myPlayer.player.duration*parseInt(timeline.clientWidth)+"px";
		},300)	


		timeline.addEventListener("mousedown",function (event) {
			var dot = this.getElementsByTagName('span')[0];

			document.onmousemove = function (event) {
				time = myPlayer.player.duration * ((event.clientX-timeline.offsetLeft)/parseInt(timeline.style.width));
				myPlayer.player.currentTime = time;		
			}
			document.onmouseup=function (){
				document.onmousemove=null;
				//document.onmouseup=null;
			};
		})
	}

	var voiceControl = function (event) {
		var voice = document.getElementById(controls.soundbut);
		var sounddiv = document.getElementById(controls.sounddiv);
		var insidediv = document.createElement('div');
		insidediv.className = "inside";
		sounddiv.appendChild(insidediv);

		var dot = document.createElement('span');
		dot.className = "sounddot";
		sounddiv.appendChild(dot);
		insidediv.style.width = sounddiv.style.width;
		var sound = parseInt(insidediv.style.width)/parseInt(sounddiv.style.width);

		voice.onclick = function () {
			if (myPlayer.player.volume) {
				myPlayer.player.volume = 0;
			}else{
				myPlayer.player.volume = sound;
			};
		}

		sounddiv.addEventListener("mousedown",function (event) {
			document.onmousemove = function (event) {

				if (event.clientX>sounddiv.offsetLeft && event.clientX<sounddiv.offsetLeft+parseInt(sounddiv.style.width)) {
					sound = (event.clientX-sounddiv.offsetLeft)/parseInt(sounddiv.style.width);
					myPlayer.player.volume = sound;
					insidediv.style.width = sound * parseInt(sounddiv.style.width) + "px";	
					dot.style.left = sound * parseInt(sounddiv.style.width) + "px";			
				};

			}
			document.onmouseup=function (){
				document.onmousemove=null;
				document.onmouseup=null;
			};
		},false)
		// sounddiv.onclick = function (event) {

			
		// }
	}	
	//切换歌曲按钮
	var change = function () {
		var button = document.getElementById(controls.changeBut);
		button.onclick = function () {
			changeSong()
		}
	}
	var changeSong = function () {
		var oldsong = myPlayer.player.src;
		var len = controls.song.length;
		var newsong;
		var loc = window.location.href;

		if (oldsong) {

			var song = oldsong.replace(loc+'songs/','').replace(/\.mp3/,'')
			for (var i = 0; i < len; i++) {
				if(controls.song[i] == song){
					var num = i;

				}
			};
			if (num == len-1) {
				newsong = controls.song[0];

			}else{
				newsong = controls.song[num+1];

				
			};
		}else{newsong = controls.song[0]};

		myPlayer.player.src = 'songs/'+newsong+'.mp3';
		console.log(newsong)
		getLrc(newsong).then(lyric => rollLrc(lyric));
		myPlayer.player.play();
	}

	var getLrc = function (name) {
		return new Promise(function(resolve, reject){
		    var xhr = new XMLHttpRequest();
		    xhr.open('GET', '../songs/'+name+'.lrc', true);
		    xhr.send();
		    xhr.onreadystatechange = function () {
		    	if (xhr.readyState == 4 && xhr.status == 200) {
		    		var lyric = lrcobj(xhr.responseText);
		    		resolve(lyric);
		    	};
		    };
		})
	}

	var lrcobj = function (lrc) {
		var lrcs = lrc.split("/n");
		var obj = [];
		var value = [];
		for (var i = 0; i < lrcs.length; i++) {
			var reg = /\[[0-9][0-9]:[0-9][0-9]\.[0-9][0-9]\].*/g;
			value = lrcs[i].match(reg);
		};
		for (var i = 0; i < value.length; i++) {
			var timereg = /\[[0-9][0-9]\:[0-9][0-9]\.[0-9][0-9]\]/g;
			var time = value[i].match(timereg);
			var words = value[i].replace(timereg,"");

			var timew = time.toString()
			var min = parseInt(timew.match(/[0-9][0-9]/)[0]);
			var sec = parseFloat(timew.match(/[0-9][0-9]\.[0-9][0-9]/i)[0])
			var trueTime = Math.round(min*60+sec);
			if (words) {
				obj.push([trueTime,words])
			};
			
		};
		return obj;
	}

	var rollLrc = function (lrc) {
		var lrcdiv = document.getElementById('lrc');
		var lrcul = lrcdiv.getElementsByTagName('ul')[0];
		lrcul.innerHTML = "";
		//console.log(lrc);
		for (i = 0;i < lrc.length;i++){
			var li = document.createElement("li");
			li.innerHTML = lrc[i][1];
			li.setAttribute('class','a'+lrc[i][0]);
			lrcul.appendChild(li);
		}
		var top = lrctop(lrc);
		lrcul.style.top = "200px"
		myPlayer.player.ontimeupdate = function () {
			var time = Math.round(myPlayer.player.currentTime);
			var newtext = lrcdiv.getElementsByClassName('a'+time)[0];
			var now = lrcdiv.getElementsByClassName('active')[0];		

			for (var i = 0; i < lrc.length; i++) {
				if (lrc[i][0] == time) {
					if (newtext && newtext != now) {
						var reg = /active/;			
						newtext.className += ' active';
						if (now) {
				    		now.className = now.className.replace(reg,'');
				    		lrcul.style.top = 200-top[time]+"px";
						};
					};
				}; 
			};
		}
	}

	var lrctop = function (lrc) {
		var top = {};
		var height = 0;
		var lrcdiv = document.getElementById('lrc');
		var lrcul = lrcdiv.getElementsByTagName('ul')[0];
		var li = lrcul.getElementsByTagName("li");
		for (var i = 0; i < li.length; i++) {
			height += li[i].clientHeight;
			top[lrc[i][0]] = height;
		};
		return top
	}
	return myPlayer;
})(window)

document.addEventListener("DOMContentLoaded",createPlayer.init({
	playername : "player",
	playbut : "playbut",
	soundbut : "voice",
	sounddiv : "sound",
	changeBut : "changebut",
	song : ["AllofMe","AllAboutThatBass"]
}),false )  

