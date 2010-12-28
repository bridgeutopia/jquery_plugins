
(function($) {

$.fn.extend({
    jqEasyCounter: function(givenOptions) {
        return this.each(function() {
            var $this = $(this),
                options = $.extend({
                    maxChars: 100,
					maxCharsWarning: 80,
					msgFontSize: '12px',
					msgFontColor: '#000000',
					msgFontFamily: 'Arial',
					msgTextAlign: 'right',
					msgWarningColor: '#F00',
					msgAppendMethod: 'insertAfter'
                }, givenOptions);
	
			if(options.maxChars <= 0) return;
			
			// create counter element
			var jqEasyCounterMsg = $("<div class=\"jqEasyCounterMsg\">&nbsp;</div>");
			var jqEasyCounterMsgStyle = {
				'font-size' : options.msgFontSize,
				'font-family' : options.msgFontFamily,
				'color' : options.msgFontColor,
				'text-align' : options.msgTextAlign,
				'width' : $this.width(),
				'opacity' : 0
			};
			jqEasyCounterMsg.css(jqEasyCounterMsgStyle);
			// append counter element to DOM
			jqEasyCounterMsg[options.msgAppendMethod]($this);
			
			// bind events to this element
			$this
				.bind('keydown keyup keypress', doCount)
				.bind('focus paste', function(){setTimeout(doCount, 10);})
				.bind('blur', function(){jqEasyCounterMsg.stop().fadeTo( 'fast', 0);return false;});
			
			function doCount(){
				var val = $this.val(),
					length = val.length
				
				if(length >= options.maxChars) {
					val = val.substring(0, options.maxChars); 				
				};
				
				if(length > options.maxChars){
					// keep scroll bar position
					var originalScrollTopPosition = $this.scrollTop();
					$this.val(val.substring(0, options.maxChars));
					$this.scrollTop(originalScrollTopPosition);
				};
				
				if(length >= options.maxCharsWarning){
					jqEasyCounterMsg.css({"color" : options.msgWarningColor});
				}else {
					jqEasyCounterMsg.css({"color" : options.msgFontColor});
				};
				
				jqEasyCounterMsg.html('Characters Left: ' + (options.maxChars-$this.val().length));
                jqEasyCounterMsg.stop().fadeTo( 'fast', 1);
			};
        });
    }
});

})(jQuery);