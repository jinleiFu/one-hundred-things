$(function() {
  $.ajax({
    url: 'http://getmainmenu.com',
    dataType: 'json',
    success: function(res) {
      randerHorizontalTree(res.data, $('#horizontal-tree'))
      randerVerticalTree(res.data, $('#vertical-tree'))
      setTimeout(() => {
        $('#main').show()
        $('#loading-container').hide()
      }, 3000)
    }
  })
})

function randerHorizontalTree(menuData, menuElement) {
  var menuStr = ''
  menuData.forEach(item => {
    if (item.subMenuNumber == 0) {
      // menuStr += `<li>
      //     <div class="item">
      //       <div class="icon-box"><span class="icon icon-off" id="${item.id}"></span></div>
      //       <div class="text"><a href="${item.url}" target="ifrme-tree" id="${item.id}" title="${item.text}">${item.text}</a></div>
      //       <div class="leader">
      //         <span>${item.leader}</span>
      //         <span>(${item.subMenuNumber})</span>
      //       </div>
      //     </div>
      //     <ul></ul>
      //   </li>
      // `
      menuStr += '<li><div class="item"><div class="icon-box"><span class="icon icon-off" id="'
        .concat(item.id, '"></span></div><div class="text"><a href="')
        .concat(item.url, '" target="ifrme-tree" id="')
        .concat(item.id, '" title="')
        .concat(item.text, '">')
        .concat(item.text, '</a></div><div class="leader"><span>')
        .concat(item.leader, '</span><span>(')
        .concat(item.subMenuNumber, ')</span></div></div><ul></ul></li>')
    } else {
      // menuStr += `<li>
      //     <div class="item">
      //       <div class="icon-box"><span class="icon  icon-add" id="${item.id}"></span></div>
      //       <div class="text"><a href="${item.url}" target="ifrme-tree" id="${item.id}" title="${item.text}">${item.text}</a></div>
      //       <div class="leader">
      //         <span>${item.leader}</span>
      //         <span>(${item.subMenuNumber})</span>
      //       </div>
      //     </div>
      //     <ul></ul>
      //   </li>
      // `
      menuStr += '<li><div class="item"><div class="icon-box"><span class="icon  icon-add" id="'
        .concat(item.id, '"></span></div><div class="text"><a href="')
        .concat(item.url, '" target="ifrme-tree" id="')
        .concat(item.id, '" title="')
        .concat(item.text, '">')
        .concat(item.text, '</a></div><div class="leader"><span>')
        .concat(item.leader, '</span><span>(')
        .concat(item.subMenuNumber, ')</span></div></div><ul></ul></li>')
    }
  })
  menuElement.html(menuStr)
}
function randerVerticalTree(menuData, menuElement) {
  var menuStr = ''
  menuData.forEach(item => {
    if (item.subMenuNumber == 0) {
      // menuStr += `<li>
      //     <div class="item">
      //       <div class="icon-box"><span class="icon icon-off" id="${item.id}"></span></div>
      //       <div class="info">
      //         <div class="text"><a href="${item.url}" target="ifrme-tree" id="${item.id}" title="${item.text}">${item.text}</a></div>
      //         <div class="leader">
      //           <span>${item.leader}</span>
      //           <span>(${item.subMenuNumber})</span>
      //         </div>
      //       </div>
      //     </div>
      //     <ul></ul>
      //   </li>
      // `
      menuStr += '<li><div class="item"><div class="icon-box"><span class="icon icon-off" id="'
        .concat(
          item.id,
          '"></span></div><div class="info"><div class="text"><a href="'
        )
        .concat(item.url, '" target="ifrme-tree" id="')
        .concat(item.id, '" title="')
        .concat(item.text, '">')
        .concat(item.text, '</a></div><div class="leader"><span>')
        .concat(item.leader, '</span><span>(')
        .concat(item.subMenuNumber, ')</span></div></div></div><ul></ul></li>')
    } else {
      // menuStr += `<li>
      //     <div class="item">
      //       <div class="icon-box"><span class="icon  icon-add" id="${item.id}"></span></div>
      //       <div class="info">
      //         <div class="text"><a href="${item.url}" target="ifrme-tree" id="${item.id}" title="${item.text}">${item.text}</a></div>
      //         <div class="leader">
      //           <span>${item.leader}</span>
      //           <span>(${item.subMenuNumber})</span>
      //         </div>
      //       </div>
      //     </div>
      //     <ul></ul>
      //   </li>
      // `
      menuStr += '<li><div class="item"><div class="icon-box"><span class="icon  icon-add" id="'
        .concat(
          item.id,
          '"></span></div><div class="info"><div class="text"><a href="'
        )
        .concat(item.url, '" target="ifrme-tree" id="')
        .concat(item.id, '" title="')
        .concat(item.text, '">')
        .concat(item.text, '</a></div><div class="leader"><span>')
        .concat(item.leader, '</span><span>(')
        .concat(item.subMenuNumber, ')</span></div></div></div><ul></ul></li>')
    }
  })
  menuElement.html(menuStr)
}

