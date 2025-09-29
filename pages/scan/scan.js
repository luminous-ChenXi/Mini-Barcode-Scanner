// pages/scan/scan.js
const app = getApp()

Page({
  data: {
    imagePath: '',
    results: [],
    scanning: false
  },

  onLoad() {
    console.log('识别页面加载')
  },

  // 打开摄像头
  openCamera() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({
          imagePath: tempFilePath,
          results: []
        })
      },
      fail: (err) => {
        console.error('打开摄像头失败:', err)
        wx.showToast({
          title: '打开摄像头失败',
          icon: 'error'
        })
      }
    })
  },

  // 选择相册图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({
          imagePath: tempFilePath,
          results: []
        })
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
        wx.showToast({
          title: '选择图片失败',
          icon: 'error'
        })
      }
    })
  },

  // 识别条码
  async scanBarcode() {
    if (!this.data.imagePath) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      })
      return
    }

    this.setData({ scanning: true })

    try {
      // 上传图片到后端API
      const uploadTask = wx.uploadFile({
        url: `${app.globalData.apiBaseUrl}/scan`,
        filePath: this.data.imagePath,
        name: 'file',
        success: (res) => {
          if (res.statusCode === 200) {
            const data = JSON.parse(res.data)
            if (data.success) {
              this.setData({
                results: data.results
              })
              wx.showToast({
                title: `识别到 ${data.count} 个条码`,
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: data.error || '识别失败',
                icon: 'error'
              })
            }
          } else {
            wx.showToast({
              title: '服务器错误',
              icon: 'error'
            })
          }
        },
        fail: (err) => {
          console.error('上传失败:', err)
          wx.showToast({
            title: '网络连接失败',
            icon: 'error'
          })
        },
        complete: () => {
          this.setData({ scanning: false })
        }
      })

      // 监听上传进度
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度:', res.progress)
      })

    } catch (error) {
      console.error('识别错误:', error)
      this.setData({ scanning: false })
      wx.showToast({
        title: '识别失败',
        icon: 'error'
      })
    }
  },

  // 重新选择图片
  retakeImage() {
    this.setData({
      imagePath: '',
      results: []
    })
  },

  // 复制识别结果
  copyResult(e) {
    const index = e.currentTarget.dataset.index
    const result = this.data.results[index]
    
    wx.setClipboardData({
      data: result.data,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        })
      }
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