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
        parallaxSelector: '.parallax_img',
        ratioDefault: 10,
        
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

    /*function generate_header_bg(){
        var max_heihgt = 700;
        var step = 12;
        var container_width = $('.wave_bg').width();          
        var number = ( container_width + 800 ) /step;

        var el_parent = $('.wave_content');
        el_parent.html('');
        el_parent.attr( "width", container_width );
        el_parent.attr( "height", max_heihgt );
        el_parent.attr( "viewBox", '3 11 '+container_width+' '+max_heihgt );

        var x1 = 0, deltaY = 0;
        for( var i = 0; i < number; i++ )
        {
            x1 += step;
            var x2 = x1 ;

            var y1 = 300 + Math.sin( x1 / 300 + 4 ) * 80;
            var y2 = max_heihgt ;
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
    generate_header_bg();

    var start = 4, step = 0.1;
    function exploded(){
        $('line').each(function(){
            var x1 = $(this).attr('x1');
            var y1 = 300 + Math.sin( x1 / 300 + (start + step) ) * 80;
            $(this).attr('y1', y1 );
        });
        start += step;
        // setTimeout(exploded, 50 );
    };
    exploded();

    /* disable auto slider on host page */
    $('.carousel').carousel({
        interval: false
    });

    $('.scroll_fade img').css('margin-left', '100%')
    $(window).scroll( function(){
        /* Check the location of each desired element */
        $('.scroll_fade img').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'margin-left':'0'},1000);
            }
            
        }); 
    
    });

})(jQuery); // End of use strict

// Draw header background
(function () {

    if (typeof(Humble) == 'undefined') window.Humble = {};
    Humble.Trig = {};
    Humble.Trig.init = init;

    var unit = 80,
        canvas, context, canvas2, context2,
        height, width, xAxis, yAxis,
        draw;

    /**
     * Init function.
     * 
     * Initialize variables and begin the animation.
     */
    function init() {
        
        canvas = document.getElementById("sineCanvas");
        
        canvas.width = window.innerWidth;
        canvas.height = 700;
        
        context = canvas.getContext("2d");
        context.font = '18px sans-serif';
        context.lineJoin = 'round';
        
        height = canvas.height;
        width = canvas.width;
        
        xAxis = 500;
        yAxis = 300;
        
        context.save();
        draw();
        draw.seconds = 0;
        draw.t = 0;
    }

    /**
     * Draw animation function.
     * 
     * This function draws one frame of the animation, waits 20ms, and then calls
     * itself again.
     */
    draw = function () {
        
        // Clear the canvas
        context.clearRect(0, 0, width, height);

        // Draw the axes in their own path
        
        // Set styles for animated graphics
        context.save();
        context.strokeStyle = '#AAAAAA';
        context.fillStyle = '#fff';
        context.lineWidth = 1;

        // Draw the sine curve at time draw.t, as well as the circle.
        context.beginPath();
        drawSine(draw.t);
        context.stroke();

            // Restore original styles
        context.restore();
        
        // Update the time and draw again
        draw.seconds = draw.seconds - .007;
        draw.t = draw.seconds*Math.PI;
        setTimeout(draw, 50);
    };
    draw.seconds = 0;
    draw.t = 0;

    /**
     * Function to draw sine
     * 
     * The sine curve is drawn in 10px segments starting at the origin. 
     */
    function drawSine(t) {

        // Set the initial x and y, starting at 0,0 and translating to the origin on
        // the canvas.
        var x = t;
        var y = Math.sin(x);
        
        // Loop to draw segments
        for (i = 0; i <= width + xAxis; i += 12) {
            y= Math.sin( i / 300 + t ) * unit;
            context.moveTo(i, 700);
            context.lineTo(i - xAxis, y+yAxis);
        }
    }


    Humble.Trig.init()
    $( window ).resize( function(){ Humble.Trig.init() });
})();