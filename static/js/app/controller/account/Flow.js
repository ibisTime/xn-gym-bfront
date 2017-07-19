define([
    'app/controller/base',
    'app/interface/AccountCtr'
], function(base, AccountCtr) {
    var config = {
        start: 1,
        limit: 10
    };
    init();
    function init() {
        base.showLoading();

    	addListener();
    }
    // 获取用户账户
    function getAccount() {
        AccountCtr.getAccount()
            .then((data) => {
                data.forEach((account) => {
                    if(account.currency === "CNY"){
                        config.accountNumber = account.accountNumber;
                    }
                });
                getPageFlow();
            });
    }
    function getPageFlow() {
        
    }
    function addListener() {
        // 提现
        $("#goBtn").click(function() {
            if(tradepwdFlag) {
                location.replace("./withdraw.html");
            } else {
                base.confirm("您还未设置交易密码，无法提现。<br/>点击确认前往设置")
                    .then(() => {
                        setTradePwd.showCont();
                    }, () => {});
            }
        });
    }
});
