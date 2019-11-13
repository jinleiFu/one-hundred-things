window.thingsArray = []
$(function() {
  $.ajax({
    url: 'http://getthings.com',
    dataType: 'json',
    success: function(res) {
      window.thingsArray = res.data
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
$('input[name="progress"]').on('change', function() {
  if (this.value == 'all') {
    renderThings(window.thingsArray, $('#things'))
  } else if (this.value == 'completed') {
    renderThings(
      window.thingsArray.filter(function(item) {
        return item.isCompleted == true
      }),
      $('#things')
    )
  } else {
    renderThings(
      window.thingsArray.filter(function(item) {
        return item.isCompleted !== true
      }),
      $('#things')
    )
  }
})
