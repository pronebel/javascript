/**
 * Created by ZWX on 2017/5/13.
 */

/******************************************** JS数据结构 *******************************************/
//栈（后进先出LIFO）
function Stack() {
    var items = [];

    this.push = function(element){
        items.push(element);
    };

    this.pop = function(){
        return items.pop();
    };

    this.peek = function(){
        return items[items.length-1];
    };

    this.isEmpty = function(){
        return items.length == 0;
    };

    this.clear = function(){
        items = [];
    };

    this.size = function(){
        return items.length;
    };

    this.print = function(){
        console.log(items.toString());
    };

}


//队列（先进先出FIFO）
function Queue() {
    var items = [];

    //入队列
    this.enqueue = function(element){
        items.push(element);
    }

    //出队列，相当于是从栈的头部弹出
    this.dequeue = function(){
        items.shift();
    }

    //获取队列最前面的元素
    this.front = function(){
        return items[0];
    }

    //判断队列是否为空
    this.isEmpty = function(){
        return items.length == 0;
    }

    //获取队列元素个数，即队列长度
    this.size = function(){
        return items.length;
    }

    //打印队列元素
    this.print = function(){
        console.log(items.toString());
    };

}


//链表
function LinkedList(){
    var Node = function(element){
        this.element = element;
        this.next = null;
    };
    var length = 0;
    var head = null;

    this.append = function(element){
        var node = new Node(element),current;
        if(head === null){
            head = node;
        }else{
            current = head;

            while(current.next){
                current = current.next;
            }

            current.next = node;
        }
        length++;
    };

    this.insert = function(position,element){

        if(position>=0 && position<=length){
            var node = new Node(element),
                current = head,
                previous,
                index = 0;

            if(position === 0){
                node.next = current;
                head = node;
            }else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        }else{
            return false;
        }
    };

    this.removeAt = function(position){
        if(position>-1&&position<length){
            var current = head,previous,index = 0;

            if(position === 0){
                head = current.next;
            }else {
                while (index++ <position){
                    previous = current;
                    current = current.next;
                }
            }

            length--;
            return current.element;
        }else {
            return null;
        }
    };

    this.remove = function(element){
        var index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function(element){
        var current = head,
            index = 0;

        while (current){
            if(element === current.element){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };

    this.siEmpty = function(){
        return length === 0;
    };

    this.size = function(){
        return length;
    };

    this.getHead = function(){
        return head;
    };

    this.toString = function(){
        var current = head,
            string = '';

        while (current){
            string += ","+current.element;
            current = current.next;
        }
        return string.slice(1);//去除第一个逗号
    };
}

/******************************************** DOM操作方法 *****************************************/
//insertAfter(newElement,targetElement)的实现
function insertAfter(newElement,targetElement) {
    if(targetElement == null) return false;
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

//addClass(element,value)的实现
function addClass(element,value) {
    if(!element.className){
        element.className = value;
    }else {
        var newClassName = element.className;
        newClassName +=" ";
        newClassName += value;
        element.className = newClassName;
    }
}

//getMyElementsByClassName(node,className)的实现
function getMyElementsByClassName(node,className) {
    var reg = new RegExp('\\b'+className+'\\b');
    if(node.getElementsByClassName){
        return node.getElementsByClassName(className);
    }else {
        var results = [];
        var elems = node.getElementsByTagName("*");
        for(var i=0;i<elems.length;i++){
            if(reg.test(elems[i].className)){
                results.push(elems[i]);
            }
        }
        return results;
    }
}

//模拟jQuery获取元素的方法,此方法只适用于一级元素
function $(v) {
    if(typeof v === 'function'){
        addLoadEvent(v);
    }else if(typeof v === 'string'){
        var reg1 = /^#/;
        var reg2 = /^\./;
        if(reg1.test(v)){
            var id = v.substring(1);
            return document.getElementById(id);
        }else if(reg2.test(v)){
            var cl = v.substring(1);
            return getElementsByClassName(document,cl);
        }else {
            return document.getElementsByTagName(v);
        }
    }else if(typeof v === 'object'){
        return v;
    }
}

//获取对象CSS属性
function getStyle(obj,attr) {
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}



/****************************************** 常用的判断方法 *****************************************/
//最靠谱的数组类型判断方法
function isArray(obj) {
    return obj && typeof obj === 'object' &&
        typeof obj.length ==='number' &&
        typeof obj.splice == 'function' &&
        !(obj.propertyIsEnumerable('length'));  //判断length属性是否是可枚举的，对于数组将得到false
}

//检验NaN的准确方法
function isRealNaN(x) {
    return x !== x;
}

//判断属性是否存在于原型中
function hasPrototypeProperty(obj,attr) {
    return !obj.hasOwnProperty(attr) && (name in obj);
}










/********************************************** 事件处理函数*****************************************/
//添加加载即调用的函数addLoadEvent(func)
function addLoadEvent(func) {
    var oldOnLoad = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function () {
            oldOnLoad();
            func();
        }
    }
}

//跨浏览器的事件处理程序（前常见浏览器，后IE浏览器）
var EventUtil = {
    getEvent:function (event) {                              //获取事件
        return event?event:window.event;
    },
    getTarget:function (event) {                             //获取事件对象
        return event.target||event.srcElement;
    },
    preventDefault:function (event) {                        //取消事件的默认行为
        if(event.preventDefault){
            event.preventDefault();
        }else {
            event.returnValue = false;
        }
    },
    stopPropagation:function (event) {                       //阻止事件冒泡
        if(event.stopPropagation){
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
    },
    addHandler:function (element,type,handler) {            //添加事件处理函数
        if(element.addEventListener){                        //常见浏览器
            element.addEventListener(type,handler,false);   //此处false表示在冒泡阶段调用事件处理程序，为true表示在捕获阶段调用事件处理程序
        }else if(element.attachEvent) {                     //IE
            element.attachEvent("on" + type,function () {
                handler.call(element);
            });
        }else {                                             //DOM0级事件处理函数
            element["on" + type] == handler;
        }
    },
    removeHandler:function (element,type,handler) {         //移除事件处理函数
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type,handler);
        }else {
            element["on" + type] == null;

        }
    }

}


//ajax(method,url,data,successFn)
function ajax(method,url,data,successFn) {
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if(method == 'get'&&data){
        url += '?'+data;
    }

    xhr.onreadystatechange = function() {    //必须在调用open()之前指定onreadystatechange事件处理程序才能保证跨浏览器兼容性
        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                alert('出错了,Err：' + xhr.status);
            }
        }
    }

    xhr.open(method,url,true);//此处的true表示是异步执行
    if(method == 'get'){
        xhr.send();
    }else {
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }
}

