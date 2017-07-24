define([
    'app/controller/base',
    'app/interface/CourseCtr',
    'app/module/showInMap',
    'app/util/dict'
], function(base, CourseCtr, showInMap, Dict) {
    var code = base.getUrlParam("code"),
        orderStatus = Dict.get("coachOrderStatus");
    var address;

    init();
    function init(){
        addListener();
        base.showLoading();
        getOrder();
    }
    function getOrder(refresh) {
        CourseCtr.getOrder(code, refresh)
            .then((data) => {
                base.hideLoading();
                $("#code").text(data.code);
                $("#applyDatetime").text(base.formatDate(data.applyDatetime, "yyyy-MM-dd hh:mm"));
                // // status: 0 待付款，1 付款成功，2 已接单，3 已上课，4 已下课，5 用户取消，6 平台取消，7 已完成
                $("#status").text(orderStatus[data.status]);
                address = data.address;
                $("#address").text(address);
                $("#datetime").text(base.formatDate(data.appointDatetime, "yyyy-MM-dd") + " " + data.skDatetime.substr(0, 5) + "~" + data.xkDatetime.substr(0, 5));
                $("#quantity").text(data.quantity);
                $("#mobile").text(data.mobile);
                $("#amount").text(base.formatMoney(data.amount) + "元");
                $("#applyNote").text(data.applyNote || "无");
                if(data.status == "1") {
                    $("#takingOrder").removeClass("hidden")
                        .siblings(".am-button").addClass("hidden");
                } else if(data.status == "2") {
                    $("#startOrder").removeClass("hidden")
                        .siblings(".am-button").addClass("hidden");
                } else if(data.status == 3) {
                    $("#endOrder").removeClass("hidden")
                        .siblings(".am-button").addClass("hidden");
                }
            });
    }
    function addListener(){
        showInMap.addMap();
        $("#takingOrder").on("click", function() {
            base.confirm("确定接单吗？", "取消", "确认")
                .then(() => {
                    base.showMsg("接单中...");
                    CourseCtr.takingOrder(code)
                        .then(() => {
                            base.showMsg("接单成功");
                            base.showLoading();
                            getOrder(true);
                        });
                }, () => {});
        });
        $("#startOrder").on("click", function() {
            base.confirm("确定上课吗？", "取消", "确认")
                .then(() => {
                    base.showLoading("提交中...");
                    CourseCtr.startOrder(code)
                        .then(() => {
                            base.showMsg("取消成功");
                            base.showLoading();
                            getOrder(true);
                        });
                }, () => {});
        });
        $("#endOrder").on("click", function() {
            base.confirm("确定下课吗？", "取消", "确认")
                .then(() => {
                    base.showLoading("提交中...");
                    CourseCtr.endOrder(code)
                        .then(() => {
                            base.showMsg("取消成功");
                            base.showLoading();
                            getOrder(true);
                        });
                }, () => {});
        });
        $("#address").on("click", function() {
            showInMap.showMapByName(address);
        });
    }
});
