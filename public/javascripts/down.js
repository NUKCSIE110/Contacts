var times = document.querySelectorAll('.fas.fa-times-circle')
var selection = document.querySelector('#selection')
times.forEach(ele=>{
  ele.onclick = () => {
    $('#exampleModalCenter').modal('show')
    selection.value = ele.id
  }
})