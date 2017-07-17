define([
    'app/controller/base',
    'app/interface/GeneralCtr'
], function(base, GeneralCtr) {
    // init();
    function init(){
        base.showLoading();
    	$.when(
    		getNotice(),
            getPageCoach()
    	).then(base.hideLoading);
    	addListener();
        // weixin.initShare({
        //     title: document.title,
        //     desc: document.title,
        //     link: location.href,
        //     imgUrl: base.getShareImg()
        // });
    }

    function addListener(){

    }
    // 分页查询私教
    function getPageCoach(refresh) {
        return CoachCtr.getPageCoach({
            start: 1,
            limit: 10
        }).then((data) => {
            console.log(data);
        })
    }
    //公告
    function getNotice(){
    	return GeneralCtr.getPageSysNotice(1, 1)
            .then(function(data){
    			if(data.list.length){
    				$("#noticeWrap").html(`
                        <a href="../notice/notice.html" class="am-flexbox am-flexbox-justify-between">
                            <div class="am-flexbox am-flexbox-item">
                                <img src="/static/images/notice.png" alt="">
                                <span class="am-flexbox-item t-3dot">${data.list[0].smsTitle}</span>
                            </div>
                            <i class="right-arrow"></i>
                        </a>`).removeClass("hidden");
    			}
        	});
    }
});
