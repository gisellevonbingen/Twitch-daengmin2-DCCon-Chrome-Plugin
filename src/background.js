var sites = ['https://www.twitch.tv/daengmin2', 'https://www.twitch.tv/gisellevonbingen'];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
	if (changeInfo.status == 'complete')
	{
		for (var i = 0; i < sites.length; i++)
		{
			var site = sites[i];
			
			if (tab.url.toLowerCase().startsWith(site.toLowerCase()) == true)
			{
				chrome.tabs.executeScript(tab.id, { file: "jquery.min.js" }, function()
				{
					chrome.tabs.executeScript(tab.id, { file: "inject.js" }, function()
					{
						console.log("Inject Success : " + tab.index + " : " + tab.url);
					});
					
				});
				
				break;
			}
		
		}
		
	}

});