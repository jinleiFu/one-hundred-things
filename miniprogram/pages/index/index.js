//index.js
const app = getApp()

Page({
  data: {
    checked: true
  },

  onChange(event) {
    this.setData({
      checked: event.detail
    });
  }

})
