gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(".mobile, .desktop");

const lenis = new Lenis();


// lenis.on('scroll', (e) => {
//   console.log(e);
// });

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
lenis.raf(time * 600); // Convert time from seconds to milliseconds
});

gsap.ticker.lagSmoothing(0);



$('.menu-btn').click(function() {
    $(this).toggleClass('active');
    $('.menu-area').toggleClass('active');

});

var coinSwiper1 = new Swiper(".coinSwiper", {
    slidesPerView: 1,
    effect: "fade",
    loop:true,
    });

$('.coinSwiper .swiper-slide').eq(0).addClass('rotate'); 

document.querySelector('.coinSwiper').addEventListener('click', function () {
    coinSwiper1.slideNext();

    $('.coinSwiper .swiper-slide').each((index, el) => {
        $(el).removeClass('rotate'); //rotate 클래스 모두 제거해줌
    });

    $('.coinSwiper .swiper-slide-active').addClass('rotate');
    //활성화 된 슬라이드에만 rotate 클래스 적용
});

coinSwiper1.on('slideChange', function () {
    let textWraps = document.querySelectorAll('.sc-explore .text-wrap')
    let slideIndex = coinSwiper1.realIndex+1; //text-wrap의data-index 속성의 값과 맞춰주기 위한 변수

    textWraps.forEach(function(textWrap) {
        textWrap.classList.remove('visible') //모두 숨김상태
    });

    let activeTextWrap = document.querySelector(`.text-wrap[data-index="${slideIndex}"]`);
    
    if (activeTextWrap) {
        activeTextWrap.classList.add('visible')
        //slideIndex와 일치하는 data-index 값을 가진 텍스트만 클래스 추가
    }
    
});
    
var coinSwiperMobile = new Swiper(".coinSwiper-m", {
    slidesPerView:'auto' ,
    spaceBetween: 50, 
    slidesPerGroup: 1,
    //effect: "fade",
    //loop:true,
});
    
$('.coinSwiper').hover(
    function(){
        $('.custom-cursor').addClass('active')
    },
    function(){
        $('.custom-cursor').removeClass('active')
    }
)

//커스텀 커서
// const customCursor = document.querySelector('.custom-cursor');

// let mouseX = 0;
// let mouseY = 0;

// document.addEventListener('mousemove', (e) => {
//     mouseX = e.pageX;
//     mouseY = e.pageY;
// });

// function updateCursor() {
//     customCursor.style.left = `${mouseX}px`;
//     customCursor.style.top = `${mouseY}px`;
//     requestAnimationFrame(updateCursor);
// }

// updateCursor();

$(document).mousemove(function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to('.custom-cursor',{
        x:mouseX,
        y:mouseY
    })

})

// 헤더
let lastScrollTop = 0
$(window).scroll(function() {
    
    let currentScrollTop = $(this).scrollTop(); // 현재 스크롤 위치

    if(currentScrollTop >= 300) {
        $('header').removeClass('transparent')
    }else{
        $('header').addClass('transparent')
    }

    if(currentScrollTop >= 50){

        if (currentScrollTop > lastScrollTop) {
            //내릴때
            //$('header').addClass('moveTop')
            $('header').css('transform','translateY(-100%)')
            

        } else {
            //올릴때
            //$('header').removeClass('moveTop')
            $('header').css('transform','translateY(0%)')

        }
    
        lastScrollTop = currentScrollTop; // 현재 스크롤 위치 업데이트

    }else{
        $('header').removeClass('moveTop')
        
    }
});


// 배경화면 전환
let currentIndex = 0;
const sectionCustom = document.querySelectorAll('.sc-custom .bg-area');

setInterval(() => {
    currentIndex++;

    // 인덱스가 범위를 초과할 경우 리셋
    if (currentIndex >= sectionCustom.length) {
        currentIndex = 0;
    }
    // 모든 배경 제거
    sectionCustom.forEach(el => {
        el.classList.remove('active');
    });
    // 현재 인덱스에 해당하는 배경 활성화
    sectionCustom[currentIndex].classList.add('active');
}, 4000);

scCustomTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-custom",
        start: "25% 0%",
        end: "100% 0%",
        scrub:0,
        //markers: true,
    },
})
.to(".sc-custom", {
    '--opacity': 0.65,
})



gsap.to(".sc-custom .bg-area", { 
    scrollTrigger:{
        trigger: ".sc-custom",
        start: "0% 0%",
        end : "100% 0%",
        scrub: 0,
        //markers:true,
    },
yPercent: 50 }); //배경 고정된듯한 효과


