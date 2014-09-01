/*this util package is from seajs source code and my practice usually, which is
compatible with all mainstream browers. */

(function(win) {

	var util = {},	//object will be exported
		toString = Object.prototype.toString,
		AP = Array.prototype;

	util.isString = function(val) {
    	return toString.call(val) === '[object String]'
  	}

  	util.isFunction = function(val) {
    	return toString.call(val) === '[object Function]'
  	}

  	util.isRegExp = function(val) {
    	return toString.call(val) === '[object RegExp]'
  	}

  	util.isObject = function(val) {
    	return val === Object(val)
  	}

  	util.isArray = Array.isArray || function(val) {
    	return toString.call(val) === '[object Array]'
  	}

  	//三元表达式为做兼容处理
  	//返回指定字符串在某个数组成员匹配中首次全文匹配的索引，如果没有匹配则返回 -1
  	util.indexOf = AP.indexOf ?
    	function(arr, item) {
        	return arr.indexOf(item)
      	} :
      	function(arr, item) {
        	for (var i = 0; i < arr.length; i++) {
          		if (arr[i] === item) {
            		return i
          		}
        	}
        	return -1
    	}

    //三元表达式为做兼容处理
  	//让数组成员全部执行一次一个指定的函数 , 对数组不做任何修改
  	var forEach = util.forEach = AP.forEach ?
    	function(arr, fn) {
        	arr.forEach(fn)
      	} :
      	function(arr, fn) {
        	for (var i = 0; i < arr.length; i++) {
          		fn(arr[i], i, arr)
        	}
      	}

    //三元表达式为做兼容处理
  	//让数据成员全部执行一次一个指定的函数，并返回一个新的数组，该数组为原数组成员执行回调后的结果
  	util.map = AP.map ?
    	function(arr, fn) {
     		return arr.map(fn)
      	} :
      	function(arr, fn) {
        	var ret = []
        	forEach(arr, function(item, i, arr) {
          		ret.push(fn(item, i, arr))
        	})
        	return ret
      	}

    //三元表达式为做兼容处理
  	//让数据成员全部执行一次一个指定的函数，并返回一个新的数组，该数组为原数组成员执行回调后返回为true的成员
  	util.filter = AP.filter ?
      	function(arr, fn) {
        	return arr.filter(fn)
      	} :
      	function(arr, fn) {
        	var ret = []
        	forEach(arr, function(item, i, arr) {
	          	if (fn(item, i, arr)) {
	            	ret.push(item)
	          	}
        	})
        	return ret
      	}

    //数组去重
  	util.unique = function(arr) {
	   	//声明空数组ret，空对象o
	    var ret = []
	    var o = {}

	    //将数组对象执行forEach方法，得到去重后的对象o ， 巧妙 XD
	    forEach(arr, function(item) {
	      o[item] = 1
	    })

	    //对象以键值数组化
	    if (Object.keys) {
	      ret = Object.keys(o)
	    } else {
	      for (var p in o) {
	        if (o.hasOwnProperty(p)) {
	          ret.push(p)
	        }
	      }
	    }

	    //返回数组
	    return ret
  	}

  	//以对象键值数组化
	util.keys = Object.keys

	if (!util.keys) {
		util.keys = function(o) {
		    var ret = []

		    for (var p in o) {
		    	if (o.hasOwnProperty(p)) {
		        	ret.push(p)
		        }
		    }

		     return ret
	  	}
	}

	//当前时刻
  	util.now = Date.now || function() {
    	return new Date().getTime()
  	}

  	//获取元素的style，直接用elem.style只能取到内联样式
  	//兼容IE和webkit
  	util.getStyle = function(elem) {

  		if (elem.currentStyle) {
			return elem.currentStyle;
		}
		if (document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(elem);
		}
		return null;

  	}

  	//找到div距离浏览器的坐标
	util.getPosition = function (ele, oRefer) {//oRefer是定位参照物。可以不写，不写就是和浏览器的绝对位置

		oRefer = oRefer || document.body;
		var x = ele.offsetLeft;
		var y = ele.offsetTop;
		p = ele.offsetParent;

		while (p != oRefer || p != document.body) {

			if (window.navigator.userAgent.indexOf('MSIE 8.0') >- 1) {
				x += p.offsetLeft;
				y += p.offsetTop;
			} else {
				x += p.offsetLeft + p.clientLeft;
				y += p.offsetTop + p.clientTop;
			} 
				p = p.offsetParent;
		}

		var obj = {};
		obj.x = x;
		obj.y = y;
		return obj;
	}

  	//module.export ...
  	win.util = util

})(window);


