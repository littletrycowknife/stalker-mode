mutationObserver = window.WebKitMutationObserver;
observerConfig = {attributes: true, childList: true, characterData: true, subtree: true};
changeDetectedTime = null;
lastHideTime = new Date().getTime();
elapsedTime = 300;
attemptTime = 3000;

observer = new mutationObserver(function(mutations) {
	if (!changeDetectedTime) {
		changeDetectedTime = new Date().getTime();
	} else {
		currentTime = new Date().getTime();
		if ( currentTime - changeDetectedTime < attemptTime) {
			if (currentTime - lastHideTime > elapsedTime ) {
				$('.UFILikeLink:visible').hide();
				lastHideTime = currentTime;
			}
		} else {
			changeDetectedTime = null;
		}
	}
});

observer.observe(document.body, observerConfig);