// svg元素
const svg = d3.select('body').select('.nation').append('svg').attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', '0 0 960 440')

// 图表样式
export const style = {
    // 民族线
    line: {
        offset: [70, 400] // 位置(距svg边)
    },
    // 花
    flower: {
        width: 25, // 寬
        height: 70, // 高
        margin: 25, // 間距角度
        // 颜色映射
        color: {
            自然存在: '#F3F3F3',
            生育产生: '#F6C65B',
            变化产生: '#817A8F',
            婚生产生: '#F78489',
            感生产生: '#FD7E11',
            转生产生: '#A89164'
        }
    }
}

// 图表用到的工具，如比例尺
export const util = {
    // 民族線比例尺
    //设置3-120的线性定义域 及 100-700的线性值域，clamp限制在范圍內
    scale: d3.scaleLinear().domain([3, 120]).range([100, 700]).clamp(true),

    // 民族名圆形比例尺
    scaleNationCircle: d3.scaleLinear().domain([3, 100]).range([12, 24]).clamp(true),

    // 花瓣線比例尺
    scaleFlowerLine: function (min, max, value) {
        let scale = d3.scaleLinear().domain([min, max]).range([30, 70])
        return scale(value)
    },

    // 花瓣球比例尺
    scaleFlowerCircle: function (min, max, value) {
        let scale = d3.scaleLinear().domain([min, max]).range([3, 12])
        return scale(value)
    }
}

// 每个图表绘制的地方
export const selection = {
    infoGroups: svg.append('g'), // 图示与说明selections
    lineGroups: svg.append('g') // 線selections
}

// 图表数据
export const ref = {
    nationData: [] // 各民族神的生产方式
}
