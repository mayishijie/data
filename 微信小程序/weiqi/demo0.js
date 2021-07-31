// pages/weiqi/weiqim.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { playframe } from '../../utils/gamago.js';
var gamago= require("../../utils/gamago.js");



Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag:false,
    showFlagDesc: "显示手数",
    weiqiCH:430,
    chessValue: 'Bss',
    dapuFlag: false,
    dapuFlagDesc: '开启打谱模式',
    dapuChessColor: 'B',
    choseChessColorDesc: '使用白棋打谱',
    // chess:["Bqd", "Wdc", "Bpq", "Woc", "Bcp", "Wqo", "Bpe", "Weq", "Bnd", "Wmc", "Bqk", "Wnp", "Bpo", "Wpp", "Bop", "Wqp", "Boq", "Woo", "Bpn", "Wqq", "Bqr", "Wrr", "Bmq", "Wno", "Bpr", "Wrm", "Bpl", "Wkq", "Blp", "Wnm", "Bkp", "Wjp", "Brs", "Wsr", "Brl", "Wqm", "Bpm", "Wkn", "Bjq", "Wiq", "Bjr", "Wip", "Bnk", "Wni", "Bir", "Whr", "Bkr", "Wpj", "Bpk", "Wph"],
    chess:["Bqd", "Wdc", "Bpq", "Woc", "Bcp", "Wqo", "Bpe", "Weq", "Bnd", "Wmc", "Bqk", "Wnp", "Bpo", "Wpp", "Bop", "Wqp", "Boq", "Woo", "Bpn", "Wqq", "Bqr", "Wrr", "Bmq", "Wno", "Bpr", "Wrm", "Bpl", "Wkq", "Blp", "Wnm", "Bkp", "Wjp", "Brs", "Wsr", "Brl", "Wqm", "Bpm", "Wkn", "Bjq", "Wiq", "Bjr", "Wip", "Bnk", "Wni", "Bir", "Whr", "Bkr", "Wpj", "Bpk", "Wph", "Bsp", "Wqn", "Bsm", "Wsn", "Bsl", "Wmk", "Bml", "Wnl", "Bmj", "Wnj", "Blk", "Wok", "Bso", "Wmk", "Brn", "Wmd", "Bnk", "Wmf", "Bpc", "Wde", "Bcm", "Wdl", "Bdm", "Wfl", "Bhe", "Whg", "Bhc", "Wff", "Bkc", "Wid", "Bic", "Wkd", "Ble", "Wme", "Bec", "Web", "Bfc", "Wfb", "Bgb", "Wed", "Bdk", "Wfd", "Bld", "Wke", "Blc", "Wlf", "Bhd", "Wie", "Bif", "Wjf", "Blb", "Wlm", "Bel", "Wfk", "Bdi", "Wob", "Bpb", "Wpa", "Bmb", "Wod", "Bqg", "Wej", "Bch", "Wgc", "Boe", "Wnb", "Bjd", "Wje", "Bjg", "Wjc", "Bjb", "Whf", "Bqh", "Wng", "Bol", "Wmk", "Bne", "Wnc", "Bnk", "Woj", "Bln", "Wlo", "Bko", "Wmn", "Bin", "Wem", "Bgq", "Wek", "Bck", "Wjn", "Bgr", "Wgo", "Bfo", "Wdp", "Bgn", "Wim", "Bhm", "Whl", "Bgl", "Whk", "Bcq", "Wen", "Bco", "Who", "Bfp", "Whb", "Bib", "Wga", "Bka", "Wbg", "Bil", "Wjm", "Bfn", "Whn", "Bqa", "Wbh", "Bdo", "Wbi", "Bci", "Wgm", "Bcg", "Wcf", "Bbj", "Whq", "Bhs", "Wqj", "Brj", "Wqi", "Bri", "Weg", "Bog", "Woh", "Bnf", "Wpg", "Bpf", "Wig", "Boa", "Wna", "Bma", "Wdg", "Bmg", "Wof", "Bbf", "Wbe", "Bog", "Wnh", "Bei", "Wfi", "Bcl", "Weo", "Bep", "Wgp", "Bfq", "Wfm", "Blg", "Wli", "Bpa", "Wge", "Bai", "Wdj", "Bcj", "Wdn", "Bcn", "Wnq", "Bnr", "Wmp", "Bon", "Wjo", "Blq", "Wnn", "Beh", "Wfh", "Bia", "Wha", "Bof", "Wel", "Bjd"],
    // chess: ['aa','bb','cc','dd','ee', 'ae']
    recordingFlag: false,
    recordingDesc:'开启录制'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    if(windowWidth > 500){
      windowWidth = 700;
    }
    this.setData({
      weiqiCW:windowWidth,
      weiqiCH: windowWidth*399/375
    });
    // gamago.initweiqipan({rows:10, cols:10});
    
    let chessArr= ['Waa','Bbb','Bcc','Wdd','Wee', 'Bae']
    chessArr=["Wrm", "Wqm", "Wpm", "Wnm", "Wrl", "Wql", "Wpl", "Wol", "Wnk", "Wrj", "Wqj", "Wpj", "Woj", "Wnj", "Bro", "Boo", "Brn", "Bqn", "Bpn", "Bsm", "Bom", "Bnl", "Bml", "Brk", "Bqk", "Bpk", "Bok"];
    gamago.initweiqipan({chessArr: chessArr, moveShowFlag:true,boardSize:'aass',border: false});
    // gamago.openDrawModel(true)
    // gamago.initweiqipan();
    

  },

  initChess: function(){
    let chess = this.data.chess;
    for(let i=0; i<chess.length; i++){
      let arrtmp = gamago.convert2xy(chess[i])
      console.log(arrtmp);
      let r = arrtmp[0];
      let c = arrtmp[1];
      gamago.luozi(r, c);
    }
  },
  fupan: function(){
    let chess = this.data.chess;
    gamago.initweiqipan({chessFupan:true,chessArr : chess})
  },
  pass: function(){
    gamago.pass();
  },

  rotate: function(){
    gamago.rotate(1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  setShapeColor: function(e){
    let signShap = e.currentTarget.dataset.shape;
    console.log(signShap)
    gamago.setShapeColor(parseInt(signShap));
    console.log(gamago.getDrawGoCross());
  },

  mousedownHandler: function(e){
    console.log("mousedownHandler");
    console.log(gamago.mousedownHandler(e));
  },
  mousemoveHandler: function(e){
    console.log("mousemoveHandler");
    console.log(e.touches[0].x+","+e.touches[0].y)
    console.log('将要落字：'+gamago.mousemoveHandler(e, 'B'));
  },
  mouseoutHandler: function(e){
    console.log("mouseoutHandler");
    gamago.mouseoutHandler(e);
  },
  crossxyDown: function(){
    let chessValue = this.data.chessValue;
    gamago.crossxyDown(chessValue);
  },
  setDynGoCross: function(){
    let chessValue = this.data.chessValue;
    gamago.setDynGoCross(chessValue);
  },

  showFlag: function(){
    let showFlag = !this.data.showFlag
    let showFlagDesc = '';
    if(showFlag){
      showFlagDesc='不显示手数'
    }else{
      showFlagDesc='显示手数'
    }
    gamago.showMoveStep(showFlag)
    this.setData({
      showFlag: showFlag,
      showFlagDesc: showFlagDesc
    })
  },
  lastStep: function(){
    gamago.lastStep();
  },
  nextStep: function(){
    gamago.nextStep();
  },
  go2Step: function(){
    gamago.gotoStep(111);
  },
  regret: function(){
    gamago.regret();
  },
  gg : function(){
    gamago.initweiqipan();
  },
  confirmDownStone: function(){
    let arr = gamago.confirmDownStone();
    console.log('落字位置：'+arr)
  },
  terrain: function(){
    gamago.terrain();
  },
  toastf: function(){
    Toast({
      message: '我是提示文案，建议不超过十五字',
      zIndex:9999,
      duration:300000
    });
  },

  drawDyNum: function(){
    gamago.dynamicNumChess();
  },

  playDraw: function(){
    let gocross = gamago.getDrawGoCross();
    gamago.initweiqipan({ moveShowFlag:true,boardSize:'aass',border: false});
    gamago.playframe(gocross);
  },

  chosDapuFlag: function(){
    let dapuFlag = this.data.dapuFlag
    gamago.chosDapuFlag(!dapuFlag)
    let dapuFlagDesc;
    if(dapuFlag){
      dapuFlagDesc = '开启打谱模式'
    }else{
      dapuFlagDesc = '关闭打谱模式'
    }
    this.setData({
      dapuFlag: !dapuFlag,
      dapuFlagDesc: dapuFlagDesc
    })
  },
  dapuChoseChessColor: function(){
    let dapuChessColor = this.data.dapuChessColor
    let choseChessColorDesc;
    if(dapuChessColor === 'B'){
      dapuChessColor = 'W'
      choseChessColorDesc = '使用黑棋打谱'
    }else{
      dapuChessColor = 'B'
      choseChessColorDesc = '使用白棋打谱'
    }
    gamago.dapuChoseChessColor(dapuChessColor);
    this.setData({
      dapuChessColor: dapuChessColor,
      choseChessColorDesc: choseChessColorDesc
    })
  },
  getPan: function(){
    console.log(gamago.getPan())
  },
  getStep: function(){
    console.log(gamago.getStep())
  },
  recording: function(){
    let recordingDesc;
    let recordingFlag = !this.data.recordingFlag
    if(!this.data.recordingFlag){
      recordingDesc='关闭录制'
    }else{
      recordingDesc='开启录制'
    }
    gamago.openDrawModel(recordingFlag);
    this.setData({
      recordingFlag: recordingFlag,
      recordingDesc: recordingDesc
    });
  },
  closeDrawModel: function(){
    gamago.closeDrawModel();
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      chessValue: event.detail
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function descartes(arr1, arr2){
	// 返回结果，是一个二维数组
	var result = [];
	var i = 0, j = 0;
	for (i = 0; i < arr1.length; i++) {
		var item1 = arr1[i];
		for (j = 0; j < arr2.length; j++) {
			var item2 = arr2[j];
			result.push([item1, item2]);
		}
	}
	return result;
}
