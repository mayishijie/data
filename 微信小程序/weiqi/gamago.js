var query, dpr, windowWidth, canvasW, canvasH, minW, minWH, move_count, chessArr, role, qbId='G103987', canvasRH, img;
var move_show_flag = false;
var handleArr;
var jie = new Array();
var move_record = new Array();
var rows = 19;//棋盘总行数
var cols = 19;
var border = false;//是否有边
var rotateCnt = 0;//旋转次数
var chessFupan = false;
var dapuFlag = false;
var boardSize = 'aass';
var boardxb, boardyb, boardxe, boardye;
var panRL = 19, panCL = 19;
var boardBg = '/images/qipan.png';
var dynGoCrosses;

/**
 * 初始化棋盘
 * json格式
 * canvasW 棋盘宽 宽高相等
 * chessFupan 默认false，即默认传入chessArr数组只是将数组中的棋摆入棋盘
 *              true为复盘chessArr棋谱每一步的变化并需要合理，false为打谱不考虑棋所在位置合理性
 * chessArr 默认空值。 type为数组，需要初始化到棋盘上的棋子
 * dapuFlag 默认false 默认关闭打谱模式，为true时打开打谱模式，棋盘上到落字将不合围棋规则
 //  * rows(废弃) 默认19 棋盘总行数
 //  * cols(废弃) 默认19 棋盘总列数
 * border 默认true 最后一行/列边框是否显示 true显示 false不显示
 * boardSize 棋盘对角线坐标
 * boardBg 棋盘背景图片地址 不传显示默认棋盘背景
 * dynGoCrosses
 * kps
 * @param params
 */
function initweiqipan(params){
    console.log('params--->');
    console.log(params);

    chessArr = '';
    initSelfParam();
    if(params!== null && params !== undefined){
        if(params.chessFupan !== undefined)
            chessFupan = params.chessFupan;//true为复盘chessArr棋谱每一步的变化并需要合理，false为打谱不考虑棋所在位置合理性
        if(params.dapuFlag !== undefined)
            dapuFlag = params.dapuFlag;//true为开启打谱模式，将不考虑围棋规则，false为关闭打谱模式
        if(params.chessArr !== undefined) chessArr = params.chessArr;//落字数组
        // if(params.rows !== undefined) rows = params.rows//棋盘总行数
        // if(params.cols !== undefined) cols = params.cols//棋盘总列数
        if(params.border !== undefined) border = params.border//最后一行/列边框是否显示
        if(params.boardSize !== undefined) boardSize = params.boardSize
        if(params.moveShowFlag !== undefined) move_show_flag = params.moveShowFlag//是否显示手数
        if(params.boardBg !== undefined) boardBg = params.boardBg//背景图片
        if(params.role !== undefined) role = params.role//背景图片
        if(params.qbId !== undefined) qbId = params.qbId//qbId
        if(params.dynGoCrosses !== undefined) dynGoCrosses = params.dynGoCrosses//dynGoCross
        if(params.kps !== undefined) kps = params.kps//dynGoCross
    }

    boardxb = convert2Asc(boardSize.charAt(0))
    boardyb = convert2Asc(boardSize.charAt(1))
    boardxe = convert2Asc(boardSize.charAt(2))
    boardye = convert2Asc(boardSize.charAt(3))
    rows = boardye-boardyb+1;
    cols = boardxe-boardxb+1;

    dpr = wx.getSystemInfoSync().pixelRatio;//像素比
    windowWidth = wx.getSystemInfoSync().windowWidth;
    move_count = 0;
    handleArr = new Array();
    query = wx.createSelectorQuery()
    jie = new Array();
    move_record = new Array();
    pan = getiPan(19, 19);
    shadow = getiPan(19, 19);
    signPan = getiPan(19, 19);
    if(border){//有边框的为小棋盘
        pan = getiPan(rows, cols);
        shadow = getiPan(rows, cols);
        panRL = rows;
        panCL = cols;
        signPan = getiPan(rows, cols);
    }
    if(chessArr !== null && chessArr !== undefined){
        initPanArr(chessArr);
    }
    if(dynGoCrosses !== null && dynGoCrosses!== undefined){
        setDynGoCrosses();
    }

    saveHandle();
    initBoard();
}

function initSelfParam(){
    move_show_flag = false;
    jie = new Array();
    move_record = new Array();
    rotateCnt =0;
    rows = 19;
    cols = 19;
    border = false;
    chessFupan = false;
    dapuFlag = false;
    boardSize = 'aass';
    panRL = 19, panCL = 19;
    drawFlag=false;
    boardBg = '/images/qipan.png';
    qbId = '';

    // signShape, signColor, signPan,
    numSignRecord={},numSignCnt=0,
        zimuSignRecord={}, zimuSignCnt=0,
        sign_record = new Array(),
        sign_handleArr = new Array(),
        drawGoCross='';
    drawFlag = false;


    tuozhuaiFlag = false, tuozhuaing=false;
    dynGoCrosses = null;
    kps = new Array(), kpscolor='red';
}

function initBoard() {
    query.select('#weiqi')
        .fields({ node: true, size: true })
        .exec((res) => {
            const width = res[0].width * dpr
            const height = res[0].height * dpr
            canvasRH = height
            console.log('aaaaah'+height)
            const canvas = res[0].node
            if(img == null || img === undefined){
                canvas.width = width
                canvas.height = height
            }
            canvasW = width
            minW = width/(cols+1)//最小单元格长度
            minWH = minW/2//棋子半径
            canvasH = minW*(rows+1)

            console.log('canvasW='+canvasW);
            console.log('canvasH='+canvasH);
            console.log('minW='+minW);
            console.log('minWH='+minWH);
            showPan();
        });

}

function cleanImg(){
    img = null;
}

function grid(cxt) {
    for (let i = boardyb; i <= boardye; i++) {
        if(!border && ((i == boardyb && i !== 0) || (i === boardye && i !== 18)) ){
            continue;
        }
        cxt.beginPath();
        cxt.strokeStyle='#AE7F53';
        cxt.lineWidth=2;

        if(i == 0 || i == 18 || (border && (i === boardyb || i===boardye))){
            cxt.strokeStyle='#A47342';
            cxt.lineWidth=4;
        }

        let i_ = i-boardyb;
        cxt.moveTo(0+minW,   (i_+1)*minW);
        cxt.lineTo(rows*minW, (i_+1)*minW);
        cxt.stroke();
    }
    for (let i = boardxb; i <= boardxe; i++) {
        if(!border && ((i == boardxb && i !== 0) || (i === boardxe && i !== 18)) ){
            continue;
        }
        cxt.beginPath();
        cxt.strokeStyle='#AE7F53';
        cxt.lineWidth=2;
        if(i == 0 || i == 18 || (border && (i === boardxb || i===boardxe))){
            cxt.strokeStyle='#A47342';
            cxt.lineWidth=4;
        }
        let i_ = i-boardxb;
        cxt.moveTo((i_+1)*minW,   0+minW);
        cxt.lineTo((i_+1)*minW, cols*minW);
        cxt.stroke();
    }
}
function ninePoints(cxt) {
    if(border && rows<19){
        return;
    }

    let xp = new Array();
    let yp = new Array();
    if(boardxb < 3 && boardxe > 3){
        xp.push(4-boardxb);
    }
    if(boardxb < 9 && boardxe > 9){
        xp.push(10-boardxb);
    }
    if(boardxb < 15 && boardxe > 15){
        xp.push(16-boardxb);
    }
    if(boardyb < 3 && boardye > 3){
        yp.push(4-boardyb);
    }
    if(boardyb < 9 && boardye > 9){
        yp.push(10-boardyb);
    }
    if(boardyb < 15 && boardye > 15){
        yp.push(16-boardyb);
    }
    let np = descartes(xp, yp);

    let radiusP = minW/8
    for (var i = 0; i < np.length; i++) {
        //circle
        cxt.beginPath();
        cxt.arc(np[i][0]*minW,np[i][1]*minW,radiusP,0,2*Math.PI,false);
        cxt.fillStyle="#AE7F53";
        cxt.fill();
    }
}
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

