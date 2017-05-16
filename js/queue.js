(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })

    $('.contact li').hover(function(){
        $(this).toggleClass('active');
        // $(this).find('.description').height( $(this).find('.description').height() + 20 );
    });

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile|Edge/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        },
        disableFixed: function() {
            return (isMobile.Android());    
        }
    };

    var enableParallax =
    {
        parallaxSelector: '.parallax .col-sm-5 .prallax_img',
        ratioDefault: 6,
        
        init: function() {
            // enanble only if parallax selector exists
            if (    !$(this.parallaxSelector).length) return false;
            
            // disable on devices with IEmobile
            if (isMobile.Windows()) return false;
            
            var _self = this;
            
            this.setParallax();
            
            $(window).scroll(function(){
                _self.setParallax();
            });
        },
        
        setParallax: function() {
            var _self = this;
            var scrollTop = $(window).scrollTop();
            var scrollBottom = scrollTop + $(window).height();
            
            $(this.parallaxSelector).each(function() {
                var elOffsetTop = $(this).offset().top;
                var positionTopBase = scrollBottom - elOffsetTop;
                
                if (elOffsetTop <= $(window).height()) {
                    positionTopBase = $(window).scrollTop();
                }
                
                var ratio = _self.ratioDefault;
                
                if ($(this).data('parallax-ratio') > 0) {
                    ratio = $(this).data('parallax-ratio');
                }
                
                var positionTop = Math.round(positionTopBase / ratio);
                
                if (elOffsetTop > scrollBottom) {
                    $(this).css({
                        "-moz-transform": "",
                        "-o-transform": "",
                        "-ms-transform": "",
                        "-webkit-transform": "",
                        "transform": ""
                    });
    
                } else {
                    $(this).css({
                        "-moz-transform": "translate3d(0px, " + positionTop + "px, 0px)",
                        "-o-transform": "translate3d(0px, " + positionTop + "px, 0px)",
                        "-ms-transform": "translate3d(0px, " + positionTop + "px, 0px)",
                        "-webkit-transform": "translate3d(0px, " + positionTop + "px, 0px)",
                        "transform": "translate3d(0px, " + positionTop + "px, 0px)"
                    });
                }
            });
        }
    };

    enableParallax.init();

    function generate_header_bg(){
        var max_heihgt = 700;
        var step = 9;
        var container_width = $('.wave_bg').width();          
        var number = ( container_width + 800 ) /step;

        var el_parent = $('.wave_content');
        el_parent.html('');
        el_parent.attr( "width", container_width );
        el_parent.attr( "height", max_heihgt );
        el_parent.attr( "viewBox", '3 11 '+container_width+' '+max_heihgt );

        var x1 = -800, deltaY = 0;
        for( var i = 0; i < number; i++ )
        {
            x1 += step;
            var x2 = x1 + 600;

            var y1 = 200 + Math.sin( x1 / 300 + 4 ) * 50;
            var y2 = max_heihgt ;
            if( x1 > 900 ){
                // y2 = max_heihgt - ( deltaY );
                // y1 = y1 - ( max_heihgt - y2 );
                deltaY++;
            }
            var boardElement;
            boardElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
            boardElement.setAttribute('stroke-dasharray', '0,0');
            boardElement.setAttribute('stroke', '#AAAAAA');
            boardElement.setAttribute('stroke-width', '1');
            boardElement.setAttribute('x1', x1);
            boardElement.setAttribute('y1', y1);
            boardElement.setAttribute('x2', x2);
            boardElement.setAttribute('y2', y2);
            boardElement.style.opacity = 0.5;
            el_parent.append(boardElement);
        }
    }
    $( window ).resize( function(){ generate_header_bg() });

    var start = 4, step = 0.1;
    function exploded(){
        $('line').each(function(){
            var x1 = $(this).attr('x1');
            var y1 = 200 + Math.sin( x1 / 300 + (start + step) ) * 50;
            $(this).attr('y1', y1 );
        });
        start += step;
        setTimeout(exploded, 50 );
    };
    exploded();
    generate_header_bg();
})(jQuery); // End of use strict
