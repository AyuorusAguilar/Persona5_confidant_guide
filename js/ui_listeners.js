import generate_content from "./generate_content.js";
import {state} from "./state.js"
const tarjetas = document.querySelectorAll('.confidant-card');
const uiHover = document.getElementById('ui-hover');
const uiClick = document.getElementById('ui-click');

const toggleHeaderButton = document.querySelector('.toggle-header-container');
const toggleHeaderSign = document.querySelector('.toggle-header-sign');

let lastSelected;
let affectedClasses = [
	'.point',
	'.confidant-pfp',
	'.confidant-pfp2',
	'.confidant-pfp3',
	'.confidant-banner',
	'.confidant-name'
];


const contentBody = document.querySelector('.content-body');
const barra = document.querySelector('.confidant-scroll-thumb')
const uiRank = document.querySelector('.rank-counter-container')
const textRankCounter = document.querySelector('.rank-counter-text')
const contentBodyMirror = document.querySelector('.mirror');

let timerId

contentBody.addEventListener('scroll', () => {
	contentBodyMirror.scrollTop = contentBody.scrollTop;
	if (contentBody.scrollTop < 200) { textRankCounter.textContent = 2 }
	if (contentBody.scrollTop > contentBody.scrollHeight - 300) {textRankCounter.textContent = 9 }
	const newStyleY = `translateY(${ new DOMMatrixReadOnly(window.getComputedStyle(barra).transform).m42}px) `
	const newStyleX = `translateX(${ new DOMMatrixReadOnly(window.getComputedStyle(barra).transform).m41}px)`
	uiRank.style.transform = newStyleY + newStyleX
	
	if (timerId){
		clearTimeout(timerId)
	}
	uiRank.classList.add('show')	
	timerId = setTimeout(() => {
			document.querySelector('.rank-counter-container').classList.remove('show')
			timerId = null
		},1000)
})

const observer = new IntersectionObserver( (listaDeObjetosAObservar) => {
	listaDeObjetosAObservar.forEach((objeto) => {
		if (objeto.isIntersecting) {
			const rango = objeto.target.querySelector('.rank').textContent.slice(-1);
			textRankCounter.textContent = rango
			console.log(`Nos encontramos en el rango ${state.current_rank}`);
		}
	}, {root: contentBodyMirror, threshold: 0.5, rootMargin: '100px 0px 100px 0px'})
})

tarjetas.forEach(tarjeta => {
	tarjeta.addEventListener('mouseenter', ()=>{
		if (tarjeta != lastSelected) {
			tarjeta.querySelector('.confidant-name').classList.remove('selected');
			uiHover.currentTime = 0;
			uiHover.play();
		}
	})
	tarjeta.addEventListener('click', ()=>{
		// Manejar el pointer
		if (lastSelected != undefined && lastSelected != tarjeta) {
			affectedClasses.forEach(clase => {
				if (clase == '.confidant-name') return;
				lastSelected.querySelector(clase).classList.remove('selected');
			});
		}
		if (lastSelected != tarjeta) {

			lastSelected = tarjeta;
			
			affectedClasses.forEach(clase => {
				tarjeta.querySelector(clase).classList.add('selected');
			});
			uiClick.currentTime = 0;
			uiClick.play();
			
			const nombre = tarjeta.querySelector('.confidant-name').textContent.trim();
			toggleHeaderButton.classList.remove('disable');
			refrescar(nombre);
		}
	})
});

async function refrescar(nombre) {
	const oldTemas = contentBodyMirror.querySelectorAll('.rank-label');
	oldTemas.forEach(tema => {
		observer.unobserve(tema);
	});

	await generate_content(nombre);
	contentBodyMirror.innerHTML = contentBody.innerHTML
	state.bodyBar.refreshDimentions();
	state.bodyBar.syncScrollToBar();
	state.current_rank = 2

	const temas = contentBodyMirror.querySelectorAll('.rank-label');
	temas.forEach(tema => {
		observer.observe(tema);
	});
}

toggleHeaderButton.addEventListener('click', (e) => {
	e.preventDefault();

	const contentArcana = document.querySelector('.content-arcana');
	const contentPfpBg = document.querySelector('.content-pfp-bg');
	const contentPfp = document.querySelector('.content-pfp');
	const contentInfoContainer = document.querySelector('.content-info-container');
	const contentHeader = document.getElementById('contentHeader');
	const contentName = document.querySelector('.content-name');

	if (toggleHeaderSign.textContent.includes('−')) {
		toggleHeaderSign.textContent = '+';
		contentHeader.className = "content-header-b";
	} else {
		toggleHeaderSign.textContent = '−'
		contentHeader.className = "content-header-a";
	}

	contentArcana.classList.toggle('disable');
	contentPfpBg.classList.toggle('disable');
	contentPfp.classList.toggle('disable');
	contentInfoContainer.classList.toggle('disable');
	contentName.classList.toggle('cn-top');

	contentBody.classList.toggle('maximized');
	contentBodyMirror.classList.toggle('maximized');
})
