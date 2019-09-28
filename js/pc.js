/*
*点阵长宽
*
*请按照屏幕分辨率设置，单位px
*
*/
var WINDOW_WIDTH=1600;
var WINDOW_HEIGHT=1600;

//鼠标按住写入判断
var mouseIsDown = false;



/*
*
*点阵像素点的长宽，单位px,使用偶数精确度更高。取值10左右
*/
var latticePointSize = 16;

/*
*点阵行列
*
*latticeRowNumbe 行数
*
*latticeColNumber 列数
*
*可以自定义，也可以通过像素点长宽实现全布局
*
*/
var latticeRowNumber = Math.floor(WINDOW_HEIGHT/latticePointSize);
var latticeColNumber = Math.floor(WINDOW_WIDTH/latticePointSize);



//二维点阵数组
var digit = new Array();

//初始化二维点阵
for(var i=0;i<latticeRowNumber;i++){       
	digit[i] = new Array();
    for(var j=0;j<latticeColNumber;j++){    
        digit[i][j] = 0;
    }
}


window.onload=function(){
	//画图点阵
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');

	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	setInterval(
		function(){
		render(context);
	},10);
	/*对应显示点阵
	var canvas2=document.getElementById('canvas2');
	var context2=canvas2.getContext('2d');

	canvas2.width=WINDOW_WIDTH;
	context2.height=WINDOW_HEIGHT;

	setInterval(
		function(){
		render(context2);
	},10);
	*/
}

//鼠标事件监听
var canvas = document.getElementById('canvas');
//鼠标按下开始写入
canvas.onmousedown = function(){
	mouseIsDown = true;
}
//鼠标松开停止写入
canvas.onmouseup = function(){
	mouseIsDown = false;
}

/*
*
*鼠标移动事件，根据鼠标坐标定位点阵
*
*/
canvas.onmousemove = function(event){
	if(mouseIsDown){
		
		var e = event || window.event;
		console.log("x:" +e.clientX+ " y:"+ e.clientY);
		var row = Math.floor((e.clientY-latticePointSize/2)/latticePointSize);
		var col = Math.floor((e.clientX-latticePointSize/2)/latticePointSize);
		digit[row][col] = 1;
	}
}

//重新加载点阵
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	renderDigit(cxt);
}

//填充点阵
function renderDigit(cxt){
	for(var i=0;i<digit.length;i++){
		for(var j=0;j<digit[i].length;j++){
			if(digit[i][j]!=1)
			{
				//颜色修改
				cxt.fillStyle="rgb(100,102,100)";
				cxt.beginPath();
				cxt.fillRect(latticePointSize*(j),(i)*latticePointSize,latticePointSize,latticePointSize)
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}


/*
*
*移动端触摸屏幕触发事件
*
*/

canvas.ontouchmove = function(event){

	var e = event || window.event;
	event.preventDefault();

	var screenX = window.screen.availHeight;
	var screenY = window.screen.availWidth;

	var x = event.changedTouches[0].clientX;
	var y = event.changedTouches[0].clientY;
	
	 console.log(x/screenX+"-"+y/screenY)
	 
	var row = Math.floor((y/screenY)*latticeRowNumber);
	var col = Math.floor((x/screenX)*latticeColNumber);
	
	digit[row][col] = 1;
}

