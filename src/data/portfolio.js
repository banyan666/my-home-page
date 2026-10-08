import openCesiumCover from '../../assets/projects/opencesium-community.svg?url'
import openThreeCover from '../../assets/projects/openthree-community.svg?url'
import bMapViewerCover from '../../assets/projects/bmapviewer.svg?url'
import bMap3DCover from '../../assets/projects/bmap3d.svg?url'
import documentViewerCover from '../../assets/projects/document-viewer-v3.svg?url'

const petAssets = import.meta.glob('../../assets/pet/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const petPhoto = (file) => petAssets[`../../assets/pet/${file}`]

export const projects = [
  {
    id: 'opencesium-community',
    number: '01',
    title: 'OpenCesium',
    type: 'Cesium Open-source Community',
    description: '参与 OpenCesium 社区维护，围绕 Cesium、三维 GIS 与 AI 生态持续整理项目内容并支持社区协作。',
    summary: '参与 OpenCesium 社区维护，共建面向 Cesium 与三维地理开发者的开放协作平台。',
    background: 'OpenCesium 致力于建设中国 Cesium 开源生态，社区主页集中呈现成员、仓库与生态项目，为三维地理开发者提供更清晰的资源入口和协作连接。',
    features: ['社区成员与项目展示', '开源仓库聚合', 'Cesium Skills 入口', '社区协作与加入指引'],
    role: ['社区日常维护', '项目信息与内容更新', '开源资源整理', '协作问题跟进'],
    tech: ['CesiumJS', 'WebGIS', 'JavaScript', 'Open Source'],
    status: 'COMMUNITY MAINTENANCE',
    image: openCesiumCover,
    demoUrl: 'https://opencesium.github.io/',
    githubUrl: 'https://github.com/OpenCesium',
  },
  {
    id: 'openthree-community',
    number: '02',
    title: 'OpenThree',
    type: 'Web3D Open-source Community',
    description: '参与 OpenThree 社区维护，协助沉淀 Three.js、Cesium 与 Web3D 示例资源，连接开发者与开源项目。',
    summary: '参与 OpenThree 社区维护，共建面向 Web3D 开发者的项目与案例生态。',
    background: 'OpenThree 聚焦 Web 三维可视化开源生态，通过社区主页、项目导航与示例集合降低 Three.js 和 Cesium 的学习与实践门槛。',
    features: ['社区成员与项目展示', 'Web3D 资源导航', 'Three.js 与 Cesium 示例', '开源协作入口'],
    role: ['社区日常维护', '项目内容整理', '示例资源更新', '协作问题跟进'],
    tech: ['Three.js', 'CesiumJS', 'WebGL', 'Open Source'],
    status: 'COMMUNITY MAINTENANCE',
    image: openThreeCover,
    demoUrl: 'https://openthree.github.io/',
    githubUrl: 'https://github.com/OpenThree',
  },
  {
    id: 'bmapviewer',
    number: '03',
    title: 'BMapViewer',
    type: 'Vue 3 / Cesium GIS Component',
    description: '开发基于 Vue 3 与 Cesium 的离线 GIS 可视化组件，封装地图加载、图层与交互能力，帮助前端快速构建三维地图。',
    summary: '面向 Vue 3 项目的 Cesium 地理信息可视化组件与配套文档。',
    background: 'Cesium 功能丰富，但初始化、图层组织、事件交互与离线部署存在较高接入成本。BMapViewer 将常用地图能力组件化，减少重复配置并降低 GIS 可视化的使用门槛。',
    features: ['2D / 3D 地图加载', '点线面与特效图层', '地图事件、插槽与工具', '离线部署与空间分析'],
    role: ['组件架构与 API 设计', 'Cesium Viewer 封装', '可视化图层开发', 'VitePress 文档建设'],
    tech: ['Vue 3', 'CesiumJS', 'Vite', 'Turf.js'],
    status: 'ACTIVE DEVELOPMENT',
    image: bMapViewerCover,
    demoUrl: 'https://banyan666.github.io/BMapViewer/',
    githubUrl: 'https://github.com/banyan666/BMapViewer',
  },
  {
    id: 'bmap3d',
    number: '04',
    title: 'BMap3D',
    type: 'Vue 3 / Three.js Map Component',
    description: '开发基于 Vue 3、Three.js、d3-geo 与 GSAP 的可交互 3D 行政区地图组件，以 GeoJSON 驱动区域可视化与地图交互。',
    summary: '面向 Vue 3 项目的可交互 3D 行政区地图组件、完整示例与配套文档。',
    background: '传统行政区地图在三维层级、视觉表现与交互封装上需要大量重复开发。BMap3D 将 GeoJSON 投影、区域挤出、纹理材质、事件交互与动画能力整合为 Vue 3 组件，降低三维地图在业务项目中的接入成本。',
    features: ['GeoJSON 行政区渲染', '3D 区域挤出与纹理材质', '地图事件与实例方法', '组件库、类型声明与示例文档'],
    role: ['组件架构与 API 设计', 'Three.js 与 d3-geo 渲染开发', '交互动画与事件封装', '示例、类型声明与文档建设'],
    tech: ['Vue 3', 'Three.js', 'd3-geo', 'GSAP'],
    status: 'ACTIVE DEVELOPMENT',
    image: bMap3DCover,
    demoUrl: 'https://banyan666.github.io/BMap3D/',
    githubUrl: 'https://github.com/banyan666/BMap3D',
  },
  {
    id: 'document-viewer-v3',
    number: '05',
    title: 'DocumentViewerV3',
    type: 'Vue 3 / Multi-format Document Viewer',
    description: '开发面向 Vue 3 的浏览器端文档预览组件，统一支持 Word、Excel、PDF、PowerPoint 与常见图片，并提供完整的预览工具。',
    summary: '面向 Vue 3 项目的多格式文档预览组件，统一处理本地文件与远程文档。',
    background: '不同办公文档通常需要接入多套预览方案，并分别处理加载、缩放、下载和错误状态。DocumentViewerV3 通过统一组件接口整合多格式渲染器，让业务项目可以用一致的方式预览本地 File 与远程 URL。',
    features: ['Word、Excel、PDF、PPTX 与图片预览', '本地 File 与远程 URL', '渲染器按需加载与进度反馈', '缩放、旋转、下载、打印与主题控制'],
    role: ['组件架构与统一 API 设计', '多格式渲染器集成与按需加载', '工具栏、事件与实例方法开发', '示例站与 VitePress 文档建设'],
    tech: ['Vue 3', 'TypeScript', 'Vite', 'VitePress'],
    status: 'ACTIVE DEVELOPMENT',
    image: documentViewerCover,
    demoUrl: 'https://banyan666.github.io/DocumentViewerV3/',
    docsUrl: 'https://banyan666.github.io/DocumentViewerV3/docs/',
    githubUrl: 'https://github.com/banyan666/DocumentViewerV3',
  },
]

export const skills = [
  { id: 'vue', title: 'Vue', mark: 'VUE', group: 'FRONTEND', category: 'Progressive Framework', accent: '65, 184, 131' },
  { id: 'react', title: 'React', mark: 'RE', group: 'FRONTEND', category: 'UI Development', accent: '97, 182, 215' },
  { id: 'vite', title: 'Vite', mark: 'V', group: 'TOOLING', category: 'Build Tool', accent: '130, 112, 224' },
  { id: 'uni-app', title: 'uni-app', mark: 'UNI', group: 'CROSS-PLATFORM', category: 'Multi-end Application', accent: '59, 189, 107' },
  { id: 'react-native', title: 'React Native', mark: 'RN', group: 'MOBILE', category: 'Native Application', accent: '80, 157, 190' },
  { id: 'cesium', title: 'Cesium', mark: '3D', group: 'WEBGIS', category: '3D Globe Engine', accent: '70, 167, 170' },
  { id: 'qgis', title: 'QGIS', mark: 'Q', group: 'GIS', category: 'Spatial Analysis', accent: '115, 154, 73' },
  { id: 'three-js', title: 'Three.js', mark: 'THREE', group: 'WEB 3D', category: 'WebGL Rendering', accent: '150, 164, 174' },
  { id: 'java', title: 'Java', mark: 'JAVA', group: 'BACKEND', category: 'Server Development', accent: '179, 105, 76' },
  { id: 'postgresql', title: 'PostgreSQL', mark: 'PG', group: 'DATABASE', category: 'Relational Database', accent: '70, 116, 159' },
]

const petNotes = [
  ['挨着睡', '一白一灰挤在小窝里，连午睡都要并排。'],
  ['抱团午睡', '两只小猫靠在一起，把柔软的午后睡成同一场梦。'],
  ['抱鱼入梦', '抱紧最喜欢的小鱼玩具，认真完成今天的午睡任务。'],
  ['贴贴时刻', '灰猫把爪子搭在伙伴身上，安静守着彼此。'],
  ['镜头太近', '好奇心一路贴到镜头前，留下一个毫无防备的大头特写。'],
  ['一起赖床', '暖光落在相互依偎的身影上，谁也没有先起床。'],
  ['端正猫饼', '在粉色床单上收好四肢，认真观察房间里的一切。'],
  ['门口等你', '站在门边睁圆眼睛，像是在等一个熟悉的脚步声。'],
  ['严肃巡视', '趴在猫爬架上审视全场，表情写满沉稳与威严。'],
  ['沙发坐姿', '靠着花纹靠枕坐得一本正经，像在参加家庭会议。'],
]

export const photos = petNotes.map(([title, description], index) => ({
  id: index + 1,
  src: petPhoto(`photo${index + 1}.jpg`),
  title,
  description,
  date: `PET ${String(index + 1).padStart(2, '0')}`,
}))
