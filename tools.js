function Effects(options) {
    this.options = {
        srcArr: null
    }
    extend(this.options, options);
    this.createNodeOptions = null;
    this.nowSrc = 0;//当前播放的图片SRC
    this.container = null//容器
    this.onoff = true;
    this.timeLineMax = null

}

Effects.prototype.init = function (options, id) {
    this.container = document.getElementById(id)
    this.container.appendChild(this.createNotes(options));
    this.timeLineMax = new TimelineMax();
}

Effects.prototype.createNotes = function (options) {//返回包含节点的fragMent节点
    this.createNodeOptions = {//createNotes的默认参数
        num: 1,
        nodeName: 'div',
        className: null,
        cssText: null,
        src: 0,
        warpper: null//是否要包一个外壳
    }
    extend(this.createNodeOptions, options);
    this.nowSrc = this.createNodeOptions.src;
    var fragMent = this.createNodeOptions.warpper ? document.createElement('div') : document.createDocumentFragment();
    fragMent.nodeType == 1 ? fragMent.className = this.createNodeOptions.warpper : null

    for (var i = 0; i < this.createNodeOptions.num; i++) {
        var ele = document.createElement(this.createNodeOptions.nodeName);
        this.createNodeOptions.cssText ? ele.style.cssText = this.createNodeOptions.cssText : null;
        this.createNodeOptions.className ? ele.className = this.createNodeOptions.className : null;
        ele.style.backgroundImage = 'url(' + this.options.srcArr[this.createNodeOptions.src] + ')';
        fragMent.appendChild(ele)
    }
    return fragMent;
}

