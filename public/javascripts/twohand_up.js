var cata_button = document.querySelectorAll('.dropdown-menu button')
var cata_input = document.querySelector('input#cata')
var submit = document.querySelector('#upload_form')
var form = document.querySelector('form')
var upload_avatar = document.getElementById("upload_avatar");
upload_avatar.addEventListener('change', readFile, false);

function readFile() {
  var file = this.files[0];
  if (file.type.split('/')[0] != 'image') {
      alert('選擇的檔案並非圖片檔！');
      return false;
  }
  if (file.size / 1024 / 1024 > 10) {
      alert('請選擇小於10M的檔案')
      return false
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
      document.querySelector('.imgback img').src = this.result
      document.querySelector('#photo_base64').value = this.result.split(',')[1]
      document.querySelector('#upload').className = 'btn btn-success btn-lg'
  }
}

cata_button.forEach(ele=>{
  ele.addEventListener('click',()=>{
    cata_input.value = ele.id
    document.querySelector('#dropdownMenu2').innerText = ele.innerText
  })
})

submit.addEventListener('click',()=>{
  let empty = false
  document.querySelectorAll('input').forEach(ele=>{
    if(ele.value == '') {
      console.log(ele.value)
      empty = true
    }
  })
  if (empty) {
    alert('請填寫全部欄位！')
    return 1
  }
  else form.submit()
})