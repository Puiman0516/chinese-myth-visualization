// svg元素
const svg = d3.select('body').select('.timeLine').append('svg').attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', '0 0 960 428') // 960 453

// 图表样式
export const style = {
    // 神話人物标志
    myth: {
        offset: [44, 360], // 位置(距svg边) 44, 370
        width: 25, // 寬
        height: 70, // 高
        angle: 12, // 令牌形狀角度
        margin: [10, 10] // 令牌間距及令牌與時間軸間距
    },
    // 神话人物图片
    img: {
        height: 290, // 高 300
        width: 36, // 寬
        margin: 5, // 边框之間的間距
        padding: [20, -20], // 图与交互范圍的大小差
        // 微調特定神話人物圖片位置
        mythMargin: {
            盘瓠: 70,
            雷神: -25,
            玉皇大帝: -5,
            天女: -15,
            丁巴什罗: 45
        }
    }
}

// 图表用到的工具，如比例尺
export const util = {}

// 每个图表绘制的地方
export const selection = {
    defsGroups: svg.append('defs'), // 重复使用元素selections
    infoGroups: svg.append('g'), // 标题selections
    imgGroups: svg.append('g'), // 人物图selections
    mythGroups: svg.append('g'), // 各神话人物按钮selections
    lineGroups: svg.append('g') // 時間軸selections
}

// 图表数据
export const ref = {
    mythData: [], // 各神話人物及年份

    year: { 100000000: '1亿', 10000: '1万' } // 年份映射
}
