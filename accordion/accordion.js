window.onload = () => {
	const panelFaqContainer = document.querySelectorAll('.panel-faq-container');
	const panelFaqAnswer = document.querySelectorAll('.panel-faq-answer');
	const btnAllClose = document.getElementById('btn-all-close');

	// //반복문 순회하면서 해당 FAQ 제목 클릭시 콜백 처리
	for (let i = 0; i < panelFaqContainer.length; i++) {
		panelFaqContainer[i].addEventListener('click', function () {
			if (this.querySelector('.panel-faq-answer').classList.contains('active')) {
				this.querySelector('.panel-faq-answer').classList.remove('active');
			} else {
				btnAllClose.click();
				this.querySelector('.panel-faq-answer').classList.add('active');
			}
		});
	}
	btnAllClose.addEventListener('click', () => {
		// 버튼 클릭시 처리할 일
		for (let i = 0; i < panelFaqAnswer.length; i++) {
			panelFaqAnswer[i].classList.remove('active');
		}
	});
}