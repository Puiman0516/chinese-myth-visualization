import { selection, ref, style } from '../data.js'

const timeLine = {
    show: function () {
        this.drawMyth(ref.mythData)
        this.drawLine(ref.mythData)
    },

    // 时間軸
    drawLine: function (data) {
        const update = selection.lineGroups.selectAll('g').data(data, (d) => d.name)

        const enter = update.enter()

        // 时間軸水平線
        var lines = [10, 950]
        // 線段生成器，y軸點都由神令牌位置大小控制
        var linePath = d3
            .line()
            .x((d) => d)
            .y((d) => style.myth.offset[1] + style.myth.height / 2 + style.myth.margin[1])
        enter.append('path').attr('d', linePath(lines)).attr('stroke', 'gray').attr('stroke-width', '1px')

        // 時間點 圆及文字，用<g>括起來
        const g = enter
            .append('g')
            .style(
                'transform',
                (d, i) => `translate(${style.myth.offset[0] + (style.myth.margin[0] + style.myth.width) * i}px, ${style.myth.offset[1] + style.myth.height / 2 + style.myth.margin[1]}px)`
            )

        // 點
        g.append('circle')
            .attr('r', (d, i) => (d.year != '' ? 3 : 0))
            .attr('fill', 'white')

        // 年份
        g.append('text')
            .text((d) => d.prefix + d.year)
            .attr('y', 20)
            // 樣式
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .style('pointer-events', 'none')
            .style('-webkit-user-select', 'none') // 文字不可選
            .attr('font-size', '8px')
            .attr('font-family', 'Microsoft Yahei')
    },

    // 繪制神話人物標誌
    drawMyth: function (data) {
        // <g>
        const update = selection.mythGroups.selectAll('g').data(data, (d) => d.name)

        // 因为不需要動態顯示 (修改data後不需要變化)，所以不寫update

        const enter = update.enter()
        const g = enter.append('g').style('transform', (d, i) => `translate(${style.myth.offset[0] + (style.myth.margin[0] + style.myth.width) * i}px, ${style.myth.offset[1]}px)`) // 鼠标交互

        // 繪制令牌形狀，以g位置为中心點
        const lines = [
            [-style.myth.width / 2, -style.myth.height / 2 + style.myth.angle],
            [0, -style.myth.height / 2],
            [style.myth.width / 2, -style.myth.height / 2 + style.myth.angle],
            [style.myth.width / 2, style.myth.height / 2 - style.myth.angle],
            [0, style.myth.height / 2],
            [-style.myth.width / 2, style.myth.height / 2 - style.myth.angle],
            [-style.myth.width / 2, -style.myth.height / 2 + style.myth.angle]
        ]
        // 線段生成器
        const linePath = d3.line()

        // 令牌形狀
        g.append('path')
            .attr('d', linePath(lines))
            .attr('id', (d) => `btn_${d.name}`)
            .attr('stroke', 'white')
            .attr('stroke-width', '1px')
            .attr('fill', '#F6C65B')
            .attr('fill-opacity', 0)
            // 取消鼠標事件
            .style('pointer-events', 'none')
        // 文字部分
        g.append('text')
            .text((d) => d.name)
            // 樣式
            .attr('font-family', 'Main')
            .attr('text-anchor', 'middle')
            .attr('x', 0) // 文字位於rect中間
            .attr('y', 0)
            .style('-webkit-user-select', 'none') // 文字不可選
            .attr('font-size', '10px')
            .attr('fill', 'white')
            .style('writing-mode', 'tb') // 垂直文字
            .style('letter-spacing', '2px')
            .style('rotate', '-90')
            .style('pointer-events', 'none')
    }
}

export default timeLine
