define([
    'app/controller/base',
    'app/interface/GeneralCtr'
], function(base, GeneralCtr) {
    init();
    function init(){
    	addListener();
    }

    function addListener(){
        $("#timeStart").picker({
          title: "请选择您的手机",
          cols: [
            {
              textAlign: 'center',
              values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }
          ]
        });
    }
});
