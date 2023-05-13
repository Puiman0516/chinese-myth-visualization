// svg元素
const svg = d3.select('body').select('.bar').append('svg').attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', '0 0 960 445')

// 图表样式
export const style = {
    // 花
    flower: {
        offset: [480, 420],
        width: 70, // 寬
        height: 130, // 高
        margin: [30, -20], // 花瓣間距，花瓣與圆距離
        radius: 30, // 花底部圆半徑
        // 颜色映射
        color: {
            自然存在: '#F3F3F3',
            生育产生: '#F6C65B',
            变化产生: '#817A8F',
            婚生产生: '#F78489',
            感生产生: '#FD7E11',
            转生产生: '#A89164'
        }
    },
    // 神話人物button 半徑, 間距, 與svg邊緣距離 x, y
    button: {
        radius: 15,
        padding: 3,
        offset: [70, 30]
    },
    // 统计点的 半徑, 間距, 與svg邊緣距離 x, y
    point: {
        radius: 3,
        padding: 2,
        offset: [70 + 15 - 3, 30 + 15 * 2]
    },
    // 点的主体
    wayPoint: {
        自然存在: {
            fill: '#D9D099',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 3,
            ry: 3,
            transform: 'rotate(0)'
        },
        生育产生: {
            fill: '#EFECDF',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 0,
            ry: 0,
            transform: 'rotate(0)'
        },
        变化产生: {
            fill: '#4B4B4B',
            stroke: '#FFEECC',
            'stroke-width': '1px',
            rx: 3,
            ry: 3,
            transform: 'rotate(0)'
        },
        婚生产生: {
            fill: '#29BAB2',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 3,
            ry: 3,
            transform: 'rotate(0) scale(0.7)'
        },
        感生产生: {
            fill: '#EFECDF',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 0,
            ry: 0,
            transform: 'rotate(45) scale(0.6)'
        },
        转生产生: {
            fill: '#FFFFFF',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 0,
            ry: 0,
            transform: 'rotate(45)'
        }
    },
    // 点的裝飾 (如边框)
    wayPoint2: {
        自然存在: {
            fill: 'none',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 3,
            ry: 3,
            transform: 'rotate(0)'
        },
        生育产生: {
            fill: 'none',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 0,
            ry: 0,
            transform: 'rotate(0)'
        },
        变化产生: {
            fill: 'none',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 3,
            ry: 3,
            transform: 'rotate(0)'
        },
        婚生产生: {
            fill: '#4B4B4B',
            stroke: '#29BAB2',
            'stroke-width': '0.5px',
            rx: 3,
            ry: 3,
            transform: 'rotate(0) scale(1.1)'
        },
        感生产生: {
            fill: '#4B4B4B',
            stroke: '#EFECDF',
            'stroke-width': '0.5px',
            rx: 0,
            ry: 0,
            transform: 'rotate(45) scale(0.9)'
        },
        转生产生: {
            fill: '#4B4B4B',
            stroke: 'none',
            'stroke-width': '0px',
            rx: 0,
            ry: 0,
            transform: 'rotate(45)'
        }
    }
}

// 图表用到的工具，如比例尺
export const util = {
    // 詞條數比例尺
    //设置1-140的线性定义域 及 8-40的线性值域，clamp限制在范圍內
    scale: d3.scaleLinear().domain([1, 140]).range([8, 40]).clamp(true),

    getOriginTotal: function (data) {
        let result = ref.way.map((item) => (item = { name: item }))
        result.map(function (item) {
            let sum = 0
            // 遍历data (originWay)
            data.forEach((i) => {
                // 篩選出 originWay的name为花朵数据中对應項的name 的項
                let filter = i.originWay.filter((i) => i.name == item.name)
                // 加上符合條件的項中的value，若filter为空則+0
                sum += filter.length > 0 ? filter[0].value : 0
            })
            // 赋值
            item.value = sum
        })
        // 求民族中所有生产方式中的最大值
        let max = Math.max.apply(
            Math,
            result.map((item) => {
                return item.value
            })
        )
        // 求民族中所有生产方式中的最小值
        let min = Math.min.apply(
            Math,
            result.map((item) => {
                return item.value
            })
        )
        result.map(function (item) {
            item.max = max
            item.min = min
        })
        return result
    }
}

// 每个图表绘制的地方
export const selection = {
    infoGroups: svg.append('g'), // 图示与说明selections
    mythGroups: svg.append('g'), // 各神话人物按钮selections
    pointGroups: svg.append('g'), // 神话人物柱狀(点)图selections
    flowerGroups: svg.append('g'), // 花朵selections
    circleGroups: svg.append('g') // 花朵中心selections
}

// 图表数据
export const ref = {
    mythData: [], // 各神話人物数据
    flowerData: [], // 花朵数据

    // 所有起源方式，用于生成图示
    way: ['自然存在', '生育产生', '变化产生', '婚生产生', '感生产生', '转生产生'],
    wayFilter: [] // 用于篩選起源方式的list，一开始为全不选
}