// 아코디언 메뉴
$('.question-item .title').click(function() {
    var $answer = $(this).siblings('.answer'); // 현재 클릭한 제목의 답변 요소

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $answer.stop().slideUp(300, function() {
            $(this).css({ opacity: 0 });
        });
    } else {
        // 모든 제목과 답변 초기화
        $('.question-item .title').removeClass('active');
        $('.question-item .answer').stop().slideUp(300, function() {
            $(this).css({ opacity: 0}); // 모든 답변 초기화
        });

        $(this).addClass('active');
        $answer.stop().slideDown(300, function() {
            $answer.animate({ opacity: 1}, 300);
        });
    }
});



// headerMoiton= gsap.to('aa',{
//     yPercent:-100,
//     paused:true,
//     onComplete:function(){
//         // 헤더흰색만들기
//     },
//     onRerverseComplete:function(){

//     }
// })


introTl = gsap.timeline({
    scrollTrigger:{
        trigger:".sc-intro",
        start:"0% 0%",
        end:"100% 0%",
        scrub:0,
    }
})
introTl.to('.sc-intro .intro-text',{
    yPercent:20
})
introTl.to('.sc-intro video',{
    yPercent:15
},"<")




$('[data-scroll="updown"]').each(function(i,el){

    gsap.to($(this).find('img'),{
        scrollTrigger:{
            trigger:el,
            start:"0% 100%",
            end:"100% 50%",
            scrub:0,
            // markers:true,
        },
        yPercent:-8,
    })
})




/* ScrollTrigger.create({
    trigger:"body",
    start:"0% 0%",
    end:"100% 100%",
    toggleClass:{
        targets:"header",
        className:"transparent"
    },
    //markers:true
})

const introScroll = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-intro",
        start: "0% 0%",
        end: "100% 40%",
        scrub: 2,
        //markers:true,
    },
})
introScroll
.to('.sc-description',{
    y:-500,
})


const storyBg = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-description .story-area",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 2,
        //markers:true,
    },
})
storyBg.to(".sc-description .story-area",{
    
}) */


/* textSplit 효과 */

let textSplit;
let textSplitIntro;
let discoverSplit;

// 윈도우 리사이즈시 SplitType 초기화
function initializeSplitType() {

    // 이전 SplitType 인스턴스가 있다면 제거
    if (textSplit) {
        textSplit.revert();
    }

    // 새로운 SplitType 생성
    textSplit = new SplitType(`[data-split="text"]`, {type: 'words'});
    textSplitIntro = new SplitType(`[data-split-intro="text"]`, {type: 'words'});
    discoverSplit = new SplitType('.discover-area .text-wrap', { type: 'chars' });

    $('.word').each(function() {
        if (!$(this).parent().hasClass('word-wrap') && !$(this).parents().hasClass('discover-text') ) {
            $(this).wrap('<div class="word-wrap"></div>');
        }
    });
    createDiscoverAnimation()

}

// discover-area 영역 코인 회전, 텍스트 효과 함수
let imgEl = ``;
    const totalImg = 62;
    for (let i = 0; i < 62; i++) {
        const fisrt = (i==0)?"on":'';
        imgEl+=`<img src="./assets/seq/sq${i+1}.png" alt="coin" class="${fisrt}">`
    }
    $('.sc-description .discover-area .img-sq').html(imgEl)

function createDiscoverAnimation() {
    
    const discoverTextMove = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-description .discover-area .sticky-wrapper",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 1,
            invalidateOnRefresh: true,

            onUpdate: function(self) {
                const progress = self.progress; // 현재 진행 상태 (0에서 1 사이)
                imgItem = $('.sc-description .discover-area .img-sq img');
                //idx=Math.floor(progress*totalImg);
                idx = Math.min(Math.floor(progress * totalImg), totalImg - 1);
    
                imgItem.removeClass('on');
                imgItem.eq(idx).addClass('on');
            },
        },
    });
        //텍스트 왼쪽 이동
        discoverTextMove.to(".discover-area .text-wrap", {
            xPercent: -100,
            ease:"none"
            });

    $('.sc-description .discover-area .text-wrap').find('.char').each(function(i, el) {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "0% 90%",
                end: "100% 90%",
                scrub: 0,
                //markers: true,
                containerAnimation: discoverTextMove, // ScrollTrigger를 사용할 경우 containerAnimation 추가
            },
            opacity: 0.6,
            rotateX: -90,
            ease: "none",
        });
    });

}

