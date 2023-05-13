import { ref } from './data.js'
import map from './modules/map.js'
import nationMap from './modules/nationMap.js'
import myth from './modules/myth.js'
import nationMyth from "./modules/nationMyth.js"
import info from './modules/info.js'

/* 
    绘图入口
*/

// 图表标题及图示
info.show()

// 地图数据与神话人物数据处理
// 請求數據
let files = ['../data/chinaMap.json', '../data/nationMap.json', '../data/nationMyth.json', '../data/mythNation.json', '../data/mythTime.json']
let promises = []
for (let i = 0; i < files.length; i++) {
    promises.push(d3.json(files[i]))
}

// 請求多個json
Promise.all(promises)
    .then(function (res) {
        ref.chinaMap = res[0].features
        ref.nationMap = res[1].features
        ref.nationData = res[2]

        let mythNation = res[3]
        let mythTime = res[4]
        // 每个神根據mythTime添加顺序order
        mythNation.map((item) => (item.order = mythTime.filter((i) => i.name == item.name)[0].order))
        // 排序列表，根據order降序排序
        mythNation.sort((a, b) => a.order - b.order)
        ref.mythData = mythNation

        // 显示地图
        map.show()
        // 显示民族分布
        nationMap.show()
        // 显示神话人物按钮
        myth.show()
        // 显示民族与神话人物面积图
        nationMyth.show()
    })
    .catch((err) => console.log(err))
