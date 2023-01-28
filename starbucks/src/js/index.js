// TODO localStorage Read & Write
// - [v] localStorage에 데이터를 저장한다.
// - [v] 메뉴를 추가할 때
// - [v] 메뉴를 수정할 때
// - [v] 메뉴를 삭제할 때
// - [V] localStorage에 있는 데이터를 읽어온다.

// TODO 메뉴판 관리
// - [V] 에스프레소 메뉴판 관리
// - [V] 프라푸치노 메뉴판 관리 
// - [V] 블렌디드 메뉴판 관리
// - [V] 티바나 메뉴판 관리
// - [V] 디저트 메뉴판 관리

// TODO 페이지 접근 시 최초 데이터 Read & Rendering
// - [V] 페이지에 최초로 접근할 때는 localstorage 에스프레소 메뉴를 읽어온다.
// - [V] 에스프레소 메뉴를 페이지에 그려준다.

// - [V] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [V] 품절 버튼을 추가한다.
// - [V] 품절 버튼을 클릭하면 localStorage 상태값이 저장된다.
// - [V] 클릭 이벤트에서 가장 가까운 li태그의 class 속성 값에 sold-out을 추가한다.

import { $ } from './utils/dom.js';
import store from './store/index.js';
import MenuApi from './api/index.js';
// [] 링크에 있는 웹 서버 저장소를 clone하여 로컬에서 웹 서버를 실행시킨다.
// [] 웹 서버를 띄워서 실제 서버에 데이터의 변경을 저장하는 형태로 리팩터링한다.
// [] localStorage에 저장하는 로직은 지운다.
// [] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.
// [] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
// [] 중복되는 메뉴는 추가할 수 없다.

function App() {
  // 상태 = 변할 수 있는 데이터 (갯수, 메뉴명)
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';
  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
    inintEventListeners();
  }

  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    const template = this.menu[this.currentCategory].map((item) => {
      return `
      <li data-menu-id="${item.id}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" :""}">${item.name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
      </li>`
    }).join("");

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  }

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  }
  const addMenuName = async () => {
    if ($("#menu-name").value === '') {
      alert('값을 입력해주세요.')
      return;
    }
    const duplicatedItem = this.menu[this.currentCategory].find(
      menuItem => menuItem.name === $("#menu-name").value
    );
    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요");
      $("#menu-name").value = "";
      return;
    }
    const menuName = $("#menu-name").value;
    await MenuApi.createMenu(this.currentCategory, menuName);
    render();
    $("#menu-name").value = "";
  }
  const updateMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);
    render();
  }
  const removeMenuName = async (e) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      render();
    }
  }
  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
    // 직접 토글 하는 영역
    // this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
  }
  const changeCategory = (e) => {
    const isCateGoryBtn = e.target.classList.contains("cafe-category-name")
    if (isCateGoryBtn) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`
      render();
    }
  }
  const inintEventListeners = () => {
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    })
  
    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    })
    $('#menu-submit-button').addEventListener('click', addMenuName);
    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') { return; }
      addMenuName();
    });
    $("nav").addEventListener('click', changeCategory);
  };
}
const app = new App();
app.init();