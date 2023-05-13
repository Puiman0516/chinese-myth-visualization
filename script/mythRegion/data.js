// svg元素
const svg = d3.select('body').select('.map').append('svg').attr('preserveAspectRatio', 'xMidYMid meet').attr('viewBox', '0 0 960 445')

// 定義地圖投影
const projection = d3
    .geoMercator() // json to geoJson
    .center([107, 31]) // 地图中心位置,107是经度, 31是纬度
    .scale(350) // 縮放
    .translate([960 / 2 + 16, 420 / 2 + 80]) // 移動

// 图表样式
export const style = {
    // 神話人物button 半徑, 間距, 與svg邊緣距離 x, y
    button: {
        radius: 12,
        margin: [7.4, 280], // 神標誌間距角度，与中心距離
        offset: [480, 222]
    },
    nationPoint: {
        height: 10,
        width: 5,
        color: {
            汉族: '#870300',
            瑶族: '#fffcb2',
            仡佬族: '#2d3342',
            壮族: '#2a1d27',
            侗族: '#126494',
            回族: '#659b66',
            苗族: '#f7c298',
            毛南族: '#e0c5ce',
            土族: '#ae6c60',
            白族: '#a0d4bd',
            畲族: '#c36625',
            黎族: '#e67780',
            彝族: '#aaa1ce',
            纳西族: '#e3e276',
            佤族: '#a58262',
            高山族: '#382c76',
            满族: '#e4653a',
            哈萨克族: '#749aad',
            布依族: '#ccd3c5',
            鄂温克族: '#8b8b8b',
            蒙古族: '#dbccb6',
            羌族: '#625eaa',
            藏族: '#ff3e17',
            裕固族: '#703117',
            仫佬族: '#7b525a',
            锡伯族: '#ceecff'
        }
    },
    // 柱狀條寬度 radius*12-18
    bar: {
        width: 4
    }
}

// 图表用到的工具，如比例尺
export const util = {
    // 地圖路徑生成器
    path: d3.geoPath().projection(projection), // 定義路徑生成器，设定投影
    // 民族范圍比例尺，设置25008-902297的线性定义域 及 10-55的线性值域
    scale: d3.scaleLinear().domain([25008, 902297]).range([10, 55])
}

// 每个图表绘制的地方
export const selection = {
    mapGroups: svg.append('g'), // 地图selection
    infoGroups: svg.append('g'), // 图示与说明selections
    nationAreaGroups: svg.append('g'), // 民族範圍selections
    lineGroups: svg.append('g'), // 線條selections
    nationPointGroups: svg.append('g'), // 民族点selections
    mythGroups: svg.append('g'), // 各神话人物按钮selections
    nationMythGroups: svg.append('g') // 民族對應神area selections
}

// 图表数据
export const ref = {
    chinaMap: [], // 地图数据
    nationMap: [], // 民族地图数据
    mythData: [], // 各神話人物的民族
    nationData: [], // 各民族的神话人物

    nationsName: [], // 民族名稱，用以進行神話人物的地區的filter
    mythsName: [], // 顯示的神話人物，用以進行地區的神話人物的filter

    // 神的名字映射成繁体
    simToCom: {
        伏羲: '伏',
        黄帝: '黃',
        女娲: '女',
        盘古: '古',
        盘瓠: '瓠',
        布洛陀: '布',
        丁巴什罗: '丁',
        雷神: '神',
        密洛陀: '密',
        天帝: '帝',
        天女: '天',
        灶神: '神',
        颛顼: '顓',
        嫦娥: '娥',
        格萨尔: '格',
        观音: '觀',
        妈祖: '祖',
        太白金星: '白',
        西王母: '西',
        玉皇大帝: '皇',
        舜: '舜',
        神农: '農',
        炎帝: '炎',
        大禹: '禹',
        尧: '堯',
        织女: '女'
    }
}
