/**
 * JSDoc中文文档、js注释规范(https://jsdoc.zcopy.site/、https://www.shouce.ren/api/view/a/13232)
 * Lodash 中文文档(https://www.lodashjs.com/)
 * js常用函数(https://www.yuque.com/yizo/web/xwb7ik)
 * */

/**
 * 提示框弹窗
 */
const jmMess = {
    timer: '',  //记录定时器状态
    /**
     * 提示框
     * @method jmMess.msg(value,time,callback)
     * @param {string} value 提示的文字信息
     * @param {string|number} time 弹窗显示的时间,单位ms,(多久关闭弹窗)
     * @param {function} callback 回调函数，弹窗关闭后执行
     * @example 
     *  jmMess.msg("文字",5000,function(){})
     */
    msg: function (value, time, callback) {
        // 参数梳理
        if (typeof time === "function") {
            callback = time
        } else if (!isNaN(time)) {
            time = time - 0 >= 0 ? time - 0 : 3000;
        } else {
            time = 3000;
        }
        //清除定时器
        clearTimeout(this.timer);
        //移除提示框
        let old = document.querySelectorAll('body>[data-jm-tips="jmTips"]')[0];
        if (old) {
            document.body.removeChild(old);
        }

        //创建div并设置样式和提示文字内容
        let div = document.createElement('div');
        div.style = 'width: 200px;position: fixed;top: 40%;left:50%;transform: translateX(-50%);text-align: center;z-index:9999;background-color: rgba(0, 0, 0,0.6);font-size: 14px;line-height:1.5;color: #fff;padding: 10px 15px;border-radius: 5px;';
        div.innerHTML = value;
        // div添加属性(标识),追加到DOM
        div.setAttribute("data-jm-tips", "jmTips");
        document.body.appendChild(div);

        // 清除提示
        this.timer = setTimeout(function () {
            document.body.removeChild(div);
            if (typeof callback === "function") {
                // 可以组装数据作为回调函数的参数返回使用
                // var mss = { state: 'success' };
                // callback(mss);   //this会指向window
                //callback.apply(this, [mss]) //使用apply()来改变this指向当前方法,参数得用数组形式进行传参
                callback.apply(this)
            }
        }, time);
    },
    // 强制关闭弹窗
    close: function () {
        if (this.timer) {
            //清空定时器,移除追加的div
            clearTimeout(this.timer);
            let old = document.querySelectorAll('body>[data-jm-tips="jmTips"]')[0];
            if (old) {
                document.body.removeChild(old);
            }
        }

    }

}

/**
 * @function 判断数据类型
 * @param {any} o 对应的数据
 * @example
 *  types("") // "string"
    types({}); // "object"
    types([]); // "array"
    types(100); // "number"
    types(null); // "null"
    types(); // "undefined"
    types(/abcd/); // "regex"
    types(new Date()); // "date"
 * 
 */
