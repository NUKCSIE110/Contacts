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
  var option = document.querySelector('option');
  database.push({
    "name": name.value,
    "contact": contact.value,
    "price": price.value,
    "option": option.value
  })
  window.location.assign("http://localhost/twohand/market");
})

$("#uploadImage").change(function () {
  readImage(this);
});

function readImage(input) {
  if (input.files && input.files[0]) {
      var FR = new FileReader();
      FR.onload = function (e) {
          //e.target.result = base64 format picture
          $('#img').attr("src", e.target.result);
      };
      FR.readAsDataURL(input.files[0]);
  }
}
