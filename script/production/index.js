import { ref, util } from './data.js'
import info from './modules/info.js'
import myth from './modules/myth.js'
import pointBar from './modules/pointBar.js'

/* 
    绘图入口
*/

// 起源方式与神话人物诞生时間处理
// 請求數據
let files = ['../data/mythOriginWay.json', '../data/mythTime.json']
let promises = []
for (let i = 0; i < files.length; i++) {
    promises.push(d3.json(files[i]))
}

Promise.all(promises).then(function (res) {
    let originWay = res[0] // 起源方式
    let mythTime = res[1] // 神话人物诞生时間

    // 每个神根據mythTime添加顺序order
    originWay.map((item) => (item.order = mythTime.filter((i) => i.name == item.name)[0].order))
    // 排序列表，根據order降序排序
    originWay.sort((a, b) => a.order - b.order)

    // 神话人物数据
    ref.mythData = originWay.map((item) => (item = { name: item.name, entry: item.entry, originWay: item.originWay }))

    // 花朵数据
    ref.flowerData = util.getOriginTotal(originWay)

    // 图表标题及图示
    info.show()

    // 繪制按鈕
    myth.show()
    // 繪制points
    pointBar.show()
})
