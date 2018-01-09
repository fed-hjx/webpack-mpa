/*
author: fe_kevin
date: 2017-07-21 17:33:00
description: 公共函数
*/
String.prototype.Trim = function() { //去掉全部空格
	return this.replace(/(^s*)|(s*$)/g, "");
}
String.prototype.LTrim = function() { //去掉左边空格
	return this.replace(/(^s*)/g, "");
}
String.prototype.RTrim = function() { //去掉右边空格
	return this.replace(/(s*$)/g, "");
}　
Array.prototype.isContain = function(v) { //Array是否包含否个元素=》弱类型比较
	for (let i = 0; i < this.length; i++) {
		if (this[i] == v) {
			return true;
		}
	}
	return false;
}
String.prototype.isContain = function(v) { //String是否包含否个元素=》弱类型比较
	return this.indexOf(v) > -1 ? true : false;
}
function numHandler (arg1,arg2,type){
	let r1,r2,m;
	try{
		r1 = arg1.toString().split('.')[1].length;
	}catch(e){
		r1 = 0;
	}
	try{
		r2 = arg2.toString().split('.')[1].length;
	}catch(e){
		r2 = 0;
	}
	m = Math.pow(10,Math.max(r1,r2));

	if(type === '+'){
		return (arg1*m+arg2*m)/m;
	}
	if(type === '-'){
		return (arg1*m-arg2*m)/m;
	}
	if(type === '*'){
		return arg1.toString().reaplace('.','');
	}
	//
}
Number.prototype.add = function(n){
	return numHandler(this,n,'+');
}
Number.prototype.sub = function(n){
	return numHandler(this,n,'-');
}
Number.prototype.mul = function(n){
	return numHandler(this,n,'*');
}
Number.prototype.div = function(n){
	return numHandler(this,n,'/');
}
module.exports = {
	getOs() { //判断浏览器
		if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
			return "MSIE8";
		} else if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			return "MSIE6";
		} else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
			return "MSIE7";
		} else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
			return "Firefox";
		}
		if (navigator.userAgent.indexOf("Chrome") > 0) {
			return "Chrome";
		} else {
			return "Other";
		}
	},
	strLength(str) { //字符串长度
		let a = 0;
		for (let i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				a += 2; //按照预期计数增加2
			} else {
				a++;
			}
		}
		return a;
	},
	/***
	 * 设置cookie
	 * @param cname
	 * @param cvalue
	 * @param exdays 过期天数
	 */
	setCookie(cname, cvalue, exdays) {
		let exdate = new Date();
		if (exdays) {
			exdate.setTime(exdate.getTime() + exdays * 24 * 60 * 60 * 1000);
		}
		document.cookie = `${cname}=${encodeURIComponent(cvalue)}${exdays ? '; expires=' + exdate.toUTCString() : ''}`;
	},
	/***
	 * 得到cookie值
	 * @param cname
	 * @return {*}
	 */
	getCookie(cname) {
		if (document.cookie.length > 0) {
			let c_start = document.cookie.indexOf(cname + "=")
			if (c_start != -1) {
				c_start = c_start + cname.length + 1
				let c_end = document.cookie.indexOf(";", c_start)
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return decodeURIComponent(document.cookie.substring(c_start, c_end))
			}
		}
		return '';
	},
	formatCash(str) {//金钱格式化：1234567890 --> 1,234,567,890
       	// return str.split('').reverse().reduce((prev, next, index) => {
        //     return ((index % 3) ? next : (next + ',')) + prev
       	// })
       	return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},
	isInSight(el) {//监听元素是否在可视区域
	  	const bound = el.getBoundingClientRect();
	  	const clientHeight = window.innerHeight;
	  	//如果只考虑向下滚动加载
	  	//const clientWidth=window.innerWeight;
	  	return bound.top <= clientHeight + 100;
	},
	throttle(fn, mustRun = 500) {//防抖
		const timer = null;
		let previous = null;
		return function() {
			const now = new Date();
			const context = this;
			const args = arguments;
			if (!previous) {
				previous = now;
			}
			const remaining = now - previous;
			if (mustRun && remaining >= mustRun) {
				fn.apply(context, args);
				previous = now;
			}
		}
	},
	addClass(el, className) {
		let old = el.className;
		let reg = new RegExp(`(^| )${className}($| )`, 'g');
		if (!reg.test(old)) {
			el.className = old.replace(/( $)|$/, ' ' + className);
		}
	},
	removeClass(el, className) {
		let old = el.className;
		let reg = new RegExp(`(^| )${className}($| )`, 'g');
		el.className = old.replace(reg, '');
	},
	isArray(obj){
	    return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]';
	},
	json2url(json) {//json转url参数
		let arr = [];
		for (let name in json) {
			arr.push(name + '=' + json[name]);
		}
		return arr.join('&');
	},
	setRadomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	shuffle(arr){//打乱数组
		return arr.sort(function(){return Math.random()-0.5});
	}
}