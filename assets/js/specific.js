// assemble e-mail address!
// keep things outside the global scope plz
(function (window, document, undefined) {

  'use strict';

  /**
   * Selectors
   */
	var triggerID = "assemble-address-trigger";
	var containerID = "address-container";
	let emailAddress = "karelsuchomel@" + "windowslive.com";


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

			const piecesArr = dismantleAddress( address, contEl );

			// after finishong bublle sort, wrap the content in functional mailto: link

			// TODO this should be upto some triggerControlFuncion
			// Change trigger button to "Dismantle!"
			//dismantled = false;
		} else {
			const piecesArr = dismantleAddress( address, contEl );

			trigEl.innerHTML = "Assemble!";

			trigEl.addEventListener('click', function() {
				assembleAddress(piecesArr, contEl);
			}, false );

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

	function assembleAddress(piecesArr, contEl)
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

		}, 500);
	};

	/**
   * Events/APIs/init
   */
	triggerControl(emailAddress, "address-container", "assemble-address-trigger");


})(window, document);