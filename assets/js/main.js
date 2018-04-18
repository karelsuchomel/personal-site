// navigation menu behave
var navigationExpanded = false;
var activeSmallNavigation = false;

function toggleContentScrollable() 
{
	if ( Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 640 || activeSmallNavigation == true) {
		let bodyElement = document.getElementsByTagName("BODY")[0];
		let htmlElement = document.getElementsByTagName("HTML")[0];
		if ( navigationExpanded == false ) {
			bodyElement.style.height = "100vh";
			bodyElement.style.overflowY = "hidden";
			htmlElement.style.height = "100vh";
			htmlElement.style.overflowY = "hidden";
			navigationExpanded = true;
			activeSmallNavigation = true;
		} else {
			bodyElement.style.height = "auto";
			bodyElement.style.overflowY = "auto";
			htmlElement.style.height = "auto";
			htmlElement.style.overflowY = "auto";
			navigationExpanded = false;
			activeSmallNavigation = false;
		}
	} else if ( navigationExpanded == false ) {
		navigationExpanded = true;
		console.log("wieport is more than 640px");
		window.addEventListener("scroll", function() {
			console.log("closeNavigationWhenScrolled - fired up");
			document.getElementById("mobile-navigation-trigger").checked = false;
			this.removeEventListener("scroll", arguments.callee);
			navigationExpanded = false;
		} );
	} else {
		navigationExpanded = false;
	}
};

var toggleNavigationElements = document.getElementsByClassName("menu-button-toggle")
for (var i = toggleNavigationElements.length - 1; i >= 0; i--) {
	toggleNavigationElements[i].addEventListener("click", toggleContentScrollable); 
}