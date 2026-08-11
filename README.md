# Bryan Portfolio

Bryan 的电影感个人主页，围绕前端、地图 GIS、Java 全栈、AI 应用与生活影像展开。
## 技术栈

- Vue 3 Composition API
- Vite 7
- GSAP（横向场景与视频淡入淡出）
- Formspree（联系表单）

## 本地开发

```bash
npm install
npm run dev
```

默认访问 `http://localhost:5173`。

请通过上述命令启动开发服务器，不要直接双击 `index.html` 或使用普通静态服务器打开源码；Vue 的模块依赖需要由 Vite 转换。

## 生产构建

```bash
npm run build
npm run preview
```

构建产物输出到 `dist/`，可部署到 GitHub Pages 或 Vercel。仓库中的 `vercel.json` 已包含 Vercel 单页应用回退配置。

## 站点访问地址

https://banyan666.github.io/my-home-page/


## 宠物相册

第三页右侧滚动相册直接读取 `assets/pet/` 下的宠物照片；照片标题与说明统一维护在 `src/data/portfolio.js` 中。

## 目录结构

```text
src/
├── components/       # 页面区块、项目弹窗与相册灯箱
├── data/portfolio.js # 项目与照片内容
├── App.vue            # 全局状态、导航与 GSAP 编排
├── main.js            # Vue 入口
└── styles.css         # 视觉系统与响应式规则
assets/                # 视频、音频、项目封面与宠物照片
public/projects/       # 项目封面
```

## 体验特性

- 保留原版四个全屏横向场景：首页、项目、图库、联系
- 保留滚轮、触摸滑动、键盘与顶部导航切换场景的交互
- 保留原背景视频链路：`scene1` 循环 → `transition_1_2` → `scene2` 开场 → `scene2_idle_loop`，图库使用 `scene3` 开场后衔接循环片
- 视频播放期间再次滚动可跳过当前过渡，避免导航被长视频锁住
- 首屏进入遮罩、背景音乐、场景进度与 GSAP 横向切换
- 项目案例详情弹窗与外部作品链接
- 10 张宠物照片的响应式画廊与键盘灯箱导航
- 移动端场景控制、触摸切换与联系表单
- 键盘焦点、模态区隔离和 `prefers-reduced-motion` 降级
