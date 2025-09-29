
# 条码识别与生成小程序
条码识别与生成系统：Barcode-Scanner-Generator的小程序版本（共用同一个后端，详情请参考https://github.com/luminous-ChenXi/Barcode-Scanner-Generator）
是一个功能完整的微信小程序，提供二维码和条形码的识别与生成功能。

## 🚀 功能特性

- **条码识别**：支持摄像头实时识别和相册图片识别
- **条码生成**：支持生成二维码和多种类型的条形码
- **保存分享**：生成的条码可保存到相册或分享给好友
- **美观界面**：现代化的UI设计，流畅的动画效果
- **响应式布局**：适配不同尺寸的移动设备

![f7d1a260ceeb7d84d25354cbdcb5c16d](https://github.com/user-attachments/assets/6d13c91b-4fe6-44c8-bece-0e43ddfdf2a0)

## 📱 技术栈

### 前端
- **微信小程序**：原生小程序框架
- **WXML/WXSS**：页面结构和样式
- **JavaScript**：业务逻辑处理

### 后端
- **Python Flask**：RESTful API服务
- **OpenCV**：图像处理和条码识别
- **qrcode**：二维码生成
- **Pillow**：图像处理

## 📋 环境要求

- 微信开发者工具（最新版本）
- Python 3.8+ （推荐3.8-3.9版本）
- 支持微信小程序的手机设备

## 🛠️ 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd miniprogram-package
```

### 2. 启动后端服务
```bash
# 进入后端目录
cd ../backend

# 安装依赖
pip install -r requirements.txt

# 启动服务
python app.py
```
后端服务将在 http://localhost:5000 启动(本地可关闭url安全性检验)

### 3. 配置微信开发者工具
1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择本目录 (`miniprogram-package`)
4. 填写AppID（可以使用测试号）
5. 点击"确定"导入项目

### 4. 配置API地址
在 `pages/generate/generate.js` 和 `pages/scan/scan.js` 中，确保API地址配置正确：
```javascript
const API_BASE = 'http://localhost:5000/api';
```

## 📖 使用说明

### 条码识别
1. 进入"识别"页面
2. 点击"打开摄像头"进行实时识别
3. 或点击"选择相册"从相册选择图片
4. 系统自动识别并显示条码内容

### 条码生成
1. 进入"生成"页面
2. 输入要生成的内容（文本、网址等）
3. 选择条码类型（二维码、条形码等）
4. 点击"生成条码"按钮
5. 生成的条码可保存到相册或分享

## 📁 项目结构

```
miniprogram-package/
├── app.js                 # 小程序入口文件
├── app.json               # 小程序配置文件
├── app.wxss               # 全局样式
├── pages/                 # 页面文件
│   ├── index/             # 首页
│   ├── scan/              # 识别页面
│   └── generate/          # 生成页面
├── images/                # 图片资源
│   ├── home.png           # 首页图标
│   ├── scan.png           # 识别图标
│   └── generate.png       # 生成图标
├── project.config.json    # 项目配置
└── README.md              # 项目说明
```

## 🔧 开发说明

### 页面结构
- **首页** (`pages/index`)：功能入口和说明
- **识别页面** (`pages/scan`)：条码识别功能
- **生成页面** (`pages/generate`)：条码生成功能

### API接口
- `POST /api/generate`：生成条码
- `POST /api/scan`：识别条码

### 样式规范
- 使用rpx单位确保响应式布局
- 统一的颜色规范和动画效果
- 毛玻璃效果和渐变背景

## 🐛 常见问题

### Q: 小程序无法连接到后端服务
A: 确保后端服务正在运行，且API地址配置正确

### Q: 摄像头权限被拒绝
A: 在小程序设置中授权摄像头和相册权限

### Q: 生成的条码无法保存
A: 确保已授权相册写入权限

### Q: 识别准确率不高
A: 确保图片清晰，条码区域完整可见

## 📄 许可证

本项目基于 MIT 许可证开源。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

## 📞 联系方式

- 项目负责人主页：[Luminous辰汐](https://github.com/LuminousChenxi)
- 博主主页：[Luminous辰汐](https://luminouschenxi.com/)
- 问题反馈：GitHub Issues
- 邮箱：luminouschenxi@outlook.com

## 🙏 致谢

感谢以下开源项目的支持：
- 微信小程序框架
- Python Flask
- OpenCV
- qrcode库

本项目使用了以下服务的支持：
- Trae CI/CD 服务
- 微信小程序测试号
- Visual Studio Code
- 阿里云服务器
- 腾讯云函数服务

---

⭐ 如果这个项目对你有帮助，请给个Star！
