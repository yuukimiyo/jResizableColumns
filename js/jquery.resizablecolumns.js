/*
 * jquery.resizablecolumns.jp 0.5 jQuery plugin
 *
 * Copyright (c) 2012 Yuuki miyoshi
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Yuuki miyoshi
 * @version 0.5
 * @url http://github.com/yuukimiyo/jWaterSurface
 * @github https://github.com/yuukimiyo/jWaterSurface
 *
 * ＜はじめに＞
 * jQuery UI のresizableで２ペインの左側のサイズを変更した際に右ペインの幅を正しくあわせる為のプラグインです。
 * 自分で使う為に作成したプラグインです。ご利用される場合は自己責任でお願いします。
 * 
 * <*>現在２ペインまでしか対応していません。
 * 
 * ＜ご利用方法＞
 * jQuery（1.7.2でテストしています）と共にJavaScriptとして読み込んでください。
 * 
 * 左右２ペインで表示させたい２つの要素（divタグなど）をラッパー要素でかこみ、
 * このラッパー要素に対して他のjQueryプラグインと同様に適用してください。
 * 
 * ＜オプション＞
 * [resizableColumn] : .resizable
 * 　左ペインのコラム要素を指定して下さい。
 * [dependentColumn] : .dependent
 * 　右ペインのコラム要素を指定して下さい。
 */

(function(jQuery) {

	var options;

	/**
	 * jWaterSurfaceのメイン関数
	 */
	jQuery.fn.resizablecolumns = function(options) {
		var options = jQuery.extend({
			resizableColumn : ".resizable",
			dependentColumn : ".dependent"
		}, options);
		
		var target;
		
		return this.each(function() {
			target = this;
			
			jQuery(window).resize(function() {
				resizeDependent(target);
			});
			
			jQuery(target).find('#wrapper').resize(function() {
				resizeDependent(target);
			});
			
			jQuery(target).find('.resizable').resize(function() {
				resizeDependent(target);
			});
		});
		function resizeDependent(_target) {
				jQuery(_target).find('.dependent').width(
					  jQuery(_target).innerWidth()
					- jQuery(_target).find('.resizable').outerWidth()
					- (jQuery(_target).find('.dependent').outerWidth() - jQuery(_target).find('.dependent').innerWidth()) 
				);
		};
	};
})(jQuery);
