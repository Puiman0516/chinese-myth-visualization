import { ref } from './data.js'
import info from './modules/info.js'
import nation from './modules/nation.js'

/* 
    绘图入口
*/

// 图表标题及图示
info.show()

// 加載數據
d3.json('../data/nationOriginWay.json').then(function (root) {
    // 篩出诞生方式>2的民族
    let data = root.filter((item) => item.value > 1)
    // 每个民族下的每个生产方式，都添加上该民族所有生产方式中的最大值、最小值、數量及该生产方式的索引
    data.map((item, index) =>
        item.data.map(function (origin) {
            // 求民族中所有生产方式中的最大值
            let max = Math.max.apply(
                Math,
                item.data.map((item) => {
                    return item.value
                })
            )
            // 求民族中所有生产方式中的最小值
            let min = Math.min.apply(
                Math,
                item.data.map((item) => {
                    return item.value
                })
            )
            origin.max = max // 最大值
            origin.min = min // 最小值
            origin.len = item.data.length // 民族拥有的生产方式数
            origin.index = index // 该生产方式在该民族的索引
        })
    )
    // 賦值數據
    ref.nationData = data

    // 繪制民族图
    nation.show()
})