/***************************************** 常用数据操作函数封装 **********************************************/

//向现有URL的末尾添加查询字符串参数
function addURLParam(url,name,value) {
    url += ( url.indexOf('?') == -1 ? "?":"&");
    url += encodeURIComponent(name)+ "=" +encodeURIComponent(value);
    return url;
}

//设置cookie
function setCookie(key,value,t) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+t);
    document.cookie += key + '=' + value +';expires='+oDate.toGMTString();
}

//获取网页的cookie
function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i=0; i<arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0]==key) {
            return arr2[1];
        }
    }
}

//删除cookie
function removeCooke(key) {
    setCookie(key,'',-1);
}

//数组的深拷贝
function copyArray(arr) {
    var s = arr.slice(0);// 或者 var c = arr.concat();
    return s;
}

//对象的浅拷贝
function extendCopy(obj) {
    var c = {};
    for(var i in obj){
        c[i] = obj[i];
    }
    c.uber = obj;//保留对原对象的引用
    return c;
}

//对象的深拷贝
function deepCopy(obj,c) {
    var c = c || {};
    for(var i in obj){
        if(typeof obj[i] ==='object'){
            c[i] = (obj[i].constructor === Array)?[]:{};
            deepCopy(obj[i],c[i]);
        }else{
            c[i] = obj[i];
        }
    }
    return c;
}

//字符串转成驼峰式写法
function strToHump(str) {
    var reg = /-(\w)/g;
    return str.replace(reg,function ($0,$1) {
       return $1.toUpperCase();
    });
}

//获取字符串中出现最多的字符和出现的次数
function getLongChar(str) {
    var num = 0;
    var value = '';

    var arr = str.split('');
    arr.sort();
    str = arr.join('');

    var reg = /(\w)\1+/g;

    str.replace(reg,function ($0,$1) {
        if(num<$0.length){
            num = $0.length;
            value = $1;
        }
    });

    return "字符串中出现最多的字符是： " + value + "，出现的次数是： " + num;
}

//给数字字符串加千位分隔符
function addThousandSep(str) {
    var reg = /(?=(?!\b)(\d{3})+$)/g;

    return str.replace(reg,',');
}


