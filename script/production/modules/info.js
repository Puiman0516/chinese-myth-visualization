import { selection, style, ref, util } from '../data.js'
import pointBar from './pointBar.js'
import myth from './myth.js'

const info = {
    show: function () {
        this.drawTitle(35)
        this.drawGraphic(50)

        this.drawFlower(ref.flowerData)
        this.drawCircle(ref.flowerData)
    },

    // 图表标题
    drawTitle: function (x) {
        selection.infoGroups
            .append('text')
            .text('神·产生方式图')
            .attr('font-family', 'Main')
            .attr('font-size', '30px')
            .attr('fill', 'white')
            .attr('x', x)
            .attr('y', 20)
            // 文字不可選
            .style('-webkit-user-select', 'none')
            // 垂直显示文字
            .style('writing-mode', 'tb')
            .style('letter-spacing', '5px')
            .style('rotate', '-90')

        selection.infoGroups
            .append('text')
            .text('不同神话人物产生方式')
            .attr('font-family', 'Main')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .attr('x', x - 25)
            .attr('y', 55)
            .style('-webkit-user-select', 'none')
            // 垂直显示文字
            .style('writing-mode', 'tb')
            .style('letter-spacing', '3px')
            .style('rotate', '-90')
    },

    // 花朵中心
    drawCircle: function (data) {
        const circle = selection.circleGroups.append('g').style('transform', `translate(${style.flower.offset[0]}px, ${style.flower.offset[1] - style.flower.radius / 2}px)`)
        circle.append('circle').attr('r', style.flower.radius).attr('fill', '#231F20').attr('stroke', 'white').attr('stroke-width', 1)
        circle
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Main')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .attr('y', -style.flower.radius + 13)
            // 文字不可選
            .style('-webkit-user-select', 'none')
            .append('tspan')
            .attr('x', 0)
            .attr('dy', '1em')
            .text('生产')
            .append('tspan')
            .attr('x', 0)
            .attr('dy', '1.5em')
            .text('方式')

        console.log(data)
        const text = selection.circleGroups
            .append('g')
            .style('transform', function (d) {
                return `translate(${style.flower.offset[0]}px, ${style.flower.offset[1] - style.flower.radius / 2}px)`
            })
            .selectAll('.wayText')
            .data(data)
        const textEnter = text.enter()
        textEnter
            .append('text')
            .attr('class', 'wayText')
            .text((d) => d.name.slice(0, 2))
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Main')
            .attr('font-size', '10px')
            .attr('fill', 'white')
            .style('-webkit-user-select', 'none')
            // 取消鼠標事件
            .style('pointer-events', 'none')
            .attr('transform', function (d, i) {
                // 旋轉角度
                let rotate = 40 * (i - (data.length % 2 == 0 ? data.length - 1 : data.length) / 2)
                let translateY = -35
                return `rotate(${rotate}) translate(${0}, ${translateY}) `
            })
    },

    // 花朵
    drawFlower: function (data) {
        selection.flowerGroups.style('transform', function (d) {
            return `translate(${style.flower.offset[0]}px, ${style.flower.offset[1]}px)`
        })

        // 線段生成器
        const linePath = d3.line().curve(d3.curveNatural) // 曲線 or curveBasis 贝塞尔

        // 花瓣形狀定義
        const lines = [
            [0, 0],
            [-style.flower.width / 2, -style.flower.height / 2],
            [-style.flower.width / 10, -style.flower.height / 1.05],
            [0, -style.flower.height],
            [style.flower.width / 10, -style.flower.height / 1.05],
            [style.flower.width / 2, -style.flower.height / 2],
            [0, 0]
        ]

        // 各花瓣綁定數據
        const update = selection.flowerGroups.selectAll('g').data(data, (d) => d.name)

        // 数据更新時變化花瓣大小
        update
            .transition()
            .duration(600)
            .style('transform', function (d, i) {
                // 根據數據變化花瓣大小
                let scale = d3.scaleLinear().domain([d.min, d.max]).range([0.6, 1])
                // 每片花瓣旋轉角度
                let rotate = style.flower.margin[0] * (i - (data.length % 2 == 0 ? data.length - 1 : data.length) / 2)
                let translateY = style.flower.margin[1]
                return `scale(${scale(d.value)}) rotate(${rotate}deg) translate(0px, ${translateY}px) `
            })

        const enter = update.enter()

        let _this = this
        // 繪制花瓣形狀
        const flower = enter
            .append('g')
            .attr('class', 'flower')
            .style('transform', 'scale(0)') // 亮度
            .style('filter', 'brightness(50%)')
            // 鼠标样式
            .style('cursor', 'pointer')
            // 鼠标交互
            .on('click', function (d, i) {
                _this.click(i.name, this)
            })

        flower
            .append('path')
            .attr('d', function (d) {
                return linePath(lines)
            })
            .attr('stroke', 'none')
            .attr('fill', (d) => style.flower.color[d.name])
            .attr('fill-opacity', 0.5)

        // 花出現動畫
        flower
            .transition()
            .duration(600)
            .delay((d, i) => {
                return 50 * i
            })
            .style('transform', function (d, i) {
                // 根據數據變化花瓣大小
                let scale = d3.scaleLinear().domain([d.min, d.max]).range([0.6, 1])
                // 每片花瓣旋轉角度
                let rotate = style.flower.margin[0] * (i - (data.length % 2 == 0 ? data.length - 1 : data.length) / 2)
                let translateY = style.flower.margin[1]
                return `scale(${scale(d.value)}) rotate(${rotate}deg) translate(0px, ${translateY}px) `
            })
    },

    // 图示
    drawGraphic: function (x) {
        const update = selection.infoGroups.selectAll('g').data(ref.way)
        const enter = update.enter()

        // 篩選按鈕
        const graphicUpdate = enter
            .append('g')
            // 统一移动位置
            .style('transform', (d, i) => `translate(0,${380 + (style.point.radius * 2 + 5) * i}px)`)
            // 每个g下只需一个圖示，其data为此g的data，因此綁定一個length为1的list
            .selectAll('rect')
            .data((d) => [d])

        const graphicEnter = graphicUpdate.enter()

        graphicEnter
            .append('rect')
            .attr('width', style.point.radius * 2)
            .attr('height', style.point.radius * 2)
            .attr('x', 900)
            .attr('fill', (d) => style.wayPoint2[d].fill)
            .attr('stroke', (d) => style.wayPoint2[d].stroke)
            .attr('stroke-width', (d) => style.wayPoint2[d]['stroke-width'])
            .attr('rx', (d) => style.wayPoint2[d].rx)
            .attr('ry', (d) => style.wayPoint2[d].ry)
            .attr('transform', (d) => style.wayPoint2[d].transform)
            .style('transform-box', 'fill-box')
            .style('transform-origin', 'center')

        graphicEnter
            .append('rect')
            .attr('width', style.point.radius * 2)
            .attr('height', style.point.radius * 2)
            .attr('x', 900)
            .attr('fill', (d) => style.wayPoint[d].fill)
            .attr('stroke', (d) => style.wayPoint[d].stroke)
            .attr('stroke-width', (d) => style.wayPoint[d]['stroke-width'])
            .attr('rx', (d) => style.wayPoint[d].rx)
            .attr('ry', (d) => style.wayPoint[d].ry)
            .attr('transform', (d) => style.wayPoint[d].transform)
            // 繞中心旋轉
            .style('transform-box', 'fill-box')
            .style('transform-origin', 'center')

        graphicEnter
            .append('text')
            .attr('font-family', 'Main')
            .text((d) => d)
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('x', 910)
            .attr('y', 6)
            .style('-webkit-user-select', 'none')
    },

    // 篩選
    click: function (i, target) {
        if (ref.wayFilter.includes(i)) {
            d3.select(target).style('filter', 'brightness(50%)')
            // filter列表中移除点擊的按鈕对應的生产方式
            ref.wayFilter.splice(ref.wayFilter.indexOf(i), 1)
        } else {
            d3.select(target).style('filter', 'brightness(100%)')
            // 插入對應生产方式在filter列表中
            ref.wayFilter.push(i)
        }
        let data = ref.mythData.map(function (item) {
            // 对数据中每一项的originWay进行篩選
            let data = { name: item.name }
            // 按照wayFilter中的順序篩選originWay
            let way = []
            for (let i = 0; i < ref.wayFilter.length; i++) {
                // 找出对應wayFilter第i位生产方式的originWay
                let result = item.originWay.filter((item) => item.name == ref.wayFilter[i])
                // 如果找到則push進way里
                if (result.length > 0) {
                    way.push(result[0])
                }
            }
            // 賦值進data中
            data.originWay = way
            // 按照originWay的順序(即順序不變)進行篩選，此方法在展示的效果上不合邏輯，會讓新的point從中間插入
            // data.originWay = item.originWay.filter((item) => ref.wayFilter.includes(item.name))

            // 计算每个神话人物所有生产方式总和
            let sum = 0
            way.forEach((i) => {
                sum += i.value
            })
            data.entry = sum

            return data
        })
        // 更新pointBar
        pointBar.drawPoint(data)
        // // 更新myth
        myth.drawButton(data)

        this.drawFlower(util.getOriginTotal(data))
    }
}

export default info
