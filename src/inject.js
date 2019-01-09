{
	var url = 'https://raw.githubusercontent.com/yooya200/DaengMinDcCon/master/list.json';
	var response = $.getJSON(url);

	response.complete(function()
	{
		if  (response.status == 200)
		{
			rawArray = response.responseJSON["dccons"];
			
			DCCons = [];
			
			for (var i = 0; i < rawArray.length; i ++)
			{
				var v = rawArray[i].path;
				
				rawArray[i].keywords.forEach(k=>
				{
					var index = DCCons.length;
					var pair = new Set();
					pair['keyword'] = k;
					pair['path'] = v;
					DCCons[index] = pair;
				});
				
			}
			
		}
		
	});
	
}

function replaceCon(expression)
{
	for (var i = 0; i < DCCons.length; i++)
	{
		var dcCon = DCCons[i];
		var keyword = '~' + dcCon.keyword;
		
		if (expression == keyword)
		{
			return  '<img class="con" src="' + dcCon.path + '" title="' + keyword +'" >';
		}
		
	}
	
	return expression;
}

function replaceHtml(html)
{
	var output = '';
	var index = 0;
	
	while (true)
	{
		var prefixIdx = html.indexOf('~', index);
		
		if (prefixIdx == -1)
		{
			output += html.substring(index);
			break;
		}
		else
		{
			output += html.substring(index, prefixIdx);
		}
		
		var suffixIdx = html.indexOf(' ', prefixIdx + 1);
		
		if (suffixIdx == -1)
		{
			suffixIdx = html.indexOf('~', prefixIdx + 1);
		}
		
		if (suffixIdx == -1)
		{
			suffixIdx = html.length;
		}
		
		var substring = html.substring(prefixIdx, suffixIdx);
		var replaced = replaceCon(substring);
		
		output += replaced;
		
		index = suffixIdx;
	}
	
	return output;
}

function replaceChatLineMessage(tag)
{	
	tag.childNodes.forEach(child =>
	{
		if (child.tagName == 'SPAN' && child.className == 'text-fragment')
		{
			var original = child.innerHTML;
			var replaced = replaceHtml(original);
			child.innerHTML = replaced;
		}
		
	});
	
}

var processing = new Set();

document.getElementsByClassName("chat-list__lines")[0].childNodes[2].childNodes[0].childNodes[0].addEventListener("DOMNodeInserted", function (ev) {
	var tag = ev.srcElement;
	
	if (tag.tagName == 'DIV' && tag.className == 'chat-line__message')
	{
		replaceChatLineMessage(tag);
	}

}, false);
