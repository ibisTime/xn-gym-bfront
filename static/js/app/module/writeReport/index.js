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
        var sizeDataList = [];
        for(var ckey in dataList) {
            sizeDataList.push({
                ckey,
                cvalue: dataList[ckey]
            });
        }
        CourseCtr.saveReport(defaultOpt.orderCode, sizeDataList)
            .then((data) => {
                loading.hideLoading();
                ModuleObj.hideCont(defaultOpt.hideFn);
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
          var wrap = $("#writeReportWrapper");
          if(firstAdd){
              var _form = $("#writeModuleFormWrapper");
              wrap.on("click", ".module-close-icon", function(){
                  ModuleObj.hideCont();
              });
              wrap.find(".model-title").on("touchmove", function(e){
                  e.preventDefault();
              });
              $("#moduleSubmitBtn").on("click", function(){
                  if(_form.valid()){
                      loading.createLoading('保存中...');
                      saveReport(_form.serializeObject());
                  }
              });
              $("#RQ").datetimePicker();
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
                          // required: true,
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
          return !!$("#writeReportWrapper").length;
      },
      showCont: function (orderCode){
          if(this.hasCont()){
              defaultOpt.orderCode = orderCode;
              var wrap = $("#writeReportWrapper");
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
              var wrap = $("#writeReportWrapper");
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
