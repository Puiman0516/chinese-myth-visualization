import { selection, ref, style } from '../data.js'
import infoBox from './infoBox.js'

const pointBar = {
    show: function () {
        this.drawLine(ref.mythData)
        this.drawBar(ref.mythData)
        this.drawPoint(ref.mythData)
    },

    // 点图后的线
    drawLine: function (data) {
        // 每条線綁定數據，以生成一定數量的線
        const update = selection.pointGroups.selectAll('line').data(data, (d) => d.name)
        const enter = update.enter()

        enter
            .append('line')
            .attr('x1', (d, i) => (style.button.radius * 2 + style.button.padding) * i + style.point.offset[0] + style.point.radius)
            .attr('x2', (d, i) => (style.button.radius * 2 + style.button.padding) * i + style.point.offset[0] + style.point.radius)
            .attr('y1', style.point.offset[1] - 3)
            .attr('y2', 430)
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', 0.5)
            .attr('stroke-opacity', 0.6)
    },

    // 绘制存放點的<g>
    drawBar: function (data) {
        // pointGroups中的<g>还有用于繪制點的<g>，因此为这里的每個<g>添加class，用class來指定
        const update = selection.pointGroups.selectAll('.bar').data(data, (d) => d.name) // 綁定name字段
        const enter = update.enter()
        enter
            .append('g')
            .attr('class', 'bar')
            // 指定id，用于之后繪制點
            .attr('id', (d, i) => 'bar_' + i)
            // 根據人物按钮调整x軸
            .style('transform', (d, i) => `translate(${(style.button.radius * 2 + style.button.padding) * i + style.point.offset[0]}px, 0px)`)
    },

    // 绘制点
    drawPoint: function (data) {
        // 遍历每个<g> (因为g数量就是data的長度，所以直接用data.length)
        for (let n = 0; n < data.length; n++) {
            // 处理data
            // 对象轉数组，如{name:'自然产生', value:2}轉為[{value:2, data:'自然产生'},{value:2, data:'自然产生'}]
            let d = data[n].originWay
            // 对originWay中每个对象进行操作
            d = d
                .map((item) =>
                    // 每个对象都變為一个新数组，数组中有value个对象，对象中的value为原对象的value，data为name
                    Array.from({ length: item.value }, function () {
                        let result = { value: item.value }
                        result.data = item.name
                        return result
                    })
                )
                .flat() // 完成上面步驟後originWay中每个对象会轉化為一个含value个对象的数组，即d为二维数组，使用flat使其降维

            // 建立一定数量的g來绘制rect
            const update = selection.pointGroups
                .select('#bar_' + n) // 选择方才創建好的<g>，在其中繪制點
                .selectAll('g') // 由于有些類型的點要用2個rect來繪制，因此统一用<g>把它們包起來
                .data(d, (d) => d.data) // 每个点都綁定"生产方式"名，不然在移除点时不会移除具体某种生产方式的点，而是從下往上移除
            const enter = update.enter()

            // data修改时点的动画
            update
                .transition()
                .duration(600)
                // 每个点延遲10*index執行动画
                .delay((d, i) => {
                    return 10 * i
                })
                // 点的位置为点距svg边y軸大小+(点的直徑+点的間距)*点数量
                .style('transform', (d, i) => `translate(0,${(style.point.radius * 2 + style.point.padding) * i + style.point.offset[1]}px)`)

            // <g>数<data長度时
            const point = enter
                .append('g')
                .attr('class', (d) => d.data)
                // 每个点先出现在本來位置的下方400px，达到從svg外往上移的效果
                .style('transform', (d, i) => `translate(0,${(style.point.radius * 2 + style.point.padding) * i + style.point.offset[1] + 400}px)`)
                // 鼠标交互
                .on('mouseover', function (d, i) {
                    // hover效果
                    // 选择此神话人物其下此产生方式的所有点
                    selection.pointGroups
                        .select('#bar_' + n)
                        .selectAll('.' + i.data)
                        .style('transition', '0.1s')
                        .style('filter', 'brightness(150%)')
                    // 显示信息框
                    infoBox.show(i.data, i.value)
                })
                .on('mousemove', function (d, i) {
                    infoBox.remove()
                    infoBox.show(i.data, i.value)
                })
                .on('mouseout', function (d, i) {
                    // 取消hover效果
                    selection.pointGroups
                        .select('#bar_' + n)
                        .selectAll('.' + i.data)
                        .style('transition', '0.1s')
                        .style('filter', 'brightness(100%)')
                    infoBox.remove()
                })

            // 往<g>里加入rect
            point
                .append('rect')
                .attr('width', style.point.radius * 2)
                .attr('height', style.point.radius * 2)
                .attr('fill', (d) => style.wayPoint2[d.data].fill)
                .attr('stroke', (d) => style.wayPoint2[d.data].stroke)
                .attr('stroke-width', (d) => style.wayPoint2[d.data]['stroke-width'])
                .attr('rx', (d) => style.wayPoint2[d.data].rx)
                .attr('ry', (d) => style.wayPoint2[d.data].ry)
                .attr('transform', (d) => style.wayPoint2[d.data].transform)
                // 繞中心旋轉
                .style('transform-box', 'fill-box')
                .style('transform-origin', 'center')
            // rect裝飾
            point
                .append('rect')
                .attr('class', (d) => d)
                .attr('id', 'main-point')
                .attr('width', style.point.radius * 2)
                .attr('height', style.point.radius * 2)
                .attr('fill', (d) => style.wayPoint[d.data].fill)
                .attr('stroke', (d) => style.wayPoint[d.data].stroke)
                .attr('stroke-width', (d) => style.wayPoint[d.data]['stroke-width'])
                .attr('rx', (d) => style.wayPoint[d.data].rx)
                .attr('ry', (d) => style.wayPoint[d.data].ry)
                .attr('transform', (d) => style.wayPoint[d.data].transform)
                // 繞中心旋轉
                .style('transform-box', 'fill-box')
                .style('transform-origin', 'center')

            // 点进入时的动画
            point
                .transition()
                .duration(600)
                .delay((d, i) => {
                    return 10 * i
                })
                .style('transform', (d, i) => `translate(0,${(style.point.radius * 2 + style.point.padding) * i + style.point.offset[1]}px)`)

            // <g>数>data長度时
            const exit = update.exit()
            exit.transition()
                .duration(600)
                .delay((d, i) => {
                    return 10 * i
                })
                .style('transform', (d, i) => `translate(0,${(style.point.radius * 2 + style.point.padding) * i + style.point.offset[1] + 400}px)`)
                // 移除一定数量的点
                .remove()
        }
    }
}

export default pointBar