Effects.prototype.tabMethod = function (num) {
    if (!this.onoff) return;//动画没播放完不执行此函数
    this.onoff = false;
    this.timeLineMax = new TimelineMax();

    //移除上一张图片的载体元素
    $('#photo .box')[0] ? $('#photo .box')[0].parentNode.removeChild($('#photo .box')[0]) : null;
    if ($('#photo .after')[0]) {
        $('#photo .after')[0].parentNode.removeChild($('#photo .after')[0])
    }

    var This = this;
    switch (num) {
        case 0://竖条效果
            //先用N个DIV复制一层一样的
            var warpperBefore = document.createElement('div');
            warpperBefore.className = 'before';

            var warpperAfter = document.createElement('div');
            warpperAfter.className = 'after';

            for (var i = 0; i < 30; i++) {
                warpperBefore.appendChild(
                    this.createNotes({
                        cssText: 'position:absolute;top:0;height:' + this.container.clientHeight + 'px;width:' +
                        this.container.clientWidth / 30 + 'px;background-position-x:-' +
                        this.container.clientWidth / 30 * i + 'px;left:' +
                        this.container.clientWidth / 30 * i + 'px',
                        src: this.nowSrc
                    })
                )
            }
            this.container.appendChild(warpperBefore)

            //再生成新的图片层，一列列挤下去

            this.nowSrc++;
            if (this.nowSrc > this.options.srcArr.length - 1) {
                this.nowSrc = 0;
            }

            for (var j = 0; j < 30; j++) {
                warpperAfter.appendChild(
                    this.createNotes({
                        cssText: 'position:absolute;top:-' + This.container.clientHeight +
                        'px;height:' + This.container.clientHeight + 'px;width:' +
                        This.container.clientWidth / 30 + 'px;background-position-x:-' +
                        This.container.clientWidth / 30 * j + 'px;left:' +
                        This.container.clientWidth / 30 * j + 'px;',
                        src: This.nowSrc
                    })
                )
            }
            this.container.appendChild(warpperAfter);

            //动画实现
            for (var i = 0; i < 30; i++) {

                this.timeLineMax.to($('#photo .before')[0].children[i], 1, {
                    top: This.container.clientHeight,
                    ease: Elastic.easeIn
                }, i * 0.02)
                this.timeLineMax.to($('#photo .after')[0].children[i], 1, {
                    top: 0,
                    ease: Elastic.easeIn
                }, i * 0.02)

            }
            this.timeLineMax.add(function () {
                $('#photo .before')[0] ? $('#photo .before')[0].parentNode.removeChild($('#photo .before')[0]) : null;
                This.onoff = true;
            })

            break

//-------------------------------------------------------------------------------------------------------------------

        case 1://方块效果
            //先用N个DIV复制一层一样的
            var warpperBefore = document.createElement('div');
            warpperBefore.className = 'before';

            var warpperAfter = document.createElement('div');
            warpperAfter.className = 'after';

            for (var i = 0; i < 20; i++) {
                warpperBefore.appendChild(
                    this.createNotes({
                        cssText: 'position:absolute;height:' + this.container.clientHeight / 4 + 'px;width:' +
                        this.container.clientWidth / 5 + 'px;top:' + Math.floor(i / 5) * this.container.clientHeight / 4 + 'px;left:' +
                        i % 5 * this.container.clientWidth / 5 + 'px;background-position:-' + i % 5 * this.container.clientWidth / 5 + 'px -' +
                        Math.floor(i / 5) * this.container.clientHeight / 4 + 'px;back-visibility:hidden;z-index:10',
                        src: this.nowSrc
                    })
                )
            }
            this.container.appendChild(warpperBefore)

            //再生成新的图片层

            this.nowSrc++;
            if (this.nowSrc > this.options.srcArr.length - 1) {
                this.nowSrc = 0;
            }

            for (var j = 0; j < 20; j++) {
                warpperAfter.appendChild(
                    this.createNotes({
                        cssText: 'position:absolute;height:' + this.container.clientHeight / 4 + 'px;width:' +
                        this.container.clientWidth / 5 + 'px;top:' + Math.floor(j / 5) * this.container.clientHeight / 4 + 'px;left:' +
                        j % 5 * this.container.clientWidth / 5 + 'px;background-position:-' + j % 5 * this.container.clientWidth / 5 + 'px -' +
                        Math.floor(j / 5) * this.container.clientHeight / 4 + 'px;back-visibility:hidden;z-index:9;',
                        src: this.nowSrc
                    })
                )
            }
            this.container.appendChild(warpperAfter);

            //动画实现
            for (var i = 0; i < 20; i++) {
                if (i % 2) {
                    this.timeLineMax.to($('#photo .before')[0].children[i], 1, {
                        opacity: 0,
                        transform: 'rotateY(180deg)',
                        ease: Back.easeIn
                    }, 0)
                } else {
                    this.timeLineMax.to($('#photo .before')[0].children[i], 1, {
                        opacity: 0,
                        transform: 'rotateY(-180deg)',
                        ease: Back.easeIn
                    }, 0.35)
                }
            }
            this.timeLineMax.add(function () {
                $('#photo .before')[0] ? $('#photo .before')[0].parentNode.removeChild($('#photo .before')[0]) : null;
                This.onoff = true;
            })

            break

//---------------------------------------------------------------------------------------------------------------------

        case 2://两侧散开

            //先用N个DIV复制一层一样的
            var warpperBefore = document.createElement('div');
            warpperBefore.className = 'before';

            var warpperAfter = document.createElement('div');
            warpperAfter.className = 'after';

            for (var i = 0; i < 10; i++) {
                warpperBefore.appendChild(
                    this.createNotes({
                        cssText: `position:absolute;width:${this.container.clientWidth}px;height:
                            ${this.container.clientHeight / 10}px;left:0;top:${i * this.container.clientHeight / 10}px;
                            background-position-y:-${i * this.container.clientHeight / 10}px;z-index:10;`,
                        src: this.nowSrc
                    })
                )
            }
            this.container.appendChild(warpperBefore)

            //再生成新的图片层

            this.nowSrc++;
            if (this.nowSrc > this.options.srcArr.length - 1) {
                this.nowSrc = 0;
            }

            for (var j = 0; j < 10; j++) {
                warpperAfter.appendChild(
                    this.createNotes({
                        cssText: `position:absolute;width:${this.container.clientWidth}px;height:
                            ${this.container.clientHeight / 10}px;left:0;top:${j * this.container.clientHeight / 10}px;
                            background-position-y:-${j * this.container.clientHeight / 10}px;`,
                        src: this.nowSrc
                    })
                )
            }
            this.container.appendChild(warpperAfter);

            //动画实现
            for (var i = 0; i < 10; i++) {
                if (i % 2) {
                    this.timeLineMax.to($('#photo .before')[0].children[i], 1, {
                        left: -this.container.clientWidth,
                        ease: Back.easeIn
                    }, .25)
                } else {
                    this.timeLineMax.to($('#photo .before')[0].children[i], 1, {
                        left: this.container.clientWidth,
                        ease: Back.easeIn
                    }, .25)
                }


            }
            this.timeLineMax.add(function () {
                $('#photo .before')[0] ? $('#photo .before')[0].parentNode.removeChild($('#photo .before')[0]) : null;
                This.onoff = true;
            })

            break

//---------------------------------------------------------------------------------------------------------------------

        case 3://滑动
            //先用N个DIV复制一层一样的
            var warpperBefore = document.createElement('div');
            warpperBefore.className = 'before';

            var warpperAfter = document.createElement('div');
            warpperAfter.className = 'after';

            var target = [
                'left:0;top:-' + this.container.clientHeight + 'px;',  //上方
                'left:0;top:' + this.container.clientHeight + 'px;',   //下方
                'left:-' + this.container.clientWidth + 'px;',         //左方
                'left:' + this.container.clientWidth + 'px;'           //右方
            ]

            warpperBefore.appendChild(
                this.createNotes({
                    cssText: `position:absolute;width:${this.container.clientWidth}px;height:
                        ${this.container.clientHeight}px;left:0;top:0;`,
                    src: this.nowSrc
                })
            )

            this.container.appendChild(warpperBefore)

            //再生成新的图片层

            this.nowSrc++;
            if (this.nowSrc > this.options.srcArr.length - 1) {
                this.nowSrc = 0;
            }

            warpperAfter.appendChild(
                this.createNotes({
                    cssText: `position:absolute;width:${this.container.clientWidth}px;height:
                        ${this.container.clientHeight}px;z-index:10;${target[this.createNum(0, 3)]}`,
                    src: this.nowSrc
                })
            )

            this.container.appendChild(warpperAfter);

            //动画实现

            this.timeLineMax.to($('#photo .after')[0].children[0], 1.5, {
                left: 0,
                top: 0,
                ease: Back.easeIn
            }, .25)


            this.timeLineMax.add(function () {
                $('#photo .before')[0] ? $('#photo .before')[0].parentNode.removeChild($('#photo .before')[0]) : null;
                This.onoff = true;
            })

            break
    }
}