function drawRCDesc(cxt){
    let fontSize = minWH;
    cxt.fillStyle="#A47342";
    cxt.font="300 "+fontSize+"px sans-serif";
    cxt.textAlign="center";
    for(let i=0; i<rows; i++){
        cxt.fillText(boardyb+i+1, minWH+minWH/6, (i+1)*minW+8);
        cxt.fillText(boardyb+i+1, canvasW-minWH-minWH/6, (i+1)*minW+8);
    }
    for(let i=0; i<cols; i++){
        let zimu = String.fromCharCode(boardxb+i+65)
        cxt.fillText(zimu, (i+1)*minW, minWH+minWH*2/3);
        cxt.fillText(zimu, (i+1)*minW, canvasH-minWH+minWH/10);
    }

    /** //TODO 旋转，暂不考虑了  **/
    /**
     if(rotateCnt>10){
		cxt.translate(canvasW/2,canvasW/2);
		cxt.rotate(Math.PI/2*rotateCnt);//正方向旋转90度
	}


     rotateCnt=0
     console.log('rotateCnt%4='+(rotateCnt%4))
     switch(rotateCnt%4){
		case 0:
			for(let i=0; i<rows; i++){
				cxt.fillText(i+1, minWH, (i+1)*minW+8);
			}
			for(let i=0; i<cols; i++){
				let zimu = String.fromCharCode(i+65)
				cxt.fillText(zimu, (i+1)*minW, minWH+6);
			}
			break;
		case 1:
			for(let i=0; i<rows; i++){
				// cxt.translate( (i+1)*minW , 20*minW-6 )
				// cxt.fillText(i+1, (i+1)*minW, 20*minW-6);
				// cxt.translate( -(i+1)*minW , -(20*minW-6) )
			}
			cxt.translate( minW , 20*minW-6 )

			cxt.rotate ( 270* Math.PI/180 );
			cxt.fillText(66, 20, 26);
			cxt.fillText(1, minW, 20*minW-6);
			// cxt.translate( 0 , 0 )
			cxt.translate( -minW , -20*minW+6 )
			// cxt.restore();

			for(let i=0; i<cols; i++){
				let zimu = String.fromCharCode(i+65)
				cxt.fillText(zimu, (i+1)*minW, minWH+6);
			}
			break;
		case 2:

			break;
		case 3:

			break;
	}
     if(rotateCnt>10){
		cxt.translate(-canvasW/2,-canvasW/2);
	}
     **/
}

function showPan() {
    query.select('#weiqi')
        .fields({ node: true, size: true })
        .exec((res) => {
            const canvas = res[0].node
            let cxt = canvas.getContext('2d');
            img = canvas.createImage()
            img.src = boardBg;

            img.onload = () => {
                cxt.drawImage(img,0,0,canvasW,canvasRH);
                showPanCxt(cxt);
                drawSignShapPan(cxt);
                drawKPS(cxt);
                drawQbId(cxt);
            }
        });
}

function drawQbId(cxt){
    let fontSize = 10/379*canvasW;

    let qx_ = 330/379*canvasW;
    let qy_ = 392/397*canvasRH;

    cxt.fillStyle="#742D11";
    cxt.font="300 "+fontSize+"px sans-serif";
    cxt.textAlign="center";
    cxt.fillText(qbId, qx_, qy_);
}

function showPanCxt(cxt) {
    cxt.strokeStyle="black";

    grid(cxt);
    ninePoints(cxt);
    drawRCDesc(cxt);

    for (var i = 0; i < panRL; i++) {
        for (var j = 0; j < panCL; j++) {
            let i_ = i-boardxb
            let j_ = j-boardyb
            if(i_ < 0 || j_ < 0){//落在棋盘外的子不绘制
                continue;
            }
            if (pan[i][j] === 1) { //black
                let rg = cxt.createRadialGradient((i_+1)*minW+2, (j_+1)*minW+2, 23, (i_+1)*minW+2, (j_+1)*minW+2, minWH-2);
                rg.addColorStop(0, "#FEDBB2");
                rg.addColorStop(1, /*"lightgray"*/"#B88A5A");
                cxt.beginPath();
                cxt.arc((i_+1)*minW+2, (j_+1)*minW+2,minWH-2,0,2*Math.PI,false);
                cxt.fillStyle=rg;
                cxt.fill();

                rg = cxt.createRadialGradient((i_+1)*minW-8, (j_+1)*minW-8, 1, (i_+1)*minW-10, (j_+1)*minW-10, 20);
                rg.addColorStop(0, "#6F706F");
                rg.addColorStop(1, /*"black"*/"#010101");
                cxt.beginPath();
                cxt.arc((i_+1)*minW, (j_+1)*minW,minWH-2,0,2*Math.PI,false);
                cxt.fillStyle=rg;
                cxt.fill();

                // cxt.drawImage(blackChessImg, (i_+1)*minW-minWH+3, (j_+1)*minW-minWH+3, minW,minW);

            }
            else if (pan[i][j] === 2) { //white
                let rg = cxt.createRadialGradient((i_+1)*minW+2, (j_+1)*minW+2, 23, (i_+1)*minW+2, (j_+1)*minW+2, minWH-2);
                rg.addColorStop(0, "#FEDBB2");
                rg.addColorStop(1, /*"lightgray"*/"#B88A5A");
                cxt.beginPath();
                cxt.arc((i_+1)*minW+2, (j_+1)*minW+2,minWH-2,0,2*Math.PI,false);
                cxt.fillStyle=rg;
                cxt.fill();

                rg = cxt.createRadialGradient((i_+1)*minW-8, (j_+1)*minW-8, 1, (i_+1)*minW-10, (j_+1)*minW-10, 20);
                rg.addColorStop(0, "#F9F9F9");
                rg.addColorStop(1, /*"lightgray"*/"#E9E7E3");
                cxt.beginPath();
                cxt.arc((i_+1)*minW, (j_+1)*minW,minWH-2,0,2*Math.PI,false);
                cxt.fillStyle=rg;
                cxt.fill();

                // cxt.drawImage(whiteChessImg, (i_+1)*minW-minWH+3, (j_+1)*minW-minWH+3, minW,minW);
            }
            else if (pan[i][j] === 7) { // fill color
                cxt.beginPath();
                cxt.arc((i_+1)*minW, (j_+1)*minW,minWH,0,2*Math.PI,false);
                cxt.fillStyle="red";
                cxt.fill();
            }
        }
    }

    // 显示手数
    if (move_show_flag) {
        for (var m = 0; m < move_record.length-1; m++) { // 最新的一手由后面的红色标记
            if(move_record[m][0]===panCL || move_record[m][1] === panRL)
                continue;
            // 先判断一下棋子还在不在棋盘上
            if (pan[move_record[m][0]][move_record[m][1]] === 0)
                continue;

            // 而且只应该画最新的数字（打劫后，可能导致一个坐标上重复许多步数）
            var repeat_move_flag = false;
            for (var j = m+1; j < move_record.length; j++) {
                if (move_record[m][0] === move_record[j][0] &&
                    move_record[m][1] === move_record[j][1]) {
                    repeat_move_flag = true;
                    break;
                }
            }
            if (repeat_move_flag)
                continue;

            // 这下可以放心绘制手数数字啦
            if (move_record[m][2] % 2 === 1) { //black
                cxt.fillStyle="white";
            } else {
                cxt.fillStyle="black";
            }
            let fontSize = minWH;
            cxt.font="bold "+fontSize+"px sans-serif";
            if (move_record[m][2] > 99) {
                cxt.font="bold "+(fontSize-2)+"px sans-serif";
            }
            // cxt.font="bold 20px sans-serif";
            cxt.textAlign="center";
            var move_msg = move_record[m][2].toString();
            cxt.fillText(move_msg, (move_record[m][0]+1-boardxb)*minW, (move_record[m][1]+1-boardyb)*minW+minWH/3);
        }
    }
    // 特别显示最新的一手
    if (move_record.length > 0) {
        cxt.fillStyle = "red";
        // var newest_move = move_record.length-1;
        var newest_move = move_count-1;
        cxt.fillRect(
            (move_record[newest_move][0]+1-boardxb)*minW-minWH/2,
            (move_record[newest_move][1]+1-boardyb)*minW-minWH/2,
            minWH, minWH
        );
    }
}

function showMoveStep(flag){
    move_show_flag = flag
    showPan()
}


var voiceFlag = true;
function palyVoice(){
    if(voiceFlag){
        let iac = wx.createInnerAudioContext({})
        iac.src='/voice/stone.mp3';
        iac.play();
    }
}
function setVoiceFlag(voiceFlag_){
    voiceFlag = voiceFlag_;
}
function getVoiceFlag(){
    return voiceFlag;
}

function mousedownHandler(e, role) {
    if(dapuFlag){
        return dapuMousedownHandler(e);
    }
    if(drawFlag){
        return signMousedownHandler(e);
    }
    if(move_count % 2 == 0 && role === 'W'){
        console.log('该黑下')
        return false;
    }
    if(move_count % 2 == 1 && role === 'B'){
        console.log('该白下')
        return false;
    }
    let offsetX = e.touches[0].x*dpr
    let offsetY = e.touches[0].y*dpr
    var x, y;
    if (e.touches[0].x || e.touches[0].y == 0) {
        x = offsetX; //- imageView.offsetLeft;
        y = offsetY; //- imageView.offsetTop;
    }
    if (x < minWH || x > canvasW-minWH)
        return;
    if (y < minWH || y > canvasW-minWH)
        return;

    var xok = false;
    var yok = false;
    var x_;
    var y_;
    for (var i = 1; i <= 19; i++) {
        if (x > i*minW-minWH && x < i*minW+minWH) {
            x = i*minW;
            xok = true;
            x_ = i - 1;
        }
        if (y > i*minW-minWH && y < i*minW+minWH) {
            y = i*minW;
            yok = true;
            y_ = i - 1;
        }
    }
    x_ += boardxb
    y_ += boardyb
    if(!border && ((x_ === boardxb && x_ !== 0) || (x_ === boardxe && x_ !== 18)
        || (y_ === boardyb && y_ !== 0) || (y_  === boardye && y_ !== 18))){
        return;
    }
    console.log(x_+","+y_)
    if (!xok || !yok)
        return;

    let playFlag = play(x_, y_, move_count);
    if(!playFlag){
        return playFlag;
    }
    showPan();
    let chess_;
    if(move_count%2 === 1){
        chess_ = 'B'+String.fromCharCode(x_+97)+String.fromCharCode(y_+97);
    }else{
        chess_ = 'W'+String.fromCharCode(x_+97)+String.fromCharCode(y_+97);
    }
    console.log(x_+", "+ y_);
    palyVoice();
    return chess_;
}

