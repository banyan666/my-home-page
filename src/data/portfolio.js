import openCesiumCover from '../../assets/projects/opencesium-community.svg?url'
import openThreeCover from '../../assets/projects/openthree-community.svg?url'
import bMapViewerCover from '../../assets/projects/bmapviewer.svg?url'

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
    demoUrl: 'https://banyan666.github.io/BMapViewer-docs/',
    githubUrl: 'https://github.com/banyan666/BMapViewer',
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
