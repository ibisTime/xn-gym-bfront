var SYSTEM_USERID = 'SYS_USER_YAOCHENG';
var SYSTEM_CODE = "CD-ZWZJ000012";
var COMPANYCODE = "CD-ZWZJ000012";
var PIC_PREFIX = 'http://oq4vi26fi.bkt.clouddn.com/';

(function() {
    // 判断是否登录
    if (!/(?:login\.html)|(?:register\.html)|(?:findPwd\.html)/.test(location.href)) {
        var arr,
            reg = new RegExp("(^| )userId=([^;]*)(;|$)"),
            userId;
        if (arr = document.cookie.match(reg))
            userId = unescape(arr[2]);
        // 未登录
        if (!userId) {
            location.href = "../user/login.html";
        }
    }
})()
