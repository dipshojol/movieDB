"use strict";

// alert("this is my js")
(function(){ 
    // manipulation of svg
    jQuery('.svg').svgInject();

    jQuery('.hamburger').click(() => {
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
    
// welcome animation end
    jQuery(window).scroll(() => {
        let wScroll = jQuery(this).scrollTop();
        
        jQuery('.welcomeMain').css({
            'transform': `translate(0px, ${wScroll/1}%)`
        });

        if (wScroll > 1)
            jQuery('nav').css({
                'opacity': `${wScroll/1000 + .6}`
            })
        else
            jQuery('nav').css({
                'opacity': .6
            })
    });

    // jQuery('.global-nav ul.main-manu>li').click(function() {
    //     var myli = jQuery(this) + jQuery('li');
    //     jQuery(myli).toggleClass('active');
    //     console.log(myli);
    // });

    // horizontal scroller
    // jQuery('.parallax-wrapper div').on('mousewheel', function(e, delta){
    //     // console.log(delta);
    //     this.scrollLeft -= (delta * 1);
    //     e.preventDefault();

    //     console.log(delta);

    // })
});

