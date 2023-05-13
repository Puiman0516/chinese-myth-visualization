import { ref } from './data.js'
import info from './modules/info.js'
import timeLine from './modules/timeLine.js'
import mythImg from "./modules/mythImg.js"

/* 
    绘图入口
*/

// 图表标题及图示
info.show()

// 加載數據
d3.json('./data/mythTime.json').then(function (root) {
    ref.mythData = root
    // 过長的年份映射成汉字形式
    ref.mythData.map((item) => (item.year = ref.year[item.year] ? ref.year[item.year] : item.year))

    // 繪制时间轴
    timeLine.show()

    // 繪制人物圖
    mythImg.show()
})
