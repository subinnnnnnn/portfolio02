$(function(){
    //사업분야
    var busiswiper = new Swiper(".busi", {
      loop: true,
      slidesPerView:1,
      freeMode:true,
      watchSlidesProgress:true,
      autoplay: {
        delay:5000,
        disableOnInteraction: false,
      },
    });
    var busiswiper = new Swiper(".busi_thumb", {
      loop:true,
      spaceBetween:0,
      navigation: {
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
      },
      thumbs: {
        swiper:busiswiper,
      },
      autoplay: {
        delay:5000,
        disableOnInteraction: false,
      },
      on: {
        slideChangeTransitionStart: function() {
          let realIndex = this.realIndex;
          let menuItems = document.querySelectorAll('.menu_area li');
          menuItems.forEach(function(item) {
            item.classList.remove('on');
          });
          menuItems[realIndex].classList.add('on');
        },
      },      
    });
    const menuLinks = document.querySelectorAll('.menu_link');
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const slideIndex = parseInt(link.getAttribute('data-slide-to'));
            busiswiper.slideToLoop(slideIndex);
        });
    });    
    //지속가능경영
    const mgmtItems = document.querySelectorAll('.mgmt');
    mgmtItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });


});