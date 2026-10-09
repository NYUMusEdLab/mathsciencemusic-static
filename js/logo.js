var containerID = 'animated-logo';
var logoOptions = {
	w: 951,
	h: 574,
	id: containerID
};

var alogo;
var tickleInterval;

window.addEventListener('resize', showViewport);

// hack to make logo responsive
function showViewport() {
	var logoContainer = document.getElementById('logo-col12');
	if (!logoContainer) return;
	var bBox = logoContainer.getBoundingClientRect();
	var width = bBox.width;
	var wScale = width / logoOptions.w;
	var scaledH = logoOptions.h * wScale;

	var logoDiv = document.getElementById(containerID);
	logoDiv.addEventListener('click', resetTickleInterval);

	logoDiv.setAttribute('style', 'transform: scale3d(' + wScale + ', ' + wScale +', 1);' +
		'-webkit-transform: scale3d(' + wScale + ', ' + wScale +', 1);');
	logoDiv.parentElement.setAttribute('style', 'height: ' + scaledH + 'px');

	logoContainer.setAttribute('style', 'height: ' + (scaledH + 50) + 'px');
}

function makeLogo() {
	if (AL && typeof alogo === 'undefined') {
		alogo = new AL('./images/svg-defs.svg', logoOptions, spritesReady, soundsReady);
		showViewport();
	}
}

function spritesReady() {
	Object.keys(SymbolMeta).forEach(function(key) {
		var optionsItem = SymbolMeta[key];
		optionsItem.destination_id = key;
		alogo.createSymbol(optionsItem);
	});

	tickleAll(0.01, 800, 0.01);

	document.getElementById('loading-container').classList.add('clear-opacity');
}


function soundsReady() {

	resetTickleInterval();

	setTimeout(function() {
		document.getElementById('loading-container').classList.add('hidden');
	}, 500);
}

// ===============
// tickle elements
// ===============

// tickle all the symbols, one at a time (do the wave)
function tickleAll(low, hoverTime, startScale) {
	for (var i = 0; i < alogo.symbols.length; i++) {
		var t = i*100 + hoverTime/2;
		var symbol = alogo.symbols[i];

		if (startScale) {
			symbol.rescale(startScale, 0);
		}
		bounceSymbol(symbol, i*100, hoverTime, low);
		bounceSymbol(symbol, t, hoverTime, 0.9);
	}
}

// tickle a random symbol
function tickleOne() {
	var len = alogo.symbols.length;
	var randomSymbol = alogo.symbols[ Math.floor( Math.random() * len) ];

	var low = Math.random() / 2 + 0.5;
	var bounceTime = 600;

	var rotateDeg = Math.random() * 10 - 5;
	bounceSymbol(randomSymbol, 10, bounceTime, low);
	// randomSymbol.rotate(rotateDeg, bounceTime);
	bounceSymbol(randomSymbol, bounceTime, 800, 0.9);
}

// helper function called by tickleAll and tickleOne
function bounceSymbol(symbol, t, hoverTime, scaleAmount, type) {
	setTimeout(function() {
		symbol.rescale(scaleAmount, hoverTime);
	}, t);
}

// tickle a random symbol every 4000 ms
function resetTickleInterval() {
	if (tickleInterval) {
		window.clearInterval(tickleInterval);
	}

	tickleInterval = setInterval(function() {
		tickleOne();
	}, 4000);

}


document.addEventListener('DOMContentLoaded', makeLogo, false);

