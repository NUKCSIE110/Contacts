var database = firebase.database().ref('ProductData/Product1/1');
var pic=document.querySelectorAll(".box a");
var line=document.querySelectorAll(".line div");

database.on('value',function(snapshot){
     var str = '';
     var str2 = '';
       snapshot.forEach(function(data){
         for(var details in data.val()){
           str+=data.val().picture;
           str2+=data.val().name;
         }
       })
     for(var n of pic){
         console.log(n);
     }
     for(var l of line){
        l.textContent=str2;
     }
 });
