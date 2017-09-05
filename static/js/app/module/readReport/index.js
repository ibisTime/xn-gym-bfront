define([
  'jquery',
  'app/module/validate',
  'app/module/loading',
  'app/interface/CourseCtr'
], function ($, Validate, loading, CourseCtr) {
    var tmpl = __inline("index.html");
    var defaultOpt = {};
    var css = __inline("index.css");
    var firstAdd = true;

    init();
    function init(){
        $("head").append('<style>'+css+'</style>');
    }

    function saveReport(dataList) {
        var sizeDataList = [], remark = '';
        for(var key in dataList) {
            if (key != 'BZ') {
                sizeDataList.push({
                    key,
                    value: dataList[key]
                });
            } else {
                remark = dataList[key];
            }
        }
        CourseCtr.saveReport(defaultOpt.orderCode, sizeDataList, remark)
            .then((data) => {
                loading.hideLoading();
                ModuleObj.hideCont();
            }, function() {
              loading.hideLoading();
            });
    }

    var ModuleObj = {
      addCont: function (option) {
          option = option || {};
          defaultOpt = $.extend(defaultOpt, option);
          if(!this.hasCont()){
              $("body").append(tmpl);
          }
          var wrap = $("#readReportWrapper");
          if(firstAdd){
              var _form = $("#readModuleFormWrapper");
              wrap.on("click", ".module-close-icon", function(){
                  ModuleObj.hideCont(defaultOpt.hideFn);
              });
              wrap.find(".model-title").on("touchmove", function(e){
                  e.preventDefault();
              });
              _form.validate({
                  'rules': {
                      RQ: {
                          required: true,
                          isNotFace: true
                      },
                      CD: {
                          required: true,
                          isNotFace: true
                      },
                      LB: {
                          required: true,
                          isNotFace: true
                      },
                      KS: {
                          required: true,
                          isNotFace: true
                      },
                      YD: {
                          required: true
                      },
                      SKNR: {
                          required: true,
                          isNotFace: true
                      },
                      SBS: {
                          required: true
                      },
                      SBSQK: {
                          required: true,
                          isNotFace: true
                      },
                      JB: {
                          required: true
                      },
                      JBB: {
                          required: true
                      },
                      XF: {
                          required: true
                      },
                      HX: {
                          required: true
                      },
                      ZB: {
                          required: true
                      },
                      YB: {
                          required: true
                      },
                      TB: {
                          required: true
                      },
                      ZT: {
                          required: true
                      },
                      YT: {
                          required: true
                      },
                      XT: {
                          required: true
                      },
                      JL: {
                          required: true,
                          isNotFace: true
                      },
                      WCD: {
                          required: true,
                          isNotFace: true
                      },
                      BX: {
                          required: true,
                          isNotFace: true
                      },
                      BZ: {
                          isNotFace: true,
                          maxlength: 255
                      }
                  },
                  onkeyup: false
              });
          }

          firstAdd = false;
          return this;
      },
      hasCont: function(){
          return !!$("#readReportWrapper").length;
      },
      showCont: function (sizeDataList, remark){
          if(this.hasCont()){
              if (sizeDataList) {
                  for(var i = 0; i < sizeDataList.length; i++) {
                      $("#" + sizeDataList[i].ckey + "_R").text(sizeDataList[i].cvalue);
                  }
                  $("#BZ_R").text(remark || '无');
              }
              var wrap = $("#readReportWrapper");
              wrap.show().animate({
                  top: 0
              }, 200, function(){
                  defaultOpt.showFun && defaultOpt.showFun();
              });
          }
          return this;
      },
      hideCont: function (func){
          if(this.hasCont()){
              var wrap = $("#readReportWrapper");
              wrap.animate({
                  top: "100%"
              }, 200, function () {
                  wrap.hide();
                  func && func();
                  wrap.find("label.error").remove();
              });
          }
          return this;
      }
  };
  return ModuleObj;
});
