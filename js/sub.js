$(function(){
  //서브메뉴
  function menuHandler() {
    if ($(window).width() > 1024) {
      // PC 버전: 마우스 오버
      $(".h_mm>li").off("click mouseover mouseleave"); // 기존 이벤트 제거
      $(".h_mm>li").mouseover(function() {
        $(this).children(".hide").stop().slideDown(300);
      });
      $(".h_mm>li").mouseleave(function() {
        $(this).children(".hide").stop().slideUp(300);
      });
    } else {
      // 모바일 버전: 클릭
      $(".h_mm>li").off("click mouseover mouseleave"); // 기존 이벤트 제거
      $(".h_mm>li").click(function(e) {
        e.stopPropagation();
        const submenu = $(this).children(".hide");

        // 다른 메뉴 닫기
        $(".h_mm>li").not(this).children(".hide").stop().slideUp(300);

        // 현재 메뉴 토글
        submenu.stop().slideToggle(300);
      });
    }
  }

  // 초기 실행
  menuHandler();

  // 화면 크기 변경 시 다시 적용
  $(window).resize(function() {
    menuHandler();
  });

  //서브메뉴고정
  $(window).scroll(function(){
    if($(window).scrollTop()>=490){
      $(".sub_nav").addClass("fixed")
    } else {
      $(".sub_nav").removeClass("fixed")                
    }
  });

  //카운터
  //   $('.counter').each(function() {
  //   var $this = $(this),
  //       countTo = parseInt($this.attr('data-count').replace(/,/g, ''), 10);
  //   $({ countNum: $this.text()}).animate({
  //     countNum: countTo
  //   },
  //   {
  //     duration:1800,
  //     easing:'linear',
  //     step: function() {
  //       $this.text(Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  //     },
  //     complete: function() {
  //       $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  //     }
  //   });
  // });
  
  //카운터 수정
  const counterContainers = document.querySelectorAll('.dlgroup li');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterElement = entry.target.querySelector('.counter');
        animateCounter(counterElement);
      }
    });
  });
  counterContainers.forEach(container => {
    observer.observe(container);
  });

  function animateCounter(counter) {
    const $this = $(counter);
    const countTo = parseInt($this.attr('data-count').replace(/,/g, ''), 10);
    
    if ($this.hasClass('counting')) {
      return;
    }  
    $this.addClass('counting');
    
    $({ countNum: 0 }).animate({
      countNum: countTo
    }, {
      duration: 1500,
      easing: 'linear',
      step: function() {
        $this.text(Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      },
      complete: function() {
        $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $this.removeClass('counting');
      }
    });
  }

  AOS.init();
  
  //위로가기
  $(window).scroll(function(){
  if($(window).scrollTop()>=200){
    $(".btn_top").fadeIn();
    $("#header").addClass("fixed")
  } else {
    $(".btn_top").fadeOut();
    $("#header").removeClass("fixed")                
  }
});

});