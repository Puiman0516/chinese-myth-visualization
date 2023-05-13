import { selection, style } from '../data.js'

const info = {
    show: function () {
        this.drawTitle(700, 140)
        this.drawGraphic(890, 120)
    },

    // 图表标题
    drawTitle: function (x, y) {
        selection.infoGroups
            .append('text')
            .text('神·民族信仰图')
            .attr('font-family', 'Main')
            .attr('font-size', '30px')
            .attr('fill', 'white')
            .attr('x', x)
            .attr('y', y)
            .attr('text-anchor', 'middle')
            .style('-webkit-user-select', 'none')

        selection.infoGroups
            .append('text')
            .text('不同民族神话人物对比')
            .attr('font-family', 'Main')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .attr('x', x)
            .attr('y', y + 30)
            .attr('text-anchor', 'middle')
            .style('-webkit-user-select', 'none')
    },

    // 图示
    drawGraphic: function (x, y) {
        // 柱
        selection.infoGroups
            .append('circle')
            .attr('r', 20)
            .attr('cy', y)
            .attr('cx', x - 18)
            .attr('fill', '#B7944A')
        selection.infoGroups
            .append('circle')
            .attr('cx', x + 18) // 圖形中心位置
            .attr('cy', y)
            .attr('r', 10)
            .attr('fill', '#B7666A')
        // 柱解釋
        selection.infoGroups
            .append('text')
            .attr('font-family', 'Main')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .attr('y', y + 25)
            .style('-webkit-user-select', 'none')
            .append('tspan')
            .attr('x', x)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text('不同生产')
            .append('tspan')
            .attr('x', x)
            .attr('dy', '1.5em')
            .attr('text-anchor', 'middle')
            .text('方式及占比')

        // 線段生成器
        const linePath = d3.line().curve(d3.curveBasis) // curveNatural 自然曲線 or curveBasis 贝塞尔

        // 繪制民族線段曲線
        selection.infoGroups
            .append('path')
            .attr('d', function (d) {
                let value = 20
                let xNum = x - value
                let yNum = y + 95
                let lines = [
                    [xNum, yNum],
                    [xNum + value, yNum + 8],
                    [xNum + value * 2, yNum]
                ]
                return linePath(lines)
            })
            .attr('stroke', 'gray')
            .attr('stroke-width', '1.5px')
            .attr('fill', 'none')
        selection.infoGroups
            .append('path')
            .attr('d', function (d) {
                let value = 30
                let xNum = x - value
                let yNum = y + 102
                let lines = [
                    [xNum, yNum],
                    [xNum + value, yNum + 12],
                    [xNum + value * 2, yNum]
                ]
                return linePath(lines)
            })
            .attr('stroke', 'gray')
            .attr('stroke-width', '1.5px')
            .attr('fill', 'none')

        // 圆解釋
        selection.infoGroups
            .append('text')
            .attr('font-family', 'Main')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('y', y + 120)
            .style('-webkit-user-select', 'none')
            .append('tspan')
            .attr('x', x)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text('该民族传播')
            .append('tspan')
            .attr('x', x)
            .attr('dy', '1.5em')
            .attr('text-anchor', 'middle')
            .text('神的诞生数')
    }
}

export default info