const types = (o) => {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

/**
 * @function 解决原生toFixed四舍五入在不同浏览器的不准确性，简单封装了一个toFixed方法来实现四舍五入
 * @param {number} number 需要处理的数字类型数据
 * @param {number} [m=0] 小数点的个数,默认为0，取整
 * @returns {string} result 返回字符串
 * @example
 * toFixed(12.1245,3)   //12.125
 */
const toFixed = (number, m = 0) => {
    if (typeof number !== 'number') {
        throw new Error("number不是数字");
    }
    let result = Math.round(Math.pow(10, m) * number) / Math.pow(10, m);
    result = String(result);
    if (result.indexOf(".") == -1) {
        if (m != 0) {
            result += ".";
            result += new Array(m + 1).join('0');
        }
    } else {
        let arr = result.split('.');
        if (arr[1].length < m) {
            arr[1] += new Array(m - arr[1].length + 1).join('0')
        }
        result = arr.join('.')
    }
    return result;
}

/**
 * @function 获取浏览器地址的参数，不传参数时，获取的是地址栏的地址，返回一个封装参数的json对象
 * @param {String} [name=''] 获取值的key,默认为空,为空时，函数返回json对象
 * @param {String} [url=window.location.href] 地址，默认为浏览器的url
 * @returns {string|object} name为空时，返回对象
 * @example
 *  getParams('aa', 'https://www.baidu.com?aa=101')       //101
 */
const getParams = (name = '', url = window.location.href) => {
    let endVal = '';
    if (url.indexOf("?") != -1) {   //判断url中有没有出现?
        let arrStr = url.substring(url.indexOf("?") + 1).split('&');  //截取字符串，获取到?后面的那部分内容;以&符号为准，分割成数组
        arrStr = arrStr.filter(item => item);     //原有数组过滤为空的值
        let obj = {};
        for (let i = 0; i < arrStr.length; i++) {
            let index = arrStr[i].indexOf("=");
            let keys = arrStr[i].substring(0, index);       //第一个等号前面的那部分
            let value = arrStr[i].substring(index + 1);      //第一个等号后面的内容
            if (keys) {     //keys不为空时，追加到obj对象里
                obj[keys] = decodeURI(value);    //解码输出,值含有中文字符的情况
            }
        }
        if (arrStr.length > 0) {  //先判断数组是不是为空，在判断name是不是有值传过来
            if (name) {
                endVal = obj[name] || '';
            } else {
                endVal = obj;
            }
        }
    }
    return endVal;
}

/**
 * @function 取得一定范围内的随机数(整数或者小数)，
 * @param {number} start 截取数范围中，开始的数
 * @param {number} end 截取数范围中，结束的数
 * @param {number} [num=0] 需要保留的小数位,默认是取整,没有小数为会补0
 * @returns {number} start <= randomValue < end
 * @example
 *    var number = getRandomNum(-10,10,2);  //获取-10到10之间的随机数，并保留2位小数点
 */
const getRandomNum = (start, end, num = 0) => {
    var randomValue = Math.random() * (end - start) + start;   //取得范围内的随机数
    if (num) {
        randomValue = randomValue.toFixed(num) - 0;   //四舍五入取得小数位,并转换为Number类型
    } else {
        randomValue = Math.floor(randomValue);    //向下取整
    }
    return randomValue;
}

/**
 * @function  地址栏追加参数（更新参数值）,不刷新页面
 * @param {String} key 参数名
 * @param {String} value 参数的值
 * @example
 * updateUrl('pp',123)  //地址栏会有?pp=123
 */
const updateUrl = (key, value) => {     //更新地址栏参数，不刷新页面
    let url = window.location.href;
    let newUrl;
    if (!value) {
        newUrl = url;
    } else {
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = url.indexOf('?') !== -1 ? "&" : "?";
        if (url.match(re)) {
            newUrl = url.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            newUrl = url + separator + key + "=" + value;
        }
    }

    //向当前url添加参数，没有历史记录
    window.history.replaceState({
        path: newUrl
    }, '', newUrl);
}

/**
 * @function 防抖函数，规定时间内点击多次，只执行最后一次
 * @method debounce(fn,delay);
 * @param {function} fn       需要执行的函数
 * @param {number} [delay=300]     等待时间（毫秒）,默认等待时间为300毫秒,为0的话就不需要防抖函数了
 * @example 
    const func = () => {
      console.log("1234567");
    };
    const dian = debounce(func, 500);
 */
const debounce = (fn, delay = 300) => {
    let timer = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        // 再次执行的时候把前一个 setTimeout clear 清空掉
        clearTimeout(timer);
        // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
        // timer = setTimeout(fn, delay) // 简化写法
    };
}

/**
 * @function 节流函数，连续点击多次，规定时间内只执行一次
 * @method throttle(fn,delay);
 * @param {function} fn       需要执行的函数
 * @param {number} [delay=300]     等待时间（毫秒）,默认等待时间为300毫秒
 * @example 
    const func = (aa) => {
      console.log(aa);
    };
    const dian = throttle(()=>{func("12345")}, 500);
 */
