let products = [];
let cart = [];

fetch('store.json')
  .then(res => res.json())
  .then(function (data) {
    products = data.products;
    products.forEach((el) => {
      let template =
        `<div class="col-md-3">
            <div class="item" draggable="true" data-id="${el.id}">
              <img src="../store/img/${el.photo}">
              <h4 class="name"><strong>${el.title}</strong></h4>
              <h5>${el.brand}</h5>
              <p>가격 : ${el.price}</p>
              <button class="add" data-id="${el.id}">담기</button>
            </div>
        </div>`
      document.querySelector('.product-list').insertAdjacentHTML('beforeend', template);
    });

    for (let i = 0; i < document.querySelectorAll('.add').length; i++) {
      document.querySelectorAll('.add')[i].addEventListener('click', basketfunction);
    }

    function basketfunction (e) {
      let productId = e.target.dataset.id;
      //담기버튼 누를 때 let cart = [] 에 상품을 {} 형태로 보관부터하고
      //let cart에 상품이 이미있는지 찾고 없으면 let cart에 {}추가, 있으면 수량만 ++;
      let whatCount = cart.findIndex((a)=>{ return a.id == productId })
      if (whatCount == -1) {
        let nowProduct = products.find((a)=> { return a.id == productId });
        nowProduct.count = 1;
        cart.push(nowProduct);
      } else {
        cart[whatCount].count++;
      }
      console.log(cart);
      
      
  //담기버튼 누를 때 마다 장바구니 박스에 let cart 안에 있던 {} 갯수만큼 html 생성
      $('.basket').html('');
      cart.forEach((el)=>{
        $('.basket').append(`
          <div class="col-md-3 bg-white">
          <img src="../store/img/${el.photo}">
            <h4>${el.title}</h4>
            <h4>${el.brand}</h4>
            <p>${el.price}</p>
            <input type="number" value="${el.count}" class="item-count w-100">
          </div>
        `);
      });
      
  //총가격 계산해서 표기해주는 기능
      calculate();
      
  //input값 조절해도 총가격 계산해서 표기해줘야될듯
      $('.item-count').on('input', function(){
        calculate();
      });
    }
  });


  //===========================
  //총가격 계산해서 표기해주는 기능
  //===========================  
    function calculate(){
      
      let finalPrice = 0;
      
      for (let i = 0; i < $('.item-count').length; i++){
        var price = $('.item-count').eq(i).val();
        var count = $('.item-count').eq(i).siblings('p').text();
        finalPrice += parseFloat(price * count);
      }
      $('.final-price').html('합계 ' + finalPrice)
    }

//검색기능
document.querySelector('#search').addEventListener('input', () => {
  let searchName = document.querySelector('#search').value;
  let nowProducts = products.filter((data) => {
    return data.title.includes(searchName) || data.brand.includes(searchName)
  });

  document.querySelector('.product-list').innerHTML = '';
  nowProducts.forEach((el) => {
    let template =
      `<div class="col-md-3">
          <div class="item" draggable="true" data-id="${el.id}">
          <img src="../store/img/${el.photo}">
            <h4 class="name"><strong>${el.title}</strong></h4>
            <h5>${el.brand}</h5>
            <p>가격 : ${el.price}</p>
            <button class="add" data-id="${el.id}">담기</button>
          </div>
      </div>`
    document.querySelector('.product-list').insertAdjacentHTML('beforeend', template)
  });

  document.querySelectorAll('.product-list h4').forEach((el) => {
    let title = el.innerHTML;
    title = title.replace(searchName, `<span style="background : yellow">${searchName}</span>`);
    el.innerHTML = title;
  });
});



//드래그 기능

document.querySelector('.product-list').addEventListener('dragstart', (e) => {
  e.dataTransfer.setData("product-id", e.target.dataset.id);
});

document.querySelector('.basket').addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.querySelector('.basket').addEventListener('drop', (e) => {
  let productId = e.dataTransfer.getData("product-id");
  $('.add').eq(productId).click();
});
