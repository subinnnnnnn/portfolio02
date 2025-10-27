document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.full_area');
    let currentSectionIndex = 0;
    const totalSections = sections.length;
    let isScrolling = false;
    
    // 이 부분이 1200px 사이즈에서 풀페이지 스크롤을 해제합니다.
    const mobileMediaQuery = window.matchMedia('(max-width: 1200px)'); 
    const header = document.querySelector('header'); 

    // 초기 섹션 인덱스를 찾습니다. (새로고침 시 현재 위치 유지)
    // 일반적으로 첫 섹션(0)으로 시작하지만, 필요에 따라 초기화 로직을 추가할 수 있습니다.
    
    // 기능 활성화/비활성화 함수
    function setupFullpageScroll(isMobile) {
        if (isMobile) {
            // 풀페이지 스크롤 비활성화: 이벤트 제거
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeydown);
            sections.forEach(section => {
                section.style.scrollSnapAlign = '';
            });
            // CSS에서 처리: body/html의 overflow를 auto로 변경
            document.body.style.overflowY = 'auto';
            document.documentElement.style.overflowY = 'auto';
            
        } else {
            // 풀페이지 스크롤 활성화: 이벤트 추가
            window.addEventListener('wheel', handleWheel, { passive: false }); // passive: false로 휠 이벤트의 기본 동작 방지
            document.addEventListener('keydown', handleKeydown);
            sections.forEach(section => {
                section.style.scrollSnapAlign = 'start';
            });
            // CSS에서 처리: body/html의 overflow를 hidden으로 변경하여 브라우저 기본 스크롤 비활성화
            document.body.style.overflowY = 'hidden';
            document.documentElement.style.overflowY = 'hidden';
            
            // 현재 섹션으로 이동 (재활성화 시 위치 고정)
            goToSection(currentSectionIndex);
        }
    }

    // 마우스 휠 이벤트 핸들러
    function handleWheel(event) {
        event.preventDefault(); // 브라우저 기본 스크롤 동작 방지 (가장 중요)
        
        if (isScrolling) return;

        if (event.deltaY > 0) { // 아래로 스크롤
            currentSectionIndex = (currentSectionIndex === totalSections - 1) ? 0 : currentSectionIndex + 1;
        } else if (event.deltaY < 0) { // 위로 스크롤
            currentSectionIndex = (currentSectionIndex === 0) ? totalSections - 1 : currentSectionIndex - 1;
        }
        goToSection(currentSectionIndex);
    }

    // 키보드 이벤트 핸들러
    function handleKeydown(event) {
        if (isScrolling) return;

        if (event.key === 'ArrowDown' || event.key === ' ') { // 아래쪽 화살표 키 또는 스페이스바
            currentSectionIndex = (currentSectionIndex === totalSections - 1) ? 0 : currentSectionIndex + 1;
            goToSection(currentSectionIndex);
        } else if (event.key === 'ArrowUp') { // 위쪽 화살표 키
            currentSectionIndex = (currentSectionIndex === 0) ? totalSections - 1 : currentSectionIndex - 1;
            goToSection(currentSectionIndex);
        }
    }

    // 특정 섹션으로 이동하는 핵심 함수
    function goToSection(index) {
        if (index < 0 || index >= totalSections) return;
        isScrolling = true;
        
        // 섹션 위치로 부드럽게 스크롤
        sections[index].scrollIntoView({
            behavior: 'smooth'
        });

        // 헤더 스타일 변경 로직
        if (header) { 
            if (index > 0) {
                header.classList.add('other_hader');
            } else {
                header.classList.remove('other_hader');
            }
        }

        // 스크롤 애니메이션 시간(약 800ms)보다 길게 설정하여 겹치는 스크롤 방지
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 1초 대기 후 잠금 해제
    }

    // 1. 초기 로드 시 기능 설정
    setupFullpageScroll(mobileMediaQuery.matches);
    
    // 2. 화면 크기가 변경될 때마다 기능 재설정
    mobileMediaQuery.addEventListener('change', (event) => {
        setupFullpageScroll(event.matches);
    });
});