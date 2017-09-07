define([
  'jquery'
], function ($) {
    var tmpl = __inline("index.html");
    var defaultOpt = {};
    var css = __inline("index.css");
    var firstAdd = true;

    init();
    function init(){
        $("head").append('<style>'+css+'</style>');
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
