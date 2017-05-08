(function($) {
	var typeAnimate = {
		typefun: function(container, index, max) {
			var self = this,
				timer, timeout;
			if(index > max) {
				return;
			}
			var dom = $('[data-dom]', container).eq(index),
				callback = dom.attr('data-callback'),
				delay = dom.attr('data-delay'),
				str = dom.data('html'),
				progress = 0;
			timer = setInterval(function() {

				var current = str.substr(progress, 1);
				if(current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				dom.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if(progress >= str.length) {
					clearInterval(timer);
					if(typeof callback == 'function') {
						callback()
					}

					timeout = setTimeout(function() {
						self.typefun(container, ++index, max);
						clearTimeout(timeout);
					}, delay ? delay : 200)

				}
			}, 200);
			dom.data({ 'timer': timer, 'timeout': timeout });

		},
		stopwriter: function(container) {
			var domList = $('[data-dom]', container);
			domList.each(function(index) {
				var self = $(this);
				console.log(self.data('html'));
				self.html(self.data('html'));
				clearInterval(self.data('timer'));
				clearTimeout(self.data('timeout'));
			})

		},
		typewriter: function(container) {
			var domList = $('[data-dom]', container);
			var len = domList.length - 1;
			console.log(this);
			this.typefun(container, 0, len);

		},
		init: function() {
			$('[data-dom]').each(function(index) {
				var self = $(this);
				self.data({ 'html': self.html().trim() }).html('');

			})

		}
	}
	$.extend({
		"fontTypeAnimate": {
			init: typeAnimate.init,
			typewriter: function(container) {
				return typeAnimate.typewriter(container);
			},
			stopwriter: function(container) {
				return typeAnimate.stopwriter(container)
			}
		}
	});
})(window.jQuery);