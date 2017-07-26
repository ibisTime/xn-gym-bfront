define([
    'app/controller/base',
    'app/interface/GeneralCtr'
], function(base, GeneralCtr) {
    init();

	function init(){
        base.showLoading();
		GeneralCtr.getUserSysConfig("aboutus")
			.then(function(data){
                base.hideLoading();
			 	$("#description").html(data.note);
			});
	}
})
