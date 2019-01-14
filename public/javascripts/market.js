var database = firebase.database().ref('ProductData/Product1/1');
var pic = document.querySelectorAll(".good");
var type = document.querySelector(".dropdown select");
type.addEventListener("change",sorting);

var count = 0;
var count1 = 0;
var count2=0;
var k = 0;
var j = 0;
var allgoods = [];

database.on('value', function (snapshot) {

  snapshot.forEach(function (data) {
    allgoods.push(data.val());
  });
  sorting();
});

function sorting(){
  var typeID = type.value;
  var i=0;
  for (var n of pic) {
    n.querySelector('img').src="";
    n.querySelector('p').textContent="";
  }
  allgoods.forEach(function(d){
    if(typeID==0 || d.option==typeID){
      //把d放上去
      pic[i].querySelector('img').src = d.picture!=undefined ? d.picture : '';
      pic[i].querySelector('p').textContent=d.name;
      i++;
    }
  })
};