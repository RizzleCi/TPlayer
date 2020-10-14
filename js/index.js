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
  ],
  2: [
    [0.68, '想要传送一封简讯给你'],
    [4.82, '我好想好想你'],
    [7.36, '想要立刻打通电话给你'],
    [9.79, '我好想好想你'],
    [12.28, '每天起床的第一件事情'],
    [14.72, '就是好想好想你'],
    [17.5, '无论晴天还是下雨'],
    [19.84, '都好想好想你']
  ],
  3: [
    [0.3, 'だって可愛く変わりたいんだ'],
    [5.01, '知らない顔しても意識し合ってる'],
    [9.01, '背伸びしたメイクドキドキだけど'],
    [13.31, '気付いてくれなきゃダメなんだから']
  ],
  5: [
    [0.965, '你问我爱你有多深'],
    [6.685, '我爱你有几分'],
    [12.554, '你去想一想'],
    [15.862, '你去看一看'],
    [18.930, '月亮代表我的心'],
    [24.947, '你去想一想'],
    [27.939, '你去看一看'],
    [30.701, '月亮代表我的心']
  ],
  6: [
    [0, '是你让我看见干枯沙漠开出花一朵'],
    [4.969, '是你让我想要每天为你写一首情歌'],
    [9.7, '用最浪漫的副歌'],
    [11.864, '你也轻轻的附和'],
    [14.559, '眼神坚定着我们的选择'],
    [18.926, '是你让我的世界从那刻变成粉红色'],
    [23.431, '是你让我的生活从此都只要你配合'],
    [27.845, '爱要精心来雕刻'],
    [30.233, '我是米开朗基罗'],
    [32.732, '用心刻画最幸福的风格']
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

  var rollLrc = function (lrc) {
    var lrcdiv = document.getElementById('lrc');
    var lrcul = lrcdiv.getElementsByTagName('ul')[0];
    lrcul.innerHTML = "";
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

const bg = Math.ceil(Math.random()*4)

document.body.style=`background-image: url(img/${bg}.jpg)`

const id = location.search.match(/\?id\=(.*)(&|$)/)[1]
document.addEventListener("DOMContentLoaded",createPlayer.init({
  playername : "player",
  song : id
}),false )  

