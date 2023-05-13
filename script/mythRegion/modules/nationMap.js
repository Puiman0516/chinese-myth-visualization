import { util, selection, ref, style } from '../data.js'
import line from './line.js'

const nationMap = {
    // 被选中的民族名
    nationName: '',
    // 显示地圖
    show: function () {
        this.drawNationPoint(ref.nationMap)
        this.drawNation(ref.nationMap)
    },

    // 繪制民族範圍
    drawNation: function (data) {
        const update = selection.nationAreaGroups.selectAll('circle').data(data) // 绑定数据

        const enter = update.enter()
        enter
            .append('circle') // 根据數據添加一定量的path
            .attr('class', (d) => d.properties.name)
            .attr('cx', (d) => util.path.centroid(d)[0]) // 用路徑生成器獲取每个图形的中心点
            .attr('cy', (d) => util.path.centroid(d)[1])
            // 用比例尺调整每个圈的半徑，以防某些民族范圍太小
            .attr('r', (d) => util.scale(d.properties._draw_prop_radius))
            .attr('stroke', 'none')
            .attr('fill', '#DD996F')
            .attr('opacity', 0)
            // 取消鼠標事件
            .style('pointer-events', 'none')
    },

    // 繪制民族点
    drawNationPoint: function (data) {
        const _this = this // 記录this，以便在on事件理對nationName進行修改

        const update = selection.nationPointGroups.selectAll('g').data(data) // 绑定数据

        const enter = update.enter()

        const nation = enter
            .append('g')
            // 用路徑生成器獲取每个民族圖形的中心點
            .style('transform', function (d) {
                let pos = util.path.centroid(d)
                return `translate(${pos[0]}px, ${pos[1]}px)`
            })
            // 自定義屬性，控制是否显示線條
            .attr('isClick', 'false')

        // 線段生成器
        const linePath = d3.line()
        // 定義形狀
        const pos = [style.nationPoint.width, style.nationPoint.height]
        const lines = [
            [0, -pos[1] / 2],
            [-pos[0] / 2, pos[1] / 2],
            [pos[0] / 2, pos[1] / 2]
        ]
        nation
            .append('rect')
            .attr('width', style.nationPoint.width + 4)
            .attr('height', style.nationPoint.height + 4)
            .attr('x', -style.nationPoint.width / 2 - 2)
            .attr('y', -style.nationPoint.height / 2 - 2)
            .attr('fill', 'white')
            .attr('opacity', 0)

        nation
            .append('path')
            .attr('d', linePath(lines))
            .attr('fill', (d) => style.nationPoint.color[d.properties.name])
        // 鼠標交互
        nation
            .on('mouseover', function (d, i) {
                // hover效果
                d3.select(this).style('filter', 'brightness(110%)')
                selection.nationAreaGroups.selectAll(`.${i.properties.name}`).transition().duration(100).attr('opacity', 0.5)

                // 显示民族名
                selection.infoGroups.select('#nationName').text(i.properties.name)
            })
            .on('mouseout', function (d, i) {
                // 取消hover效果
                d3.select(this).style('filter', 'none')
                // 没有被选中时才隱藏
                if (i.properties.name != _this.nationName) {
                    selection.nationAreaGroups.selectAll(`.${i.properties.name}`).transition().duration(600).attr('opacity', 0)
                }
                // 重置民族名
                selection.infoGroups.select('#nationName').text(_this.nationName)
            })

            .on('click', function (d, i) {
                // 取消選擇
                if (d3.select(this).attr('isClick') == 'true') {
                    // 清空民族名
                    selection.infoGroups.select('#nationName').text('')
                    // 记住选中民族名
                    _this.nationName = ''

                    // 民族點isClick=false 及 民族範圍消失
                    selection.nationPointGroups.selectAll('g').attr('isClick', 'false')
                    selection.nationAreaGroups.selectAll('circle').transition().duration(100).attr('opacity', 0)

                    // 神按鈕isClick=false 及 按鈕取消高亮
                    selection.mythGroups.selectAll('circle').attr('isClick', 'false')
                    selection.mythGroups.selectAll('circle').transition().duration(0).attr('fill', '#231F20')

                    // 重置曲線
                    line.drawLines([])
                }
                // 選擇
                else {
                    // 显示民族名
                    selection.infoGroups.select('#nationName').text(i.properties.name)
                    // 记住选中民族名
                    _this.nationName = i.properties.name

                    // 民族點isClick=false 及 民族範圍消失
                    selection.nationPointGroups.selectAll('g').attr('isClick', 'false')
                    selection.nationAreaGroups.selectAll('circle').transition().duration(100).attr('opacity', 0)

                    // 神按鈕isClick=false 及 按鈕取消高亮
                    selection.mythGroups.selectAll('circle').attr('isClick', 'false')
                    selection.mythGroups.selectAll('circle').transition().duration(0).attr('fill', '#231F20')

                    // 按下民族點後 isClick=true 及 显示民族範圍
                    d3.select(this).attr('isClick', 'true')
                    selection.nationAreaGroups.selectAll(`.${i.properties.name}`).transition().duration(100).attr('opacity', 0.5)

                    // 重置曲線
                    line.drawLines([])
                    // 繪制曲線
                    let data = ref.nationData.filter((item) => item.name == i.properties.name)[0].data
                    // 獲取民族點位置
                    let center = util.path.centroid(i)
                    line.drawLines(data, center)
                }
            })
    }
}
export default nationMap
