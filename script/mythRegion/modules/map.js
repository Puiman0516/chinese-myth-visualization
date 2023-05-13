import { util, selection, ref } from '../data.js'

const map = {
    // 显示地圖
    show: function () {
        this.drawMap(ref.chinaMap)
    },

    // 繪制地圖
    drawMap: function (data) {
        // 地圖圖形
        const update = selection.mapGroups.selectAll('path').data(data) // 绑定数据

        const enter = update.enter()
        enter
            .append('path') // 根据數據添加一定量的path
            .attr('d', (d) => util.path(d)) //使用路径生成器
            .attr('stroke', '#C4C4C4')
            .attr('stroke-width', '0.6px')
            .attr('fill', '#231F20')
    }
}

export default map