const throttle = (fn, delay = 300) => {
    let timer = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        // 在函数开头判断timer标记是否为null,只有为null时才让他执行一次里面的函数
        if (!timer) {
            // 将外部传入的函数的执行放在setTimeout中
            timer = setTimeout(() => {
                // 调用传入的函数fn
                // 最后在setTimeout执行完毕后再把标记timer设置为null,表示可以执行下一次循环了。
                fn.apply(this, arguments);    //或者使用fn()
                timer = null;
            }, delay);
        }
    };
}


/** 
 * @description 时间戳转化为年 月 日 时 分 秒 
 * @method formatTime(format,num)
 * @param {string} [format='YYYY-mm-dd HH:MM:SS'] 时间格式 默认'YYYY-mm-dd HH:MM:SS' ,更改只需替换中间连接符号就行'YYYY年mm月dd日 HH时MM分SS秒'
 * @param {number} [num = new Date().getTime()] 时间戳,默认使用当前时间戳, new Date().getTime(); 获取当前时间戳（毫秒）
 * @example 
 *  var sjc = 1472048779952; //js一般获取的时间戳是13位，PHP一般是10位
    formatTime('YYYY-mm-dd HH:MM:SS',sjc)
 */
const formatTime = (format = "", num = new Date().getTime()) => {
    format = format || "YYYY-mm-dd HH:MM:SS";   //第一个参数不填时，使用默认格式
    let ret, date, rename;
    // 处理时间戳，js一般获取的时间戳是13位，PHP一般是10位,根据实际情况做判断处理
    if (num.toString().length == 10) {
        date = new Date(parseInt(num) * 1000);
    } else if (num.toString().length == 13) {
        date = new Date(parseInt(num));
    } else {
        date = new Date(parseInt(num));
    }
    const opt = {
        "Y": date.getFullYear().toString(), // 年
        "m": (date.getMonth() + 1).toString(), // 月
        "d": date.getDate().toString(), // 日
        "H": date.getHours().toString(), // 时
        "M": date.getMinutes().toString(), // 分
        "S": date.getSeconds().toString() // 秒
        // 目前用的是这六种符号,有其他格式化字符需求可以继续添加，值必须转化成字符串
    };
    for (var k in opt) {
        ret = new RegExp("(" + k + "+)").exec(format);
        if (ret) {
            rename = (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")) //根据复数前面是否补零,如“mm”补零，单“m”前面不补零
            format = format.replace(ret[1], rename)  //替换
        };
    };
    return format;
};


/**
 * @function 发布时间显示函数
 * @method timeFormat(time)
 * @param {number} time 时间戳（必填）
 * @example  
 *  var text=timeFormat(1472048779952);
    1、< 60s, //显示为“刚刚”
    2、>= 1min && < 60 min, //显示与当前时间差“XX分钟前”
    3、>= 60min && < 1day, //显示与当前时间差“今天 XX:XX”
    4、>= 1day && < 1year, //显示日期“XX月XX日 XX:XX”
    5、>= 1year, //显示具体日期“XXXX年XX月XX日 XX:XX”
 */
const timeFormat = (time) => {
    let date;
    if (time) {
        if (time.toString().length == 10) {
            date = new Date(parseInt(time) * 1000);
        } else if (time.toString().length == 13) {
            date = new Date(parseInt(time));
        } else {
            date = new Date(parseInt(time));
        }

        let curDate = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            curYear = curDate.getFullYear(),
            curHour = curDate.getHours(),
            timeStr;

        if (year < curYear) {
            timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
        } else {
            let pastTime = curDate - date,
                pastH = pastTime / 3600000;

            if (pastH > curHour) {
                timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
            } else if (pastH >= 1) {
                timeStr = '今天 ' + hour + ':' + minute + '分';
            } else {
                let pastM = curDate.getMinutes() - minute;
                if (pastM > 1) {
                    timeStr = pastM + '分钟前';
                } else {
                    timeStr = '刚刚';
                }
            }
        }
        return timeStr;
    }

}

/**
 * @function 字符串截取、字符串替换（例如手机号、身份证等号码隐藏）
 * @method strCut(str,start,len,rep)
 * @param {string}  str	为去要截取的字符串(类型为字符串)
 * @param {number}  start	为从第几位开始截取(不是下标)
 * @param {number}  [len]	截取的长度(不填从开始截取到最后)
 * @param {string}  [rep='']	需要替换的字符（例如："*"）默认为空
 * @example  
 *  var value=strCut('18011223344',4,4,'*')
 */
const strCut = (str, start, len, rep = '') => {
    if (str && (str.length - start) > 0) {	//判断开始截取的位置,字符串的长度需大于截取的长度
        let repStr = '', repLength = '';
        if (len) {
            repLength = (str.length - start) > len ? len : (str.length - start);  //到最后能够替换字符的个数
        } else {
            repLength = str.length - start;
        }

        // for (let i = 0; i < repLength; i++) {
        //   repStr += rep
        // }
        repStr = rep.repeat(repLength)
        // let repText = str.substr(start - 1, len);	//截取（start-1）对应截取的位置
        let repText = str.substring(start - 1, start - 1 + len);	//截取（start-1）对应截取的位置
        let endStr = str.replace(repText, repStr);	//替换
        return endStr;
    } else {
        return str;
    }
}

/**
 * @function 去除字符串左侧指定字符
 * @method  leftTrim(str,char)
 * @param {string} str  需要去除指定字符的字符串
 * @param {string} [char] 左侧需要去除的字符,（不填默认去除空格）
 * @example 
 *  leftTrim("&&&1234a&11&&","&")    //1234a&11&&
 */
const leftTrim = (str, char = '') => {
    let leftStr = str.replace(new RegExp('^\\s+', 'g'), '');    //默认去除左侧空格(或者使用str.trimLeft())
    if (char) {
        leftStr = str.replace(new RegExp('^[' + char + ']+', 'g'), '');
    }
    return leftStr;
}

/**
 * @function 去除字符串右侧指定字符
 * @method  rightTrim(str,char)
 * @param {string} str  需要去除指定字符的字符串
 * @param {string} [char=''] 右侧需要去除的字符,（不填默认去除空格）
 * @example 
 *  rightTrim("&&&1234a&11&&","&")    //&&&1234a&11
 */
const rightTrim = (str, char = '') => {
    let rightStr = str.replace(new RegExp('\\s+$', 'g'), '');   //默认去除右侧空格(或者使用str.trimRight())
    if (char) {
        rightStr = str.replace(new RegExp('[' + char + ']+$', 'g'), '');
    }
    return rightStr;
}

/**
 * @function 去除字符串左右两边指定字符,直接调用上面leftTrim()和rightTrim()方法
 * @method  trim(str,char)
 * @param {string} str  需要去除指定字符的字符串
 * @param {string} [char=''] 左侧需要去除的字符,（不填默认去除两边空格）
 * @example 
 *  trim("&&&1234a&11&&","&")    //1234a&11
 */
const trim = (str, char = '') => {
    let endStr = str.trim();    //默认去除左右两边空格
    if (char) {
        endStr = leftTrim(rightTrim(str, char), char);
    }
    return endStr;
}



/**
 * 判断浏览器函数,判断用户是PC端、移动端
 * @method isMobile()
 */
function isMobile() {
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true;  // 移动端
    } else {
        return false;  // PC端
    }
}



