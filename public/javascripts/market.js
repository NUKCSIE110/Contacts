var database = firebase.database().ref('ProductData/Product1/1');
var pic=document.querySelectorAll(".box a");
var line=document.querySelectorAll(".line div");

var count=0;
var j=0;

database.on('value',function(snapshot){
     var str = [];
     var str2 = '';
       snapshot.forEach(function(data){
         for(var details in data.val()){
           if(details=='name'){
             str2+=data.val()[details]+',';
             count++;
           }
         }
       })
       for(var i=0;i<count;i++){
         str[i]=str2.split(",")[i];
       }
     for(var n of pic){
       var start = 'data:image/jpeg;base64,'
       xxx.src = start++;
     }
     for(var l of line){
        l.textContent=str[j];
        j++;
     }
 });
