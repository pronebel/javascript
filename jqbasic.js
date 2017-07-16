/**
 * Created by ZWX on 2017/6/3.
 */
/**       使用该js库需要事先加载了jQuery.js库       **/
/******************************************* 动态效果工具库 ****************************************************/
//快速响应超链接提示信息
function fastTitle(target,x,y) {
    if($("target").attr("title").length>0){
        $(target).mouseover(function (e) {
            this.myTitle = this.title;
            this.title = '';
            var tooltip = "<div id='tooltip'>"+this.myTitle+"</div>";
            $('body').append(tooltip);
            $("#tooltip")
                .css({
                    "top":(e.pageY+y)+"px",
                    "left":(e.pageX+x)+"px"
                }).show("fast");
        }).mouseout(function () {
            this.title = this.myTitle;
            $("#tooltip").remove();
        });
    }
}




/******************************************* 工具函数封装 ********************************************************/
//瀑布流实现
/*
* parent:子元素所在容器
*
* $(oParent).children()：获取的只有子元素而不考虑其他后代元素
* outerWidth()：获取的是包含左右padding+左右border+width的总和，注意不包含左右margin
* outerHeight()：获取的是包含上下padding+上下border+height的总和，注意不包含上下margin
* $(window).width()：获取的是可视区宽度
* $(window).height()：获取的是可视区高度
* Math.min.apply(null,Arr)：获取Arr中各元素的最小值
*$.inArray(val,Arr)：获取值val在数组Arr中的索引
* */
function waterfall(parent) {
    var oParent = document.getElementById(parent);
    var $boxs = $(oParent).children();
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/w);
    $(oParent).width(w*cols).css('margin','0 auto');

    var hArr = [];
    $boxs.each(function (index,value) {
        var h = $boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null,hArr);
            var minHIndex = $.inArray(minH,hArr);
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*w+'px'
            });
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }
    });

    console.log($boxs.length);
}


//检测是否满足滚动加载数据块的条件
/*
* parent：子元素所在父级元素的id
*
* last()获取jQuery对象集合中的最后一个对象
* $lastBox.offset().top：获取$lastBox元素相对于文档的偏移高度
* $(window).scrollTop()：设置或返回可视区元素的垂直滚动条的位置，当滚动条位于最顶部时，位置是0
* */
function checkScrollSlide(parent) {
    var oParent = document.getElementById(parent);
    var $lastBox = $(oParent).children().last();
    var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}

/**************************************** 扩展String对象的方法 ******************************************/
$.extend(String.prototype,{
   isPositiveInteger:function () {
       return (new RegExp(/^[1-9]\d*$/).test(this));
   },
    isInteger:function () {
        return (new RegExp(/^\d+$/)).test(this);
    },
    isNumber:function () {
        return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
    },
    trim:function () {
        return this.replace(/(^\s*)|(\s*$)|\r|\n/g,"");
    },
    trans:function () {
        return this.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
    },
    replaceAll:function (os,ns) {
        return this.replace(new RegExp(os,"gm"),ns);
    },
    skipChar:function (ch) {
        if(!this||this.length === 0){return '';}
        if(this.charAt(0)===ch){return this.substring(1).skipChar(ch)}
        return this;
    },
    isValidMail:function () {
        return (new  RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()));
    },
    isSpaces:function () {
        for(var i=0;i<this.length;i++){
            var ch = this.charAt(i);
            if(ch!=' '&&ch!='\n'&&ch!='\t'&&ch!='\r'){return false;}
        }
        return true;
    },
    isPhone:function () {
       return (new RegExp(/(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/).test(this));
    },
    isUrl:function () {
        return (new RegExp(/^[z-zA-Z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w.\/?%&=:]*)$/).test(this));
    },
    isExternalUrl:function () {
        return this.isUrl()&&this.indexOf("://"+document.domain) == -1;
    }
});