Effects.prototype.createNum = function (min, max) {
    min = min || 0;
    max = max || 1;
    if (max < min) {
        var x = max;
        max = min;
        min = x;
    }
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function extend(newObj, obj) {
    if (typeof obj != 'object' || obj==null) {
        return
    } else {
        for (var attr in obj) {
            if (typeof(obj[attr]) === 'object') {
                if (Object.prototype.toString.call(obj[attr]).slice(8, -1).toLowerCase() === 'array') {
                    newObj[attr] = [];
                } else if (Object.prototype.toString.call(obj[attr]).slice(8, -1).toLowerCase() === 'object' &&
                obj.hasOwnProperty(attr)) {
                    newObj[attr] = {};
                }
                arguments.callee(newObj[attr], obj[attr])
            } else {
                newObj[attr] = obj[attr]
            }
        }
    }
}

//碰撞检测
function collideTest(option1, option2) {
    var arg1, arg2;
    if (new RegExp('html', 'i').test(Object.prototype.toString.call(option1))) {
        arg1 = {
            t: option1.getBoundingClientRect().top,
            r: option1.getBoundingClientRect().right,
            b: option1.getBoundingClientRect().bottom,
            l: option1.getBoundingClientRect().left
        }

    } else {
        arg1 = option1
    }
    if (new RegExp('html', 'i').test(Object.prototype.toString.call(option2))) {
        arg2 = {
            t: option2.getBoundingClientRect().top,
            r: option2.getBoundingClientRect().right,
            b: option2.getBoundingClientRect().bottom,
            l: option2.getBoundingClientRect().left
        }

    } else {
        arg2 = option2;

    }
    return !(arg1.r < arg2.l || arg1.l > arg2.r || arg1.t > arg2.b || arg1.b < arg2.t)
}

//点击拖动
function drag(obj, option, box, callback) {//拖动元素，新建元素的样式，碰撞检测的参照物，碰撞上执行回掉函数
    obj.onmousedown = function (ev) {
        var disX = ev.clientX - obj.getBoundingClientRect().left;
        var disY = ev.clientY - obj.getBoundingClientRect().top;
        var copynode = copyEle(obj, option)
        //复制的元素初始位置
        copynode.style.top = obj.getBoundingClientRect().top + 'px';
        copynode.style.left = obj.getBoundingClientRect().left + 'px';
        document.body.appendChild(copynode);

        document.onmousemove = function (ev) {

            //限制元素超出可视区域
            var x = ev.clientX - disX;
            x < 0 ? x = 0 : null;
            x > window.innerWidth - obj.offsetWidth ? x = window.innerWidth - obj.offsetWidth : null;
            var y = ev.clientY - disY;
            y < 0 ? y = 0 : null;
            y > window.innerHeight - obj.offsetHeight ? y = window.innerHeight - obj.offsetHeight : null;
            //拖动时元素的位置
            copynode.style.top = y + 'px';
            copynode.style.left = x + 'px';
            //如果碰上参照物该变状态
            collideTest(copynode, box) ? copynode.style.filter = '-webkit-brightness(1.2)' : copynode.style.filter = '-webkit-brightness(1)'

        }
        document.onmouseup = function (ev) {
            //判断抬起的时候和参照区域碰撞的情况下执行回掉函数
            collideTest(copynode, box) && callback();
            //清除元素
            document.body.removeChild(copynode)
            document.onmouseup = document.onmousemove = null;
        }
        return false;
    }
}

//点击复制元素和样式
function copyEle(ele, option) {
    var newEle = document.createElement(ele.nodeName);
    var cssText = 'position:absolute;';
    for (var attr in option) {
        cssText += attr + ':' + option[attr] + ';'
    }
    newEle.style.cssText = cssText;
    return newEle
}























