function mousemoveHandler(e, role) {
    if(dapuFlag){
        return dapuMousedownHandler(e);
    }
    if(move_count % 2 == 0 && role === 'W'){
        console.log('该黑下')
        return false;
    }
    if(move_count % 2 == 1 && role === 'B'){
        console.log('该白下')
        return false;
    }
    let offsetX = e.touches[0].x*dpr
    let offsetY = e.touches[0].y*dpr
    var x, y;
    if (e.touches[0].x || e.touches[0].y == 0) {
        x = offsetX ;//- imageView.offsetLeft;
        y = offsetY ;//- imageView.offsetTop;
    }
    if (x < minWH || x > canvasW-minWH)
        return;
    if (y < minWH || y > canvasW-minWH)
        return;

    var xok = false;
    var yok = false;
    var x_;
    var y_;
    for (var i = 1; i <= 19; i++) {
        if (x > i*minW-minWH && x < i*minW+minWH) {
            x = i*minW;
            xok = true;
            x_ = i - 1;
        }
        if (y > i*minW-minWH && y < i*minW+minWH) {
            y = i*minW;
            yok = true;
            y_ = i - 1;
        }
    }
    x_ += boardxb
    y_ += boardyb
    if(!border && ((x_ === boardxb && x_ !== 0) || (x_ === boardxe && x_ !== 18)
        || (y_ === boardyb && y_ !== 0) || (y_  === boardye && y_ !== 18))){
        return;
    }
    if (!xok || !yok)
        return;

    tmpx = x;
    tmpy = y;

    query.select('#weiqi')
        .fields({ node: true, size: true })
        .exec((res) => {
            const canvas = res[0].node
            let cxt = canvas.getContext('2d');
            const img = canvas.createImage()
            img.src = boardBg;
            img.onload = () => {
                cxt.drawImage(img,0,0,canvasW,canvasRH);
                showPanCxt(cxt);
                drawPreChess(cxt,x,y);

                drawQbId(cxt);
            }
        });

    let chess_;
    if(move_count%2 === 0){
        chess_ = 'B'+String.fromCharCode(x_+97)+String.fromCharCode(y_+97);
    }else{
        chess_ = 'W'+String.fromCharCode(x_+97)+String.fromCharCode(y_+97);
    }
    // console.log(x_+", "+ y_);
    return chess_;
}
function drawPreChess(cxt, x, y){
    // put a new Gray stone
    cxt.beginPath();
    cxt.arc(x,y,minWH,0,2*Math.PI,false);
    cxt.fillStyle="gray";
    cxt.fill();

    cxt.beginPath();
    cxt.arc(x,y,minWH*2/3,0,2*Math.PI,false);
    if (move_count % 2 == 0)
        cxt.fillStyle="black";
    else
        cxt.fillStyle="white";
    cxt.fill();


    cxt.beginPath();
    cxt.lineWidth=2;
    cxt.strokeStyle = 'blue'
    cxt.moveTo(x,  1*minW);
    cxt.lineTo(x, cols*minW);
    cxt.stroke();

    cxt.beginPath();
    cxt.lineWidth=2;
    cxt.strokeStyle = 'blue'
    cxt.moveTo(1*minW,  y);
    cxt.lineTo(rows*minW, y);
    cxt.stroke();
}

function mouseoutHandler(e) {
    query.select('#path')
        .fields({ node: true, size: true })
        .exec((res) => {
            const canvas = res[0].node
            var cxt = canvas.getContext("2d");
            cxt.clearRect(0,0,canvasW,canvasW);
        });
}

/**
 * 根据传入的坐标落字
 * 落字不看颜色
 * 落字严格遵守第一颗子黑色顺序落下
 */
function crossxyDown(crossXY){
    let corssColor = crossXY.charAt(0);
    let x_ = convert2Asc(crossXY.charAt(1));
    let y_ = convert2Asc(crossXY.charAt(2));
    play(x_, y_, move_count);
    showPan();
}



// --------------------------------------------------------------------------------------------------
var pan = new Array(
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
);
var shadow = new Array(
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
);
function getiPan(r_, c_){
    let panRarr = new Array();
    for(let i=0; i<r_; i++){
        let panCarr = new Array();
        for(let j=0; j<c_; j++){
            panCarr[j] = 0;
        }
        panRarr[i] = panCarr;
    }
    return panRarr;
}


function play(row, col) {
    if (row < 0 || row > panRL || col < 0 || col > panCL) {
        alert("index error....");
        return false;
    }
    // 处理已有棋子在此
    if (pan[row][col] != 0) {
        alert("此处已有棋子！");
        return false;
    }

    var can_down = false; // 是否可落子
    // 得到将落子的棋子的颜色
    var color = 2; // 白
    if (move_count % 2 === 0) { // 未落子前是白
        color = 1;
    }

    if (!have_air(row, col)) {
        if (have_my_people(row, col)) {
            make_shadow();

            flood_fill(row, col, color);
            if (fill_block_have_air(row, col, color)) {
                can_down = true;
                var dead_body = new Array();
                can_eat(row, col, color, dead_body);
                clean_dead_body(dead_body);
            } else {
                var dead_body = new Array();
                var cret = can_eat(row, col, color, dead_body);
                clean_dead_body(dead_body);

                if (cret) {
                    can_down = true;
                } else {
                    alert("无气，不能落子！！");
                }
            }
        } else {
            var dead_body = new Array();
            var cret = can_eat(row, col, color, dead_body);

            // 劫争也应该在此处理，只在此处理？
            if (cret) {
                if (!is_jie(row, col, dead_body)) {
                    clean_dead_body(dead_body);
                    can_down = true;
                } else {
                    alert("劫, 不能落子, 请至少隔一手棋！");
                    return false;
                }
            }else{
                alert("无气，不能落子！！");
            }
        }
    } else {
        can_down = true;
        var dead_body = new Array();
        can_eat(row, col, color, dead_body);
        clean_dead_body(dead_body);
    }
    if (can_down) {
        stone_down(row, col);
        return true;
    }else{
        return false;
    }
}


function is_jie(row, col, dead_body) { //是否劫
    //只吃了一个？ 希望我对围棋的理解没错，单劫都是只互吃一个。
    if (dead_body.length === 1) {
        for (var i = 0; i < jie.length; i++) {
            //若符合（有坐标，且move_count就是上一手）
            //注意此处比较的是死去的棋子，下面push的是本次落子的棋子
            if (	jie[i][0] === dead_body[0][0] &&
                jie[i][1] === dead_body[0][1] &&
                jie[i][2] === move_count) {
                return true;
            }
        }
        //加入记录表
        jie.push([row, col, move_count+1]);
        return false;
    }
    return false;
}

/* 能提吃吗？ */
function can_eat(row, col, color, dead_body) { // color 是当前要落子的颜色
    var ret = false;
    var anti_color = 2;
    if (color === 2)
        anti_color = 1;

    if (row+1 <= panRL-1 && pan[row+1][col] === anti_color) {
        make_shadow();
        shadow[row][col] = color;
        flood_fill(row+1, col, anti_color);
        if (!anti_fill_block_have_air(anti_color)) {
            // 记录下这些7的坐标，以及(row+1,col)，表示可以提吃的对方棋子
            //alert("提吃: "+(row+1).toString()+","+col.toString());
            var rret = record_dead_body(dead_body);
            ret = ret || rret;
        }

    }
    if (row-1 >= 0 && pan[row-1][col] === anti_color) {
        make_shadow();
        shadow[row][col] = color;
        flood_fill(row-1, col, anti_color);
        if (!anti_fill_block_have_air(anti_color)) {
            var rret = record_dead_body(dead_body);
            ret = ret || rret;
        }

    }
    if (col+1 <= panCL-1 && pan[row][col+1] === anti_color) {
        make_shadow();
        shadow[row][col] = color;
        flood_fill(row, col+1, anti_color);
        if (!anti_fill_block_have_air(anti_color)) {
            var rret = record_dead_body(dead_body);
            ret = ret || rret;
        }

    }
    if (col-1 >= 0 && pan[row][col-1] === anti_color) {
        make_shadow();
        shadow[row][col] = color;
        flood_fill(row, col-1, anti_color);
        if (!anti_fill_block_have_air(anti_color)) {
            var rret = record_dead_body(dead_body);
            ret = ret || rret;
        }

    }
    return ret;
}

function record_dead_body(db) {
    var ret = false;
    for (var row = 0; row < shadow.length; row++) {
        for (var col = 0; col < shadow[row].length; col++) {
            if (shadow[row][col] === 7) {
                db.push([row, col]);
                ret = true; // it's true have dead body
                //alert("DEAD: "+(row).toString()+","+col.toString());
            }
        }
    }
    return ret;
}
function clean_dead_body(db) {
    let handleArrTmp_ = JSON.stringify(handleArr);
    for (var i = 0; i < db.length; i++) {
        pan[db[i][0]][db[i][1]] = 0;
        //alert("OUT: "+(db[i][0]).toString()+","+(db[i][1]).toString());
    }
    handleArr = JSON.parse(handleArrTmp_);
}

