var years=document.querySelector(".year");
var months=document.querySelector('.month');
var days=document.querySelector('.date');
var hours=document.querySelector('.shour');
var mins=document.querySelector('.smin');
var ehours=document.querySelector('.ehour');
var emins=document.querySelector('.emin');

var stra='';
var strb='';
var strc='';
var strd='';
var stre='';

stra+='<option value="all">年</option>';
strc+='<option value="all">日</option>';
for(var i=2019;i<2101;i++){
    stra+='<option value="'+i+'">'+i+'</option>';
}

strb+='<option value="all">月</option>';
for(var i=1;i<13;i++){
    if(i < 10){
        strb+='<option value="'+i+'">0'+i+'</option>';
    }
    else{
        strb+='<option value="'+i+'">'+i+'</option>';
    }
    
}
for(var i=1;i<32;i++){
    if(i < 10){
        strc+='<option value="'+i+'">0'+i+'</option>';
    }
    else{
        strc+='<option value="'+i+'">'+i+'</option>';
    }
}
strd+='<option value="all">時</option>';
for(var i=0;i<24;i++){
    if(i < 10){
        strd+='<option value="'+i+'">0'+i+'</option>';
    }
    else{
        strd+='<option value="'+i+'">'+i+'</option>';
    }
}
stre+='<option value="all">分</option>';
for(var i=0;i<60;i++){
    if(i < 10){
        stre+='<option value="'+i+'">0'+i+'</option>';
    }
    else{
        stre+='<option value="'+i+'">'+i+'</option>';
    }
}

years.innerHTML=stra;
months.innerHTML=strb;
days.innerHTML=strc;
hours.innerHTML=strd;
ehours.innerHTML=strd;
mins.innerHTML=stre;
emins.innerHTML=stre;

var opstyle=document.querySelectorAll("option");

for(var op of opstyle){
    op.style="background-color:rgb(90, 90, 90,.75);color:white;"
}