# BangInput 产品介绍站

中文输入、离线语音、AI 文本工具、密码管理与隐私控制的公开介绍。

站点地址为 https://junelegency.github.io/banginput-site/ 。

## 本地预览

运行 `python3 -m http.server 8080`，然后打开 http://localhost:8080 。

`index.html` 为页面内容，`styles.css` 为响应式样式，`app.js` 仅处理导航、预设功能示例和语气切换。页面使用本地字体与图标，无需构建步骤。交互示例在浏览器本地运行，语音示例为预设文字，未接入麦克风或模型服务。

## 部署

GitHub Pages 使用 `main` 分支根目录，并通过 `.nojekyll` 直接发布静态文件。所有内部资源使用相对路径，支持项目站点的子路径部署。

## 内容维护

能力核对日期为 2026-11-26，当前 Android 体验版为 0.7.99。更新产品版本时，同步修改页面体验说明及 SoftwareApplication 元数据。平台能力、模型方式及联网用途按已验证状态描述，演示使用预设文本与合成账号。

当前使用既有支持邮箱提供体验联系，隐私政策指向 https://shiyuime.github.io/privacy/ 。公开下载渠道就绪后，可更新体验入口。

Geist 字体的许可见 assets/OFL-Geist.txt 。品牌图标沿用 BangInput 已有商店物料。