/* 填充的区域周围是否有空 */
function fill_block_have_air(row, col, color) {
    for (var i = 0; i < pan.length; i++) {
        for (var j = 0; j < pan[i].length; j++) {
            if (i !== row || j !== col) {
                if (shadow[i][j] === 7 && pan[i][j] !== color) {
                    return true; // 此块有空，可下
                }
            }
        }
    }
    //alert("fill block 无气！！！");
    return false;
}
/* 提吃判断专用 */
function anti_fill_block_have_air(color) {
    for (var i = 0; i < pan.length; i++) {
        for (var j = 0; j < pan[i].length; j++) {
            if (shadow[i][j] === 7 && pan[i][j] !== color) {
                return true; // 活
            }
        }
    }
    //alert("anti fill block 无气！！！");
    return false; //死
}
/* 将盘面做个影分身 */
function make_shadow() {
    for (var i = 0; i < pan.length; i++) {
        for (var j = 0; j < pan[i].length; j++) {
            shadow[i][j] = pan[i][j];
        }
    }
}
function shadow_to_pan() {
    for (var i = 0; i < pan.length; i++) {
        for (var j = 0; j < pan[i].length; j++) {
            pan[i][j] = shadow[i][j];
        }
    }
}

/* 泛洪填充，只操作影分身 */
function flood_fill(row, col, color) { // color 为当前要填充的颜色
    if (row < 0 || row > panRL-1 || col < 0 || col > panCL-1)
        return;

    var anti_color = 2;
    if (color === 2)
        anti_color = 1;

    if (shadow[row][col] !== anti_color && shadow[row][col] !== 7) { // 非color颜色，且未被填充
        shadow[row][col] = 7; // 表示已被填充
        flood_fill(row+1, col, color);
        flood_fill(row-1, col, color);
        flood_fill(row, col+1, color);
        flood_fill(row, col-1, color);
    }
}

/* 坐标周围4交叉点有气否？ */
function have_air(row, col) {
    if (row > 0 && row < panRL-1 && col > 0 && col < panCL-1) { //非边角 1->17(0->18)
        if (	pan[row+1][col] !== 0 &&
            pan[row-1][col] !== 0 &&
            pan[row][col+1] !== 0 &&
            pan[row][col-1] !== 0 ) {
            //alert("have no air");
            return false;
        } else {
            //alert("have air");
            return true;
        }
    } else if (row === 0 && col > 0 && col < panCL-1) { // 边
        if (	pan[row+1][col] !== 0 &&
            pan[row][col+1] !== 0 &&
            pan[row][col-1] !== 0 ) {
            //alert("have no air");
            return false;
        } else {
            //alert("have air");
            return true;
        }
    } else if (row === panRL-1 && col > 0 && col < panCL-1) {
        if (	pan[row-1][col] !== 0 &&
            pan[row][col+1] !== 0 &&
            pan[row][col-1] !== 0 ) {
            return false;
        } else {
            return true;
        }
    } else if (col === 0 && row > 0 && row < panRL-1) {
        if (	pan[row][col+1] !== 0 &&
            pan[row+1][col] !== 0 &&
            pan[row-1][col] !== 0 ) {
            return false;
        } else {
            return true;
        }
    } else if (col === panCL-1 && row > 0 && row < panRL-1) {
        if (	pan[row][col-1] !== 0 &&
            pan[row+1][col] !== 0 &&
            pan[row-1][col] !== 0 ) {
            return false;
        } else {
            return true;
        }
    } else if (row === 0 && col === 0) { // 角
        if (	pan[row][col+1] !== 0 &&
            pan[row+1][col] !== 0) {
            return false;
        } else {
            return true;
        }
    } else if (row === 0 && col === panCL-1) {
        if (	pan[row][col-1] !== 0 &&
            pan[row+1][col] !== 0) {
            return false;
        } else {
            return true;
        }
    } else if (row === panRL-1 && col === 0) {
        if (	pan[row][col+1] !== 0 &&
            pan[row-1][col] !== 0) {
            return false;
        } else {
            return true;
        }
    } else if (row === panRL-1 && col === panCL-1) {
        if (	pan[row][col-1] !== 0 &&
            pan[row-1][col] !== 0) {
            return false;
        } else {
            return true;
        }
    }

}