$('#horizontal-tree').on('click', '.icon', function() {
  // 点击展开图标
  $(`#vertical-tree .icon[id=${this.id}]`).trigger('click')
  if ($(this).hasClass('icon-add')) {
    // console.log($(`#vertical-tree .icon[id=${this.id}]`))
    var _this = this
    // 再次展开不重新渲染子菜单
    if ($(_this).data('clicked')) {
      $(_this)
        .parent()
        .parent()
        .siblings('ul')
        .show()
      $(this)
        .removeClass('icon-add')
        .addClass('icon-minus')
      return
    }
    $.ajax({
      url: 'http://test.com',
      type: 'post',
      data: {
        id: _this.id
      },
      dataType: 'json',
      success: function(res) {
        randerHorizontalTree(
          res.data,
          $(_this)
            .parent()
            .parent()
            .siblings('ul')
        )
        $(_this)
          .parent()
          .parent()
          .siblings('ul')
          .show()
        $(_this).data('clicked', true)
      }
    })
    $(this)
      .removeClass('icon-add')
      .addClass('icon-minus')
  }
  // 点击收起图标
  else if ($(this).hasClass('icon-minus')) {
    $(this)
      .parent()
      .parent()
      .siblings('ul')
      .hide()
    $(this)
      .removeClass('icon-minus')
      .addClass('icon-add')
  }
  // 点击关闭图标
  else if ($(this).hasClass('icon-off')) {
    // alert('当前目标下无子目标')
  }
})
$('#vertical-tree').on('click', '.icon', function() {
  // 点击展开图标
  if ($(this).hasClass('icon-add')) {
    var _this = this
    // 再次展开不重新渲染子菜单
    if ($(_this).data('clicked')) {
      $(_this)
        .parent()
        .parent()
        .siblings('ul')
        .show()
      $(this)
        .removeClass('icon-add')
        .addClass('icon-minus')
      return
    }
    $.ajax({
      url: 'http://test.com',
      type: 'post',
      data: {
        id: _this.id
      },
      dataType: 'json',
      success: function(res) {
        randerVerticalTree(
          res.data,
          $(_this)
            .parent()
            .parent()
            .siblings('ul')
        )
        $(_this)
          .parent()
          .parent()
          .siblings('ul')
          .show()
        $(_this).data('clicked', true)
      }
    })
    $(this)
      .removeClass('icon-add')
      .addClass('icon-minus')
  }
  // 点击收起图标
  else if ($(this).hasClass('icon-minus')) {
    $(this)
      .parent()
      .parent()
      .siblings('ul')
      .hide()
    $(this)
      .removeClass('icon-minus')
      .addClass('icon-add')
  }
  // 点击关闭图标
  else if ($(this).hasClass('icon-off')) {
    // alert('当前目标下无子目标')
  }
})

$('#horizontal-tree').on('click', 'a', function() {
  $('#horizontal-tree a').removeClass('actived')
  $(this).addClass('actived')
  $('#vertical-tree a').removeClass('actived')
  $(`#vertical-tree a[id=${this.id}]`).addClass('actived')
  $('.goal-tree-vertical').show()
  $('.goal-tree-horizontal').hide()
})
$('#vertical-tree').on('click', 'a', function() {
  $('#vertical-tree a').removeClass('actived')
  $(this).addClass('actived')
})

$('#change-menu').on('click', function() {
  $('.goal-tree-horizontal').show()
  $('.goal-tree-vertical').hide()
})
