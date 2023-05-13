import { selection, ref, style } from '../data.js'

const mythImg = {
    show: function () {
        this.drawClipPath()
        this.drawMythImg(ref.mythData)
        this.drawImg(ref.mythData)
    },

    // 繪制神話人物图片及边框
    drawImg: function (data) {
        // <g>
        const update = selection.imgGroups.selectAll('g').data(data, (d) => d.name)

        // 因为不需要動態顯示 (修改data後不需要變化)，所以不寫update

        const enter = update.enter()
        const g = enter
            .append('g')
            .attr('class', 'myth')
            .style(
                'transform',
                (d, i) =>
                    `translate(${style.myth.offset[0] + (style.myth.margin[0] + style.myth.width) * i - style.img.width / 2}px, ${style.myth.offset[1] - style.myth.height / 2 - style.img.height}px)`
            )

        // 交互范圍
        g.append('rect')
            .attr('height', style.img.height + style.myth.height)
            .attr('width', style.img.width)
            .attr('fill', 'white')
            .attr('fill-opacity', 0)
            // 鼠标交互
            // 鼠標移入
            .on('mouseover', function (d, i) {
                // 令牌填充颜色
                selection.mythGroups.select(`#btn_${i.name}`).transition().duration(0).attr('fill-opacity', 1)
                // 图片显示
                // 插入新的元素，來源為人物圖片邊框元素
                selection.imgGroups
                    .append('use')
                    .attr('class', `use_${i.name}`)
                    .style('opacity', 1)
                    .attr('href', `#${i.name}`)
                    .style('transform', function () {
                        // 獲取交互範圍矩形父母節點<g>的transform
                        return d.target.parentNode.style.transform
                    })
            })
            // 鼠標移出
            .on('mouseout', function (d, i) {
                selection.mythGroups.select(`#btn_${i.name}`).transition().duration(1200).attr('fill-opacity', 0)
                // 把新插入的元素刪去
                selection.imgGroups.selectAll(`.use_${i.name}`).transition().duration(1200).style('opacity', 0).remove()
            })
    },

    // 裁剪形狀
    drawClipPath: function () {
        // 定义需要重复使用的图形元素
        selection.defsGroups
            // 裁剪路徑
            .append('clipPath')
            // id 用於指定此裁剪路徑
            .attr('id', 'rect')
            .append('rect')
            .attr('height', style.img.height - style.img.margin + style.img.padding[1])
            .attr('width', style.img.width - style.img.margin + style.img.padding[0])
            .attr('x', style.img.margin / 2)
            .attr('y', style.img.margin / 2)
    },

    // 人物图
    drawMythImg: function (data) {
        const update = selection.defsGroups
            .append('g')
            .selectAll('g')
            .data(data, (d) => d.name)

        const enter = update.enter()

        const img = enter
            .append('g')
            .attr('id', (d) => d.name)
            .style('transform', `translate(${-style.img.padding[0] / 2}px, ${-style.img.padding[1] / 2}px)`)
            .style('pointer-events', 'none')

        // 边框
        img.append('rect')
            .attr('height', style.img.height + style.img.padding[1])
            .attr('width', style.img.width + style.img.padding[0])
            .attr('stroke', 'white')
            .attr('stroke-width', '1px')
            .attr('fill', 'none')
        img.append('rect')
            .attr('height', style.img.height - style.img.margin + style.img.padding[1])
            .attr('width', style.img.width - style.img.margin + style.img.padding[0])
            .attr('x', style.img.margin / 2)
            .attr('y', style.img.margin / 2)
            .attr('stroke', 'white')
            .attr('stroke-width', '1px')
            .attr('fill', 'black')
            .attr('fill-opacity', 0.5)
        // 图
        img.append('image')
            .attr('height', style.img.height - style.img.margin + style.img.padding[1])
            .attr('href', (d) => `./assets/img/myth/${d.name}.png`)
            .attr('x', function (d) {
                // 特定人物位置微调
                let mythMargin = style.img.mythMargin[d.name] ? style.img.mythMargin[d.name] : 0
                // 根据图片大小移动图片
                return style.img.margin / 2 - style.img.height / 2.7 + mythMargin
            })
            .attr('y', style.img.margin / 2)
            .attr('clip-path', 'url(#rect)')
    }
}

export default mythImg
