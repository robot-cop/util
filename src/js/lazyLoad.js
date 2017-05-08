//闭包限定命名空间
(function($) {
	var dzLoad = {
		options: {
			count: 0,
			loading: 0,
			loadingSelector: "",//load div层
			loadingTextSelector: "",//放进度数字的文本
			pageSelector:  "",//页面主内容
			imgList: [],//页面的img audio
			reg: {
				imageType: "jpg|png|gif", //允许的图片格式
				audioType: "mp3",
				videoType:  ""
			}
		},
		getFile: function(fileName, reg) {
			var result = /.*\.(\w*\b)/.exec(fileName);
			console.log(fileName, result);
			return new RegExp(reg).test(result[1]);
		},
		caculate: function() {
			//	console.log(this.options.count, "caculate", this.options.imgList.length);
			this.options.loading = parseInt(100 / this.options.imgList.length * this.options.count);
			$(this.options.loadingTextSelector).text(this.options.loading + "%")
			if(this.options.loading == 100) {
				$(this.options.pageSelector).animate({ "opacity": 1 }, 1200)
				$(this.options.loadingSelector).css({ "display": "none" });
			}
		},
		publicListeners: function(dom, src, callback) {
			var self = this;
			//		dom.src = src;
			dom.onerror = function() {
				console.log(dom.src + "加载不成功");
				console.log(self.options.count, "error");
				self.caculate(++self.options.count);
			}
			if(typeof callback == "function") {
				callback();
			}
		},
		load: function() {
			var self = this,
				reg = self.options.reg;
			for(var i = 0; i < this.options.imgList.length; i++) {
				var img = new Image(),
					audioDom = new Audio(),
					src = this.options.imgList[i];
				(function(arg) {
					if(self.getFile(src, reg.imageType)) {
						img.src = src;
						img.onload = function() {
							console.log(self.options.count, "oload");
							self.caculate(++self.options.count);
						}
						self.publicListeners(img, src);

					} else if(self.getFile(src, reg.audioType)) {
						audioDom.src = src;
						audioDom.onloadedmetadata = function() {
							console.log(self.options.count, "onloadedmetadata");
							self.caculate(++self.options.count);
						}
						self.publicListeners(audioDom, src);

					}
				})(i);

			}
		},
		init: function(options) {
			$.extend(true,this.options, options);
			//console.log(this.options);
			this.load();
		}

	}
	$.extend({
		"loadProgress": function(options) {
			dzLoad.init(options);

		}
	});

})(window.jQuery);