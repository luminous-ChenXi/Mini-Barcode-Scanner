// pages/index/index.js
Page({
  data: {
    // 页面数据
  },

  onLoad() {
    console.log('首页加载')
  },

  onShow() {
    console.log('首页显示')
  },

  // 跳转到识别页面
  goToScan() {
    wx.switchTab({
      url: '/pages/scan/scan'
    })
  },

  // 跳转到生成页面
  goToGenerate() {
    wx.switchTab({
      url: '/pages/generate/generate'
    })
  },

  // 打开开发者网站
  openDeveloperWebsite() {
    wx.showModal({
      title: '打开外部链接',
      content: '即将打开开发者网站 https://luminouschenxi.com',
      confirmText: '确认打开',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 使用微信小程序打开外部链接
          wx.navigateToMiniProgram({
            appId: '', // 这里需要配置小程序的appId
            path: '',
            extraData: {},
            envVersion: 'release',
            success: (res) => {
              console.log('打开小程序成功', res)
            },
            fail: (err) => {
              console.error('打开小程序失败:', err)
              // 如果小程序方式失败，尝试使用web-view或复制链接
              wx.setClipboardData({
                data: 'https://luminouschenxi.com',
                success: () => {
                  wx.showModal({
                    title: '提示',
                    content: '链接已复制到剪贴板，请在浏览器中打开',
                    showCancel: false,
                    confirmText: '知道了'
                  })
                }
              })
            }
          })
        }
      }
    })
  }
})