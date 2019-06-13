"use strict";

// alert("this is my js")
(function(){

    document.querySelector('.hamburger').addEventListener("click", ()=>{
        jQuery('.nav-wrapper').toggleClass('navClicked');
    })

    // welcome animation start
    jQuery(".welcometext1").animate({
        color: '#000',
        top: '0px',
        opacity: 1
    }, 3000);

    jQuery(".welcometext2").animate({
        color: '#000',
        top: '0',
        opacity: 1
    }, 3000);
}());

// welcome animation end
jQuery(window).scroll(() => {
    let wScroll = jQuery(this).scrollTop();
    
    jQuery('.welcomeContainer').css({
        'transform': `translate(0px, ${wScroll/4}%)`
    });

    // if (wScroll > 1) {
    //     $('header').css({
    //         'opacity': wScroll/1000 + .6,
    //     })
    // }else{
    //     $('nav').css({
    //         'opacity': '.6'
    //     })
    // }
});