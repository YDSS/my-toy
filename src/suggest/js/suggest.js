/**suggest功能前端部分，这里写的是一个匹配一段文字里单个单词的suggest。我把需检索的内容直接
放在内存里来模拟后端的数据，给input输入框绑定了2个事件，oninput和onpropertychange，效果类似，
只不过onpropertychange是IE专属，而非IE用oninput。也可以使用keydown、keypress、keyup事件来监听
input框的变化，只不过不能监听到用户粘贴时的变化，故而没有使用。搜索的结果按出现次数的多少倒序
排序，每一栏的右侧列出了出现次数*/

(function() {
	//把需要检索的字符串暂存在内存中，通过javascript正则表达式匹配单词
	var content = "This is the VOA Special English Agriculture Report.People have been growing chrysanthemums "
				+ "for more than two thousand years. Mums make bright and colorful gardens. People in China "
				+ "and other Asian cultures make tea with the flowers. Giacomo Puccini, the great Italian "
				+ "composer, even named one of his works after chrysanthemums, 'Crisantemi.'(MUSIC: Manhattan " 
				+ "String Quartet) One basic kind of mum is the hardy or garden mum. The other basic kind is "
				+ "the florist mum. The garden mum is better able to handle different growing conditions.", 
		val,	//输入框中的字符串值，在加粗字符串时会用到，设置成全局变量
		count = [],	//放匹配项出现的次数，下标与ret一一对应
		input = document.getElementById("input"),
		sugDiv = document.querySelector(".inner"),
		ul = document.querySelector(".list");

	function inputEvent(event) {
		var ev = EventUtil.getEvent(event),
			value = getValue(event),	//这里的value是局部变量，用getVaule方法可以顺便更新val的值
			reg,
			ret;

		if (trim(value)) {

			reg = new RegExp("\\b"+trim(val)+"\\w*\\b", "mg");
			ret = content.match(reg);
			//去重
			if (ret) 
				ret = unique(ret);

			showSuggest(ret);
		} else {
			showSuggest();
		}
	}

	//给input绑定oninput和onpropertychange事件，
	//IE8以下不支持oninput事件但支持onpropertychange事件
	EventUtil.addHandler(input, "input", inputEvent);
	EventUtil.addHandler(input, "propertychange", inputEvent);
	EventUtil.addHandler(input, "focus", function() {
		sugDiv.style.display = "block";
	});
	EventUtil.addHandler(input, "blur", function() {
		sugDiv.style.display = "none";
	});

	//获取输入框的值
	function getValue(event) {

		var ev = EventUtil.getEvent(event);

		if (ev.propertyName) {
			if (ev.propertyName.toLowerCase() == "value")
				val = ev.srcElement.value;
		} else {
			val = ev.target.value;
		}

		return val;
	}

	//展示匹配的字符串
	function showSuggest(data) {

		//首先清除掉原来的查询结果
		ul.innerHTML = "";

		if (!data) {
			sugDiv.style.display = "none";
		} else {
			
			sugDiv.style.display = "block";

			var dataLen = data.length,
				valLen = val.length,
				limit = 10,			//限制suggest显示的个数
				li,
				text,
				strong;

			for (var i=0; i<dataLen; i++) {

				li = document.createElement("li");
				li.className = "item";
				ul.appendChild(li);

				//把匹配上的字符串中不是当前输入的字符加粗,
				//因为TextNode是直接输出文本，在li中加了一个strong元素,
				//用来强调还没有匹配上的部分
				text = document.createTextNode(val);
				li.appendChild(text);
				strong = document.createElement("strong");
				strong.innerHTML = data[i].substr(valLen);
				li.appendChild(strong);
				strong = document.createElement("strong");
				strong.innerHTML = count[i];
				strong.className = "sum";
				li.appendChild(strong);

			}
		}

	}

	//去字符串首尾的空格
	function trim(str) {

		var reg = /(^\s*)|(\s*$)/g;

		return str.replace(reg, "");
	}

	//去重,顺便记录各匹配项出现的次数以便排序
	function unique(arr) {

		var ret = [],	//放匹配项
			o = {};		//空对象，用来排序和去重

		count = [];	//每次排序前清空原来的内容

		//将arr中的元素放入o中，既去重又可以记录出现次数
		for(var i=0;i<arr.length;i++){
			if (o[arr[i]]) {
				o[arr[i]]++;
			} else {
				o[arr[i]] = 1;
			}
		}

		//将出现次数放入count中
		for (var p in o) {
			if (o.hasOwnProperty(p)) {
				count.push(o[p]);
			}
		}

		//count倒序排序
		count.sort(function(x, y) {
			if (x > y) return -1;
			if (x <= y) return 1;
		});

		//将arr中的数据放入ret中，其下标与count一一对应
		for (var i=0; i<count.length; i++) {
			for (var m in o) {
				if (count[i] == o[m] && !ret.contains(m)) {
					ret.push(m);
					break;
				}
			}
		}

		return ret;
	}

	//判断数组中是否包含
	Array.prototype.contains = function(val) {

		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) {
				return true;
			}
		}
		return false;

	}
	
})();