$(document).ready(function(){ /* ... */ });
$(window).load(function(){
     
   
    
    slider.init();
    accordion.init();
    yTube.init();
    menu.init();
     

    if($('.fancybox').length != 0){
        $('.fancybox').fancybox();
    }

});




/* menu --------------------------------------- */
var menu = {
    x: 768,
    add: 'active',
    cont: '.menu',
    butt: '.buttonMobile',
    bright: 'slider-bright',
    tim: 200
     
};

menu.init = function(){
    
    $(menu.butt).on({  
        click: function(){

            if($(this).hasClass(menu.add)){
                $(this).parents(menu.cont).find('ul').eq(0).fadeOut(menu.tim);
                $(this).removeClass(menu.add);
                $('.slider').removeClass(menu.bright);
            }else{
                $(this).parents(menu.cont).find('ul').eq(0).fadeIn(menu.tim);
                $(this).addClass(menu.add);
                $('.slider').addClass(menu.bright);
            }
        }
    });
    
    
    menu.res();
    $(window).resize(function(){
        menu.res();
    });
     
};

menu.res = function(){
     
    if(window.innerWidth > menu.x){
        
        $(menu.butt).removeClass(menu.add);
        $(menu.cont + ' ul').eq(0).removeAttr('style');
        $('.slider').removeClass(menu.bright);
        
    }else{
        
    }
};





/* yTube -------------------------------- */
var yTube = {
    id: 'vid_',
    box: '.youtube-box',
    player: []
     
};

yTube.init = function(){
    
     var tag = document.createElement('script');
     var firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
     
    
     for(var i=0; i<$(yTube.box).length; i++){
         
         $(yTube.box).eq(i).attr('id', yTube.id + (i+1));
         
         yTube.player[i] = new YT.Player(yTube.id + (i+1), {
             videoId: $(yTube.box).eq(i).attr('url')
         });    
     }
     
};

yTube.stopVideo = function(){
    
    for(var i=0; i<$(yTube.box).length; i++){
        
        yTube.player[i].stopVideo();
        
    };
};






/* accordion ---------------------------- */
var accordion = {
    add: 'active',
    cont: '.accordion__cont',
    data: '.accordion__data',
    butt: '.accordion__arrow',
    tim: 400 
};

accordion.init = function(){
     
     $(accordion.butt).on({  
		click: function(){
			
			if($(this).parents(accordion.cont).hasClass(accordion.add)){
                   
                   accordion.closeBox($(this));
               }else{
                   
                   accordion.openBox($(this));
               }
               
               
               if($(this).parents(accordion.cont).find('.sliderPhoto').length != 0){
                    
                    slider.rediscovery($('.sliderPhoto'), 'photo');  
               }
               
               if($(this).parents(accordion.cont).find('.sliderVideo').length != 0){
                    
                    slider.rediscovery($('.sliderVideo'), 'video');  
               }
              
               yTube.stopVideo();
               
		}
	});
     
     
     $(slider.video).on('beforeChange', function(event, slick, currentSlide, nextSlide){
          
         yTube.stopVideo();
 
     });
      
};

accordion.closeBox = function(th){
    
    th.parents(accordion.cont).find(accordion.data).slideUp(accordion.tim);
    th.parents(accordion.cont).removeClass(accordion.add);
};

accordion.openBox = function(th){
    
    $(accordion.data).stop(true);
    th.parents(accordion.cont).find(accordion.data).slideDown(accordion.tim);
    th.parents(accordion.cont).addClass(accordion.add);
};






/* slider ------------------------------- */
var slider = {
    main: '.slider__container',
    advantages: '.advantages-cont',
    data: '.data-cont',
    news: '.newsSlider-bl',
    services: '.services-slider',
    photo: '.sliderPhoto-bl',
    video: '.sliderVideo-bl',
    plans: '.sliderPlans',
    aboutProj: '.sliderAboutProj',
    xTablet: 1070,
    xMobile: 768
};

slider.init = function(){
     
    $(slider.main).slick({
         dots: true,
         autoplay: true,
         autoplaySpeed: 10000,
         speed: 1000,
         fade: true,
         adaptiveHeight: true,
         responsive: [
             {
                 breakpoint: slider.xMobile,
                 settings: {
                     fade: false
                 }
             }
         ]
    });

    $(slider.advantages).slick({
         dots: true
    });

    $(slider.data).slick({
         dots: true
    });

    $(slider.news).slick({
         dots: true,
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 3,
         responsive: [
             {
                 breakpoint: slider.xTablet,
                 settings: {
                     slidesToShow: 2,
                     slidesToScroll: 2,
                 }
             },
             {
                 breakpoint: slider.xMobile,
                 settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1,
                 }
             }
         ]
    });
     
    $(slider.services).slick({
         dots: true,
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 3,
         responsive: [
             {
                 breakpoint: slider.xTablet,
                 settings: {
                     slidesToShow: 2,
                     slidesToScroll: 2,
                 }
             },
             {
                 breakpoint: slider.xMobile,
                 settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1,
                 }
             }
         ]
    });
     
    $(slider.photo).slick({
         dots: true,
         adaptiveHeight: true
    });
     
    $(slider.video).slick({
         lazyLoad: 'ondemand',
         dots: true,
         adaptiveHeight: true,
         infinite: false,
         slidesToShow: 1,
         slidesToScroll: 1
    });
     
    $(slider.plans).slick({
         dots: true
    });
     
    $(slider.aboutProj).slick({
         dots: true
    });
    
    
    
    
    
    $('.sliderPhoto-date').on({  
        click: function(){
            $(this).parents('.sliderPhoto__cont').find('a.fancybox').click();   
        }
    });
    
    
    $('.sliderMain-box').eq(0).find('.sliderMain-text').addClass('active');
    $(slider.main).on('beforeChange', function(event, slick, currentSlide, nextSlide){

        $('.sliderMain-text').removeClass('active');
        $('.sliderMain-box').eq(nextSlide).find('.sliderMain-text').addClass('active');
        
    });
    
    
    slider.title();
    $(window).resize(function(){
        slider.title();
    });


};

slider.title = function(){
    
    if($('.slider').length != 0){
        
        if($('.sliderMain-text').length > 0){
            
            
            if(window.innerWidth > slider.xMobile){
                
                $('.titleBox').css('display','block');
                
            }else{
                
                $('.titleBox').css('display','none');
            }
        }
    }
    
};

slider.rediscovery = function(th, str){
     
     if(str == 'photo'){
          for(var i=0; i<th.length; i++){
               $(slider.photo).get(i).slick.setPosition();
          }
     }
     
     if(str == 'video'){
          for(var i=0; i<th.length; i++){
               $(slider.video).get(i).slick.setPosition();
          }
     }  
};







		   
						   
						   
						   
						   
				   
						   