/**
 * 简单封装ajax，用于请求数据,未作跨域处理，
 * 参数说明：
 * @param {object} opts: {'可选参数'}
 * @param {string} method: 请求方式:GET/POST,默认值:'GET';
 * @param {string} url:    发送请求的地址, 默认值: 当前页地址;
 * @param {any} data: 发送给后台的数据, string,json;
 * @param {boolean} async: 是否异步:true/false,默认值:true;
 * @param {boolean} cache: 是否缓存：true/false,默认值:true;
 * @param {string} contentType: HTTP头信息，默认值：'application/x-www-form-urlencoded';
 * @param {function} success: 请求成功后的回调函数;
 * @param {function} error: 请求失败后的回调函数;
 * @example 
    ajax({
      url: "http://poetry.apiopen.top/sentences",
      success: function (res) {
        console.log(res);
      },
    })
 */
const ajax = (opts) => {
    //一.设置默认参数
    var defaults = {
        method: 'GET',
        url: '',
        data: '',
        async: true,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        success: function () { },
        error: function () { }
    };

    //二.用户参数覆盖默认参数，或者使用(es6扩展运算符)：defaults={ ...defaults, ...opts };  
    for (var key in opts) {
        defaults[key] = opts[key];
    }

    //三.对数据进行处理
    if (typeof defaults.data === 'object') { //处理 data
        var str = '';
        for (var key in defaults.data) {
            str += key + '=' + defaults.data[key] + '&';
        }
        defaults.data = str.substring(0, str.length - 1);
    }

    defaults.method = defaults.method.toUpperCase(); //处理 method,统一转成大写,方便后面处理
    defaults.cache = defaults.cache ? '' : '&' + new Date().getTime(); //处理 cache

    if (defaults.method === 'GET' && (defaults.data || defaults.cache)) {
        defaults.url += '?' + defaults.data + defaults.cache; //处理 url 
    }


    //四.开始编写ajax
    //1.创建ajax对象
    var oXhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    //2.和服务器建立联系，告诉服务器你要取什么文件
    oXhr.open(defaults.method, defaults.url, defaults.async);
    //3.发送请求
    if (defaults.method === 'GET')
        oXhr.send(null);
    else {
        oXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //post请求会变为charset=UTF-8形式,这里重新定义请求头
        oXhr.send(defaults.data);
    }


    //4.等待服务器回应
    oXhr.onreadystatechange = function () {
        if (oXhr.readyState === 4) {
            if (oXhr.status === 200) {
                var endData;
                try {
                    endData = eval('(' + oXhr.responseText + ')');
                } catch (e) {
                    endData = oXhr.responseText;
                }
                defaults.success.call(oXhr, endData);
            } else {
                defaults.error();
            }
        }
    };
}

