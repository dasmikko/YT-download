function downloadVideo() 
{
	var url = $("#url").val();

	var playlist = [];

	if(url.indexOf("playlist") > -1) {
		console.log('Is playlist');

		$.get( url, function( data ) 
		{ 
			cheerioQuery = cheerio.load(data);
			//console.log(cheerioQuery('.pl-video-title-link').attr('href'));
			playlist = [];
			$('#playlist ul').html('');
			cheerioQuery('.pl-video-title-link').each(function(i, elem) {
				playlist.push({
					"href": "www.youtube.com" + cheerioQuery(this).attr('href'),
				});   	
			});
			downloadYoutubeVideoPlaylist(playlist);
		});
		
	}
	else
	{
		downloadYoutubeVideo(url);
		//getInfoOnly(url);
	}
	
}


function downloadYoutubeVideo(url)
{
	ytdl.getInfo(url, {downloadURL: true }, function(err, info) {

		var readStream = ytdl(url, { filter: function(format) { return format.container === 'mp4'; } });
		//var readStream = ytdl.downloadFromInfo(info, { filter: function(format) { return format.container === 'mp4'; } });

		// Check if want to convert to mp3
		if (ConvertToMp3)
		{
				var songinfo = info.title.split(' - ')
					ffmpeg({source:readStream})
					.outputOptions('-metadata', 'artist='+songinfo[0])
					.outputOptions('-metadata', 'title='+songinfo[1])
					.setFfmpegPath('ffmpeg/bin/ffmpeg.exe')
					.saveToFile("audio/" + sanitize(info.title) + '.mp3', function(data, err)
					{
			            console.log(data);
			        });
		}
		else
		{
			readStream.pipe(fs.createWriteStream("video/" + sanitize(info.title) + '.mp4'));
		}
		

		generateHTMLListItem(0, {
			id: info.video_id,
			title: info.title,
		}, function(html) {
			$('#playlist ul').append(html);
		});
		
		readStream.on('info', function(info, format) {
		    console.log(format);
		    console.log('container: ' + format.container);
		    console.log('resolution: ' + format.resolution);
		    console.log('encoding: ' + format.encoding);
		    console.log('size: ' + format.size);
		    console.log();


		    // Keep track of progress.
		    var dataRead = 0;
		    readStream.on('data', function(data) {
		      dataRead += data.length;
		      var percent = Math.round(dataRead / format.size * 100);
		      $('#p-'+info.video_id).css('width', percent + "%");
		      $('#p-'+info.video_id + ' span').html(percent + "%");
		    });
		  });
	});
}

function downloadYoutubeVideoPlaylist(thePlaylist)
{
	console.log(thePlaylist);
	forEachAsync(thePlaylist, function(next, element, index, array) 
	{
		ytdl.getInfo(element.href, {downloadURL: true}, function(err, info) {

			var readStream = ytdl(element.href, { filter: function(format) { return format.container === 'mp4'; } });

			// Check if want to convert to mp3
			if (ConvertToMp3)
			{
					var songinfo = info.title.split(' - ')
					ffmpeg({source:readStream})
					.outputOptions('-metadata', 'artist='+songinfo[0])
					.outputOptions('-metadata', 'title='+songinfo[1])
					.setFfmpegPath('/Users/Mikkel Laptop/Desktop/node-webkit/Youtube-Downloader/ffmpeg/bin/ffmpeg.exe')
					.saveToFile("audio/" + sanitize(info.title) + '.mp3', function(data, err)
					{
			            console.log(data);
			        });
					
			}
			else
			{
				readStream.pipe(fs.createWriteStream("video/" + sanitize(info.title) + '.mp4'));
			}
			

			generateHTMLListItem(0, {
				id: info.video_id,
				title: info.title,
			}, function(html) {
				$('#playlist ul').append(html);
			});
			
			readStream.on('info', function(info, format) {
			    console.log(info);
			    console.log('container: ' + format.container);
			    console.log('resolution: ' + format.resolution);
			    console.log('encoding: ' + format.encoding);
			    console.log('size: ' + format.size);
			    console.log();


			    // Keep track of progress.
			    var dataRead = 0;
			    readStream.on('data', function(data) {
			    	dataRead += data.length;
			      	var percent = Math.round(dataRead / format.size * 100);
			      	$('#p-'+info.video_id).css('width', percent + "%");
			      	$('#p-'+info.video_id + ' span').html(percent + "%");
			      	if(percent == 100)
			      	{
			      		// Do something
			     	}
			    });
		  	});
		});
		// Go to next element
      	next();	
			
		
	}).then(function () {
		
  	});
	
}

function getInfoOnly(url) {
	ytdl.getInfo(url, {downloadURL: true }, function(err, info) {
		console.log(err);
		console.log(info);
	});
}