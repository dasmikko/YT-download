// Get this window
var win = gui.Window.get();

win.showDevTools();

var ConvertToMp3 = false;

// Maximize state
var isMaximized = false;

// Register window states
win.on('maximize', function() {
	isMaximized = true;
});
win.on('unmaximize', function() {
	isMaximized = false;
});

win.window.onfocus = function() {
	if( !$("#url").val() )
	{
		var clipboard = gui.Clipboard.get();
		var text = clipboard.get('text');
		if(text.match( '^(http\:\/\/|https\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$' ))
		{
			$("#url").val(text);
		}
	}
}

//Toggle convert
toggleConvert = function() {
	if(!ConvertToMp3) 
	{
		ConvertToMp3 = true;
		$("#toggleConvert").addClass("active");
	}
	else 
	{
		ConvertToMp3 = false;
		$("#toggleConvert").removeClass("active");
	}
	
}

// Close
closeApp = function() {
	win.close();
}

// Maximize Toggle
maximizeToggleApp = function() {
	if(!isMaximized)
		win.maximize();
	else
		win.unmaximize();
}

// Minimize
minimizeApp = function() {
	win.minimize();
}

// Open Devtools
openDevTools = function() {
	win.showDevTools();
}

openSettings = function() {
	var settingsWindow = gui.Window.open('settings.html', {
	  position: 'center',
	  width: 250,
	  height: 270,
	  resizable: true,
	  transparent: true,
	  toolbar: false,
	  frame: false
	});
}