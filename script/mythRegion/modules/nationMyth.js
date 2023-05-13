import { selection, ref, style } from '../data.js'

const nationMyth = {
    show: function () {
        this.drawText(ref.nationData)
        this.drawBar(ref.nationData)
    },

    // 繪制民族名
    drawText: function (data) {
        const update = selection.nationMythGroups.selectAll('text').data(data) // 绑定数据

        const enter = update.enter()
        enter
            .append('text')
            .text((d) => d.name)
            .attr('text-anchor', 'end ')
            .attr('font-family', 'Main')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('x', 40)
            .attr('y', (d, i) => i * 16 + 28)
            .style('-webkit-user-select', 'none')
    },

    // 繪制民族柱狀圖
    drawBar: function (data) {
        const update = selection.nationMythGroups.selectAll('rect').data(data) // 绑定数据

        const enter = update.enter()

        const scale = d3.scaleLinear().domain([1, 22]).range([10, 140])

        const bar = enter
            .append('rect')
            .attr('width', 0)
            .attr('height', style.bar.width)
            .attr('x', 40 + 10)
            .attr('y', (d, i) => i * 16 + 24)
            .attr('fill', (d) => style.nationPoint.color[d.name])
            .attr('rx', style.bar.width / 2)
            .attr('ry', style.bar.width / 2)

        bar.transition()
            .duration(600)
            .attr('width', (d) => scale(d.value))
    }
}
export default nationMyth
