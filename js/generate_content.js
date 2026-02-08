// fetch('/js/confidants-conversations.json')
// .then( (respuesta) => {
// 	if (!respuesta.ok) {
// 		throw new Error(`ocurrió un error en la respuesta. ${respuesta.status} : ${respuesta.statusText}`)
// 	} else
// 	{
// 		return respuesta.json()
// 	}
// }).then((datos) => {
// 	content = datos
// })

let content

export default async function generate_content(name){
	name = name.trim()

	if (!content) {
		const response = await fetch('/js/confidants-conversations.json')
		content = await response.json()
	}

	const confidantContent = content[name]
	const firstName = name.split(' ')[0]
	// Header
	const toggleHeaderSign = document.querySelector('.toggle-header-sign')
	let extra;
	let other_extra;
	if (toggleHeaderSign.textContent == '+') {
		extra = 'disable'
		other_extra = 'cn-top'
	}
	const contentPfpContainer = `
		<img src="img/arcana/${confidantContent['arcana']}.png" class="content-arcana ${extra || ''}">
		<img src="img/confidant-portraits/confidant-definitve/${firstName}-0.png" class="content-pfp-bg ${extra || ''}">
		<img src="img/confidant-portraits/confidant-definitve/${firstName}.png" class="content-pfp ${extra || ''}">
		<img src="img/confidant-portraits/confidant-definitve/names/${firstName}.png" class="content-name ${other_extra || ''}">`
	const ContentInfo = `
		<p class="tittle">
			<span class="paint-effect">
				<svg viewBox="0 0 1000 300" class="paint-effect-svg-unlock">
					<path d="M 11 291 L 72 10 L 895 52 L 960 263 Z"></path>
				</svg>
				<span class="title">Unlock Date:</span>
			</span>
		</p>
		<p class="subtitle">${confidantContent['unlockDate']}</p>
		<p class="tittle">
			<span class="paint-effect">
				<svg viewBox="0 0 1000 300" class="paint-effect-svg-arcana">
					<path d="M 11 291 L 72 10 L 895 52 L 960 263 Z"></path>
				</svg>
				<span class="title">Arcana:</span>
			</span>
		</p>
		<p class="subtitle">${confidantContent['arcana']}</p>`

	// body
	let contentBody = ""
	
	Object.entries(confidantContent['ranks']).forEach(([rank, content]) => {
		let rankElement = `
		<div class="rank-container">
			<div class="rank-label"><span class="rank">Rank - ${rank}</span>: Unlocks <span class="bold">${content['unlocks']}</span></div>
			<div class="effect">${content['description']}</div>
		`
		content['entries'].forEach(element => {
			const entryElement = `
				<div class="dialog-flex">
					<div class="question">
						<svg viewBox="0 0 2600 900" class="question-svg">
							<path d="M 0 247 L 195 456 L 259 393 L 425 613 L 486 563 L 2574 561 L 2489 0 L 363 90 L 332 316 L 190 156 L 173 324 L 0 247"></path>
						</svg>
						<div class="question-text">
							"${element['question']}"
						</div>     
					</div>
					<div class="best-answer">
						<svg viewBox="0 0 40 12" class="answer-svg">
							<path d="M 2 0 L 30 3 L 29 8 L 37 11 L 23 10 L 23 9 L 0 7 Z"></path>
						</svg>
						<div class="answer-text">"${element['answer']}"</div>
					</div>
				</div>`
			rankElement += entryElement
		});
		rankElement += `</div>`
		contentBody += rankElement
	}); contentBody += `</div>`;
 
	const contentPfpContainerElement = document.querySelector('.content-pfp-container')
	contentPfpContainerElement.innerHTML = ""
	contentPfpContainerElement.insertAdjacentHTML('beforeend', contentPfpContainer)
	
	const ContentInfoElement = document.querySelector('.content-info')
	ContentInfoElement.innerHTML = ""
	ContentInfoElement.insertAdjacentHTML('beforeend', ContentInfo)

	const contentBodyElement = document.querySelector('.content-body')
	contentBodyElement.innerHTML = ""
	contentBodyElement.insertAdjacentHTML('beforeend', contentBody)

	// const fullContent = htmlHeader + contentBody
	// landingElement.innerHTML = ""
	// landingElement.insertAdjacentHTML("beforeend", fullContent)
}
