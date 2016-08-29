var size;
var num = 0;
var skillnum = [100, 100, 50];
var suu = 0;
var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer0 = new fieldLayer();
    var layer1 = new gameLayer();
    var layer2 = new charaLayer();
    var layer3 = new particleLayer();
    this.addChild(layer0);
    this.addChild(layer1);
    this.addChild(layer2);
    this.addChild(layer3);

  }
});

var gameLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    size = cc.winSize;
    return true;
  },

});

var fieldLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    var sprite = cc.Sprite.create(res.ss_BattleScene_bg1);
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);
    this.addChild(sprite, 0);
  }
});

var charaLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    //火属性のキャラクター
    var sprite10 = cc.Sprite.create(res.chara_princessselect_10);
    sprite10.setPosition(size.width * 0.3, size.height * 0.3);
    sprite10.setScale(0.8);
    this.addChild(sprite10, 0);

    //火属性　敵ｻｺ中ボスキャラクター
    var sprite4 = cc.Sprite.create(res.chara_enemy_4);
    sprite4.setPosition(size.width * 0.7, size.height * 0.4);
    sprite4.setScale(1.2);
    this.addChild(sprite4, 0);
  }
});

//パーティクル用のレイヤー
var particleLayer = cc.Layer.extend({
  skillSelect: 0,
  skillCnt: 1,

  ctor: function() {
    this._super();
    size = cc.winSize;
    this.scheduleUpdate();
    return true;
  },
  update: function(_dt) {
    if (this.skillCnt == 1) {
      this.skillParticle(this.skillSelect);

    }
    if ((this.skillCnt % skillnum[suu]) == 0) {
      this.skillCnt = 0;

      this.removeAllChildren();
        this.skillSelect++;
        suu++;
        this.skillSelect = this.skillSelect % 3;
        if(suu > 2) suu = 0;
      }
    //フレームをカウントする
    this.skillCnt++;
  },

//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib) {
    var skillName = ["Fire", "ice", "bom"];
    var x = [300, 700, 800, 680, 680, 640,/*ice*/
       370, 300, 312, 680,300, 700, 100];
    var y = [120, 90, 100, 100 , 100, 300, /*ice*/
      155, 200, 127, 120,120, 90, 100];
    var num2 = [5, 3, 8];
    for(var i = 1; i < num2[attrib]; i++){
    var sName = "res." + skillName[attrib] + "Texture" + i + "_plist";
    var tempParticle = new cc.ParticleSystem(eval(sName));
    tempParticle.setPosition(x[num], y[num]);
    num++;
    if(num > 12) num = 0;
      tempParticle.setDuration(5);
      //パーティクル自体の生存時間
    this.addChild(tempParticle, 5);
    tempParticle.setAutoRemoveOnFinish(true);
  }
  },
});
