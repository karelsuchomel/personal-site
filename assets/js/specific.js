// assemble e-mail address!
// trigger: assemble-address-trigger
// container: address-container
let fh = "karelsuchomel@";
let sh = "windowslive.com";
let emailAddress = fh + sh;

// creates two dimensional array with shuffeled address in first
// and original position of pices in second
function shuffleArray(array) 
{
	let counter = array.length;
	let origPosArr = [];
	for (var i = 0; i < array.length; i++) {
		origPosArr.push(i);
	}

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter--);
		// address
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
		// original positions
		let posTemp = origPosArr[counter];
		origPosArr[counter] = origPosArr[index];
		origPosArr[index] = posTemp;
	}
	const returnArray = [array, origPosArr];
	return returnArray;
};

function initiateChaosUponAddress( address, containerID, triggerID ) 
{
	const contEl = document.getElementById(containerID);
	const trigEl = document.getElementById(triggerID);
	let piecesArr = [];

	for (var i = 0; i < address.length;) {
		// length from 1 to 4
		let rndLen = Math.floor(Math.random() * Math.floor(3)) + 1;
		piecesArr.push("");

		while (rndLen--) {
			piecesArr[piecesArr.length - 1] += address.charAt(i);
			i++;
		}
	}
	piecesArr = shuffleArray(piecesArr);
	console.log(shuffleArray(piecesArr));

	let htmlContent = "";
	for (var i = 0; i < piecesArr[1].length; i++) {
		let rndPosX = Math.floor(Math.random() * Math.floor(50));
		let rndPosY = Math.floor(Math.random() * Math.floor(50));
		let rndRot = Math.floor(Math.random() * Math.floor(359));
		let transformStyle = "transform: translate(" + rndPosX + "px, " + rndPosY + "px) rotate(" + rndRot + "deg);";
		htmlContent += '<span style="' + transformStyle + '">' + piecesArr[1][i] + '</span>';
	}

	console.log(htmlContent);

	contEl.innerHTML = htmlContent;
	trigEl.addEventListener('click', assembleAddress(piecesArr, contEl) );
};

function assembleAddress(piecesArr, contEl)
{
	let spanArr = contEl.getElementsByTagName("span");
	for (var i = 0; i < spanArr.length; i++) {
		spanArr[i].style = "";
	}


	// reset the transform styles
	// bublesort, after each swap, render the html
};

initiateChaosUponAddress(emailAddress, "address-container", "assemble-address-trigger");