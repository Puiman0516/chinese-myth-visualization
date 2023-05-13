import { selection, ref, style } from '../data.js'
import line from './line.js'
import nationMap from "./nationMap.js"

const myth = {
    // 显示神话人物按钮
    show: function () {
        this.drawButton(ref.mythData)
    },

    // 繪制神話人物標誌
    drawButton: function (data) {
        selection.mythGroups.attr('transform', `translate(${style.button.offset[0]}, ${style.button.offset[1]})`)
        // 圓形部分
        const update = selection.mythGroups.selectAll('g').data(data, (d) => d.name)

        // 因为不需要動態顯示 (修改data後不需要變化)，所以不寫update

        const enter = update.enter()
        const mythG = enter.append('g').attr('transform', function (d, i) {
            let y = -style.button.margin[1]
            let deg = i < data.length / 2 ? -i * style.button.margin[0] - 45 : i * style.button.margin[0] - 51
            return `rotate(${deg}) translate(${0}, ${y})`
        })

        const myth = mythG.append('g').attr('transform', function (d, i) {
            let deg = i < data.length / 2 ? -i * style.button.margin[0] - 45 : i * style.button.margin[0] - 51
            return `rotate(${-deg})`
        })
        myth.append('circle')
            .attr('class', (d) => d.name)
            // 樣式
            .attr('r', style.button.radius)
            .attr('fill', '#231F20')
            .attr('isClick', 'false')

            // 交互
            .on('mouseover', function (d, i) {
                d3.select(this).transition().duration(0).attr('fill', '#45947A')
            })
            .on('mouseout', function (d) {
                if (d3.select(this).attr('isClick') != 'true') {
                    d3.select(this).transition().duration(1200).attr('fill', '#231F20')
                }
            })
            .on('click', function (d, i) {
                // 清空民族名
                selection.infoGroups.select('#nationName').text('')
                nationMap.nationName = ''
                
                // 取消選擇
                if (d3.select(this).attr('isClick') == 'true') {
                    // 神按鈕isClick=false 及 按鈕取消高亮
                    selection.mythGroups.selectAll('circle').attr('isClick', 'false')
                    selection.mythGroups.selectAll('circle').transition().duration(0).attr('fill', '#231F20')

                    // 民族點isClick=false 及 民族範圍消失
                    selection.nationPointGroups.selectAll('g').attr('isClick', 'false')
                    selection.nationAreaGroups.selectAll('circle').transition().duration(100).attr('opacity', 0)

                    // 重置曲線
                    line.drawLines([])
                }
                // 選擇
                else {
                    // 神按鈕isClick=false 及 按鈕取消高亮
                    selection.mythGroups.selectAll('circle').attr('isClick', 'false')
                    selection.mythGroups.selectAll('circle').transition().duration(0).attr('fill', '#231F20')

                    // 民族點isClick=false 及 民族範圍消失
                    selection.nationPointGroups.selectAll('g').attr('isClick', 'false')
                    selection.nationAreaGroups.selectAll('circle').transition().duration(100).attr('opacity', 0)

                    // 按下神話人物按鈕後 isClick=true 及 按鈕高亮
                    d3.select(this).attr('isClick', 'true')
                    d3.select(this).transition().duration(0).attr('fill', '#45947A')

                    // 重置曲線
                    line.drawLines([])
                    // 繪制曲線
                    // 計算按鈕位置
                    let x = style.button.margin[1] * Math.sin((this.parentNode.parentNode.transform.baseVal[0].angle * Math.PI) / 180) + style.button.offset[0]
                    let y = -style.button.margin[1] * Math.cos((this.parentNode.parentNode.transform.baseVal[0].angle * Math.PI) / 180) + style.button.offset[1]
                    let pos = [x, y]
                    line.drawLines(i.nation, pos)
                }
            })

        myth.append('image')
            .attr('href', '../assets/img/border.png')
            .attr('height', style.button.radius * 2)
            .attr('width', style.button.radius * 2)
            .attr('x', -style.button.radius)
            .attr('y', -style.button.radius)
            .style('pointer-events', 'none')

        // 圓內文字部分
        myth.append('text')
            .text((d) => ref.simToCom[d.name])
            .attr('class', 'text-logo')
            // 樣式
            .attr('y', style.button.radius / 4)
            .attr('font-family', 'ShuoWenJieZi')
            .attr('text-anchor', 'middle')
            .style('-webkit-user-select', 'none') // 文字不可選
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .style('pointer-events', 'none')

        // 圓外文字部分
        myth.append('text')
            .text((d) => d.name)
            .attr('class', 'text-full')
            // 樣式
            .attr('font-family', 'Main')
            .attr('text-anchor', 'middle')
            .attr('y', style.button.radius * 2 - 5)
            .style('-webkit-user-select', 'none') // 文字不可選
            .attr('font-size', '6px')
            .attr('fill', 'white')
            .style('pointer-events', 'none')
    }
}

export default myth
