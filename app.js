// app.js
App({
  onLaunch() {
    // 小程序启动时的初始化操作
    console.log('条码识别与生成小程序启动')
    
    // 检查登录状态
    this.checkLogin()
  },

  onShow() {
    console.log('小程序显示')
  },

  onHide() {
    console.log('小程序隐藏')
  },

  globalData: {
    userInfo: null,
    apiBaseUrl: 'https://bankend.luminouschenxi.com' // 后端API地址，使用线上服务器
  },

  // 检查登录状态
  checkLogin() {
    // 这里可以添加登录检查逻辑
    console.log('检查登录状态')
  },

  // 显示错误消息
  showError(message) {
    wx.showToast({
      title: message,
      icon: 'error',
      duration: 2000
    })
  },

  // 显示成功消息
  showSuccess(message) {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000
    })
  }
})