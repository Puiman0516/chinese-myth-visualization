import { selection, ref, style, util } from '../data.js'

const myth = {
    show: function () {
        this.drawButton(ref.mythData)
    },

    // 繪制神話人物標誌
    drawButton: function (data) {
        selection.mythGroups.selectAll('circle').data(ref.mythData, (d) => d.name)
        // 圓形部分
        const update = selection.mythGroups.selectAll('circle').data(data, (d) => d.name)

        // 数据更新 (不涉及數據刪減)
        update
            .transition()
            .duration(600)
            .attr('r', (d) => util.scale(d.entry))

        const enter = update.enter()
        const circle = enter
            .append('circle')
            .attr('id', (d) => `button_${d.name}`)
            // 樣式
            .attr('cx', (d, i) => (style.button.radius * 2 + style.button.padding) * i + style.button.offset[0] + style.button.radius)
            .attr('cy', style.button.offset[1] + style.button.radius)
            .attr('r', 0)
            .attr('fill', '#96ABA4')
            .attr('fill-opacity', '0.7')

        // 進入时動畫
        circle
            .transition()
            .duration(600)
            .attr('r', (d) => util.scale(d.entry))

        // 文字部分
        selection.mythGroups
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text((d) => d.name)
            // 樣式
            .attr('font-family', 'Main')
            .attr('text-anchor', 'middle')
            .attr('x', (d, i) => (style.button.radius * 2 + style.button.padding) * i + style.button.offset[0] + style.button.radius) // 文字位於circle中間
            .attr('y', style.button.offset[1] + style.button.radius + 3)
            .style('-webkit-user-select', 'none') // 文字不可選
            .attr('font-size', '10px')
            .attr('fill', 'white')
            .style('pointer-events', 'none')
    }
}

export default myth
