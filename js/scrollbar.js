const scrollMain = document.querySelector('.confidants-row');
const scrollCustomBarContainer = document.querySelector('.custom-scrollbar-container');
const customBar = document.querySelector('.custom-scrollbar');/*  */

const scrollSub = document.querySelector('.confidant-content')
const scrollCustomBarSub = document.querySelector('.confidant-scroll-bg')
const CustomBarSub = document.querySelector('.confidant-scroll-bg')

let mainScrollableSpace = 0;
let customBarScrollableSpace = 0;

window.addEventListener('load', refreshWidths);
window.addEventListener('resize', refreshWidths);

function refreshWidths(){
	mainScrollableSpace = scrollMain.scrollWidth - scrollMain.clientWidth;
	customBarScrollableSpace = scrollCustomBarContainer.clientWidth - customBar.clientWidth;
}
scrollMain.addEventListener('scroll', syncScroll)
function syncScroll() {
	let scrolledRatio = scrollMain.scrollLeft / mainScrollableSpace
	let customBarPosition = scrolledRatio*customBarScrollableSpace
	customBar.style.transform = 'translateX(' + customBarPosition + 'px)'
}

let dragging = false;
let mousePos0 = 0;
let barTranslateX0 = 0;

customBar.addEventListener('mousedown', (e) => {
	if (!e.button != 1) return;
	e.preventDefault();
	dragging = true;
	mousePos0 = e.clientX;
	const barStyles = window.getComputedStyle(customBar);
	barTranslateX0 = new DOMMatrixReadOnly(barStyles.transform).m41
})
document.addEventListener('mouseup', () => {
	dragging = false;
})
document.addEventListener('mousemove', (e) =>{
	if (!dragging) return;
	const mouseShift = e.clientX - mousePos0
	const barShift = barTranslateX0 + mouseShift
	const lastPos = Math.max(0, Math.min(barShift, customBarScrollableSpace))
	customBar.style.transform = 'translateX(' + lastPos + 'px)'

	const barScrolledRatio = lastPos / customBarScrollableSpace
	scrollMain.scrollLeft = barScrolledRatio * mainScrollableSpace
})