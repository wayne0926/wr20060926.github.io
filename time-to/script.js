initCanvas();
function initCanvas(){
  //获取画布的dom对象
  // alert(1);
  let canvas=document.getElementById("canvas");
  let draw=canvas.getContext('2d');
  // canvas
 setInterval(function(){
	canvass(draw);
 },1000);
}

function canvass(draws){
 // alert(1);
  // 获取时间
  var time=new Date();
  var y=time.getFullYear();
  var mon=time.getMonth()+1;
  var d=time.getDate();
  var w=time.getDay();
  var week="";
  var englishWeek='';
  var h=time.getHours();
  var h_str=h+'';
  var h_lenth=h_str.length;

  var min=time.getMinutes();
  var min_str=min+'';
  var min_lenth=min_str.length;
  // alert(min_lenth);
  var s=time.getSeconds();
  var s_str=s+'';
  var s_lenth=s_str.length;
  // console.log(s);



  // alert(min);
  if(w==0){
	week="日";
	englishWeek="Sunday";

  }else if(w==1){
	week="一";
	englishWeek="Monday";
  }else if(w==2){
	week="二";
	englishWeek="Tuesday";
  }else if(w==3){
	week="三";
	englishWeek="Wednesday";
  }else if(w==4){
	week="四";
	englishWeek="Thursday";
  }else if(w==5){
	week="五";
	englishWeek="Friday";
  }else{
	week="六";
	englishWeek="Saturday";
  }

  var minutes;
  if(min_lenth==1){
	minutes="0"+min;
  }else{
	minutes=min;
  }
  var seconds;
  if(s_lenth==1){
	seconds="0"+s;
  }else{
	seconds=s;
  }

  var hours;
  if(h_lenth==1){
	hours="0"+h;
  }else{
	hours=h;
  }


  var simpleTime=hours+":"+minutes+":"+seconds;
  var fullTime=y+"年"+mon+"月"+d+"日"+" "+"星期"+week+" "+hours+":"+minutes+":"+seconds;
  var fullDoc=document.getElementById("fulltime");
  fullDoc.innerHTML=fullTime;
  // this.simpleTime=simpleTime;
  // this.fullTime=fullTime;
  // this.second=s;
  // this.minutes=min;
  // this.hour=h;
  // this.englishWeek=englishWeek;
  //时间： h小时，min分钟，s秒


  let draw=draws;
  draw.clearRect(0,0,500,500);
  //画文字时间和星期
  draw.fillStyle="rgba(255,255,255,0.5)";
  draw.font="16px 黑体";
  draw.fillText(simpleTime,217,300);
  draw.fillText(englishWeek,225,320);
  //时刻度
  for(var i=0;i<12;i++){
	 draw.save();
	 draw.lineWidth=4;
	 draw.strokeStyle="white";
	 draw.translate(250,250);
	 draw.rotate(i*30*Math.PI/180);

	 draw.beginPath();
	 draw.moveTo(0,170);
	 draw.lineTo(0,190);
	 draw.closePath();
	 draw.stroke();
	 draw.restore();
  }
  //分刻度
  for(let i=0;i<60;i++){
	draw.save();
	  draw.translate(250,250);
	  draw.rotate(i*6*Math.PI/180);
	  draw.lineWidth=2;
	  draw.strokeStyle="white";
	  draw.beginPath();

	  draw.moveTo(0,190);
	  draw.lineTo(0,180);
	  draw.closePath();
	  draw.stroke();

	draw.restore();
  }


  //画时阵
   draw.save();
   draw.strokeStyle="white";
   draw.translate(250,250);
   let hourzs=h+min/60;//获取浮点类型的小时
   draw.rotate( hourzs*30*Math.PI/180);
   draw.lineWidth=6;
   draw.beginPath();
   draw.moveTo(0,0);
   draw.lineTo(0,-90);
   draw.closePath();
   draw.stroke();
  draw.restore();
  //画分针
  draw.save();
  draw.translate(250,250);

  draw.rotate(min*6*Math.PI/180);
  draw.strokeStyle="white";
  draw.lineWidth=3;
  draw.beginPath();
  draw.moveTo(0,0);
  draw.lineTo(0,-130);
  draw.closePath();
  draw.stroke();
  draw.restore();
  //画秒针
  draw.save();
  draw.translate(250,250);
  draw.rotate(s*6*Math.PI/180);
  draw.strokeStyle="white";
  draw.lineWidth=1;
  draw.beginPath();
  draw.moveTo(0,15);
  draw.lineTo(0,-180);
  draw.closePath();
  draw.stroke();
  draw.restore();

  //画中心原点
  draw.fillStyle="rgba(255,255,255,1)";
  draw.lineWidth=2;
  draw.beginPath();
  draw.arc(250,250,4,0,360,false);
  draw.closePath();
  draw.fill();

}