/********************************************* 工具函数封装 ****************************************/
//拖拽函数封装
function drag(obj) {
    obj.onmousedown = function (ev) {
        var ev = ev||event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        if(obj.setCapture){
            obj.setCapture();
        }

        document.onmousemove = function (ev) {
            var ev = ev||event;

            var L = ev.clientX - disX;
            var T = ev.clientY - disY;

            if(L<0){
                L=0;
            }else if(L>document.documentElement.clientWidth-obj.offsetWidth){
                L = document.documentElement.clientWidth-obj.offsetWidth;
            }

            if(T<0){
                T=0;
            }else if(T>document.documentElement.clientHeight-obj.offsetHeight){
                T = document.documentElement.clientHeight-obj.offsetHeight;
            }

            obj.style.left = L +'px';
            obj.style.top = T +'px';

        };

        document.onmouseup = function () {
            if(obj.releaseCapture){
                obj.releaseCapture();
            }
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    };
}


//按固定方向移动指定元素
function doMove(obj,attr,dir,target,speed,endFn) {
    dir = parseInt(getStyle(obj,attr))<target?dir:-dir;
    clearInterval(obj.doMovetimer);
    obj.doMovetimer = setInterval(function () {
        var location = parseInt(getStyle(obj,attr)) + dir;
        if(location>target&&dir>0 || location<target&&dir<0){
            location = target;
        }

        obj.style[attr] = location + 'px';

        if(location == target){
            clearInterval(obj.doMovetimer);
            endFn && endFn();
        }
    },speed)
}

//让元素呈现抖动效果
function shake(obj,attr,am,speed,endFn) {

    if(obj.onOff) return;
    obj.onOff = true;

    var pos = parseInt(getStyle(obj,attr));

    var arr = [];
    var num = 0;

    for(var i = am;i>0;i -= 2){
        arr.push(i,-i);
    }
    arr.push(0);

    clearInterval(obj.shaketimer);
    obj.shaketimer = setInterval(function () {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if(num === arr.length){
            clearInterval(obj.shaketimer);
            endFn && endFn();
            obj.onOff = false;
        }
    },speed);

}

//获取实时时间
function getTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    //拼成时间字符串
    var time = toTwo(h)+toTwo(m)+toTwo(s);
    return time;                                  //返回6位表示时间的字符串
}
function toTwo(n) {                               // 时间补零函数
    return n<10?'0'+n:''+n;
}

var timer;
function newTimer(element) {
    stopit();
    var today;
    today=new Date();
    var str=today.toLocaleDateString();
    str+=today.toLocaleTimeString();
    element.innerHTML=str;
    timer=setTimeout(newTimer,1000);
}
function stopit() {
    clearTimeout(timer);
}

//高级表单验证
function checkForm(str,name) {
    var reg = {
        qq:/[1-9][0-9]{4,9}/,
        email:/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
        Zh:/[\u4e00-\u9fa5]/,
        trim:/^\s*|\s*$/,
        url:/[a-zA-z]+:\/\/[^\s]*/,
        postcode:/[1-9]\d{5}/,
        IDNumber:/[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x/
    };
    switch (name){
        case 'qq':return reg.qq.test(str);break;
        case 'email':return reg.email.test(str);break;
        case 'Zh':return reg.Zh.test(str);break;
        case 'trim':return reg.trim.test(str);break;
        case 'url':return reg.url.test(str);break;
        case 'postcode':return reg.postcode.test(str);break;
        case 'IDNumber':return reg.IDNumber.test(str);break;
            return 'can not find this type in your js database';
    }
}

//瀑布流实现
/*parent:子元素所在的容器
* box:子元素
* */
function waterfall(parent,box) {
    //将main下所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getMyElementsByClassName(oParent,box);

    //计算整个页面显示的列数（页面的宽/box的宽度）
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);

    //设置main的宽度
    oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';

    //存放各列的高度
    var hArray = [];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArray.push(oBoxs[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null,hArray);

            //求出最小高度列的索引
            var index = getMinIndex(hArray,minH);
            //设置元素的绝对定位
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH+'px';
            //oBoxs[i].style.left = index*oBoxW+'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
            hArray[index] += oBoxs[i].offsetHeight;
        }
    }

    console.log(oBoxs.length);
}

//获取最小高度列的索引
function getMinIndex(arr,val) {
    for(var i in arr){
        if(arr[i] == val){
            return i;
        }
    }
}

//检测是否满足滚动加载数据块的条件
/*parent:子元素的父级的id
* className:子元素共有的类名，用来遍历子元素而用
* */
//检测是否满足滚动加载数据块的条件
function checkScrollSlide(parent,className) {
    var oParent = document.getElementById(parent);
    var oBoxs = getMyElementsByClassName(oParent,className);

    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight);
    //兼容标准模式和混杂模式的滚动距离，前面的为标准模式，后面的为混杂模式
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //获取浏览器窗口可视区域的高度
    var height = document.documentElement.clientHeight || document.body.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;

}


















