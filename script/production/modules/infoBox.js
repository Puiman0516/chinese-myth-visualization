const infoBox = {
    // 显示提示框
    show: function (t1, t2) {
        this.drawInfoBox(t1, t2)
    },

    remove: function () {
        d3.select('#infoBox').remove()
    },

    // 繪制提示框
    drawInfoBox: function (t1, t2) {
        // 獲取鼠標位置
        let e = event || window.event
        let x = e.clientX
        let y = e.clientY

        // 創建文本框
        d3.select('body')
            .append('div')
            .attr('id', 'infoBox')
            .style('font-family', 'Main')
            .style('position', 'fixed')
            .style('left', x + 15 + 'px')
            .style('top', y - 4 + 'px')
            .style('background-color', '#4B4B4B')
            .style('padding', '0px 5px')
            .style('box-shadow', '5px 5px 5px rgba(42,42,42,0.6)')
            .style('-webkit-user-select', 'none')
            .text(`${t1}：${t2}`)
    }
}

export default infoBox
