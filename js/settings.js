// Get this window
var win = gui.Window.get();

win.showDevTools();

loadSettings = function()
{
	fs.readFile('settings.ini', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		data = JSON.parse(data);
	 	$("#quality_select").val(data.quality);
	});
	getSetting("quality");

}

saveSettings = function() {
	console.log("Saving!");

	var settings = {
		"quality": $("#quality_select").val()
	};

	fs.writeFile("settings.ini", JSON.stringify(settings), function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	        closeApp();
	    }
	}); 
}

getSetting = function(type)
{
	fs.readFile('settings.ini', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		data = JSON.parse(data);

		if(type == "quality")
		{
			return data.quality;
		}
	});
}


// Close
closeApp = function() {
	win.close();
}