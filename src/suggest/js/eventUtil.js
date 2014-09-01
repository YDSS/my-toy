/**this util is used to be compatible with any brower,
especially <IE.8.*/

var EventUtil = {

	/**addHandler will add event 'type' and handle function
	'handler' onto the element,which is compatible with IE 
	and FF */ 

	addHandler: function(element, type, handler) {

		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}

	},

	/**removeHandler will remove event 'type' and function 'handler'
	on the element, which is compatible with IE and FF */
	removeHandler :function(element, type, handler) {

		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}

	},

	/**compatible IE and FF the way get Event Object */
	getEvent: function(event) {

		return event ? event : window.event;

	},

	/**compatible IE and FF the way get target */
	getTarget: function(event) {

		return event.target || event.srcElement;

	},

	/**prevent default action on wigets like anthor */
	preventDefault: function(event) {

		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

	},

	/**stop event bubble after*/
	stopPropagation: function(event) {

		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}

	},

	/**get compatible pageX */
	getPageX: function(event) {

		var pageX = event.pageX;

		if (pageX === undefined) 
			pageX = event.clientX + (document.body.scrollLeft || 
				document.documentElement.scrollLeft);
		return pageX;

	},

	/**get compatible pageY */
	getPageY: function(event) {

		var pageY = event.pageY;

		if (pageY === undefined) 
			pageY = event.clientY + (document.body.scrollTop ||
				document.documentElement.scrollTop);
		return pageY;
	},

	/**get related target,only valid on event
	mouseover and mouseout */
	getRelatedTarget: function(event) {

		if (event.getRelatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}

	},

	/**get button attribute in mousedown and mouseup event,
	0: mouse left button down. 1: mouse scroll button down.
	2: mouse right button down*/
	getButton: function(event) {

		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}

	},

	/**get detail value of mousewheel event */
	getWheelDelta: function(event) {

		if (event.wheelDelta) {
			return (client.engine.opera && client.engine.opera < 9.5 ?
				-event.wheelDelta : event.wheelDelta); //chrome has no client Object,will error
		} else {
			return -event.detail * 40;
		}

	},

	/**get compatible keyCode,only in keyPress event */
	getCharCode: function(event) {

		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	}
}