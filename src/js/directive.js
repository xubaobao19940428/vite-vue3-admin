export const elDragDialog = {
	mounted(el,binding,vnode) {
        
		const dialogHeaderEl = el.querySelector('.el-dialog__header')
		const elDialogElement = el.querySelector('.el-dialog')
		dialogHeaderEl.onmousedown = function (e) {
			e.stopPropagation()
			var e = e || window.event //兼容ie浏览器
			var left = e.clientX
			var top = e.clientY
			const dragDomWidth = elDialogElement.offsetWidth
			const dragDomHeight = elDialogElement.offsetHeight

			const screenWidth = document.body.clientWidth
			const screenHeight = document.body.clientHeight

			const minDragDomLeft = elDialogElement.offsetLeft
			const maxDragDomLeft =
				screenWidth - elDialogElement.offsetLeft - dragDomWidth

			const minDragDomTop = elDialogElement.offsetTop
			const maxDragDomTop =
				screenHeight - elDialogElement.offsetTop - dragDomHeight
			document.onmousemove = function (e) {
				let moveLeft = e.clientX - left
				let moveTop = e.clientY - top
				//边界处理
				if (-moveLeft > minDragDomLeft) {
					moveLeft = -minDragDomLeft
				} else if (moveLeft > maxDragDomLeft) {
					moveLeft = maxDragDomLeft
				}
				if (-moveTop > minDragDomTop) {
					moveTop = -minDragDomTop
				} else if (moveTop > maxDragDomTop) {
					moveTop = maxDragDomTop
				}
				elDialogElement.style.left = moveLeft + 'px'
				elDialogElement.style.top = moveTop + 'px'
			}
			document.onmouseup = function (e) {
				document.onmousedown = null
				document.onmousemove = null
                
			}
		}
	}
}