/* 坐标周围是否有我方的棋子 */
function have_my_people(row, col) { //FIXME 边角没有处理呢
    if (row > 0 && row < panRL-1 && col > 0 && col < panCL-1) { //非边角 1->17(0->18)
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row+1][col] === 1 ||
                pan[row-1][col] === 1 ||
                pan[row][col+1] === 1 ||
                pan[row][col-1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row+1][col] === 2 ||
                pan[row-1][col] === 2 ||
                pan[row][col+1] === 2 ||
                pan[row][col-1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (row === 0 && col > 0 && col < panCL-1) { // 边
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row+1][col] === 1 ||
                pan[row][col+1] === 1 ||
                pan[row][col-1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row+1][col] === 2 ||
                pan[row][col+1] === 2 ||
                pan[row][col-1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (row === panRL-1 && col > 0 && col < panCL-1) { // 边
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row-1][col] === 1 ||
                pan[row][col+1] === 1 ||
                pan[row][col-1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row-1][col] === 2 ||
                pan[row][col+1] === 2 ||
                pan[row][col-1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (col === panCL-1 && row > 0 && row < panRL-1) {
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row+1][col] === 1 ||
                pan[row-1][col] === 1 ||
                pan[row][col-1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row+1][col] === 2 ||
                pan[row-1][col] === 2 ||
                pan[row][col-1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (col === 0 && row > 0 && row < panRL-1) {
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row+1][col] === 1 ||
                pan[row-1][col] === 1 ||
                pan[row][col+1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row+1][col] === 2 ||
                pan[row-1][col] === 2 ||
                pan[row][col+1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (row === 0 && col === 0) { // 角
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row+1][col] === 1 ||
                pan[row][col+1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row+1][col] === 2 ||
                pan[row][col+1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (row === 0 && col === panCL-1) { // 角
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row+1][col] === 1 ||
                pan[row][col-1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row+1][col] === 2 ||
                pan[row][col-1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (row === panRL-1 && col === 0) { // 角
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row-1][col] === 1 ||
                pan[row][col+1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row-1][col] === 2 ||
                pan[row][col+1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    } else if (row === panRL-1 && col === panCL-1) { // 角
        if (move_count % 2 === 0) { //未落子前是白
            if (	pan[row-1][col] === 1 ||
                pan[row][col-1] === 1 ) {
                //alert("have my people");
                return true;
            }
        } else {
            if (	pan[row-1][col] === 2 ||
                pan[row][col-1] === 2 ) {
                //alert("have my people");
                return true;
            }
        }
    }

    return false;
}

// 真正落子
function stone_down(row, col) {
    let color_;
    if (move_count % 2 === 0) { //未落子前是白
        pan[row][col] = 1; //就放黑
        color_ = 'B';
    } else {
        pan[row][col] = 2;
        color_ = 'W';
    }
    move_count ++;
    saveHandle();
    move_record.push([row, col, move_count]);	// 记录手数
    let mc_ = move_count;
    if(move_count<10){
        mc_ = '0'+move_count.toString()
    }
    drawGoCross += color_ + String.fromCharCode(row+97) + String.fromCharCode(col+97) + 'S' + mc_ +'000';
    // console.log(drawGoCross);
}

function saveHandle(){
    handleArr.push(JSON.parse(JSON.stringify(pan)));
}


//-------------------
function alert(msg){
    wx.showToast({
        title: msg, //弹框内容
        icon: 'none',  //弹框模式
        duration: 1500    //弹框显示时间
    })
}
function updShowFlag(showFlag){
    move_show_flag=showFlag
}
function regret(){
    if(move_count == 0){
        alert("已经不能再悔了");
        return false;
    }
    // handleArr[move_count]=0;
    move_count--
    pan = handleArr[move_count];
    move_record.pop();
    handleArr.pop();
    showPan();
    return true;
}

function lastStep(){
    if(move_count == 0){
        alert("不能再上一手");
        return;
    }
    move_count--
    // console.log('move_count'+move_count);
    pan = handleArr[move_count];
    // move_record.pop();
    showPan();
    return move_count;
}

function nextStep(){
    if(move_record.length < move_count+1){
        console.log('没有下一步了');
        alert("没有下一手了");
        return false;
    }
    move_count++
    pan = handleArr[move_count];
    showPan();
    return move_count;
    // if(chessArr === null || chessArr === '' || chessArr === undefined){
    // 	console.log('对战无下一步');
    // 	return false;
    // }
    // if(handleArr.length === 0 || handleArr.length === move_count+1){
    // 	alert("没有下一手");
    //   return;
    // }
    // let chess = chessArr[move_count];
    // move_count++
    // move_record.push([convert2Asc(chess.charAt(0)), convert2Asc(chess.charAt(1)), move_count]);	// 记录手数
    // pan = handleArr[move_count];
    // showPan();
}
function gotoStep(step){
    let l = handleArr.length;
    if(step < 0 || step >l){
        console.log('没有对应手数');
        return false;
    }
    move_count = step;
    pan = handleArr[move_count];
    showPan();
    return move_count;
}

var tmpx,tmpy;
function confirmDownStone(){
    console.log('落子位置'+tmpx+","+tmpy);
    if(tmpx == 0 &&  tmpy == 0)
        alert("请选择落字位置")
    let x = tmpx;
    let y = tmpy;
    if (x < minWH || x > canvasW-minWH)
        return;
    if (y < minWH || y > canvasW-minWH)
        return;

    var xok = false;
    var yok = false;
    var x_;
    var y_;
    for (var i = 1; i <= 19; i++) {
        if (x > i*minW-minWH && x < i*minW+minWH) {
            x = i*minW;
            xok = true;
            x_ = i - 1;
        }
        if (y > i*minW-minWH && y < i*minW+minWH) {
            y = i*minW;
            yok = true;
            y_ = i - 1;
        }
    }
    x_ += boardxb
    y_ += boardyb
    console.log(x_+","+y_)
    if (!xok || !yok)
        return;

    play(x_, y_, move_count);
    showPan();
    tmpx = 0;
    tmpy = 0;
    let chess_;
    if(move_count%2 === 1){
        chess_ = 'B'+String.fromCharCode(x_+97)+String.fromCharCode(y_+97);
    }else{
        chess_ = 'W'+String.fromCharCode(x_+97)+String.fromCharCode(y_+97);
    }
    console.log(x_+", "+ y_);
    palyVoice();
    return chess_;
}

function luozi(x, y){
    play(x, y, move_count);
    showPan();
}

function convert2xy(str){
    if(str.length < 2){
        console.log("字符串长度<2")
        return false;
    }
    let arr =  [convert2Asc(str.charAt(0)), convert2Asc(str.charAt(1))];
    return arr;
}
function convert2Asc(c){
    let c_ = c.charCodeAt(0);
    if(c_ < 105){
        c_ = c_-97;
    }else{
        c_ = c_-97;
    }
    return c_;
}
function initPanArr(chess){
    if(chess.length == 0){
        return false;
    }
    for(let i=0; i<chess.length; i++){
        let chessTmp = chess[i];
        let chessColor = chessTmp.charAt(0);
        let r = convert2Asc(chessTmp.charAt(1));
        let c = convert2Asc(chessTmp.charAt(2));

        if(chessFupan){
            play(r, c);
        }else{
            if(chessColor == 'B'){
                pan[r][c] = 1
            }else{
                pan[r][c] = 2
            }
        }
    }
}
function pass(){
    // move_count++
    // move_record.push([19, 19, move_count]);
    // stone_down(19, 19);
    move_count ++;
    saveHandle();
    move_record.push([19, 19, move_count]);	// 记录手数
}

function rotate(cnt){
    if(cnt === null || cnt === undefined){
        cnt = 1;
    }
    query.select('#weiqi')
        .fields({ node: true, size: true })
        .exec((res) => {
            const canvas = res[0].node
            let cxt = canvas.getContext('2d');
            cxt.translate(canvasW/2,canvasW/2);
            cxt.rotate(Math.PI/2*cnt);//正方向旋转90度
            cxt.translate(-canvasW/2,-canvasW/2);
            showPanCxt(cxt);
        });
    rotateCnt=cnt
    // console.log(pan)

    /**数组旋转
     console.log('------'+rotateCnt%4)
     rotateChessPan();
     console.log(pan)
     */
    showPan();
}
function rotateChessPan(){
    let tmpPan =  JSON.parse(JSON.stringify(pan));
    for(let i=0; i<tmpPan.length; i++){
        for(let j=0; j<tmpPan[i].length; j++){
            let chessArr = [i , j]
            chessArr = rotateChess(chessArr)
            pan[chessArr[0]][chessArr[1]] = tmpPan[i][j];
        }
    }
}
//单个棋子旋转
function rotateChess(chessArr){
    // let rh = (rows+1)/2
    // let ch = (cols+1)/2
    let x = chessArr[0]
    let y = chessArr[1]
    let x_,y_;
    switch (rotateCnt%4){
        case 0:
            x_ = x
            y_ = y
            break;
        case 1:
            x_ = rows-1-y
            y_ = x
            break;
        case 2:
            x_ = rows-1-x
            y_ = cols-1-y
            break;
        case 3:
            x_ = y
            y_ = cols-1-x
            break;
    }
    return [x_, y_]
}

// ---------------------------------------------------------------------------------------------------------
function terrain(){
    let terrainPan = new Array(
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    );
    let airArr;
    for(let i = 0; i<pan.length; i++){
        for(let j = 0; j<pan[i].length; j++){
            if(pan[i][j] > 0){

                airArr = new Array();
                let airArrPanShadow = new Array(
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                );
                if(!have2air(i, j, airArr, pan[i][j], airArrPanShadow)){
                    console.log(i+","+j)
                    continue
                }

                let terrainPanShadow = new Array(
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                );
                terrainCalc(terrainPan, terrainPanShadow, i, j, pan[i][j], 5);
                if(pan[i][j] == 1){
                    terrainPan[i][j] += 100;
                }else if(pan[i][j] == 2){
                    terrainPan[i][j] -= 100;
                }

            }
        }
    }
    console.log(terrainPan)
    terrainShow(terrainPan);
    console.log('形势判断结束')
}
function terrainCalc(terrainPan, terrainPanShadow, row, col, color, terr){
    if (row < 0 || row > 19-1 || col < 0 || col > 19-1 || terr == 0)
        return;
    if(terrainPanShadow[row][col] == 7)
        return;
    // console.log(terrainPan)
    let terrainPanTmp = 0;
    if(color == 1){//黑
        terrainPanTmp = terr;
    }else if(color == 2){//白
        terrainPanTmp = -terr;
    }
    terrainPan[row][col] += terrainPanTmp;
    terrainPanShadow[row][col] = 7;
    terr--;
    terrainCalc(terrainPan, terrainPanShadow, row+1, col, color, terr)
    terrainCalc(terrainPan, terrainPanShadow, row-1, col, color, terr)
    terrainCalc(terrainPan, terrainPanShadow, row, col+1, color, terr)
    terrainCalc(terrainPan, terrainPanShadow, row, col-1, color, terr)
}
function terrainShow(terrainPan){
    query.select('#weiqi')
        .fields({ node: true, size: true })
        .exec((res) => {
            const canvas = res[0].node
            let cxt = canvas.getContext('2d');

            for(let i = 0; i<terrainPan.length; i++){
                for(let j = 0; j<terrainPan[i].length; j++){
                    if(terrainPan[i][j] > 0){
                        cxt.beginPath();
                        cxt.fillStyle = "black";
                        cxt.fillRect(
                            (i+1)*minW-10,
                            (j+1)*minW-10,
                            20, 20
                        );
                    }else if(terrainPan[i][j] < 0){
                        cxt.beginPath();
                        cxt.fillStyle = "white";
                        cxt.fillRect(
                            (i+1)*minW-10,
                            (j+1)*minW-10,
                            20, 20
                        );
                    }
                }
            }
        });
}
function have2air(row, col, airArr, antiColor, airArrPanShadow) {

    if(pan[row][col] != antiColor || airArrPanShadow[row][col]==7){
        return false;
    }
    airArrPanShadow[row][col]=7;

    if (row > 0 && row < 19-1 && col > 0 && row < 19-1) { //非边角 1->17(0->18)
        if(pan[row+1][col] == 0)
            airArr.push(String.fromCharCode(row+1+97)+String.fromCharCode(col+97));
        if(pan[row-1][col] == 0)
            airArr.push(String.fromCharCode(row-1+97)+String.fromCharCode(col+97));
        if(pan[row][col+1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col+1+97));
        if(pan[row][col-1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col-1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if(have2air(row+1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row-1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col+1, airArr, antiColor, airArrPanShadow)
            || have2air(row, col-1, airArr, antiColor, airArrPanShadow)){
            return true;
        }

    } else if (row === 0 && col > 0 && col < 19-1) { // 边
        if(pan[row+1][col] == 0)
            airArr.push(String.fromCharCode(row+1+97)+String.fromCharCode(col+97));
        if(pan[row][col+1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col+1+97));
        if(pan[row][col-1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col-1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if(have2air(row+1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col+1, airArr, antiColor, airArrPanShadow)
            || have2air(row, col-1, airArr, antiColor, airArrPanShadow)){
            return true;
        }
    } else if (row === 19-1 && col > 0 && col < 19-1) {
        try{
            if(pan[row-1][col] == 0)
                airArr.push(String.fromCharCode(row-1+97)+String.fromCharCode(col+97));
            if(pan[row][col+1] == 0)
                airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col+1+97));
            if(pan[row][col-1] == 0)
                airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col-1+97));
            airArr = disticnt(airArr);
            if(airArr.length>1){
                return true;
            }
            if( have2air(row-1, col, airArr, antiColor, airArrPanShadow)
                || have2air(row, col+1, airArr, antiColor, airArrPanShadow)
                || have2air(row, col-1, airArr, antiColor, airArrPanShadow)){
                return true;
            }
        }catch(e){
            console.log(row+","+col)
            console.log(e)
        }

    } else if (col === 0 && row > 0 && row < 19-1) {
        if(pan[row+1][col] == 0)
            airArr.push(String.fromCharCode(row+1+97)+String.fromCharCode(col+97));
        if(pan[row-1][col] == 0)
            airArr.push(String.fromCharCode(row-1+97)+String.fromCharCode(col+97));
        if(pan[row][col+1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col+1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if(have2air(row+1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row-1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col+1, airArr, antiColor, airArrPanShadow) ){
            return true;
        }
    } else if (col === 19-1 && row > 0 && row < 19-1) {
        if(pan[row+1][col] == 0)
            airArr.push(String.fromCharCode(row+1+97)+String.fromCharCode(col+97));
        if(pan[row-1][col] == 0)
            airArr.push(String.fromCharCode(row-1+97)+String.fromCharCode(col+97));
        if(pan[row][col-1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col-1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if(have2air(row+1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row-1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col-1, airArr, antiColor, airArrPanShadow)){
            return true;
        }
    } else if (row === 0 && col === 0) { // 角
        if(pan[row+1][col] == 0)
            airArr.push(String.fromCharCode(row+1+97)+String.fromCharCode(col+97));
        if(pan[row][col+1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col+1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if(have2air(row+1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col+1, airArr, antiColor, airArrPanShadow) ){
            return true;
        }
    } else if (row === 0 && col === 19-1) {
        if(pan[row+1][col] == 0)
            airArr.push(String.fromCharCode(row+1+97)+String.fromCharCode(col+97));
        if(pan[row][col-1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col-1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if(have2air(row+1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col-1, airArr, antiColor, airArrPanShadow)){
            return true;
        }
    } else if (row === 19-1 && col === 0) {
        if(pan[row-1][col] == 0)
            airArr.push(String.fromCharCode(row-1+97)+String.fromCharCode(col+97));
        if(pan[row][col+1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col+1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if( have2air(row-1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col+1, airArr, antiColor, airArrPanShadow) ){
            return true;
        }
    } else if (row === 19-1 && col === 19-1) {
        if(pan[row-1][col] == 0)
            airArr.push(String.fromCharCode(row-1+97)+String.fromCharCode(col+97));
        if(pan[row][col-1] == 0)
            airArr.push(String.fromCharCode(row+97)+String.fromCharCode(col-1+97));
        airArr = disticnt(airArr);
        if(airArr.length>1){
            return true;
        }
        if(have2air(row-1, col, airArr, antiColor, airArrPanShadow)
            || have2air(row, col-1, airArr, antiColor, airArrPanShadow)){
            return true;
        }
    }


    return false;
}
function disticnt(arr){
    let n = [];
    for(let i=0; i<arr.length; i++){
        if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
    }
    return n;
}
// ---------------------------------------------------------------------------------------------------------
var dapuCurColor = 1;//打谱默认黑棋
/**
 * 选择打谱模式
 * true 开启打谱模式
 * false 关闭打谱模式
 */
function chosDapuFlag(dapuFlag_){
    handleArr[0] = pan;
    dapuFlag = dapuFlag_;
}
/**
 * 选择打谱落字颜色
 * B黑色
 * W白色
 */
function dapuChoseChessColor(dapuCurColor_){
    if(dapuCurColor_ === 'B'){
        dapuCurColor = 1;
    }else{
        dapuCurColor = 2;
    }
}
function dapuMousedownHandler(e){
    console.log('button===='+e.button)
    let dapuDownColor = dapuCurColor
    if(e.button === 2){
        dapuDownColor = (dapuDownColor)%2+1;
    }
    let offsetX = e.touches[0].x*dpr
    let offsetY = e.touches[0].y*dpr
    var x, y;
    if (e.touches[0].x || e.touches[0].y == 0) {
        x = offsetX; //- imageView.offsetLeft;
        y = offsetY; //- imageView.offsetTop;
    }
    if (x < minWH || x > canvasW-minWH)
        return;
    if (y < minWH || y > canvasW-minWH)
        return;

    var xok = false;
    var yok = false;
    var x_;
    var y_;
    for (var i = 1; i <= 19; i++) {
        if (x > i*minW-minWH && x < i*minW+minWH) {
            x = i*minW;
            xok = true;
            x_ = i - 1;
        }
        if (y > i*minW-minWH && y < i*minW+minWH) {
            y = i*minW;
            yok = true;
            y_ = i - 1;
        }
    }
    x_ += boardxb
    y_ += boardyb
    if(!border && ((x_ === boardxb && x_ !== 0) || (x_ === boardxe && x_ !== 18)
        || (y_ === boardyb && y_ !== 0) || (y_  === boardye && y_ !== 18))){
        return;
    }
    if (!xok || !yok)
        return;
    if(pan[x_][y_] === dapuDownColor){
        pan[x_][y_] = 0;
    }else{
        pan[x_][y_] = dapuDownColor
    }

    showPan();
}

function dapuMousemoveHandler(e){

    let dapuDownColor = dapuCurColor
    if(e.button === 2){
        dapuDownColor = (dapuDownColor)%2+1;
    }
    var x, y;
    if (e.offsetX || e.offsetX == 0) {
        x = e.offsetX ;//- imageView.offsetLeft;
        y = e.offsetY ;//- imageView.offsetTop;
    }
    if (x < minWH || x > canvasW-minWH)
        return;
    if (y < minWH || y > canvasH-minWH)
        return;

    var xok = false;
    var yok = false;
    var x_;
    var y_;
    for (var i = 1; i <= 19; i++) {
        if (x > i*minW-minWH && x < i*minW+minWH) {
            x = i*minW;
            xok = true;
            x_ = i - 1;
        }
        if (y > i*minW-minWH && y < i*minW+minWH) {
            y = i*minW;
            yok = true;
            y_ = i - 1;
        }
    }
    x_ += boardxb
    y_ += boardyb
    if(!border && ((x_ === boardxb && x_ !== 0) || (x_ === boardxe && x_ !== 18)
        || (y_ === boardyb && y_ !== 0) || (y_  === boardye && y_ !== 18))){
        return;
    }
    if (!xok || !yok)
        return;

    var c = document.getElementById("weiqi");
    var cxt = c.getContext("2d");

    // clear the path
    cxt.clearRect(0,0,canvasW,canvasH);
    showPan();
    // put a new Gray stone
    cxt.beginPath();
    cxt.arc(x,y,minWH,0,2*Math.PI,false);
    cxt.fillStyle="gray";
    cxt.fill();

    cxt.beginPath();
    cxt.arc(x,y,minWH-5,0,2*Math.PI,false);
    if (dapuDownColor == 1)
        cxt.fillStyle="black";
    else
        cxt.fillStyle="white";
    cxt.fill();
}
/**
 * 获取棋盘上的棋子，无先后之分
 */
function getPan(){
    let arrtmp = new Array();
    for(let i=0; i<pan.length; i++){
        for(let j=0; j<pan.length; j++){
            let chess_;
            switch (pan[i][j]) {
                case 1:
                    chess_ = String.fromCharCode(i+97)+String.fromCharCode(j+97);
                    arrtmp.push('B'+chess_)
                    break;
                case 2:
                    chess_ = String.fromCharCode(i+97)+String.fromCharCode(j+97);
                    arrtmp.push('W'+chess_)
                    break;
            }
        }
    }
    console.log(arrtmp);
    return arrtmp;
}
/**
 * 获取走的步骤有先后之分
 */
function getStep(){
    let arrtmp = new Array();
    for(let i=0; i<move_record.length; i++){
        let chess_ = String.fromCharCode(move_record[i][0]+97)+String.fromCharCode(move_record[i][1]+97);
        let mv = move_record[i][2]
        // if(mv%2 === 1){
        // 		chess_ = 'B'+chess_;
        // }else{
        // 		chess_ = 'W'+chess_;
        // }
        arrtmp.push(chess_);
    }
    console.log(arrtmp);
    return arrtmp;
}

/************************************************** ************************************************************/
var signShape, signColor, signPan,
    numSignRecord={},numSignCnt=0,
    zimuSignRecord={}, zimuSignCnt=0,
    sign_record = new Array(),
    sign_handleArr = new Array(),
    drawGoCross='';
var drawFlag = false;

function openDrawModel(drawFlag_){
    drawFlag  = drawFlag_;
    if(sign_handleArr.length == 0){
        sign_handleArr[0] = JSON.parse(JSON.stringify(signPan));
    }
    if(handleArr.length == 0){
        handleArr[0] = pan;
    }
    if(signPan != null && signPan != undefined){
        return false;
    }
    if(border){
        signPan = getiPan(rows, cols);
    }else{
        signPan = getiPan(19, 19);
    }
}
function closeDrawModel(){
    drawFlag = false;
}
function clearDrawPan(){
    zimuSignRecord = {};
    zimuSignCnt = 0;
    numSignRecord={};
    numSignCnt=0;
    if(border){
        signPan = getiPan(rows, cols);
    }else{
        signPan = getiPan(19, 19);
    }
    move_count = 0;
    move_record = new Array();
    sign_record = new Array(),
        sign_handleArr = new Array(),
        sign_handleArr[0] = JSON.parse(JSON.stringify(signPan));
    pan = handleArr[0];
    drawGoCross='';
    showPan();
}
/**
 * signShape_ :
 * 	0:无
 *  4:数字
 * 	5:字母
 * 	6:三角形
 *  7:X
 * 	8:正方形
 * @param {*} signShape_
 * @param {*} signColor_
 */
function setShapeColor(signShape_, signColor_){
    signShape = signShape_
    signColor = signColor_
    openDrawModel(true);
}
function drawSignShapPan(cxt){
    if(signPan === null || signPan ===undefined){
        return false;
    }

    for(let i=0; i<signPan.length; i++){
        for(let j=0; j< signPan[i].length; j++){
            if(signPan[i][j] ===  0){
                continue;
            }
            let x = (i-boardxb+1)*minW;
            let y = (j-boardyb+1)*minW;
            let signColor_ = getSignColor(pan[i][j]);
            let fontSize,key;
            switch (signPan[i][j]){
                case 0:

                    break;
                case 3://动态数字

                    break;
                case 4://静态数字
                    fontSize = minWH;
                    cxt.fillStyle = signColor_;
                    cxt.font="500 "+fontSize+"px sans-serif";
                    key = String.fromCharCode(i+97) + String.fromCharCode(j+97);
                    cxt.fillText(numSignRecord[key], x, y+minWH/3);
                    break;
                case 5://字母
                    fontSize = minWH;
                    cxt.fillStyle = signColor_;
                    cxt.font="500 "+fontSize+"px sans-serif";
                    key = String.fromCharCode(i+97) + String.fromCharCode(j+97);
                    let zimu = String.fromCharCode(zimuSignRecord[key]+65)
                    cxt.fillText(zimu, x, y+minWH/3);
                    break;
                case 6://三角形
                    cxt.beginPath();
                    cxt.lineWidth=3;
                    cxt.strokeStyle=signColor_;
                    let h1 = minWH/2/Math.sin((Math.PI/3))
                    let h2 = minWH*Math.sin(Math.PI/3)-h1;
                    cxt.moveTo(x, y-h1);
                    cxt.lineTo(x-minWH/2,y+h2);
                    cxt.stroke();

                    cxt.moveTo(x, y-h1);
                    cxt.lineTo(x+minWH/2,y+h2);
                    cxt.stroke();

                    cxt.moveTo(x-minWH/2,y+h2);
                    cxt.lineTo(x+minWH/2,y+h2);
                    cxt.stroke();
                    break;
                case 7://X
                    cxt.beginPath();
                    cxt.lineWidth=3;
                    cxt.strokeStyle=signColor_;
                    let xl = minWH/3;
                    cxt.moveTo(x-xl, y-xl);
                    cxt.lineTo(x+xl, y+xl);
                    cxt.stroke();

                    cxt.moveTo(x+xl, y-xl);
                    cxt.lineTo(x-xl, y+xl);
                    cxt.stroke();
                    break;
                case 8://正方形
                    cxt.beginPath();
                    cxt.lineWidth=4;
                    cxt.strokeStyle=signColor_;
                    cxt.strokeRect(x-minWH/2,y-minWH/2, minWH, minWH);
                    cxt.stroke();
                    break;
                case 9://圆
                    cxt.beginPath();
                    cxt.lineWidth=4;
                    cxt.strokeStyle=signColor_;
                    cxt.arc(x,y,minWH/2,0,2*Math.PI,false);
                    cxt.stroke();
                    break;
            }
        }
    }
}
function getSignColor(panChess){
    if(signColor === null || signColor === undefined){
        if(panChess == 1){
            return 'white';
        }else{
            return 'black';
        }
    }
    return signColor;
}
function signMousedownHandler(e){
    let x, y, x_, y_;
    let xyarrTmp = convertouch2xy(e);
    if(!xyarrTmp){
        return false;
    }
    x = xyarrTmp[0];
    y = xyarrTmp[1];
    x_  = xyarrTmp[2];
    y_ = xyarrTmp[3];

    let sign_handleArr_ = JSON.stringify(sign_handleArr);
    let key = '';
    if(signPan[x_][y_] != 0){
        return false;
    }else{
        signPan[x_][y_] = signShape;
        if(signShape === 4){
            numSignCnt++;
            key = String.fromCharCode(x_+97) + String.fromCharCode(y_+97);
            numSignRecord[key] = numSignCnt;
        }
        if(signShape === 5){
            key = String.fromCharCode(x_+97) + String.fromCharCode(y_+97);
            zimuSignRecord[key] = zimuSignCnt;
            zimuSignCnt++;
        }
    }
    showPan();

    //处理数据存储
    sign_record.push([x_, y_, move_count]);	// 记录手数
    sign_handleArr = JSON.parse(sign_handleArr_);
    sign_handleArr.push(JSON.parse(JSON.stringify(signPan)));//记录标记数组用于回滚标记
    let cross = '';
    switch(signShape){
        case 0:
            cross += 'NNN';
            break;
        case 5://字母
            key = String.fromCharCode(x_+97) + String.fromCharCode(y_+97);
            let zimu = String.fromCharCode(zimuSignRecord[key]+65);
            cross += 'AA' + zimu;
            break;
        case 6://三角形
            cross += 'TNN';
            break;
        case 7://X
            cross += 'XNN';
            break;
        case 8://正方形
            break;
        case 9://圆
            break;
    }
    drawGoCross += 'N'+String.fromCharCode(x_+97) + String.fromCharCode(y_+97)+cross+'000';

    return String.fromCharCode(x_+97) + String.fromCharCode(y_+97);
}
function convertouch2xy(e){
    let offsetX = e.touches[0].x*dpr
    let offsetY = e.touches[0].y*dpr
    var x, y;
    if (e.touches[0].x || e.touches[0].y == 0) {
        x = offsetX ;
        y = offsetY ;
    }
    if (x < minWH || x > canvasW-minWH)
        return false;
    if (y < minWH || y > canvasW-minWH)
        return false;

    var xok = false;
    var yok = false;
    var x_;
    var y_;
    for (var i = 1; i <= 19; i++) {
        if (x > i*minW-minWH && x < i*minW+minWH) {
            x = i*minW;
            xok = true;
            x_ = i - 1;
        }
        if (y > i*minW-minWH && y < i*minW+minWH) {
            y = i*minW;
            yok = true;
            y_ = i - 1;
        }
    }
    x_ += boardxb
    y_ += boardyb
    if(!border && ((x_ === boardxb && x_ !== 0) || (x_ === boardxe && x_ !== 18)
        || (y_ === boardyb && y_ !== 0) || (y_  === boardye && y_ !== 18))){
        return false;
    }
    if (!xok || !yok){
        return false;
    }
    return [x, y, x_, y_]
}
function setQuietDrawGoCross(){
    let goCross = '';
    for(let i=0; i<pan.length; i++){
        for(let j=0; j<pan[i].length; j++){
            if(pan[i][j] ===  0 && signPan[i][j] === 0){
                continue;
            }
            let crossXY_ = String.fromCharCode(i+97) + String.fromCharCode(j+97);

            let cross = '';
            switch(pan[i][j]){
                case 0:
                    cross += 'N';
                    break;
                case 1:
                    cross += 'B';
                    break;
                case 2:
                    cross += 'W';
                    break;
            }
            cross += crossXY_;

            let key;
            let n;
            switch(signPan[i][j]){
                case 0:
                    cross += 'NNN';
                    break;
                case 4://数字
                    key = String.fromCharCode(i+97) + String.fromCharCode(j+97);
                    n = numSignRecord[key];
                    if(n<10){
                        n = '0'+n.toString();
                    }
                    cross += 'S'+ n;
                    break;
                case 5://字母
                    key = String.fromCharCode(i+97) + String.fromCharCode(j+97);
                    let zimu = String.fromCharCode(zimuSignRecord[key]+65);
                    cross += 'AA' + zimu;
                    break;
                case 6://三角形
                    cross += 'TNN';
                    break;
                case 7://X
                    cross += 'XNN';
                    break;
                case 8://正方形
                    break;
                case 9://圆
                    break;
            }
            goCross += cross;
        }
    }
    drawGoCross = goCross;
}
function getDrawGoCross(){
    let goCross = '';

    //动态打谱
    if(move_record.length > 0){
        for(let i=0; i<move_record.length; i++){
            let c_='';
            if(pan[move_record[i][0]][move_record[i][1]] == 1){
                c_ = 'B';
            }else{
                c_ = 'W';
            }
            let cross = c_ + String.fromCharCode(move_record[i][0]+97) +
                String.fromCharCode(move_record[i][1]+97)+'D';
            let n = move_record[i][2];
            if(n<10){
                n = '0'+n.toString();
            }
            cross += n;
            goCross += cross;
        }
        return drawGoCross + goCross;
    }else{
        setQuietDrawGoCross();
        return drawGoCross
    }
}
//绘制动态数字棋子
function dynamicNumChess(){
    drawFlag = false;
//    	move_count = 0;
    move_show_flag = true;
//    	move_record = new Array();
//    	setQuietDrawGoCross();
}

//撤销一步绘制
function revoke(){
    if(sign_record.length == 0 && move_count == 0){
        return false;
    }

    if(sign_record.length < 1){
        drawGoCross = drawGoCross.substring(0, drawGoCross.length-9);
        return regret();
    }

    let mc_ = sign_record[sign_record.length-1][2];
    if(mc_ < move_count){//撤销为动态棋子
        drawGoCross = drawGoCross.substring(0, drawGoCross.length-9);
        return regret();
    }else{
        revokeSign();
        if(sign_handleArr.length == 1){
            signPan = sign_handleArr[0];
        }else{
            signPan = sign_handleArr[sign_handleArr.length-2];
        }

        sign_record.pop();
        sign_handleArr.pop();
        showPan();
        drawGoCross = drawGoCross.substring(0, drawGoCross.length-9);
    }
    return true;
}

function revokeSign(){
    if(sign_record.length == 0){
        return false;
    }
    let revokeSign = sign_record[sign_record.length-1];
    let signChessShape_ = signPan[revokeSign[0]][revokeSign[1]];

    if(signChessShape_ === 4){
        numSignCnt--;
    }
    if(signChessShape_ === 5){
        zimuSignCnt--;
    }
    return true;
}

function playframe(goCrosses){
    if(goCrosses === null || goCrosses === undefined){
        return false;
    }
    signPan = new Array();
    if(border){
        signPan = getiPan(rows, cols);
    }else{
        signPan = getiPan(19, 19);
    }
    let gocross = new Array();
    let dynamicChess = new Array();
    for(let i=0; i<goCrosses.length/6; i++){
        let curi = i*6;
        let crossC = goCrosses.substring(curi, curi+1);
        let crossXY = goCrosses.substring(curi+1, curi+3);
        let crossSign = goCrosses.substring(curi+3, curi+6);

        let r = convert2Asc(crossXY.charAt(0));
        let c = convert2Asc(crossXY.charAt(1));
        if(crossC == 'B' && crossSign.charAt(0) != 'D'){
            pan[r][c] = 1;
        }
        if(crossC == 'W' && crossSign.charAt(0) != 'D'){
            pan[r][c] = 2;
        }

        createSignPan(crossSign, crossXY);

        if(crossSign.charAt(0) === 'D'){
            move_show_flag = true;
            let s_ = parseInt(goCrosses.substring(curi+4, curi+6))-1;
            dynamicChess[s_] = crossXY;
        }
    }
    zimuSignCnt = Object.keys(zimuSignRecord).length;
    numSignCnt = Object.keys(numSignRecord).length;
    // console.log(dynamicChess);
    palyDynamicChess(dynamicChess);
}
function createSignPan(crossSign, crossXY){
    let r = convert2Asc(crossXY.charAt(0));
    let c = convert2Asc(crossXY.charAt(1));
    if(crossSign == 'TNN'){//三角形
        signPan[r][c] = 6;
    }else if(crossSign == 'XNN'){//X
        signPan[r][c] = 7;
    }else if(crossSign.substring(0,2)  ==  'AA'){//字母
        signPan[r][c] = 5;
        zimuSignRecord[crossXY] =  crossSign.charAt(2).charCodeAt(0)-65;
    }
    sign_record.push([r, c, move_count]);
    sign_handleArr.push(JSON.parse(JSON.stringify(signPan)));//记录标记数组用于回滚标记
}

function palyDynamicChess(dynamicChess){
    if(dynamicChess === null || dynamicChess === undefined){
        return false;
    }
    showPan();
    let i=0;
    let si_ = setInterval(function() {
        if(i < dynamicChess.length){
            let r_ = convert2Asc(dynamicChess[i].charAt(0));
            let c_ = convert2Asc(dynamicChess[i].charAt(1));
            play(r_, c_);
            i++
            showPan();
        }else{
            clearInterval(si_)
        }
    }, 1000);

}

/**
 * 设置动态棋子或者动态标记
 * @param {} goCross_
 */
function setDynGoCross(goCross_){
    let crossC = goCross_.substring(0, 1);
    let crossXY = goCross_.substring(1, 3);
    let crossSign = goCross_.substring(3, 6);
    let r = convert2Asc(crossXY.charAt(0));
    let c = convert2Asc(crossXY.charAt(1));

    if(crossSign.charAt(0) === 'S'){
        move_show_flag = true;
        let s_ = parseInt(goCross_.substring(4, 6))-1;
        crossxyDown(crossC+crossXY);
    }else{
        createSignPan(crossSign, crossXY);
    }
    zimuSignCnt = Object.keys(zimuSignRecord).length;
    numSignCnt = Object.keys(numSignRecord).length;
    drawGoCross += goCross_;
    showPan();
}

function setDynGoCrosses(dynGoCrosses){
    for(let i=0;i<dynGoCrosses.length;i=i+9){
        let goCross_ = dynGoCrosses.substring(i*9, (i+1)*9);
        let crossC = goCross_.substring(0, 1);
        let crossXY = goCross_.substring(1, 3);
        let crossSign = goCross_.substring(3, 6);
        let r = convert2Asc(crossXY.charAt(0));
        let c = convert2Asc(crossXY.charAt(1));

        if(crossSign.charAt(0) === 'S'){
            move_show_flag = true;
            let s_ = parseInt(goCross_.substring(4, 6))-1;
            crossxyDown(crossC+crossXY);
        }else{
            createSignPan(crossSign, crossXY);
        }
        zimuSignCnt = Object.keys(zimuSignRecord).length;
        numSignCnt = Object.keys(numSignRecord).length;
        drawGoCross += goCross_;
    }
}




var tuozhuaiFlag = false, tuozhuaing=false;
var kps = new Array(), kpscolor='red';

var opera_kps_index=0
if(kps.length>0){
    opera_kps_index = kps.length-1;
}

function setKeyTuozhuai(tuozhuaiFlag_, opera_kps_index_){
    tuozhuaiFlag = tuozhuaiFlag_;
    opera_kps_index = opera_kps_index_;
}
function setkps(kps_){
    kps = kps_;
    showPan();
}
function getkps(){
    return kps;
}

function drawKPS(cxt){
    if(kps == null || kps.length == 0){
        return;
    }

    let fontsize = minW;
    cxt.font="400 "+fontsize+"px sans-serif";
    cxt.textAlign='center';
    for(let i=0; i<kps.length; i++){
        let kp = kps[i];
        let kpdesc = kp.kpdesc;
        let x = kp.x;
        let y = kp.y;
        let p = kp.p;
        switch (p){
            case 1 :
                x=minW*3,y=minW;
                break;
            case 2 :
                x=minW*10,y=minW;
                break;
            case 3 :
                x=minW*17,y=minW;
                break;
            case 4 :
                x=minW*3,y=minW*19.5;
                break;
            case 5 :
                x=minW*10,y=minW*19.5;
                break;
            case 6 :
                x=minW*17,y=minW*19.5;
                break;
        }

        if(kp.color != null && kp.color != ''){
            cxt.fillStyle=kp.color;
        }
        cxt.fillText(kpdesc, x, y);
    }

}

function kpsMousemoveHandler(e){
    let x, y, x_, y_;
    if (e.offsetX || e.offsetY == 0) {
        x = e.offsetX*dpr;
        y = e.offsetY*dpr;
    }
    if (x < minWH || x > canvasW-minWH){
        return false;
    }

    if (y < minWH || y > canvasW-minWH){
        return false;
    }
    kps[opera_kps_index].x=x;
    kps[opera_kps_index].y=y;
    showPan();
    return String.fromCharCode(x_+97) + String.fromCharCode(y_+97);
}


/************************************************** ************************************************************/



module.exports = {
    windowWidthMax : 500,
    canvasWMax : 580,

    cleanImg: cleanImg,
    initweiqipan: initweiqipan,//初始化棋盘
    mousedownHandler: mousedownHandler,
    mousemoveHandler: mousemoveHandler,
    mouseoutHandler: mouseoutHandler,
    confirmDownStone: confirmDownStone,//确认落字
    crossxyDown: crossxyDown,
    showMoveStep: showMoveStep,//展示路数
    regret: regret,//悔一手
    pass: pass,//过一手
    lastStep: lastStep,//上一手
    nextStep: nextStep,//下一手
    gotoStep: gotoStep,//	去第多少手

    luozi: luozi,//落子
    convert2xy: convert2xy,
    terrain: terrain,//形势判断
    rotate: rotate,//旋转
    updShowFlag: updShowFlag,//显示手数

    //打谱
    chosDapuFlag: chosDapuFlag,
    dapuChoseChessColor: dapuChoseChessColor,
    getPan: getPan,
    getStep: getStep,

    //openDrawModel: openDrawModel,
    //signMousedownHandler: signMousedownHandler,
    setShapeColor: setShapeColor,//设置绘制模式标签
    closeDrawModel: closeDrawModel,//关闭绘制模式
    getDrawGoCross: getDrawGoCross,//获取播放教学落子
    clearDrawPan: clearDrawPan,//清除
    dynamicNumChess: dynamicNumChess,
    playframe: playframe,//播放教学
    setDynGoCross: setDynGoCross,
    setkps: setkps,
    revoke: revoke,
    setVoiceFlag: setVoiceFlag,//是否播放声音
    getVoiceFlag: getVoiceFlag,//获取是否可播放声音
}