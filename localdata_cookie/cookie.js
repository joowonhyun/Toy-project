// 자바스크립트로 쿠키(Cookie) 읽기, 생성하기, 삭제하기
// 기본적인 방법: document.cookie = "name= ???; name2= ???; expires= ???; path= ???";

// 쿠키 읽기 : document.cookie;
function getCookie() {
	const allCookies = document.cookie; // 하나의 문자열로 리턴 --> cookie
	if (allCookies !== '') {
		alert(`저장된 쿠키의 값은 ${allCookies} \n(다시 방문해주셔서 감사합니다.)`)
	}else {alert('저장된 쿠키가 없습니다.')}
}

//쿠키 생성하기
function setCookie() {
	//날짜를 쿠키로 저장하기 위해서는 UTC 방식으로 표기 -> toUTCString() 메서드 사용.
	let expiration = new Date();
	expiration.setDate(expiration.getDate() + 20);
	
	let cookies = '';
	cookies=`userId=joowon; expires="${expiration.toUTCString()}";`;
	console.log(cookies);

	//쿠키 저장하기
	document.cookie = cookies;
	alert('쿠키를 생성하였습니다.');
}

// 쿠키 삭제하기
function delCookie() {
	document.cookie = 'userid=; expires=Sat, 01 Jan 1972 00:00:00 GMT';
	alert( '쿠키를 삭제하였습니다.' );
}

/* [ ! ] Summary
	// document.cookie 에 값을 대입하는 형태로 쿠키 삭제( or 생성/수정 ).
	// 사실상 쿠키의 삭제는 수정하는 것이라고 보면 된다.
	// 쿠키 삭제는? --> 이미 한참 지나간 시간을 입력해버림으로써 쿠키를 삭제시킨다.
	// document.cookie = 'username=hongkildong';  // 쿠키 생성
	// document.cookie = 'username=leesoonsin';  // 쿠키 수정
	// document.cookie = 'username=; expires=Sat, 01 Jan 1972 00:00:00 GMT';  // 쿠키 삭제
*/
















