window.onload = function () {

    //获取元素和声明空变量
    var photo_warpper = document.getElementById('photo-warpper');
    var control_warpper = document.getElementById('control-warpper');
    var oEffect = document.getElementById('effects');
    var pic = document.querySelectorAll('.pic');
    var effects = document.querySelectorAll('.effect');
    var btns = document.getElementsByTagName('button');
    var timer = null;//全局动画循环播放

    //设置缩略图大小 自适应宽度
    Array.from(effects).forEach(function (item) {
        item.style.width = control_warpper.clientWidth + 'px';
    })
    window.onresize = function () {
        Array.from(effects).forEach(function (item) {
            item.style.width = control_warpper.clientWidth + 'px';
        })
    }

    //设置两大板块高度
    photo_warpper.style.height = control_warpper.style.height = window.innerHeight + 'px';

    //初始化轮播功能
    var p = new Effects({
        srcArr: ['img/a.jpg', 'img/b.jpg', 'img/c.jpg', 'img/d.jpg']
    })

    p.init({
        className: 'box',
        cssText: 'height:800px;',
    }, "photo")

    //按钮绑定事件
    Array.from(btns).forEach(function (item, index) {
        if (index == btns.length - 1) {
            item.onclick = function () {
                clearInterval(timer);
                p.tabMethod(p.createNum(0, btns.length - 2));
                timer = setInterval(function () {
                    p.tabMethod(p.createNum(0, btns.length - 2));
                }, 2500)
            }

        } else {
            item.onclick = function () {
                clearInterval(timer);
                p.tabMethod(index);
                timer = setInterval(function () {
                    p.tabMethod(index);
                }, 2500)
            }
        }
    })

    //缩略图绑定拖拽事件
    Array.from(pic).forEach(
        function (item, index) {
            drag(item, {
                    width: item.clientWidth + 'px',
                    height: item.clientHeight + 'px',
                    background: getComputedStyle(item, null).background,
                    opacity: .5,
                    'z-index': 10000
                },
                p.container,
                function () {
                    if (index == btns.length - 1) {

                        clearInterval(timer);
                        p.tabMethod(p.createNum(0, btns.length - 2));
                        timer = setInterval(function () {
                            p.tabMethod(p.createNum(0, btns.length - 2));
                        }, 2500)

                    } else {

                        clearInterval(timer);
                        p.tabMethod(index);
                        timer = setInterval(function () {
                            p.tabMethod(index);
                        }, 2500)

                    }
                })
        }
    )

    //缩略图板块鼠标滚轮事件

    var disH = oEffect.scrollHeight - oEffect.offsetHeight;//能滚动的高度  437
    var scrollBar = oEffect.querySelector('.scroll-bar')
    var scrollT = oEffect.scrollTop;//已滚动的高度
    oEffect.onmousewheel = function (ev) {
        setTimeout(function () {
            makeScrollBar(oEffect)
        }, 200)
    }

    //滚动条事件
    scrollBar.onmousedown = function (ev) {

        var This=this;
        var disY = ev.clientY-this.getBoundingClientRect().top;
        var maxTarget = this.parentNode.clientHeight-this.offsetHeight;
        document.onmousemove = function (ev) {
            clearTimeout(scrollBar.timer)
            //自身滑动
            var top=ev.clientY-disY;
            if (top<0){
                top = 0
            }else if (top>maxTarget){
                top = maxTarget
            }
            This.style.top=top+'px';

            //控制内容滚动
            var scrollTop=disH*top/maxTarget
            if (scrollTop<0){
                scrollTop = 0
            }else if (scrollTop>disH){
                scrollTop=disH
            }
            oEffect.scrollTop=scrollTop
        }
        document.onmouseup = function (ev) {
            scrollBar.timer = setTimeout(function () {
                new TimelineMax().to(scrollBar, .1, {width: 4}, 0)
            }, 1500)
            document.onmouseup=document.onmousemove=null;
        }

        return false
    }
    scrollBar.onmouseover=function () {
        clearTimeout(oEffect.timer)
        this.style.width='10px';
        this.style.cursor = 'pointer';

    }
    scrollBar.onmouseout=function () {
        scrollBar.timer=setTimeout(function () {
            new TimelineMax().to(scrollBar, .1, {width: 4}, 0)
        },500)
    }



    function makeScrollBar(obj) {
        clearTimeout(obj.timer)

        //获取与滚动相关的数据
        var maxTarget = obj.scrollHeight - obj.clientHeight;//可滚动的距离
        var nowTarget = obj.scrollTop;//当前已经滚动的距离
        var scrollBarHeight = obj.clientHeight / obj.scrollHeight * obj.clientHeight ;//滑动条长度
        var scrollBarTop = (obj.clientHeight - scrollBarHeight) * nowTarget / maxTarget;//滑动条位置
        scrollBar.style.height = scrollBarHeight + 'px';
        new TimelineMax().to(scrollBar, .2, {opacity: 1, ease: Linear.easeOut}, 0)
        //scrollBar.style.top = scrollBarTop + 'px';
        new TimelineMax().to(scrollBar, .25, {top: scrollBarTop}, 0)
        new TimelineMax().to(scrollBar, .25, {width: 10}, 0)

        //滑动结束后延迟执行隐藏滑动条
        obj.timer = setTimeout(function () {
            new TimelineMax().to(scrollBar, .1, {width: 4}, 0)
        }, 1500)
    }


}//onload