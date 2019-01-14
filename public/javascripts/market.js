var database = firebase.database().ref('ProductData/Product1/1');
var pic = document.querySelectorAll(".box a div");
var line = document.querySelectorAll(".line div");
var type = document.querySelector("select");
type.addEventListener("change",sorting);

var count = 0;
var count1 = 0;
var count2=0;
var k = 0;
var j = 0;
var allgoods = [];

database.on('value', function (snapshot) {
  var str = [];
  var str2 = '';
  var pics = [];
  var str3 = '';
  snapshot.forEach(function (data) {
    allgoods.push(data.val());
    /*for (var details in data.val()) {
      if (details == 'name') {
        str2 += data.val()[details] + ',';
        count++;
      }
      else if (details == 'picture') {
        str3 += data.val()[details] + '*';
        count1++;
      }
    }*/
  })
  /*for (var i = 0; i < count; i++) {
    str[i] = str2.split(",")[i];
  }
  for (var i = 0; i < count1; i++) {
    pics[i] = '<img src="' + str3.split("*")[i] + '">';
  }
  for (var n of pic) {
    if (pics[k] == undefined) {
      continue;
    }
    else {
      n.innerHTML = pics[k];
      k++;
    }
  }
  for (var l of line) {
    l.textContent = str[j];
    j++;
  }*/
  sorting();
});

function sorting(){
  var typeID = type.value;
  var i=0;
  for (var n of pic) {
    n.innerHTML = '';
  }
  for (var l of line) {
    l.textContent = '';
  }
  allgoods.forEach(function(d){
    if(typeID==0 || d.option==typeID){
      //把d放上去
      pic[i].innerHTML = d.picture!=undefined ? '<img src="' + d.picture + '">' : '';
      line[i].textContent = d.name;
      i++;
    }
  })
}