// 초기위치 설정
gsap.set(".intro-text-bottom", { yPercent: 100});
// 초기위치 설정
gsap.set(".sc-distributor .title-wrap", { yPercent: 200});

// 리사이즈 시에는 적용됐던 애니메이션 없애줌
$(window).resize(function(){
    gsap.set(".intro-text-bottom", { clearProps: "transform"});
    gsap.set(".sc-distributor .title-wrap", { clearProps: "transform"});
})

// text에 애니메이션을 적용하는 함수
function applyTextAnimation() {

    $(`[data-split="text"]`).find('.line').each(function(idx, el) {
        const textTl = gsap.timeline({
            scrollTrigger: {
                trigger: el,             
                start: "0% 80%",          
                once: true,               
                toggleActions: "play none none none",
            }
        });

        textTl.to($(el).find('.word'), {
            yPercent: -100,         
            opacity: 1,               
            duration: 0.7,             
            ease: "power2.out", 
            stagger: 0.1 
        });
    });

}

function applyTextAnimationIntro() {
    
    gsap.to($('header'), {
        opacity: 1,
        delay:2,
        ease: "power2.out",
    },"<")
    $('.sc-intro').each(function () {
        const el = this;

        // GSAP 애니메이션 설정
        const textTl = gsap.timeline()
        
        textTl.to($(el).find('.word-wrap .word'), {
            yPercent: -100,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            delay: 1
        })
        .to($('.intro-text-bottom'), {
            yPercent: 0,
            ease: "power2.out",
            
        })

    });
    
}



// 페이지 로드 시 SplitType 초기화 및 GSAP 애니메이션 적용
$(document).ready(function() {
    initializeSplitType();
    applyTextAnimation();
    applyTextAnimationIntro();

    ScrollTrigger.refresh();
});

// 윈도우 사이즈가 변경될 때마다 SplitType 초기화
$(window).resize(function() {
    gsap.set($('body'),{clearProps: "all"})
    initializeSplitType();

    ScrollTrigger.refresh();

    // 리사이즈 될 때 마다 텍스트들 위치 조정
    $(`[data-split="text"]`).each(function () {
        const el = this;
        gsap.set($(el).find('.word-wrap .word'), {yPercent: -100, opacity:1});
    });
    $(`[data-split-intro="text"]`).each(function () {
        const el = this;
        gsap.set($(el).find('.word-wrap .word'), {yPercent: -100, opacity:1});
    });

});



// const headTxt2 = new SplitType('.split-line', { types: 'words, chars', });

// gsap.from('.split-line .word',{
//     opacity:0,
//     stagger:0.1,
// })

// const splitLines = new SplitType('.split-line', {types: 'lines'});
// $('.line').wrap('<div class="line-wrap">')

let imgEl2 = ``;
const totalImg2 = 62;
for (let i = 0; i < 62; i++) {
    const fisrt = (i==0)?"on":'';
    imgEl2+=`<img src="./assets/seq2/sq${i+1}.png" alt="coin" class="${fisrt}">`
}
$('.sc-sell-product .coin-img').html(imgEl2)

const rotateCoin = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-sell-product .sticky-wrap",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 1,
        
        onUpdate: function(self) {
            const progress = self.progress; 
            imgItem = $('.sc-sell-product .coin-img img');
            //idx=Math.floor(progress*totalImg);
            idx = Math.min(Math.floor(progress * totalImg2), totalImg2 - 1); // 진행도에 따라 인덱스를 생성

            imgItem.removeClass('on');
            imgItem.eq(idx).addClass('on');
        },
    },
});



// let discoverSplit = new SplitType('.discover-area .text-wrap', {type: 'words, char'});


// $('.sc-description .discover-area .text-wrap .char').each(function(i,el){
//     gsap.from(el,{
//         scrollTrigger: {
//             trigger: el,
//             start: "0% 90%",
//             end: "100% 90%",
//             scrub: 0,
//             markers: true,
//             containerAnimation: discoverTextMove,
//         },
//         opacity:0.7,
//         rotateX:-90,
//         ease:"none"
//     })
// })

// opacity: 0.7;
    // transform: rotateX(-90deg)
// 




/* function updateTextClasses() {
    const spans = document.querySelectorAll(".discover-area .text-wrap span");
    const progress = this.progress(); // 현재 진행 상태 (0에서 1 사이)

    spans.forEach((span, index) => {
        if (progress > index / spans.length) {
            span.classList.add("active");
        } else {
            span.classList.remove("active");
        }
    });
} */

