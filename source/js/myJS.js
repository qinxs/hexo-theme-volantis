"use strict";

/*一言*/
(function() {
    var isMobile = /mobile/i.test(window.navigator.userAgent);
    var max_length = isMobile ? 10 : 20;
    fetch('https://v1.hitokoto.cn/?max_length=' + max_length)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            window.hitokoto = data.hitokoto;
            try {
                document.getElementById('hitokoto').innerText = window.hitokoto;
            } catch (e) {};
        })
        .catch(function(err) {
            console.error(err);
        })
})();

/*建站时间, 格式：月/日/年 时:分:秒*/
var grt = new Date("06/26/2020 00:00:00");

function createtime() {
    var now = new Date();
    var dnum = Math.floor((now - grt) / (24 * 3600 * 1000));
    var hnum = checkTime(now.getHours() - grt.getHours(), "h");
    var mnum = checkTime(now.getMinutes() - grt.getMinutes());
    var snum = checkTime(now.getSeconds() - grt.getSeconds());

    function checkTime(i, type) {
        if (i < 0) {
            i = type == "h" ? i + 24 : i + 60;
        }
        return i < 10 ? "0" + i : i;
    }
    document.getElementById("sitetime").innerHTML = dnum + " 天 " + hnum + " 小时 " + mnum + " 分 " + snum + " 秒";
}
setInterval("createtime()", 1000);

/**
 * 动态加载JS
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 */
function dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.defer = true;
    script.src = url;
    if (typeof(callback) == 'function') {
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}

/*特效*/
if (!/mobile/i.test(window.navigator.userAgent)) {
    /*页面点击小红心*/
    dynamicLoadJs('https://cdn.jsdelivr.net/gh/qinxs/cdn-assets/js/clicklove.js');
    /*飘动的彩带背景*/
    dynamicLoadJs('https://cdn.jsdelivr.net/gh/qinxs/cdn-assets/js/piao.js');
}