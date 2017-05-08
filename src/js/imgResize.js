(function($) {
	var dzImgResize = {
		options: {
			imgListSelector: "",
			maxWidth: 200,
			maxHeight: 200,
			afterResize: function(img) {
				//当前img对象
				console.log(img);
			}
		},
		caculate: function() {
			var self = this;
			$(self.options.imgListSelector).each(function(index, ele) {
				var maxW = self.options.maxWidth, //区域宽度
					maxH = self.options.maxHeight, //区域宽度
					img = $(this), //每一张图片
					imgW = img.width(), //图宽
					imgH = img.height(), //图高
					originScale = imgW / imgH;

				var ratioA = imgW / maxW;
				var ratioB = imgH / maxH;

				if(ratioA > ratioB) {
					imgW = maxW;
					imgH = maxW / originScale;
				} else {
					imgH = maxH;
					imgW = maxH * originScale;
				}

				console.log(imgW, imgH);

				img.css({
					width: imgW + "px",
					height: imgH + "px"
				})
				self.options.afterResize(img);
			})
		},
		init: function(options) {
			$.extend(true, this.options, options);
			this.caculate();
		}
	}
	$.extend({
		"imgResize": function(options) {
			dzImgResize.init(options);
		}
	});
})(window.jQuery);