const moveRight = gsap.to('.sc-design .design-list',{
    duration:45,
    xPercent:100,
    ease:'none',
    overwrite:'all',
    repeat:-1,
    onReverseComplete:function(){
        moveLeft.restart()
    }

})

const moveLeft = gsap.to('.sc-design .design-list',{
    duration:45,
    xPercent:-100,
    ease:'none',
    overwrite:'all',
    repeat:-1,
    paused:true,
    onReverseComplete:function(){
        moveRight.restart()
    }

})

let firstLeftFlag = false;
let firstRightFlag = false;

ScrollTrigger.create({
    trigger: '.sc-design',
    start: '0% 100%',
    end: '100% 0%',
    //markers: true,

    onUpdate: function(self) {
        if (self.direction === 1 && firstLeftFlag === false) {
            if (moveRight.isActive()) {
                moveRight.reverse();  // moveRight가 실행 중이면 reverse
            } else {
                moveLeft.play();  // moveLeft 실행
            }

            firstLeftFlag = true;  // firstLeftFlag를 true로 설정
            firstRightFlag = false;  // firstRightFlag는 false로 설정
            
        } else if (self.direction === -1 && firstRightFlag === false) {
            if (moveLeft.isActive()) {
                moveLeft.reverse();  // moveLeft가 실행 중이면 reverse
            } else {
                moveRight.play();  // moveRight 실행
            }

            firstRightFlag = true;  // firstRightFlag를 true로 설정
            firstLeftFlag = false;  // firstLeftFlag는 false로 설정
        }
    }
});

//가속 효과
gsap.to('.design-list-wrap',{
    scrollTrigger:{
        trigger: '.sc-design',
        start: '0% 100%',
        end: '100% 0%',
        scrub:0,
    },
    xPercent:-50
})


const division = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-distributor",
        start: "0% 0%",
        end: "=+300%",
        scrub: true,
        pin:true
        //markers:true,
    },
})
division
.to(".sc-distributor .division-wrap .half-wrap.top",{
    //yPercent:-100,
    'clip-path': 'inset(0% 0% 100% 0%)',
},'a')
.to(".sc-distributor .division-wrap .half-wrap.bottom",{
    //yPercent:100,
    'clip-path': 'inset(100% 0% 0% 0%)',
    
},'a')
.to(".sc-distributor .division-wrap .half-wrap.top .decoration",{
    'clip-path': 'inset(0% 0% 100% 0%)',
},'a')
.to(".sc-distributor .division-wrap .half-wrap.bottom .decoration",{
    'clip-path': 'inset(100% 0% 0% 0%)',
    
},'a')
.to(".sc-distributor .title-wrap",{
    yPercent:-200,

})

ScrollTrigger.matchMedia({
    "(max-width: 565px)": function() {
        // 스크롤 트리거 비활성화
        //ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // 모든 트리거 초기화

        gsap.to('.sc-description .story-area .right-wrap', { yPercent: 0 });
        gsap.to('.sc-description .story-area .left-wrap', { yPercent: 0 });
        gsap.to('.sc-faq .question-wrap', {yPercent : 0})
        //gsap.to("#footer", { position: "relative" });
    },

    "(min-width: 566px)": function() {
        // 화면 크기가 566px 이상일 때 다시 활성화
        gsap.to('.sc-description .story-area .right-wrap', {
            scrollTrigger: {
                trigger: '.sc-description .story-area',
                start: "0% 50%",
                end: "100% 50%",
                scrub: 1,
            },
            yPercent: -40
        });
        
        gsap.to('.sc-description .story-area .left-wrap', {
            scrollTrigger: {
                trigger: '.sc-description .story-area',
                start: "0% 80%",
                end: "100% 50%",
                scrub: 1,
                //markers:true
            },
            yPercent: -10
        });
        gsap.to('.sc-faq .question-wrap', {
            scrollTrigger: {
                trigger: '.sc-faq',
                start: "0% 30%",
                end: "100% 0%",
                scrub: 1,
                
            },
            yPercent: -50
        });
        
        gsap.to("#footer", {
            scrollTrigger: {
                trigger: ".sc-distributor",
                start: "100% 100%",
                end: "100% 100%",
                invalidateOnRefresh: true,
                onEnter: function() {
                    gsap.set("#footer", { position: "sticky", bottom: 0, width: "100%" });
                },
                onLeaveBack: function() {
                    gsap.set("#footer", { position: "relative" });
                },
                
            }
        });
    }
    
});