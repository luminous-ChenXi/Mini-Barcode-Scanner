// pages/generate/generate.js
const app = getApp()

Page({
  data: {
    inputText: '',
    barcodeTypes: ['二维码 (QR Code)', '条形码 (Code 128)'],
    selectedTypeIndex: 0,
    generatedImage: '',
    generating: false
  },

  onLoad() {
    console.log('生成页面加载')
  },

  // 输入内容变化
  onInputChange(e) {
    const inputText = e.detail.value
    this.setData({
      inputText: inputText
    })
  },

  // 获取字符计数器的样式类
  getCharCountClass() {
    const length = this.data.inputText.length
    if (length >= 450) {
      return 'danger'
    } else if (length >= 400) {
      return 'warning'
    }
    return ''
  },

  // 条码类型变化
  onTypeChange(e) {
    this.setData({
      selectedTypeIndex: parseInt(e.detail.value)
    })
  },

  // 生成条码
  async generateBarcode() {
    if (!this.data.inputText.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    console.log('开始生成条码...')
    console.log('输入内容:', this.data.inputText)
    console.log('API地址:', app.globalData.apiBaseUrl)
    
    this.setData({ generating: true })

    try {
      // 获取选中的条码类型
      const selectedType = this.data.selectedTypeIndex === 0 ? 'qrcode' : 'code128'

      // 调用后端API生成条码
      const requestData = {
        content: this.data.inputText,
        barcode_type: selectedType
      }
      console.log('请求数据:', requestData)
      console.log('完整请求URL:', `${app.globalData.apiBaseUrl}/api/generate`)
      
      const result = await new Promise((resolve, reject) => {
        wx.request({
          url: `${app.globalData.apiBaseUrl}/api/generate`,
          method: 'POST',
          data: requestData,
          header: {
            'content-type': 'application/json'
          },
          success: resolve,
          fail: reject
        })
      })

      if (result.statusCode === 200) {
        const data = result.data
        console.log('API响应数据:', data)
        if (data.success) {
          this.setData({
            generatedImage: data.image_url
          })
          wx.showToast({
            title: '生成成功',
            icon: 'success'
          })
        } else {
          console.error('API返回错误:', data.message)
          wx.showToast({
            title: data.message || '生成失败',
            icon: 'error'
          })
        }
      } else {
        console.error('HTTP错误状态码:', result.statusCode)
        wx.showToast({
          title: '服务器错误',
          icon: 'error'
        })
      }

    } catch (error) {
      console.error('生成错误:', error)
      wx.showToast({
        title: '网络连接失败',
        icon: 'error'
      })
    } finally {
      this.setData({ generating: false })
    }
  },

  // 保存到相册
  saveToAlbum() {
    if (!this.data.generatedImage) return

    // 将base64数据转换为临时文件路径
    const base64Data = this.data.generatedImage.replace(/^data:image\/\w+;base64,/, '')
    const filePath = wx.env.USER_DATA_PATH + '/generated_barcode.png'
    
    // 将base64写入文件
    wx.getFileSystemManager().writeFile({
      filePath: filePath,
      data: base64Data,
      encoding: 'base64',
      success: () => {
        // 保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: filePath,
          success: () => {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
            // 清理临时文件
            wx.getFileSystemManager().unlink({
              filePath: filePath,
              success: () => console.log('临时文件已清理'),
              fail: (err) => console.error('清理临时文件失败:', err)
            })
          },
          fail: (err) => {
            console.error('保存失败:', err)
            if (err.errMsg.includes('auth deny')) {
              // 需要授权
              wx.showModal({
                title: '需要相册权限',
                content: '请授权访问相册以保存图片',
                success: (res) => {
                  if (res.confirm) {
                    wx.openSetting()
                  }
                }
              })
            } else {
              wx.showToast({
                title: '保存失败',
                icon: 'error'
              })
            }
            // 清理临时文件
            wx.getFileSystemManager().unlink({
              filePath: filePath,
              success: () => console.log('临时文件已清理'),
              fail: (err) => console.error('清理临时文件失败:', err)
            })
          }
        })
      },
      fail: (err) => {
        console.error('写入文件失败:', err)
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
      }
    })
  },

  // 分享条码
  shareBarcode() {
    if (!this.data.generatedImage) return

    wx.showShareMenu({
      withShareTicket: true
    })

    wx.showToast({
      title: '请使用微信分享功能',
      icon: 'none'
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