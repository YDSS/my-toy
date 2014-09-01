(function() {
	
	//内存中保留2个div的引用
	var child = document.querySelector('#child'),
		parent = document.querySelector('#parent'),
		ev,	//事件对象
		parentWidth = transStoN(getStyle(parent).width),	//父元素的宽度，可用parent.clientWidth代替
		parentHeight = transStoN(getStyle(parent).height),	//父元素的高度，可用parent.clientHeight代替
		childWidth = transStoN(getStyle(child).width),		//div的宽度，可用child.offsetWidth代替
		childHeight = transStoN(getStyle(child).height),	//div的高度，可用child.offsetHeight代替
		offsetX = 0,	//鼠标相对于拖放对象的X距离
		offsetY = 0;	//鼠标相对于拖放对象的Y距离


	/*拖拽事件，依次为鼠标按下、鼠标移动、鼠标抬起3个步骤。这里使用事件的嵌套，
	当鼠标按下时鼠标移动才会触发div移动。*/
	child.onmousedown = function(event) {

		//获取事件
		ev = EventUtil.getEvent(event);

		//用pageX和pageY防止浏览器滚动条滑动导致坐标不准确
		offsetX = EventUtil.getPageX(ev) - child.offsetLeft;
		offsetY = EventUtil.getPageY(ev) - child.offsetTop;

		document.onmousemove = function(event) {

			//child移动到初始位置，即鼠标位置
			/*child.style.left = initX + 'px';
			child.style.top = initY + 'px';*/

			//移动div
			move(EventUtil.getEvent(event));
			//console.log('mouse move');
		}

		//把onmouseup移出来与onmousemove并列，防止出现mouseup事件监测不到的情况
		document.onmouseup = function(event) {
			this.onmouseup = null;
			this.onmousemove = null;

			//console.log('mouse up');
		}
	}

	//div移动，处理包括触碰边界的情况
	function move(ev) {

		//设置鼠标可以移动div的区域
		var mxLeft = 0,
			mxTop = 0,
			mxRight = parentWidth - childWidth,
			mxBottom = parentHeight - childHeight,
			x = EventUtil.getPageX(ev),
			y = EventUtil.getPageY(ev),
			iLeft = x - offsetX,
			iTop = y - offsetY;

			//控制边界
			iLeft = Math.max(Math.min(mxRight, iLeft), mxLeft);
			iTop = Math.max(Math.min(mxBottom, iTop), mxTop);

			//重新设置div坐标
			child.style.left = iLeft + 'px';
			child.style.top = iTop + 'px';

	}

	//获取元素的style属性,兼容FF类和IE类,只读
	function getStyle(element) {
		//IE类
		if (element.currentStyle) 
			return element.currentStyle;
		if (document.defaultView.getComputedStyle)
			return document.defaultView.getComputedStyle(element, null);
		return null;
	}

	//转换元素通过getStyle得到的top等值，其为字符串且带px
	function transStoN(value) {

		var len = value.length - 2;	//去掉px这两个字后的长度，因substr参数不能有直接量故先计算出
		return parseInt(value.substr(0, len));

	}

	//找到div距离浏览器的坐标
	/*function getPosition(ele, oRefer) {//oRefer是定位参照物。可以不写，不写就是和浏览器的绝对位置

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
	}*/

})();