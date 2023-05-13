import { selection, style } from '../data.js'

const info = {
    show: function () {
        this.drawTitle(870, 180)
        this.drawGraphic(820, 360)
        this.drawNationName(480, 100)
    },

    // 选中的民族名
    drawNationName: function (x, y) {
        selection.infoGroups
            .append('text')
            .attr('id', 'nationName')
            .text('')
            .attr('font-family', 'Main')
            .attr('font-size', '30px')
            .attr('fill', 'white')
            .attr('x', x)
            .attr('y', y)
            .attr('text-anchor', 'middle')
            .style('-webkit-user-select', 'none')
    },

    // 图表标题
    drawTitle: function (x, y) {
        selection.infoGroups
            .append('text')
            .text('神·诞生区域图')
            .attr('font-family', 'Main')
            .attr('font-size', '30px')
            .attr('fill', 'white')
            .attr('x', x)
            .attr('y', y)
            .attr('text-anchor', 'middle')
            .style('-webkit-user-select', 'none')
            // 垂直显示文字
            .style('writing-mode', 'tb')
            .style('letter-spacing', '5px')
            .style('rotate', '-90')

        selection.infoGroups
            .append('text')
            .text('不同区域神话人物一览')
            .attr('font-family', 'Main')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .attr('x', x + 30)
            .attr('y', y)
            .attr('text-anchor', 'middle')
            .style('-webkit-user-select', 'none')
            // 垂直显示文字
            .style('writing-mode', 'tb')
            .style('letter-spacing', '3px')
            .style('rotate', '-90')
    },

    // 图示
    drawGraphic: function (x, y) {
        // 柱
        selection.infoGroups
            .append('rect')
            .attr('width', 40)
            .attr('height', style.bar.width)
            .attr('y', y + 30)
            .attr('x', x - 40 / 2) // 与文字置中
            .attr('fill', '#7A0704')
            .attr('rx', style.bar.width / 2)
            .attr('ry', style.bar.width / 2)
        // 柱解釋
        selection.infoGroups
            .append('text')
            .attr('font-family', 'Main')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .attr('y', y + 45)
            .style('-webkit-user-select', 'none')
            .append('tspan')
            .attr('x', x)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text('不同民族')
            .append('tspan')
            .attr('x', x)
            .attr('dy', '1.5em')
            .attr('text-anchor', 'middle')
            .text('神的数量')

        // 圆
        selection.infoGroups
            .append('circle')
            .attr('cx', x + 50) // 圖形中心位置
            .attr('cy', y + 45 - 15)
            .attr('r', 10)
            .attr('fill', '#DD996F')
            .attr('fill-opacity', '0.5')
        // 圆解釋
        selection.infoGroups
            .append('text')
            .attr('font-family', 'Main')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('y', y + 45)
            .style('-webkit-user-select', 'none')
            .append('tspan')
            .attr('x', x + 50)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text('民族所在')
            .append('tspan')
            .attr('x', x + 50)
            .attr('dy', '1.5em')
            .attr('text-anchor', 'middle')
            .text('具体范围')

        // 三角形
        // 線段生成器
        const linePath = d3.line()
        // 定義形狀
        const pos = [style.nationPoint.width + 10, style.nationPoint.height + 10]
        const xNum = x + 100
        const yNum = y + 30
        const lines = [
            [0 + xNum, -pos[1] / 2 + yNum],
            [-pos[0] / 2 + xNum, pos[1] / 2 + yNum],
            [pos[0] / 2 + xNum, pos[1] / 2 + yNum]
        ]

        selection.infoGroups.append('path').attr('d', linePath(lines)).attr('fill', '#C6A247')
        // 三角形解釋
        selection.infoGroups
            .append('text')
            .attr('font-family', 'Main')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('y', y + 45)
            .style('-webkit-user-select', 'none')
            .append('tspan')
            .attr('x', x + 100)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text('民族')
            .append('tspan')
            .attr('x', x + 100)
            .attr('dy', '1.5em')
            .attr('text-anchor', 'middle')
            .text('所在位置')
    }
}

export default info
