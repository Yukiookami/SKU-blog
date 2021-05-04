// 老婆
declare global {
  interface Window {
    L2Dwidget:any;
  }
}

export const setYome = setTimeout(() => {
  window.L2Dwidget.init({
    pluginRootPath: '/live2dw/',
    pluginJsPath: 'lib/',
    pluginModelPath: 'live2d-widget-model-koharu/assets/',
    tagMode: false,
    debug: false,
    model: { jsonPath: '/live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
    display: { position: 'left', width: 250, height: 350 },
    mobile: { show: true },
    log: false
  })
}, 1000)
