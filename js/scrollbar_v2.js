export default class bar {
	constructor(scrollableContent, scrollbarbg, thumb, dir, deviation) {
		this.dir = dir ? dir : 'h';
		this.name = scrollableContent;
		this.scrollableContentEl = document.querySelector(scrollableContent);
		this.scrollbarbg = document.querySelector(scrollbarbg);
		this.scrollbarSize = dir == 'h' ? this.scrollbarbg.clientWidth : this.scrollbarbg.clientHeight;
		this.thumbEl = document.querySelector(thumb)
		this.mainScrollableSpace = 0;
		this.customBarScrollableSpace = 0;
		this.dragging = false;
		this.mousePos0 = 0;
		this.barTranslate0 = 0;
		this.deviation = deviation;
		this.currentDeviation = '';
		this.deploy();
		
	}
	deploy(){
		window.addEventListener('load', this.refreshDimentions);
		window.addEventListener('resize', this.refreshDimentions);
		this.scrollableContentEl.addEventListener('scroll', this.syncScrollToBar);
		
		this.thumbEl.addEventListener('mousedown', this.startDrag);
		document.addEventListener('mouseup', this.stopDrag);
		document.addEventListener('mousemove', this.barDrag);
	}
	withdraw(){
		window.removeEventListener('load', this.refreshDimentions);
		window.removeEventListener('resize', this.refreshDimentions);
		this.scrollableContentEl.removeEventListener('scroll', this.syncScrollToBar);
		
		this.thumbEl.removeEventListener('mousedown', this.startDrag);
		document.removeEventListener('mouseup', this.stopDrag);
		document.removeEventListener('mousemove', this.barDrag);
	}
	stopDrag = () => {
		this.dragging = false
	}
	refreshDimentions = () => {
		this.scrollbarSize = this.dir == 'h' ? this.scrollbarbg.clientWidth : this.scrollbarbg.clientHeight
		if (this.dir == 'h') {
			this.mainScrollableSpace = this.scrollableContentEl.scrollWidth - this.scrollableContentEl.clientWidth;
			this.customBarScrollableSpace = this.scrollbarSize - this.thumbEl.clientWidth;
		} else {
			this.mainScrollableSpace = this.scrollableContentEl.scrollHeight - this.scrollableContentEl.clientHeight;
			this.customBarScrollableSpace = this.scrollbarSize - this.thumbEl.clientHeight;
		}
	}
	syncScrollToBar = () => {
		if (this.mainScrollableSpace <= 0 || this.customBarScrollableSpace <= 0) return;
		let deviationDir;
		if (this.dir == 'h') {
			let scrolledRatio = this.scrollableContentEl.scrollLeft / this.mainScrollableSpace
			let customBarPosition = scrolledRatio*this.customBarScrollableSpace
			if (!isNaN(this.deviation)) {
				deviationDir = `translateY(${this.deviation * scrolledRatio}px)`
			}
			this.thumbEl.style.transform = `translateX(${customBarPosition}px) ${deviationDir || ''}` 
		} else {			
			let scrolledRatio = this.scrollableContentEl.scrollTop / this.mainScrollableSpace
			let customBarPosition = scrolledRatio*this.customBarScrollableSpace
			if (!isNaN(this.deviation)) {
				deviationDir = `translateX(${this.deviation * scrolledRatio}px)`
			}
			this.thumbEl.style.transform = `translateY(${customBarPosition}px) ${deviationDir || ''}` 
		}
	}
	startDrag = (e) => {
		if (e.button != 0) return;
		e.preventDefault();
		this.dragging = true;
		const barStyles = window.getComputedStyle(this.thumbEl);
		if (this.dir == 'h') {
			this.mousePos0 = e.clientX;
			this.barTranslate0 = new DOMMatrixReadOnly(barStyles.transform).m41
		} else {
			this.mousePos0 = e.clientY;
			this.barTranslate0 = new DOMMatrixReadOnly(barStyles.transform).m42
		}
	}
	barDrag = (e) => {
	if (!this.dragging) return;
	let direction;
	let mouseShift;
	let deviationDir = '';
	if (this.dir == 'h') mouseShift = e.clientX - this.mousePos0
	else mouseShift = e.clientY - this.mousePos0
	const barShift = this.barTranslate0 + mouseShift
	const finalPos = Math.max(0, Math.min(barShift, this.customBarScrollableSpace))
	const barScrolledRatio = finalPos / this.customBarScrollableSpace
	
	if (this.dir == 'h') {
		direction = `translateX(${finalPos}px)`        
		if (!isNaN(this.deviation)) {
			deviationDir = `translateY(${this.deviation * barScrolledRatio}px)`
		}
	} else {
		direction = `translateY(${finalPos}px)`
		if (!isNaN(this.deviation)) {
			deviationDir = `translateX(${this.deviation * barScrolledRatio}px)`
			
		}
	} 
	this.currentDeviation = deviationDir
	this.thumbEl.style.transform = direction + deviationDir
	

	if (this.dir == 'h') {
		this.scrollableContentEl.scrollLeft = barScrolledRatio * this.mainScrollableSpace
	} else {
		this.scrollableContentEl.scrollTop = barScrolledRatio * this.mainScrollableSpace
	}
	}
}