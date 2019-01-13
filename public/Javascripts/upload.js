// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyDnptdEc3-McxxtU4wjzz8OJA0N-fH2rXo",
//     authDomain: "productupload-dc9a2.firebaseapp.com",
//     databaseURL: "https://productupload-dc9a2.firebaseio.com",
//     projectId: "productupload-dc9a2",
//     storageBucket: "productupload-dc9a2.appspot.com",
//     messagingSenderId: "226606373241"
//   };
// firebase.initializeApp(config);

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
  window.location.assign("/twohand/market");
})
