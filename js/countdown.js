/*var WINDOW_WIDTH=1080;
var WINDOW_HEIGHT=786;
var R=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=10;

var now =new Date();
var seconds=now.getSeconds();//获取系统的时间
var minutes=now.getMinutes();
var hour=now.getHours();

window.onload=function(){
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	
	setInterval(
		function(){
		
		render(context);
		
		},50);
	
}
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
	var now =new Date();
	var seconds=now.getSeconds();//获取系统的时间
	var minutes=now.getMinutes();
	var hour=now.getHours();

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
	renderDigit(MARGIN_LEFT+15*(R+1),MARGIN_TOP,parseInt(hour%10),cxt);
	renderDigit(MARGIN_LEFT+2*15*(R+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+2.5*15*(R+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+3.5*15*(R+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+4.5*15*(R+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+5*15*(R+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+6*15*(R+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}



//绘制数字的函数
function renderDigit(x,y,num,cxt){
	//cxt.fillStyle='rgb(0,102,153)';
	
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1)
			{
				cxt.fillStyle="rgb(100,102,100)";
				cxt.beginPath();
				cxt.arc(x+j*2*(R+1)+(R+1),y+i*2*(R+1)+(R+1),R,0,2*Math.PI);
				cxt.closePath();
				
				cxt.fill();
			}
}

//绘制数字的函数
function renderDigit(x,y,num,cxt){
	//cxt.fillStyle='rgb(0,102,153)';
	
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1)
			{
				cxt.fillStyle="rgb(" + j *60 + ",102,153)";
				cxt.beginPath();
				cxt.arc(x+j*2*(R+1)+(R+1),y+i*2*(R+1)+(R+1),R,0,2*Math.PI);
				cxt.closePath();
				
				cxt.fill();
			}
}
/*function update(){
	var now =new Date();
    var seconds=now.getSeconds();//获取系统的时间
	var minutes=now.getMinutes();
	var hour=now.getHours();
}*/

window.onclick = function(){
	diagram.isMouseDown = true;
}


var nums = new Array();

for(var i=0;i<=5068;i++){
	nums.push(i);
}

var diagram = new Vue({
	el : '#app',
	data : {
		lattice : nums,
		isMouseDown : false
	},
	methods : {
		draw : function(index){
			console.log(index);
			
		},
		enter : function(index){
			if(this.isMouseDown){
				draw.drawing(index);draw.drawing(index);
			}
		}
	},
	mounted : function(){
		this.lattice.forEach(element => {
			var canvas=document.getElementById('a'+element);
			var context=canvas.getContext('2d');
			canvas.width=10;
			canvas.height=10;
			context.fillStyle = "rgb(255,0,0)";
			context.fillRect(0,0,10,10);
		});
	}
})





var draw = new Vue({
	el : '#draw',
	data : {
		lattice : nums
	},
	methods : {
		drawing : function(index){
			var canvas=document.getElementById('b'+index);
			var context=canvas.getContext('2d');
			context.fillStyle = "rgb(255,0,0)";
			context.fillRect(0,0,10,10);
		}
	},
	mounted : function(){
		this.lattice.forEach(element => {

			var canvas=document.getElementById('b'+element);
			var context=canvas.getContext('2d');

			canvas.width=10;
			canvas.height=10;
			context.fillStyle = "rgb(0,255,0)";
			context.fillRect(0,0,10,10);
			
		});
	}
})



