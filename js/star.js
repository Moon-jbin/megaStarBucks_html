(($) => {

    const starBucks = {
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.footer();
        },
        header(){
            //마우스를 메인메뉴에 올리면 서브메뉴 부드럽게 펼쳐지고
            //메뉴에는 색상이 변경된다.
            $('.main-btn').on({
                mouseenter(){
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(300);
                    $('.main-btn').removeClass("addCurrent");
                    $(this).addClass("addCurrent");
                },
                focusin(){
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(300);
                    $('.main-btn').removeClass("addCurrent");
                    $(this).addClass("addCurrent");
                }
            });

            $('#nav').on({
                mouseleave(){
                    $('.sub').stop().slideUp(300);
                    $('.main-btn').removeClass("addCurrent");
                }
            });


            // aside 통합검색 버튼 이벤트
            // 1. 검색 버튼 클릭시 선택자(#aside)에 클래스 addClass("addSearch")가 추가되면 너비가 부드럽게 늘어난다. 입력상자가 보인다.
            //    toggleClass 는 addClass removeClass 를 다 가지고 있따.

            // 2. $('#aside') 요소에 추가된 클래스 (addSearch)가 있다면 
            //    검색버튼을 누르면 입력상자에 입력된 내용 여부에 따라 오류 메시지 또는 전송을 한다.
                //   (입력내용이 있으면 전송, 없으면 alert 띄운다.)
            $('.search-btn').on({
                click(){
                    //논리 비교는 반드시 === 등호 3개 사용
                    // 1=="1" 참
                    // 1 === "1" 거짓
                    if ( $('#aside').hasClass('addSearch')){
                        if(!$('#search').val()){
                            alert('검색어를 입력해주세요.');
                        }else{
                        //    form.search.submit(); // 폼전송
                        // AJAX 전송 PHP 파일
                        }                        
                    }else{
                        $('#aside').addClass('addSearch');
                    }
                }
            })
        },
        section1(){
            //애니메이션
            function anifn(){

            $('.ani1').stop().animate({opacity:1},500,function(){
                $('.ani2').stop().animate({opacity:1},500,function(){
                    $('.ani3').stop().animate({opacity:1},500,function(){
                        $('.ani4').stop().animate({opacity:1},500,function(){
                            $('.ani5').stop().animate({opacity:1})
                        })
                    })
                })
            });
        }

        setTimeout(anifn, 800);  // 로딩시 1초 후에 실행하고 끝

        },
        section2(){
            // 공지사항 리스트 롤링 텍스트 슬라이드
            // 중요한 것은 z-index ! 
            // 변수 카운트 변수
            // 타이머 interval second 변수
            let cnt = -1;
            let interval = 3000;

            

            //1. mainslide 함수 
            function mainSlide(){
              //초기화
              $(".notice-list-item").css({zIndex:1}).animate({top:24},0);
              // 현재
                $(".notice-list-item").eq(cnt).css({zIndex:2}).animate({top:0},0);
              //다음
              $(".notice-list-item").eq((cnt+1)>4 ? 0 : (cnt+1)).css({zIndex:3}).animate({top:24},0).animate({top:0},600);
            };

            //2. nextcount함수 
            function nextCount(){
                cnt ++;
                if(cnt>4){cnt=0};
                mainSlide();
            };

            //3. setinterval 함수 
            function timer(){
                setInterval(nextCount,interval);
            };
            timer();
        },
        section3(){
            let cnt = 0;
            let setId = null;
            let toggle = 0;
            //프로모션 버튼 이벤트
            //한번 누르면 부드럽게 펼쳐지고(slideDown(300))
            // 또한번 누르면 부드럽게 접힌다.(slideUp(300))
            //슬라이드토글 : slideToggle(300)
            $('#section3').slideUp(0); // 초기화 접힌상태 정지상태
            $('.promotion-btn').on({
                click(){
                    $('#section3').slideToggle(300);
                    $(this).toggleClass('addPromBtn');
                    if($(this).hasClass('addPromBtn')){
                        //타이머 실행
                        clearInterval(setId);
                        timer();
                        $('.play-btn').removeClass('addPlay');
                    }else{
                        //타이머 중지 , 초기화
                        clearInterval(setId);
                        cnt=0;
                        $('.slide-wrap').stop().animate({left:-829*cnt},0);
                        $('.play-btn').addClass('addPlay');
                        pagebtn();
                    }
                }
            });

            var winW = 0

            // 반응형

            function resizefn() {
                if( $(window).innerWidth() <= 960){
                    console.log($(window).innerWidth())
                    winW = $(window).innerWidth();
                    mainSlide();
                }else {
                    winW = 829;
                }
            }

            resizefn();

            $(window).resize(() => {
               
               resizefn();
                
            })

            

            function mainSlide(){
                $('.slide-wrap').stop().animate({left:-winW*cnt},300,()=>{
                    if(cnt>2){cnt=0};
                    if(cnt<0){cnt=2};
                    $('.slide-wrap').stop().animate({left:-winW*cnt},0);
                });

                pagebtn();
            }

            function nextSlide(){
                cnt++;
                mainSlide();
            }
            function prevSlide(){
                cnt--;
                mainSlide();
            }

            // 다음 화살 버튼 클릭 이벤트
            $('.next-btn').on({
                click(){
                    if(!$('.slide-wrap').is(':animated')){
                        nextSlide(); 
                    } 
                } 
            }); 
            // 이전 화살 버튼 클릭 이벤트 
            $('.prev-btn').on({ 
                click(){ 
                    if(!$('.slide-wrap').is(':animated')){
                        prevSlide();
                    }
                }
            });

            // 타이머
            function timer(){
               setId = setInterval(nextSlide,3000);
            }

            // page-btn 기능 구현
            function pagebtn () {
                $('.page-btn').removeClass('addPage');
                $('.page-btn').eq(cnt>2 ? 0 : cnt).addClass('addPage');
            }
            // page-btn 클릭 기능
            $('.page-btn').each(function(idx){
                $('.page-btn').eq(idx).on({
                    click(){
                        cnt = idx;
                        mainSlide();
                    }
                })
            })

            //타이머 중지
            // 한번 클릭하면 중지 또 한번 클릭하면 재생
            $('.play-btn').on({
                click(){
                    if($(this).hasClass('addPlay')){
                        timer();
                        $(this).removeClass('addPlay');
                       
                    }else{
                        clearInterval(setId);
                        $(this).addClass('addPlay');
                    }
                }
            });

            //slide-wrap 위에 마우스  올라가면 타이머 정지 벗어나면 재실행
            $('.slide-wrap').on({
                mouseenter(){
                    toggle = 0;
                    clearInterval(setId);
                    $('.play-btn').addClass('addPlay');
                },
                mouseleave(){
                    if(toggle == 0){
                        toggle = 1;
                        timer();
                    }
                    $('.play-btn').removeClass('addPlay');
                }
            }) 



        },
        section4(){

        },
        section5(){

        },
        section6(){

        },
        section7(){

        },
        section8(){

        },
        footer(){

        }
    }

    starBucks.init();

})(jQuery);