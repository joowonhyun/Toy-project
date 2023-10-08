<h1>[JavaScript] day.js 라이브러리를 이용한 자바스크립트 최근 4주 보여주기</h1>
![image](https://github.com/joowonhyun/Toy-project/assets/78545341/95b772fd-f0bc-4739-a2f2-b39b434b1a62)
<h2>개요<h2>
최근 4주를 보여줄 수 있는 기능을 구현해야 하는 일이 생겼다. 라이브러리의 도움없이 구현할 수도 있겠지만, day.js 라이브러리가 가볍고 잘 나와있다는 얘기를 들어서 day.js 라이브러리를 활용해보았다.
<script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/dayjs.min.js"></script>

<h2>주요 기능<h2>
가장 끝에서 시작하며, 가장 우측이 현재 날짜다.
현재 페이지를 포함하여 옆으로 이동할 때마다 1주전, 2주전, 3주전, 4주전 보여준다.
오늘 날짜는 기준이 되는 값이므로 구분될 수 있도록 background 처리한다.

전체 코드
const renderCurrentDateIndicator = () => {
        const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "long" }); // 한국시간 변환값
        const date = koDtf.format(new Date());
        const currentDateIndicator = document.querySelector('.weekly__index p')
        currentDateIndicator.textContent = `오늘 : ${date}`;
    }
    const renderWeek = (currentPage = 3) => {
        const getDate = new dayjs();
        const status = document.querySelector('.daily__status');
        const dayList = document.querySelectorAll('.each__day');
        const sevenDays = {0 : '일', 1 : '월', 2 : '화', 3 : '수', 4 : '목', 5 : '금', 6 : '토'}
        const currentDate = dayjs(new Date());
        const previousMonthLastDate = currentDate.subtract(1, 'month').endOf('month').date(); //현재 날짜의 이전 달의 마지막 날짜 (30 or 31)
        status.innerHTML = '';
        dayList.forEach((_, idx) => {
            const HTML = 
                `<div class="daily__status--bar">
                    <div class="each__day ${currentPage === 3 && idx === 6 ? "active__day" : ""}">
                        <p class="flex">${sevenDays[(getDate.get("d") + idx - 6) < 0 ? getDate.get("d") + idx + 1 : (getDate.get("d") + idx - 6)]}</p>
                        <p class="flex font-16 w-700">
                            ${getDate.format("D") - 6 + idx - (7 * Math.abs(currentPage - 3)) === 0
                            ? previousMonthLastDate
                            : getDate.format("D") - 6 + idx - (7 * Math.abs(currentPage - 3)) > 0
                            ? getDate.format("D") - 6 + idx - (7 * Math.abs(currentPage - 3))
                            : previousMonthLastDate + Number(getDate.format("D")) - 6 + idx - 7 * (Math.abs(currentPage - 3))}
                        </p>
                    </div>
                </div>`
            status.insertAdjacentHTML('beforeend', HTML)
        })
    }
    const changeButtonColor = (target, color) => {
        target.querySelector('path').style.fill = color
        target.querySelector('rect').style.stroke = color
    }
    const initAddEventListener = () => {
        let totalPage = 3;
        const preBtn = document.querySelector('.header__prevBtn');
        const nextBtn = document.querySelector('.header__nextBtn');

        preBtn.addEventListener('click', () => {
            totalPage--;
            changeButtonColor(nextBtn, '#5C96E6')
            if (totalPage <= 0) {
                changeButtonColor(preBtn, '#C4C4C4')
                totalPage = 0;
            }
            renderWeek(totalPage)
        })
        nextBtn.addEventListener('click', () => {
            totalPage++;
            changeButtonColor(preBtn, '#5C96E6')
            if (totalPage >= 3) {
                changeButtonColor(nextBtn, '#C4C4C4')
                totalPage = 3;
            }
            renderWeek(totalPage)
        })
    }
    initAddEventListener();
    renderCurrentDateIndicator();
    renderWeek();
