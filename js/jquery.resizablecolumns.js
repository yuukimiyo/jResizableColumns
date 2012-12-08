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
 *  左ペインのセレクタを指定。
 * [dependentColumn] : .dependent
 *  右ペインのセレクタを指定。
 * [offset] : 0
 *  右ペインの幅に対するオフセットです。数値分小さくなります。
 *  （borderの幅などを正しく取得できずに幅があふれてしまうのを打ち消す為に利用します）
 * [maxWidth] : ""
 *  左ペインの最大幅です。数値ではなく"100px"などのように単位付きで指定します。
 *  (重要)左ペインの幅よりも大きい値を指定してください。
 * [maxWidthOffset] : 0
 *  右ペインの最大幅です。数値で指定します。
 *  (幅の指定で数値指定と単位付き指定が混在しているのは処理をシンプルにするためです。単位付きの方が有用ですが、％などで指定された場合に数値を得る処理を加える必要があるためです。)
 */

(function(jQuery) {

	var options;

	/**
	 * jResizableColumnsのメイン関数
	 */
	jQuery.fn.resizablecolumns = function(options) {
		/* オプション値の取得 */
		var options = jQuery.extend({
			resizableColumn : ".jrc-resizable",
			dependentColumn : ".jrc-dependent",
			offset: 0,
			maxWidth: "",
			maxWidthOffset: 0
		}, options);
		
		var target;
		var wrapperId;
		
		/*
		 * プラグインを適用したセレクタに対しての処理
		 */
		return this.each(function() {
			target = this;
			
			/* 左ペインの最大幅をセット */
			setResizableMaxWidth(target);
			
			/* 右ペインのリサイズ処理 */
			resizeDependent(target);
			
			/* ブラウザのリサイズイベントで右ペインをリサイズ */
			jQuery(window).resize(function() {
				resizeDependent(target);
			});
			
			/* 自要素のリサイズイベントで右ペインをリサイズ */
			jQuery(target).find('#' + jQuery(target).attr("id") ).resize(function() {
				resizeDependent(target);
			});
			
			/* 左ペインのリサイズイベントで右ペインをリサイズ */
			jQuery(target).find( options.resizableColumn ).resize(function() {
				resizeDependent(target);
			});
		});
		
		/*
		 * 左ペインの最大値を設定
		 */
		function setResizableMaxWidth(_target) {
			var maxWidthValue;
			
			/* オプションで左ペインの最大値が設定されているかチェック */
			if (options.maxWidth == "") {
				/* 設定されていない場合はラッパー要素の内側ギリギリまでリサイズ可 */
				maxWidthValue = (
					  jQuery(_target).innerWidth()
					- ( jQuery(_target).find( options.dependentColumn ).outerWidth() - jQuery(_target).find( options.dependentColumn ).innerWidth() )
					- options.maxWidthOffset
					) + "px";
			} else {
				/* 設定されている場合はオプション値を適用 */
				maxWidthValue = options.maxWidth;
			}
			
			/* 用意した最大値をCSSで適用 */
			jQuery(_target).find( options.resizableColumn ).css("max-width",maxWidthValue);
		}
		
		/*
		 * 右ペインのリサイズを実行
		 */
		function resizeDependent(_target) {
			jQuery(_target).find( options.dependentColumn ).width(
				  jQuery(_target).innerWidth()
				- jQuery(_target).find( options.resizableColumn ).outerWidth()
				- (jQuery(_target).find ( options.dependentColumn ).outerWidth() - jQuery(_target).find( options.dependentColumn ).innerWidth())
				- options.offset
			);
		};
	};
})(jQuery);
