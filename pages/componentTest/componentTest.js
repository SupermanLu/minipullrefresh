// pages/testComponent/testComponent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      't': 1553042732194
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.selectComponent('#minirefresh').refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.selectComponent('#minirefresh').nextPage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  itemclick: function (e) {
    console.log(e);
    wx.showToast({
      icon: 'none',
      title: e.detail.guid.toString()
    })
  }
})