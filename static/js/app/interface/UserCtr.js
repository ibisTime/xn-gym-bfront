define([
    'app/controller/base',
    'app/util/ajax'
], function(base, Ajax) {
    return {
        /**
         * 注册
         * @param config {mobile, loginPwd, smsCaptcha}
         */
        register(config) {
            return Ajax.post("805041", {
                kind: "f2",
                loginPwdStrength: base.calculateSecurityLevel(config.loginPwd),
                ...config
            });
        },
        /**
         * 登录
         * @param config {loginName, loginPwd}
         */
        login(config) {
            return Ajax.post("805043", {
                kind: "f2",
                ...config
            });
        },
        /**
         * 提交资料，申请成为教练员
         * @param config {realName, pic, gender, age, duration, label, advPic, description}
         */
        apply(config) {
            return Ajax.post("622090", {
                userId: base.getUserId(),
                ...config
            });
        },
        // 根据userId详情查询私教
        getCoachByUserId(userId, refresh) {
            return Ajax.get("622098", {userId}, refresh);
        },
        /**
         * 修改私教信息
         * @param config {code, realName, pic, gender, age, duration, label, advPic, description}
         */
        editCoach(config) {
            return Ajax.post("622091", config);
        },
        // 获取用户详情
        getUser(refresh) {
            return Ajax.get("805056", {
                userId: base.getUserId()
            }, refresh);
        },
        // 绑定手机号
        bindMobile(mobile, smsCaptcha) {
            return Ajax.post("805151", {
                mobile,
                smsCaptcha,
                userId: base.getUserId()
            });
        },
        // 设置交易密码
        setTradePwd(tradePwd, smsCaptcha) {
            return Ajax.post('805045', {
                tradePwd,
                smsCaptcha,
                tradePwdStrength: base.calculateSecurityLevel(tradePwd),
                userId: base.getUserId(),
            });
        },
        // 修改手机号
        changeMobile(newMobile, smsCaptcha) {
            return Ajax.post("805047", {
                newMobile,
                smsCaptcha,
                userId: base.getUserId()
            });
        },
        // 详情查询银行卡
        getBankCard(code) {
            return Ajax.get("802017", {code});
        },
        // 列表查询银行的数据字典
        getBankList(){
            return Ajax.get("802116");
        },
        // 新增或修改银行卡
        addOrEditBankCard(config) {
            return config.code ? this.editBankCard(config) : this.addBankCard(config);
        },
        // 修改银行卡
        editBankCard(config) {
            return Ajax.post("802012", {
                userId: base.getUserId(),
                ...config
            });
        },
        // 新增银行卡
        addBankCard(config) {
            return Ajax.post("802010", {
                userId: base.getUserId(),
                ...config
            });
        },
        // 获取银行卡列表
        getBankCardList(){
            return Ajax.get("802016", {
                userId: base.getUserId(),
                status: "1"
            });
        }
    };
})