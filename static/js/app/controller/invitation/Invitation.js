define([
    'app/controller/base',
    'app/interface/GeneralCtr'
], function(base, GeneralCtr) {

    init();
    function init(){
        calculate();
    }
    function calculate() {
        var winHeight = window.innerHeight,
            winWidth = window.innerWidth;
        var imgWidth = (220 / 750) * winWidth,
            imgHeight = (220 / 1206) * winHeight,
            imgTop = (304 / 1206) * winHeight;
        $("#qrCode").css({
            width: imgWidth + "px",
            height: imgHeight + "px",
            top: imgTop + "px"
        });
    }
});
