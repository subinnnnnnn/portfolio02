$(function(){
    //헤더영역
    $("#gnb > ul").mouseenter(function(){
      $(".depth").stop().fadeIn(300);
      $("#header").toggleClass("open");
      $(".depth_bg").stop().slideDown();  
    });
    $("#gnb > ul").mouseleave(function(){
      $(".depth").stop().fadeOut();          
      $("#header").removeClass("open");     
      $(".depth_bg").stop().slideUp();          
    });

    //사이트맵
    $("#header .btn_hamburger").click(function(){
        $(".site_map").animate({right:"0"},300);
        $("html, body").css("overflow","hidden");
    });

    $(".close_btn").click(function(){
        $(".site_map").animate({right:"-100%"},300);
        $("html, body").css("overflow","");        
    }); 

    // 햄버거 토글 버튼 클릭 시 메뉴 전체 열고 닫기
    $('.btn_gnb').click(function () {
      $(this).toggleClass('btn_gnb_close');
      $('#m_gnb').toggleClass('on');
    });

    // 메뉴 항목 클릭 시
    $('.m_gnb_item').click(function (e) {
      const $li = $(this).parent(); // 클릭된 a 태그의 부모 li
      const $sub_menu = $li.children('.sub_menu');

      if ($sub_menu.length > 0) {
        e.preventDefault(); // CONTACT 클릭 시 링크 이동 막기

        // 모든 다른 sub_menu 닫기
        $('.sub_menu').not($sub_menu).stop(true, true).slideUp(200);

        // 현재 sub_menu가 열려있으면 닫고, 아니면 열기
        if ($sub_menu.is(':visible')) {
          $sub_menu.stop(true, true).slideUp(200);
        } else {
          $sub_menu.stop(true, true).slideDown(200);
        }
      } else {
        // sub_menu가 없는 메뉴 (ABOUT, WORK 등) 클릭 시 메뉴 전체 닫기
        $('#m_gnb').removeClass('on');
        $('.btn_gnb').removeClass('btn_gnb_close');
      }
    });

});