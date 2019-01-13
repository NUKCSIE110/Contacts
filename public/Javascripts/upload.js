var database = firebase.database().ref('ProductData/Product1/1');

var name = document.querySelector(".Pname").value;
var contact = document.querySelector(".Contact").value;
var price = document.querySelector(".Price").value;
var btn = document.querySelector(".Upload");
console.log(btn);

btn.addEventListener('click', function () {
  var name = document.querySelector(".Pname");
  var contact = document.querySelector(".Contact");
  var price = document.querySelector(".Price");
  database.push({
    "name": name.value,
    "contact": contact.value,
    "price": price.value
  })
  window.location.assign("http://localhost/twohand/market");
})
