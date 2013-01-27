chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		chrome.pageAction.show(sender.tab.id);
		chrome.pageAction.setIcon({
			path:"icon-19-"+request.mode+".png",
			tabId:sender.tab.id
		})
	});

chrome.pageAction.onClicked.addListener(
	function(tab) {
		chrome.tabs.sendMessage(tab.id, {action:"get-current-mode"},
			function(response) {
				chrome.pageAction.setIcon({
					path:"icon-19-"+response.mode+".png",
					tabId:tab.id
				})
			});
	});