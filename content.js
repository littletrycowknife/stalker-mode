mutationObserver = window.WebKitMutationObserver;
observerConfig = {attributes: true, childList: true, characterData: true, subtree: true};
stalkerMode = "off";
previousUrl = "";
handlerProgress = null;
interval = 200;
intervalStart = (new Date()).getTime();
handlerDuration = 1500;

getButton = function() {
	chrome.extension.sendMessage({mode:stalkerMode});
}

checkUrlChange = function() {
	if (document.URL != previousUrl) {
		getButton();
		previousUrl = document.URL;
	}
}

stopHandler = function() {
	clearInterval(handlerProgress);
	handlerProgress = null;
}

hide = function() {
	$('.UFICommentActions.fsm.fwn.fcg:visible').hide();
	$('.FriendButton:visible').hide();
	$('.PageLikeButton:visible').hide();
	$('.fbPhotoSnowliftActionLinks:visible').hide();
	$('.actions:visible').hide();
	$('.addFriendText:visible').hide();
	$('.UFILikeIcon:visible').hide();
	$('.UFILikeLink:visible').hide();
	$('.uiLinkButton.comment_link:visible').hide();
	$('.share_action_link:visible').hide();
	$('.clearfix.snowliftOverlay.snowliftOverlayBar.rightButtons:visible').hide();
	$('.-cx-PRIVATE-hovercard__Footer.-cx-PRIVATE-uiContextualDialog__footer.clearfix.uiBoxGray.topborder').hide();
	$('.fbPhotoSubscribeWrapper:visible').hide();
	if ((new Date()).getTime() - intervalStart > handlerDuration) {
		stopHandler();
	}
}

show = function() {
	$('.UFICommentActions.fsm.fwn.fcg:hidden').show();
	$('.FriendButton:hidden').show();
	$('.PageLikeButton:hidden').show();
	$('.fbPhotoSnowliftActionLinks:hidden').show();
	$('.actions:hidden').show();
	$('.addFriendText:hidden').show();
	$('.UFILikeIcon:hidden').show();
	$('.UFILikeLink:hidden').show();
	$('.uiLinkButton.comment_link:hidden').show();
	$('.share_action_link:hidden').show();
	$('.clearfix.snowliftOverlay.snowliftOverlayBar.rightButtons:hidden').show();
	$('.-cx-PRIVATE-hovercard__Footer.-cx-PRIVATE-uiContextualDialog__footer.clearfix.uiBoxGray.topborder').show();
	$('.fbPhotoSubscribeWrapper:hidden').show();

}

mutationHandler = function(mutations) {
		checkUrlChange();
		if (stalkerMode == "on" && !handlerProgress) {
			intervalStart = (new Date()).getTime();
			handlerProgress = setInterval(hide, interval);
		}
	};

observer = new mutationObserver(mutationHandler);
observer.observe(document.body, observerConfig);

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		stalkerMode = ((stalkerMode=="on")?"off":"on");
		if (stalkerMode == "on") {
			hide();
		} else {
			if (handlerProgress) {
				stopHandler();
			}
			show();
		}
		sendResponse({mode:stalkerMode});
	});