import { selection, style } from '../data.js'

const line = {
    // 绘制神与民族的連線
    drawLines: function (data, center) {
        // 處理數據，根據數據中每一項的name獲取所有節點，獲取完畢後進行降維處理 (原本為一个name一组數據)
        const d = data.map((item) => d3.selectAll(`.${item.name}`).nodes()).flat()

        const update = selection.lineGroups.selectAll('g').data(d) // 綁定地区的神话人物数据

        const enter = update.enter()

        const line = enter.append('g')

        // 创建一个水平连线生成器
        const link = d3.linkHorizontal()

        line.append('path')
            // 樣式
            .attr('stroke', '#FFB0B0')
            .attr('stroke-opacity', 0.5)
            .attr('fill', 'none')
            // 禁用hover
            .style('pointer-events', 'none')
            // 路徑
            .attr('d', function (d) {
                let className = d.getAttribute('class')
                let pos
                // 若target是民族，则直接取民族范圍的中心點
                if (className[className.length - 1] == '族') {
                    pos = [d.getAttribute('cx'), d.getAttribute('cy')]
                }
                // 若target是神话人物，则算出中心点
                else {
                    let x = style.button.margin[1] * Math.sin((d.parentNode.parentNode.transform.baseVal[0].angle * Math.PI) / 180) + style.button.offset[0]
                    let y = -style.button.margin[1] * Math.cos((d.parentNode.parentNode.transform.baseVal[0].angle * Math.PI) / 180) + style.button.offset[1]
                    pos = [x, y]
                }
                const data = {
                    source: center,
                    target: pos
                }
                return link(data)
            })
            // 取消鼠標事件
            .style('pointer-events', 'none')

        // exit 當selectAll的元素>data的長度時執行
        const exit = update.exit()
        exit.remove()
    }
}

export default line
