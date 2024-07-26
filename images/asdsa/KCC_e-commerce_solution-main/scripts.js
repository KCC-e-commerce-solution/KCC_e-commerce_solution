// document.addEventListener('DOMContentLoaded', () => {
//   let slideIndex = 0;
//   showSlides();

//   // 슬라이드를 표시하고 자동으로 슬라이드를 넘기는 함수입니다.
//   function showSlides() {
//     let slides = document.querySelectorAll('.slide');
//     let dots = document.querySelectorAll('.dot');

//     // 모든 슬라이드를 숨깁니다.
//     for (let i = 0; i < slides.length; i++) {
//       slides[i].style.display = 'none';
//     }

//     slideIndex++;
//     if (slideIndex > slides.length) {
//       slideIndex = 1;
//     }

//     // 모든 점에서 'active' 클래스를 제거합니다.
//     for (let i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(' active', '');
//     }
//     console.log(slides);
//     console.log(dots);
//     slides[slideIndex - 1].style.display = 'block';
//     dots[slideIndex - 1].className += ' active';

//     setTimeout(showSlides, 2000); // 2초(2000밀리초) 후에 showSlides 함수를 다시 호출하여 슬라이드를 전환합니다.
//   }

//   // 특정 슬라이드로 이동하는 함수입니다.
//   function currentSlide(n) {
//     showSpecificSlide(n);
//   }

//   // 특정 슬라이드를 표시하는 함수입니다.
//   function showSpecificSlide(n) {
//     let slides = document.querySelectorAll('.slide');
//     let dots = document.querySelectorAll('.dot');

//     // 모든 슬라이드를 숨깁니다.
//     for (let i = 0; i < slides.length; i++) {
//       slides[i].style.display = 'none';
//     }

//     slideIndex = n;

//     // 모든 점에서 'active' 클래스를 제거합니다.
//     for (let i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(' active', '');
//     }

//     slides[slideIndex - 1].style.display = 'block';
//     dots[slideIndex - 1].className += ' active';
//   }

//   // JSON 파일을 로드합니다.
//   fetch('items.json')
//     .then((response) => response.json())
//     .then((data) => {
//       const productsDiv = document.getElementById('products');
//       data.forEach((item) => {
//         // 제품 정보를 표시할 div 요소를 만듭니다.
//         const productDiv = document.createElement('div');
//         productDiv.className = 'product';

//         // 제품 이미지
//         const img = document.createElement('img');
//         img.src = item.image;
//         productDiv.appendChild(img);

//         // 제품 가격
//         const price = document.createElement('p');
//         price.textContent = `가격: ${item.price}`;
//         productDiv.appendChild(price);

//         // 배송비
//         const deliveryFee = document.createElement('p');
//         deliveryFee.textContent = `배송비: ${item.delivery_fee}`;
//         productDiv.appendChild(deliveryFee);

//         // 재고
//         const stock = document.createElement('p');
//         stock.textContent = `재고: ${item.stock}`;
//         if (item.stock <= 5) {
//           stock.className = 'stock-warning';
//         }
//         productDiv.appendChild(stock);

//         // 할인율
//         const discount = document.createElement('p');
//         discount.textContent = `할인율: ${item.discount}`;
//         productDiv.appendChild(discount);

//         // 출고 날짜
//         const shippingDate = document.createElement('p');
//         shippingDate.textContent = `배송 날짜: ${item.shipping_date}`;
//         productDiv.appendChild(shippingDate);

//         // 제품 div를 페이지에 추가합니다.
//         productsDiv.appendChild(productDiv);
//       });
//     });
// });
$(document).ready(function () {
  let slideIndex = 0;
  showSlides();

  // 슬라이드를 표시하고 자동으로 슬라이드를 넘기는 함수입니다.
  function showSlides() {
    let slides = $('.slide');
    let dots = $('.dot');

    // 모든 슬라이드를 숨깁니다.
    slides.hide();

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    // 모든 점에서 'active' 클래스를 제거합니다.
    dots.removeClass('active');

    // 현재 슬라이드와 점을 표시합니다.
    slides.eq(slideIndex - 1).show();
    dots.eq(slideIndex - 1).addClass('active');

    setTimeout(showSlides, 2000); // 2초 후에 showSlides 함수를 다시 호출하여 슬라이드를 전환합니다.
  }

  // Add click events to dots
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide(index + 1);
    });
  });

  // 특정 슬라이드로 이동하는 함수입니다.
  function currentSlide(n) {
    showSpecificSlide(n);
  }

  // 특정 슬라이드를 표시하는 함수입니다.
  function showSpecificSlide(n) {
    let slides = $('.slide');
    let dots = $('.dot');

    // 모든 슬라이드를 숨깁니다.
    slides.hide();

    slideIndex = n;

    // 모든 점에서 'active' 클래스를 제거합니다.
    dots.removeClass('active');

    // 현재 슬라이드와 점을 표시합니다.
    slides.eq(slideIndex - 1).show();
    dots.eq(slideIndex - 1).addClass('active');
  }

  // JSON 파일을 로드합니다.
  $.getJSON('items.json', function (data) {
    const productsDiv = $('#products');
    $.each(data, function (index, item) {
      // 제품 정보를 표시할 div 요소를 만듭니다.
      const productDiv = $('<div>').addClass('product');

      // 제품 이미지
      const img = $('<img>').attr('src', item.image);
      productDiv.append(img);

      // 제품 가격
      const price = $('<p>').text(`가격: ${item.price}`);
      productDiv.append(price);

      // 배송비
      const deliveryFee = $('<p>').text(`배송비: ${item.delivery_fee}`);
      productDiv.append(deliveryFee);

      // 재고
      const stock = $('<p>').text(`재고: ${item.stock}`);
      if (item.stock <= 5) {
        stock.addClass('stock-warning');
      }
      productDiv.append(stock);

      // 할인율
      const discount = $('<p>').text(`할인율: ${item.discount}`);
      productDiv.append(discount);

      // 출고 날짜
      const shippingDate = $('<p>').text(`배송 날짜: ${item.shipping_date}`);
      productDiv.append(shippingDate);

      // 제품 div를 페이지에 추가합니다.
      productsDiv.append(productDiv);

      // 제품을 누르면 상세 페이지로 바디 부분이 변경되는 부분 !!!!!
      productDiv.click(function () {
        // temp.html 로드 및 데이터 전달
        loadTempHtml(item);
      });
    });
  });
});

function loadTempHtml(productData) {
  // AJAX 요청을 시작합니다.
  $.ajax({
    url: 'temp.html', // 요청할 URL 설정 ('temp.html')
    success: function (html) {
      // 요청이 성공하면 실행되는 콜백 함수
      // 'main-content' 요소의 HTML을 로드된 'temp.html'의 내용으로 교체합니다.
      $('#main-content').html(html);

      // 로드된 HTML에 제품 데이터를 주입하는 함수를 호출합니다.
      displayProductData(productData);
    },
    error: function (xhr, status, error) {
      // 요청이 실패하면 실행되는 콜백 함수
      console.error('Failed to load temp.html:', status, error); // 콘솔에 에러 메시지 출력
    },
  });
}

/**
 * displayProductData 함수는 로드된 HTML 내에 제품 정보를 표시합니다.
 * @param {Object} data - 주입할 제품 데이터
 */

function displayProductData(data) {
  const mainContent = $('#main-content');
  console.log(data);

  mainContent.append($('<img>').attr('src', data.image));
  mainContent.append(`<p>${data.discount}</p>`);
  mainContent.append(`<p>${data.price}</p>`);
  mainContent.append(`<p>${data.stock}</p>`);
}
