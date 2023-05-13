import { selection } from '../data.js'

const info = {
    show: function () {
        this.drawTitle(30)
    },

    // 图表标题
    drawTitle: function (x) {
        selection.infoGroups
            .append('text')
            .text('神源')
            .attr('font-family', 'Title')
            .attr('font-size', '70px')
            .attr('fill', 'white')
            .attr('x', 460)
            .attr('y', 80)
            .style('-webkit-user-select', 'none')
            .style('writing-mode', 'tb')
            .style('letter-spacing', '40px')
            .style('rotate', '-90')
    }
}

export default info
