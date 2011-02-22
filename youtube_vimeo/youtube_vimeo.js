jQuery.fn.ytplaylist = function (options) {
  var options = jQuery.extend({
    holderId: 'ytvideo',
    playerHeight: '340',
    playerWidth: '430',
    addThumbs: true,
    thumbSize: 'small',
    autoPlay: true,
    playOnLoad: false,
    playfirst: 0,
    start: 0,
    showRelated: false,
    showInfo: true,
    wmode: true,
    iv_load_policy: true,
    hd: false,
    autoHide: true,
    html5: true,
    playerColor: 'ffffff',
    playerversion: '&version=2',
    allowFullScreen: true
  }, options);
  var selector = $(this);
  var autoPlay = "";
  var showRelated = "&rel=0";
  var showInfo = "&showinfo=0";
  var wmode = "t";
  var autoHide = "";
  var fullScreen = "";
  var iv_load_policy = "";

  var vimeo = false;
  var hd = "";
  var playerversion = "";
  if (options.showRelated) showRelated = "&rel=1";
  if (options.showInfo) showInfo = "&showinfo=1";
  if (options.wmode) wmode = "&wmode=opaque";
  if (options.autoHide) autoHide = "&autohide=1";
  if (options.allowFullScreen) fullScreen = "&fs=1";
  if (options.iv_load_policy) iv_load_policy = "&iv_load_policy=3";
  if (options.hd) hd = "&hd=1";
  
  function play(id, vimeo) {
    if (options.autoPlay && options.playOnLoad) autoPlay = "&autoplay=1";
    options.playOnLoad = true;
    var html = '';
    if (id == false) {
      return html
    } 

    else {
	
	   if(vimeo==false) {
		
		
      if (options.html5) {
        html += '<iframe class="youtube-player" type="text/html" width="' + options.playerWidth + '" height="' + (options.playerHeight - 3) + '" src="http://www.youtube.com/embed/' + id + '?' + autoPlay + autoHide + showRelated + showInfo + wmode + '" frameborder="0">';
        html += '</iframe>';
      } 

      else {
        html += '<object height="' + options.playerHeight + '" width="' + options.playerWidth + '">';
        html += '<param name="movie" value="http://www.youtube.com/v/' + id + options.playerversion + autoPlay + showRelated + showInfo + fullScreen + iv_load_policy + hd + '&color1=0x' + options.playerColor + '&color2=0x' + options.playerColor + autoHide + '" />';
        html += '<param name="wmode" value="transparent" />';
        html += '<param name="allowscriptaccess" value="always" />';
        html += '<param name="bgcolor" value="#000000" />';
        if (options.allowFullScreen) {
          html += '<param name="allowfullscreen" value="true" /> '; 
        }
        html += '<embed src="http://www.youtube.com/v/' + id + options.playerversion + autoPlay + showRelated + showInfo + fullScreen + iv_load_policy + hd + '&color1=0x' + options.playerColor + '&color2=0x' + options.playerColor + autoHide + '"';
        if (options.allowFullScreen) {
          html += ' allowfullscreen="true" '; 
        }
        html += 'type="application/x-shockwave-flash" wmode="transparent" bgcolor="#000000" allowscriptaccess="always" height="' + options.playerHeight + '" width="' + options.playerWidth + '"></embed>';
        html += '</object>';
      }

     } 

    else {
	
	      html += '<iframe class="youtube-player" type="text/html" width="' + options.playerWidth + '" height="' + (options.playerHeight - 3) + '" src="http://player.vimeo.com/video/'+ id +'" frameborder="0">';
        html += '</iframe>';
	
	  }


      return html
    }
  };

  function youtubeid(url) {
    if (url == undefined) {
      return false
    } else {
      var ytid = url.match("[\\?&]v=([^&#]*)");
      
     if(ytid ) {
	     ytid = ytid[1];
       return ytid
     }
  
    }
  };

  function vimeoid(url) {
    if (url == undefined) {
      return false
    } else {
      var vtid = url.match("[vimeo.com]\/([^&#]*)");
      vtid = vtid[1];
      return vtid
    }
  };

  var firstVid = $(selector).filter(function (index) {
    return index == options.playfirst
  }).addClass('currentvideo').attr('href');


	  var first_video_id  = youtubeid(firstVid);
	  var first_video_is_vimeo = false; 
	  if( first_video_id ==null ) {
	    first_video_id = vimeoid($(this).attr('href')); 
	    first_video_is_vimeo = true; 
		}
		else {
			first_video_id =first_video_id; 
		}
		

  $('#' + options.holderId + '').html(play(first_video_id, first_video_is_vimeo));
  selector.click(function () {
	  var video_id  = youtubeid($(this).attr('href')); 
	  var is_vimeo = false; 
	  if(video_id ==null) {
	    video_id = vimeoid($(this).attr('href')); 
	    is_vimeo = true; 
		}
		else {
			video_id = video_id; 
		}
    $('#' + options.holderId + '').html(play(video_id, is_vimeo));
    $(selector).filter('.currentvideo').removeClass('currentvideo');
    $(this).addClass('currentvideo');
    return false
  });
  if (options.addThumbs) {
    selector.each(function (i) {
      var replacedText = $(this).text();
      var replacedTextTitle = $(this).text().substring(0, 35);
		  var vvideo_id  = youtubeid($(this).attr('href')); 
		  var is_vimeo = false; 
		  if(vvideo_id ==null) {
		    vvideo_id = vimeoid($(this).attr('href')); 

			}
			else {
				vvideo_id = video_id; 
		     if (options.thumbSize == 'small') {
          var thumbUrl = 'http://img.youtube.com/vi/' + vvideo_id + '/2.jpg'
        } else {
          var thumbUrl = 'http://img.youtube.com/vi/' + vvideo_id + '/0.jpg'
        }
        $(this).empty().html('<img src="' + thumbUrl + '" alt="' + replacedTextTitle + '" />' + replacedText).attr('title', replacedTextTitle)
			}

      
    })
  }
};
