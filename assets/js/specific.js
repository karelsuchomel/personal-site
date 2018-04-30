// assemble e-mail address!
// trigger: assemble-address-trigger
// container: address-container

let emailAddress = "karelsuchomel@windowslive.com";

function shuffleArray(array) 
{
	let counter = array.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter--);
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

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
	for (var i = 0; i < piecesArr.length; i++) {
		let rndPosX = Math.floor(Math.random() * Math.floor(50));
		let rndPosY = Math.floor(Math.random() * Math.floor(50));
		let rndRot = Math.floor(Math.random() * Math.floor(359));
		let transformStyle = "transform: translate(" + rndPosX + "px, " + rndPosY + "px) rotate(" + rndRot + "deg);";
		htmlContent += '<span style="' + transformStyle + '">' + piecesArr[i] + '</span>';
	}

	console.log(htmlContent);

	contEl.innerHTML = htmlContent;
};

initiateChaosUponAddress(emailAddress, "address-container");