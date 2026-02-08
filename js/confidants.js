const confidantsRow = document.querySelector('.confidants-row');

const confidants = [
	"Ryuji Sakamoto",
	"Ann Takamaki",
	"Yusuke Kitagawa",
	"Makoto Niijima",
	"Futaba Sakura",
	"Haru Okumura",
	"Goro Akechi",
	"Tae Takemi",
	"Sojiro Sakura",
	"Munehisa Iwai",
	"Sadayo Kawakami",
	"Yuuki Mishima",
	"Hifumi Togo",
	"Chihaya Mifune",
	"Toranosuke Yoshida",
	"Shinya Oda",
	"Kasumi Yoshizawa",
	"Takuto Maruki",
	"Ichiko Ohya",
];

confidants.forEach(confidant => {
	const confidantName = confidant.split(' ')[0].toLowerCase();
	const size = confidant.length >= 15 ? 'xs-text' : ( confidant.length > 12 ? 'sm-text' :'md-text');
	const rndNum = confidantRandomValidNumber(confidant);
	const confidantNameEffect = (
        confidant.slice(0, rndNum) + '<span class="bg-white">' +
        confidant.slice(rndNum, rndNum + 1) + '</span>' +
        confidant.slice(rndNum + 1, confidant.length)
    );

	const htmlelement = `
		<div class="confidant-card">
			<div class="confidant-header">
				<img src="img/pfp/${confidantName}-3.png" class="confidant-pfp3">
				<img src="img/pfp/${confidantName}-4.png" class="confidant-pfp2">
				<img src="img/pfp/${confidantName}-1.png" class="confidant-pfp">
    			<img src="img/point.png" width="48px" class="point">
			</div>
			<div class="confidant-body">
				<svg viewBox="0 0 400 200" class="confidant-banner">
					<path d="M10 40 L350 10 L390 90 L70 160 Z" />
				</svg>
				<p class="confidant-name ${size}">
					${confidantNameEffect}
				</p>
			</div>
		</div>
	`
	confidantsRow.insertAdjacentHTML("beforeend", htmlelement)
});

function confidantRandomValidNumber(name) {
    let i = 1
    let rndNum = 0
    while (name[rndNum] == ' ' || rndNum == 0) {
        rndNum = 1 + Math.floor(Math.random() * (name.length - 1))
        i++;
    }
    return rndNum
}