{
  "name": "${safeName}",
  "version": "1.0.0",
  "private": true,
  "description": "由 create-uni-app 生成的 uni-app 项目",
  "scripts": {
    "dev:h5": "uni",
    "dev:mp-weixin": "uni -p mp-weixin",
    "dev:app": "uni -p app",
    "build:h5": "uni build",
    "build:mp-weixin": "uni build -p mp-weixin",
    "build:app": "uni build -p app"
${tsScripts}},
  "dependencies": {
    "@dcloudio/uni-app": "${uniVersion}",
    "@dcloudio/uni-components": "${uniVersion}",
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@dcloudio/types": "^3.4.8",
    "@dcloudio/uni-automator": "${uniVersion}",
    "@dcloudio/uni-cli-shared": "${uniVersion}",
    "@dcloudio/uni-stacktracey": "${uniVersion}",
    "@dcloudio/vite-plugin-uni": "${uniVersion}",
    "vite": "^5.2.8"${tsDevDeps}}
}