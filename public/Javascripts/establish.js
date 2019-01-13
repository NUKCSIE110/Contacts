var years=document.querySelector(".year");
var months=document.querySelector('.month');
var days=document.querySelector('.date');
var hours=document.querySelector('.shour');
var mins=document.querySelector('.smin');
var ehours=document.querySelector('.ehour');
var emins=document.querySelector('.emin');
console.log(years)
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
strd+='<option value="all">時</option>';
for(var i=0;i<24;i++){
    strd+='<option value="'+i+'">'+i+'</option>';
}
stre+='<option value="all">分</option>';
for(var i=0;i<60;i++){
    stre+='<option value="'+i+'">'+i+'</option>';
}

years.innerHTML=stra;
months.innerHTML=strb;
days.innerHTML=strc;
hours.innerHTML=strd;
ehours.innerHTML=strd;
mins.innerHTML=stre;
emins.innerHTML=stre;