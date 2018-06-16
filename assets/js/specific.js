// assemble e-mail address!
// keep things outside the global scope plz
(function (window, document, undefined) {

  'use strict';

  /**
   * Selectors
   */
	let triggerID = "assemble-address-trigger";
	let containerID = "address-container";
	const emailAddress = "karelsuchomel@" + "windowslive.com";
	var piecesArr = [];

	/**
   * Methods
   */
	var dismantled = false;
	function triggerControl( address, containerID, triggerID )
	{
		const contEl = document.getElementById(containerID);
		const trigEl = document.getElementById(triggerID);

		if (dismantled == true) 
		{
			document.getElementById(triggerID).removeEventListener('click', triggerHandle, false);

			assembleAddress(piecesArr, contEl, function(){
				document.getElementById(triggerID).addEventListener('click', triggerHandle, false);
				trigEl.innerHTML = "CHAOS!";
				dismantled = false;
			});

		} else {
			piecesArr = dismantleAddress( address, contEl);
			trigEl.innerHTML = "Assemble!";
			dismantled = true;
		}
		
	};

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
		let returnArray = [];
		returnArray[0] = array;
		returnArray[1] = origPosArr;
		return returnArray;
	};

	function dismantleAddress( address, contEl ) 
	{
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

		let htmlContent = "";
		for (var i = 0; i < piecesArr[0].length; i++) {
			let rndPosX = Math.floor(Math.random() * Math.floor(35));
			let rndPosY = Math.floor(Math.random() * Math.floor(35));
			let rndRot = Math.floor(Math.random() * Math.floor(359)) * (Math.random() < 0.5 ? -1 : 1);
			let transformStyle = "transform: translate(" + rndPosX + "px, " + rndPosY + "px) rotate(" + rndRot + "deg);";
			htmlContent += '<span style="' + transformStyle + '">' + piecesArr[0][i] + '</span>';
		}

		contEl.innerHTML = htmlContent;

		return piecesArr;
	};

	function deleteCSSInsideContentSpans(contEl) {
		// reset the transform styles
		let spanArr = contEl.getElementsByTagName("span");
		for (var i = 0; i < spanArr.length; i++) {
			spanArr[i].style = "";
		}
	};

	function assembleAddress(piecesArr, contEl, callback)
	{
		deleteCSSInsideContentSpans(contEl);

		setTimeout( function(){

		// bublesort and after each swap -> render the html
		var ArrLength = piecesArr[0].length;
		var delayMultiplier = 0;
		while(ArrLength != 0) {
			let newn = 0;

			for (var i = 1; i <= piecesArr[0].length; i++) 
			{
				if ( piecesArr[1][i - 1] > piecesArr[1][i] ) 
				{
					// swap
					let tmp = piecesArr[1][i - 1];
					piecesArr[1][i - 1] = piecesArr[1][i];
					piecesArr[1][i] = tmp;
					tmp = piecesArr[0][i - 1];
					piecesArr[0][i - 1] = piecesArr[0][i]
					piecesArr[0][i] = tmp;
					newn = i;

					// render HTML
					let htmlContent = "";
					for (var i = 0; i < piecesArr[0].length; i++) {
						htmlContent += '<span>' + piecesArr[0][i] + '</span>';
					}
					setTimeout(function() {
						contEl.innerHTML = htmlContent;
					}, delayMultiplier * 20);
					delayMultiplier++;
				}
			}
			ArrLength = newn;
		}

		setTimeout(function() {
			contEl.innerHTML = "<a href='mailto:" + emailAddress + "?subject=Contact from karelsuchomel.cz'>" + contEl.innerHTML + "</a>";
			callback();
		}, delayMultiplier * 20);

		}, 500);
	};


	/**
   * Events/APIs/init
   */

  function triggerHandle() {
		triggerControl(emailAddress, containerID, triggerID);
	};

	document.getElementById(triggerID).addEventListener('click', triggerHandle, false);
	triggerControl(emailAddress, containerID, triggerID);


})(window, document);