/**
 * @function 回到顶部
 * @param {string} el 需要返回顶部的标签元素,默认是DOM页面
 * @example 
 *  goTop(".el-scrollbar .el-scrollbar__wrap")
 */
const goTop = (el) => {
    let timer = '';
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
        let oTop, dom;
        //需要重新获取元素、滚动条高度
        if (el) {
            dom = document.querySelector(el);
            oTop = dom.scrollTop;
        } else {
            dom = window;
            oTop = document.body.scrollTop || document.documentElement.scrollTop;
        }

        if (oTop > 0) {
            // dom.scrollTo(0, (oTop - 100));
            dom.scrollTo(0, (oTop - oTop / 10));
            dom.onmousewheel = function () { return false }
            timer = requestAnimationFrame(fn);
        } else {
            dom.onmousewheel = function () { return true }
            cancelAnimationFrame(timer);
        }
    });
}



/**
 * @function 生成特效文字
 * @param {String} [words=''] 需要生成特效的一段文字,默认为空
 * @return   返回html标签内容
 * @example  
 *  effectText('张三')    //<span style="color: #30c26c;font-size: 16px;">张</span><span style="color: #fdb853;font-size: 18px;">三</span>
 */
const effectText = (words = '') => {
    words = [...words]
    let endText = "";
    let arrSize = new Array("12px", "14px", "16px", "18px", "24px", "32px", "48px");    //文字大小
    for (let time = 0; time <= (words.length - 1); time++) {
        if (words[time] != " ") {
            let col = "#" + Math.random().toString(16).slice(-6);  //随机生成hex颜色
            let i = Math.floor((Math.random() * arrSize.length));
            var randoms = Math.floor(Math.random() * (10 - -15) + -15)  //[-15,10]的随机数
            endText += `<span style="color: ${col};font-size: ${arrSize[i]};transform: rotate(${randoms}deg);display: inline-block;">${words[time]}</span>`;
        }
    }
    return endText;
}

