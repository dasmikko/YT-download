function generateHTMLListItem(index, element, callback) 
{
	var html = "";
	html += '<li class="animated bounceInDown" id="' + element.id + '">';
	html += '<div class="title">';
	html += element.title;
	html += '</div>';
	html += '<div class="progress"><div id="p-' + element.id + '" class="progress-inner"><span></span></div></div>'
	html += '<div class="clear"></div>';
	html += '</li>';

	callback(html);
}