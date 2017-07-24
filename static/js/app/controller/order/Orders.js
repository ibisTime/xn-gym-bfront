define([
    'app/controller/base',
    'app/interface/CourseCtr'
], function(base, CourseCtr) {
    var config = {
        start: 1,
        limit: 10
    }, isEnd = false, canScrolling = false;
    var currentType = 0,
        // status: 0 待付款，1 付款成功，2 已接单，3 已上课，4 已下课，5 用户取消，6 平台取消，7 已完成
        type2Status = {
            "0": "1",
            "1": "2",
            "2": "3",
            "3": "7"
        }, genderList = {
            "0": "女",
            "1": "男"
        };

    init();
    function init(){
        addListener();
        base.showLoading();
        getPageOrders();
    }
    // 分页查询课程
    function getPageOrders(refresh) {
        return CourseCtr.getPageOrders({
            status: type2Status[currentType],
            ...config
        }, refresh)
            .then((data) => {
                base.hideLoading();
                hideLoading(currentType);
                var lists = data.list;
                var totalCount = +data.totalCount;
                if (totalCount <= config.limit || lists.length < config.limit) {
                    isEnd = true;
                } else {
                    isEnd = false;
                }
                if(data.list.length) {
                    config.start++;
                    var html = "";
                    lists.forEach((item) => {
                        html += buildHtml(item);
                    });
                    $("#content" + currentType).html(html);
                    isEnd && $("#loadAll" + currentType).removeClass("hidden");
                } else if(config.start == 1) {
                    $("#content" + currentType).html('<div class="no-data">暂无订单</div>');
                    $("#loadAll" + currentType).addClass("hidden");
                } else {
                    $("#loadAll" + currentType).removeClass("hidden");
                }
                !isEnd && $("#loadAll" + currentType).addClass("hidden");
                canScrolling = true;
            }, () => hideLoading(currentType));
    }
    function buildHtml(item) {
        return `<div class="order-item">
                    <div class="order-item-header">
                        <span>${item.code}</span>
                        <span class="fr">${base.formatDate(item.applyDatetime, "yyyy-MM-dd")}</span>
                    </div>
                    <a href="./order.html?code=${item.code}" class="order-item-cont">
                        <div class="am-flexbox am-flexbox-align-top">
                            <div class="order-img">
                                <img src="${base.getImg(item.coach.pic)}"/>
                            </div>
                            <div class="order-name-infos am-flexbox-item">
                                <div class="am-flexbox am-flexbox-dir-column am-flexbox-justify-between am-flexbox-align-top">
                                    <div>
                                        <h1>${item.coach.realName}</h1>
                                        <div class="order-infos">
                                            <span class="pdr">${item.skDatetime.substr(0, 5)}-${item.xkDatetime.substr(0, 5)}</span>
                                            <span class="pdl pdr">${genderList[item.coach.gender]}</span>
                                            <span class="pdl">${item.coach.star}分</span>
                                        </div>
                                    </div>
                                    <div class="order-addr">
                                        <span class="t-3dot">${item.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="order-status">¥${base.formatMoney(item.amount)}</div>
                        </div>
                    </a>
                    ${
                        item.status == "1" || item.status == "2" || item.status == "3"
                            ? `<div class="order-item-footer">
                                    ${
                                        item.status == "1"
                                            ? `<button class="am-button am-button-small taking-order" data-code="${item.code}">接单</button>`
                                            : item.status == "2"
                                                ? `<button class="am-button am-button-small start-order" data-code="${item.code}">上课</button>`
                                                : `<button class="am-button am-button-small end-order" data-code="${item.code}">下课</button>`
                                    }
                                </div>`
                            : ''
                    }
                </div>`;
        // status: 0 待付款，1 付款成功，2 已接单，3 已上课，4 已下课，5 用户取消，6 平台取消，7 已完成
    }

    function addListener(){
        // tabs切换事件
        var _tabsInkBar = $("#am-tabs-bar").find(".am-tabs-ink-bar"),
            _tabpanes = $("#am-tabs-content").find(".am-tabs-tabpane");
        $("#am-tabs-bar").on("click", ".am-tabs-tab", function(){
            var _this = $(this), index = _this.index() - 1;
            if(!_this.hasClass(".am-tabs-tab-active")){
                _this.addClass("am-tabs-tab-active")
                    .siblings(".am-tabs-tab-active").removeClass("am-tabs-tab-active");
                _tabsInkBar.css({
                    "-webkit-transform": "translate3d(" + index * 1.875 + "rem, 0px, 0px)",
                    "-moz-transform": "translate3d(" + index * 1.875 + "rem, 0px, 0px)",
                    "transform": "translate3d(" + index * 1.875 + "rem, 0px, 0px)"
                });
                _tabpanes.eq(index).removeClass("am-tabs-tabpane-inactive")
                    .siblings().addClass("am-tabs-tabpane-inactive");
                // 当前选择查看的订单tab的index
                currentType = index;
                config.start = 1;
                base.showLoading();
                getPageOrders();
            }
        });
        $("#orderWrapper").on("click", ".taking-order", function() {
            var orderCode = $(this).attr("data-code");
            base.confirm("确定接单吗？", "取消", "确认")
                .then(() => {
                    base.showLoading("接单中...");
                    CourseCtr.takingOrder(orderCode)
                        .then(() => {
                            base.showMsg("接单成功");
                            base.showLoading();
                            config.start = 1;
                            getPageOrders(true);
                        });
                }, () => {});
        });
        $("#orderWrapper").on("click", ".start-order", function() {
            var orderCode = $(this).attr("data-code");
            base.confirm("确定上课吗？", "取消", "确认")
                .then(() => {
                    base.showLoading("提交中...");
                    CourseCtr.startOrder(orderCode)
                        .then(() => {
                            base.showMsg("操作成功");
                            base.showLoading();
                            config.start = 1;
                            getPageOrders(true);
                        });
                }, () => {});
        });
        $("#orderWrapper").on("click", ".end-order", function() {
            var orderCode = $(this).attr("data-code");
            base.confirm("确定下课吗？", "取消", "确认")
                .then(() => {
                    base.showLoading("提交中...");
                    CourseCtr.endOrder(orderCode)
                        .then(() => {
                            base.showMsg("操作成功");
                            base.showLoading();
                            config.start = 1;
                            getPageOrders(true);
                        });
                }, () => {});
        });

        $(window).off("scroll").on("scroll", function() {
            if (canScrolling && !isEnd && ($(document).height() - $(window).height() - 10 <= $(document).scrollTop())) {
                canScrolling = false;
                var choseIndex = $(".am-tabs-tab-active").index() - 1;
                showLoading();
                getPageOrders();
            }
        });
    }
    function showLoading() {
        $("#loadingWrap" + currentType).removeClass("hidden");
    }

    function hideLoading() {
        $("#loadingWrap" + currentType).addClass("hidden");
    }
});