</script>
<h2>코드설명<h2>
renderCurrentDateIndicator는 좌측에 있는 오늘 날짜 (형식: yyyy-mm-dd)를 나타낸다.
getDate.get("d")는 요일을 나타내는 인덱스 값으로 0은 일요일, 1은 월요일, 2는 화요일, 3은 수요일, ⋯ ,6은 토요일이다. 이를 sevenDays 객체로 묶어서 if문 중첩을 최대한 피한다.
매월 1일의 전날은 전 월의 30일 or 31일이 되므로 전월이 끝나는 날짜를 알 수 있어야 한다.
(현재 날짜가 2023년 6월 11일이라면, 5월은 31일까지 있으므로 31을 알 수 있어야 한다는 뜻)
1. currentDate.subtract(1, 'month')는 현재의 달에서 1달 뺀다.
2. endOf('month')는 위에 결과로 나온 날짜의 해당 월의 마지막 날짜를 반환한다.
3. date()는 마지막 날짜를 날짜 형식으로 변환하여 반환한다.
getDate.format("D")는 오늘 일자를 나타내는 값이다. (예를 들어 6월 11일은 11을 반환함)
${getDate.format("D") - 6 + idx - (7 * Math.abs(currentPage - 3)) === 0
? previousMonthLastDate
: getDate.format("D") - 6 + idx - (7 * Math.abs(currentPage - 3)) > 0
? getDate.format("D") - 6 + idx - (7 * Math.abs(currentPage - 3))
: previousMonthLastDate + Number(getDate.format("D")) - 6 + idx - 7 * (Math.abs(currentPage - 3))}
  
왜 getDate.format("D") - 6을 해야하는가

한줄에 보여줄 수 있는 최대 일자의 개수는 7일이다. 오늘(11일)이 가장 우측에 존재하므로 반대편 가장 좌측의 있는 값은 5일이다. 이 두 날짜는 6칸 떨어져 있으므로 반복을 돌면서 인덱스를 더해주면 준다. 5부터 11을 만들 수 있다.

왜 -7 * Math.abs(currentPage - 3)을 해야하는가

지금 목적은 최근 4주를 보여줄 수 있으면 된다. 현재 페이지에서 이미 한 주를 보여주고 있으므로 옆으로 3칸만 이동할 수 있으면 될 것이다.
따라서 currentPage = 3인 상태고 현재 페이지에서는 이동할 필요 없으니까 3을 뺀다.
모두가 아는 것처럼 한 주는 7일이므로 7을 곱해서 결론적으로 한 칸 이동할 때마다 현재 주에서 -7, -14, -21이 될 수 있도록 한다.
앞으로 한 칸 이동하면 currentPage = 2가 되니까 음수가 나오면 안되서 절댓값을 씌우기 위해 Math.abs()를 한다) 물론 반대로 해도 됨

${getDate.format("D") - 6 + idx - (7 Math.abs(currentPage - 3)) === 0
? previousMonthLastDate
: getDate.format("D") - 6 + idx - (7 Math.abs(currentPage - 3)) > 0
? getDate.format("D") - 6 + idx - (7 Math.abs(currentPage - 3))
: previousMonthLastDate + Number(getDate.format("D")) - 6 + idx - 7 (Math.abs(currentPage - 3))}

1) 달력에서 0은 곧 전월의 말일을 의미하게 된다. (매 월 1일의 전 날은 31일 혹은 30일이지 않은가)
그래서 getDate.format("D") - 6 + idx - (7 * Math.abs(currentPage - 3)) === 0이 되면 previousMonthLastDate를 반환한다.
2) 0보다 크면 그냥 뺀 날짜만 반환하면 된다.
3) 이제 남은건 음수가 나오는 경우다. previousMonthLastDate를 반환하게 된 순간부터 이제 더 이상 기준은 현재 월(6월)의 일이 아니라 전월(5월)의 말일이 기준이 된다. 따라서 previousMonthLastDate를 더해줘야만 날짜에서 음수가 나오는 불상사를 막을 수 있다.