/**
 * @function 低版本浏览器下,提示用户安装新版浏览器,跳转到下载浏览器页面
 * 
 */
const newBrowser = () => {
    if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 9) {
        // https://browsehappy.com/
        window.location.href = "https://support.dmeng.net/upgrade-your-browser.html?referrer=" + location.href;
    }
}

/**
 * @function iframe打开页面不增加浏览器历史记录，(新iframe替换原有iframe,并更换src)
 * @param {String} el iframe标签的类名、属性等等,(例如'#iframe'、'.iframe'、'iframe[name=iframe]')
 * @param {String} url 需要替换的src地址
 */
const openIframe = (el, url) => {
    let oldIframe = document.querySelectorAll(el)[0];
    // oldIframe.contentWindow.location.replace(url);   //方案一可以通过replace来将url替换而不是push到浏览器历史中
    // 方案一,使用新的iframe标签
    if (oldIframe && url) {
        let iframe = oldIframe.cloneNode(true);     //深拷贝旧iframe得到一个新iframe
        iframe.src = url;   //替换src
        oldIframe.parentNode.insertBefore(iframe, oldIframe);//在oldIframe之前添加新的iframe

        //移除旧的iframe
        oldIframe.parentNode.removeChild(oldIframe);
    }
}
/**
 * @method copy复制功能
 * @param {string} text 需要复制的文字内容
 * @param {function} [callback] 执行复制后的回调函数，可通过回调参数判断是否执行成功
 * @example
 *  copy('123456', function (res) {
      console.log(res);
    })
 */
const copy = (text, callback) => {
    //创建input标签
    let input = document.createElement('input')
    //将input的值设置为需要复制的内容
    input.value = text;
    input.readOnly = true;  //只读
    input.style = 'opacity: 0;transform: scale(0);'   //设置为隐藏
    //添加input标签
    document.body.appendChild(input)
    //选中input标签
    input.select();
    //执行复制
    let state = document.execCommand('copy');
    //移除input标签
    document.body.removeChild(input);
    let as = {
        text,
        state: text ? state : false,
    }
    //成功提示信息
    if (typeof callback === "function") {// 执行回调
        callback(as);
    }

}


export { jmMess, types, toFixed, getParams, getRandomNum, updateUrl, throttle, debounce, formatTime, timeFormat, strCut, leftTrim, rightTrim, trim, isMobile, ajax, goTop, effectText, newBrowser, openIframe, copy } //可解构

// export default { types, getParams, throttle, debounce, formatTime, timeFormat, strCut, leftTrim, rightTrim, trim, isMobile, ajax, goTop, effectText, newBrowser, openIframe } //不可解构



/***
*      ┌─┐       ┌─┐
*   ┌──┘ ┴───────┘ ┴──┐
*   │                 │
*   │       ───       │
*   │  ─┬┘       └┬─  │
*   │                 │
*   │       ─┴─       │
*   │                 │
*   └───┐         ┌───┘
*       │         │
*       │         │
*       │         │
*       │         └──────────────┐
*       │                        │
*       │                        ├─┐
*       │                        ┌─┘
*       │                        │
*       └─┐  ┐  ┌───────┬──┐  ┌──┘
*         │ ─┤ ─┤       │ ─┤ ─┤
*         └──┴──┘       └──┴──┘
*  下面是class类构造函数,使用前先用new实例化
*/


/**
 * @description 对sessionStorage、localStorage的封装,localStorage默认一直保存数据,sessionStorage关闭标签页或窗口立即清除数据
 * @class SStorage
 * @example
 * var session=new SStorage('session','aaaSSS');
 * session.set('da',{a:1,b:2});
 * session.get('da');
 * session.remove('da');
 */
