import { selection, ref, style, util } from '../data.js'

const nation = {
    show: function () {
        this.drawLine(ref.nationData)
    },

    // 各民族線條
    drawLine: function (data) {
        // 每束花的<g>綁定數據
        const update = selection.lineGroups.selectAll('g').data(data, (d) => d.name)

        const enter = update.enter()

        // 每个束花的位置及角度，角度根據索引決定，索引越大角度越大
        const g = enter.append('g').style('transform', function (d, i) {
            let x = style.line.offset[0]
            let y = style.line.offset[1]
            let deg = -95 - i * (95 / data.length)
            return `translate(${x}px, ${y}px) rotate(${deg}deg)`
        })

        // 線段生成器
        const linePath = d3.line().curve(d3.curveBasis) // curveNatural 自然曲線 or curveBasis 贝塞尔

        // 繪制民族線段曲線
        const line = g
            .append('path')
            .attr('d', function (d) {
                // 根據數據繪制線段
                let value = util.scale(d.value)
                // 繪制線，以最低点为中心
                let lines = [
                    [0, 0],
                    [-value / 20, value / 2],
                    [-value / 30, value]
                ]
                return linePath(lines)
            })
            .attr('stroke', 'gray')
            .attr('stroke-width', '1.5px')
            .attr('fill', 'none')
            // 線條填充程度，用以制作動畫
            .style('stroke-dasharray', (d) => `0 ${util.scale(d.value) + 10}`)

        // 線出現動畫
        line.transition()
            .duration(1000)
            // 每條線延迟一定时間出現
            .delay((d, i) => {
                return 50 * i
            })
            // 填充線段
            .style('stroke-dasharray', (d) => `${util.scale(d.value) + 10} ${util.scale(d.value) + 10}`)

        // 民族名<g>，位於民族線末端
        const nationCircle = g.append('g').style('transform', function (d) {
            let value = util.scale(d.value)
            return `translate(${-value / 30}px, ${value}px) rotate(90deg) scale(0)`
        })
        nationCircle
            .append('rect')
            .attr('width', (d) => util.scaleNationCircle(d.value))
            .attr('height', (d) => util.scaleNationCircle(d.value))
            .attr('x', (d) => -util.scaleNationCircle(d.value) / 2)
            .attr('y', (d) => -util.scaleNationCircle(d.value) / 2)
            .attr('fill', 'white')
            .attr('fill-opacity', 0.7)
            .attr('stroke', 'none')
            .style('transform', 'rotate(45deg)')
        nationCircle
            .append('text')
            .text((d) => d.name[0])
            .attr('text-anchor', 'middle')
            .attr('y', (d) => util.scaleNationCircle(d.value) / 6)
            .attr('font-family', 'Main')
            .attr('font-size', (d) => `${util.scaleNationCircle(d.value) / 2}px`)
            .attr('fill', 'black')
            // 文字不可選
            .style('-webkit-user-select', 'none')
        // 民族名出現動畫
        nationCircle
            .transition()
            .duration(600)
            .delay((d, i) => {
                return 400 + 50 * i
            })
            .style('transform', function (d) {
                let value = util.scale(d.value)
                return `translate(${-value / 30}px, ${value}px) rotate(90deg) scale(1)`
            })

        // 花瓣<g>，每朵花的位置控制在線段末端
        const flowerG = g.append('g').style('transform', function (d) {
            let value = util.scale(d.value)
            return `translate(${-value / 30}px, ${value}px)`
        })

        // 各花瓣綁定數據
        const flowerUpdate = flowerG.selectAll('g').data(
            (d) => d.data,
            (d) => d.name
        )

        const flowerEnter = flowerUpdate.enter()

        // 新建花瓣<g>
        const flower = flowerEnter
            .append('g')
            // 每片花瓣旋轉角度
            .style('transform', (d, i) => `rotate(${style.flower.margin * (i - (d.len % 2 == 0 ? d.len - 1 : d.len) / 2)}deg)`)

        // 繪制花瓣線條
        const flowerLine = flower
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', (d) => style.flower.color[d.name])
            .attr('stroke-opacity', '0.5')
            .attr('d', function (d, i) {
                // 根據數據繪制線段
                let value = util.scaleFlowerLine(d.min, d.max, d.value)
                let plus = i > d.len / 2 ? 1 : i == d.len / 2 ? 0 : -1
                let lines = [
                    [0, 0],
                    [(plus * value) / 10, value / 2],
                    [(plus * value) / 30, value]
                ]
                return linePath(lines)
            })
            .style('stroke-dasharray', function (d) {
                return `0 ${util.scaleFlowerLine(d.min, d.max, d.value) + 10}`
            })

        // 花瓣線条出現動畫
        flowerLine
            .transition()
            .duration(600)
            .delay((d, i) => {
                return d.index * 50 + 600 + 50 * i
            })
            // 根據數據變化花瓣大小
            .attr('d', function (d, i) {
                // 根據數據繪制線段
                let value = util.scaleFlowerLine(d.min, d.max, d.value)
                let plus = i > d.len / 2 ? 1 : i == d.len / 2 ? 0 : -1
                let lines = [
                    [0, 0],
                    [(plus * value) / 10, value / 2],
                    [(plus * value) / 50, value]
                ]
                return linePath(lines)
            })
            .style('stroke-dasharray', function (d) {
                let value = util.scaleFlowerLine(d.min, d.max, d.value)
                return `${value + 10} ${value + 10}`
            })

        // 繪制花瓣花球
        const flowerCircle = flower
            .append('circle')
            .attr('cx', function (d, i) {
                // 計算花瓣線末端x
                let value = util.scaleFlowerLine(d.min, d.max, d.value)
                let plus = i > d.len / 2 ? 1 : i == d.len / 2 ? 0 : -1
                return (plus * value) / 50
            })
            // 計算花瓣線末端y
            .attr('cy', (d) => util.scaleFlowerLine(d.min, d.max, d.value))
            .attr('r', 0)
            .attr('fill', (d) => style.flower.color[d.name])
            .attr('fill-opacity', 0.7)
            .attr('stroke', 'none')

        // 花球出現動畫
        flowerCircle
            .transition()
            .duration(600)
            .delay((d, i) => {
                return d.index * 50 + 800 + 50 * i
            })
            .attr('r', (d) => util.scaleFlowerCircle(d.min, d.max, d.value))
    }
}

export default nation
