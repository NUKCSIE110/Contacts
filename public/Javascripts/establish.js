var years=document.querySelector('.event .year');
var months=document.querySelector('.event .month');
var days=document.querySelector('.event .date');
var hours=document.querySelector('.event .shour');
var mins=document.querySelector('.event .smin');
var ehours=document.querySelector('.event .ehour');
var emins=document.querySelector('.event .emin');
var stra='';
var strb='';
var strc='';
var strd='';
var stre='';


stra+='<option value="all">年</option>';
strc+='<option value="all">日</option>';
for(var i=2019;i<2100;i++){
    stra+='<option value="'+i+'">'+i+'</option>';
}
years.innerHTML=stra;

strb+='<option value="all">月</option>';
for(var i=1;i<13;i++){
    strb+='<option value="'+i+'">'+i+'</option>';
    if(i%2!=0){
        for(var i=1;i<32;i++){
            strc+='<option value="'+i+'">'+i+'</option>';
        }
    }
    else if(i==2){
        for(var i=1;i<29;i++){
            strc+='<option value="'+i+'">'+i+'</option>';
        }
    }
    else{
        for(var i=1;i<31;i++){
            strc+='<option value="'+i+'">'+i+'</option>';
        }
    }
}
years.innerHTML=strb;
days.innerHTML=strc;

strd+='<option value="all">時</option>';
for(var i=0;i<24;i++){
    strd+='<option value="'+i+'">'+i+'</option>';
}
hours.innerHTML=strd;
ehours.innerHTML=strd;

stre+='<option value="all">分</option>';
for(var i=0;i<60;i++){
    stre+='<option value="'+i+'">'+i+'</option>';
}
mins.innerHTML=stre;
emins.innerHTML=stre;