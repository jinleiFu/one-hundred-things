$(function() {
  $.ajax({
    url: 'http://getthings.com',
    dataType: 'json',
    success: function(res) {
      console.log(res.data)
      renderThings(res.data, $('#things'))
    }
  })
})

function renderThings(data, ele) {
  var str = ''
  data.forEach(item => {
    str += `<li>${item.thing}</li>`
  })
  ele.html(str)
}
