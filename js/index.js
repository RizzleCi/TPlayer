const lycs = {
  1: [
    [0.087, '愛上お菓子下'],
    [2.188, '柿食うっけ'],
    [3.456, 'こんなにも'],
    [4.510, '差しすせソフトクリーム'],
    [6.967, '五臓六腑でいこう'],
    [9.255, 'タッチついてトルテ来た'],
    [11.526, '何ヌネのり塩'],
    [13.879, 'はっヒフヘホットパイと'],
    [16.132, 'みんなでぬくぬく']
    // [00:00.087]愛上お菓子下
    // [x-trans]爱在上糖果在下
    // [00:02.188]柿食うっけ
    // [x-trans]你要吃柿子吗
    // [00:03.456]こんなにも
    // [x-trans]还是吃什么
    // [00:04.510]差しすせソフトクリーム
    // [x-trans]拿出冰淇淋
    // [00:06.967]五臓六腑でいこう
    // [x-trans]五脏六腑一起动起来
    // [00:09.255]タッチついてトルテ来た
    // [x-trans]果仁蛋糕来了
    // [00:11.526]何ヌネのり塩
    // [x-trans]什么还有盐海苔
    // [00:13.879]はっヒフヘホットパイと
    // [x-trans]哈和热派一起
    // [00:16.132]みんなでぬくぬく
    // [x-trans]大家都暖烘烘
  ]
}
var createPlayer = (function (window) {
  var controls = {};
  var myPlayer = {};

  myPlayer.render = function () {
    myPlayer.player = document.getElementById(controls.playername);
    myPlayer.player.src = 'songs/'+ controls.song +'.mp3';
    rollLrc(lycs[controls.song])

  }
  myPlayer.init = function(argument) {
    controls = argument;
    myPlayer.render()
  };
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

  var rollLrc = function (lrc) {
    var lrcdiv = document.getElementById('lrc');
    var lrcul = lrcdiv.getElementsByTagName('ul')[0];
    lrcul.innerHTML = "";
    //console.log(lrc);
    const listItems = lrc.map(item => {
      const li = document.createElement("li");
      li.innerHTML = item[1];
      return li
    })
    listItems.forEach(item => {
      lrcul.appendChild(item);
    })
    // var top = lrctop(lrc);
    // lrcul.style.top = "200px"
    myPlayer.player.ontimeupdate = function () {
      var time = myPlayer.player.currentTime.toFixed(3);


      for (var i = 0; i < lrc.length; i++) {
        var newtext = listItems[i + 1];
        var now = listItems[i]; 
        if (lrc[i][0] <= time && (lrc[i + 1] ? lrc[i + 1][0] > time : true)) {
          now.className = 'active';
        } else {
          now.className = '';

        }; 
      };
    }
  }

  return myPlayer;
})(window)

const id = location.search.match(/\?id\=(.*)(&|$)/)[1]
document.addEventListener("DOMContentLoaded",createPlayer.init({
  playername : "player",
  song : id
}),false )  

