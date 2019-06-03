"use strict";

// alert("this is my js")
(function(){

    document.querySelector('.hamburger').click(() => {
        jQuery('.nav-wrapper').toggleClass('navClicked');
    });

    // welcome animation start
    jQuery(".welcometext1").animate({
        color: '#000',
        top: '0px',
        opacity: 1
    }, 3000);

    jQuery(".welcometext2").animate({
        color: '#000',
        top: '65',
        opacity: 1
    }, 3000);
}());

// welcome animation end
jQuery(window).scroll(() => {
    let wScroll = jQuery(this).scrollTop();
    
    jQuery('.welcomeMain').css({
        'transform': `translate(0px, ${wScroll/1}%)`
    });

    if (wScroll > 1) {
        $('nav').css({
            'opacity': wScroll/1000 + .6
        })
    }else{
        $('nav').css({
            'opacity': '.6'
        })
    }
});