class SStorage {
    /**
     * @param {String} param 使用sessionStorage,还是localStorage，默认使用的是localStorage  
     * @param {String} pre 保存json数据的前缀
     */
    constructor(param, pre = 'jm_save_') {
        this.type = localStorage;
        this.prefix = pre;
        if (param == 'session' || param == 'sessionStorage') {
            this.type = sessionStorage;
        }
        this.length = this.type.length; //storage的长度
    }
    /**
   * @function 设置缓存数据,思路：封装成一个json数据存进去，保存时的时间、过期时间、保存的数据
   * @method SStorage.set(name) 调用的是localStorage.setItem(name)或者sessionStorage.setItem(name)
   * @param {string} name  保存数据的key值,必填
   * @param {any} [value='']   需要保存的数据
   * @param {number} [time=0]   过期时间,以毫秒为单位,默认永不过期
   * @example SStorage.set("aa","123456",5000)
   */
    set(name, value = '', time = 0) {
        time = isNaN(time - 0) ? 0 : time - 0; //转换成数字,字符串类型的数字也转成数字
        time = time > 0 ? parseInt(time) : 0; //有负数的情况
        let obj = {};
        obj[this.prefix + 'value'] = value;
        obj[this.prefix + 'time'] = time;
        obj[this.prefix + 'startTime'] = new Date().getTime() //记录何时将值存入缓存，毫秒级

        if (name) {
            this.type.setItem(name, JSON.stringify(obj));
        } else {
            console.log("请先设置name名");
        }
    }
    /**
     * @function 获取缓存数据
     * @method SStorage.get(name) 调用的是localStorage.getItem(name)或者sessionStorage.getItem(name)
     * @param {string} name  保存数据的key值,必填
     * @example 
     * SStorage.get("aa")
     */
    get(name) {
        let item = this.type.getItem(name);
        if (item) {
            //先尝试进行json字符串转为对象,可能有直接存储字符串的情况
            try {
                item = JSON.parse(item);
            } catch (error) {
                //如果不行就不是json的字符串，就直接返回
                item = item;
            }

            //  判断有没有设置过期时间、保存数据的格式
            //先判断设置时的时间大于0，是否为数字,过期时间是否也为数字
            if ((item[this.prefix + 'startTime'] > 0) && (!isNaN(item[this.prefix + 'startTime'])) && (!isNaN(item[this.prefix + 'time']))) {

                let date = new Date().getTime(); //获取当前时间
                if (item[this.prefix + 'time'] == 0) { //等于0永不过期
                    return item[this.prefix + 'value'];
                } else if (item[this.prefix + 'time'] + item[this.prefix + 'startTime'] > date) { //开始时间+保存时间如果大于当前时间,（未过期）就返回值，否则清空
                    return item[this.prefix + 'value'];
                } else {
                    localStorage.removeItem(name);
                    return null;
                }
            } else {
                //如果没有设置失效时间，直接返回值
                return item;
            }
        } else {
            return null;
        }
    }
    /**
     * @function 清除缓存
     * @method SStorage.remove(name) 调用removeItem(name)或是clear()
     * @param {string} [name]  保存数据的key值,不填清空所有缓存
     * @example SStorage.remove("aa")
     */
    remove(name) {
        if (name) { //有参数清除单条数据
            this.type.removeItem(name);
        } else { //无参数清除所有缓存数据
            this.type.clear();
        }
    }
    /**
     * @function 获取对应键名(下标)
     * @param {number} num 一个整数，表示要获取的键名索引
     * @returns 键名(下标)
     */
    key(num) {
        num = isNaN(num - 0) ? -1 : parseInt(num - 0); //转换成数字,字符串类型的数字也转成数字，同时取整
        if (num >= 0) {
            return this.type.key(num);
        } else {
            return null;
        }
    }
}



export { SStorage };