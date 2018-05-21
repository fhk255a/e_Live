$(function(){
    let $size = $('#html');
    let $width = $(window).width();
    $size.css('font-size',''+$width/16+'px');
    $(window).resize(function(){
        let $width2 = $(window).width();
        width =$width2/16;
        $size.css('font-size',''+width+'px');
    });


});