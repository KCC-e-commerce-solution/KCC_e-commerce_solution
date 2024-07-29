$(document).ready(function () {
  // 슬라이드 쇼의 현재 인덱스를 관리할 변수를 초기화
  let slideIndex = 0;
  // 슬라이드 쇼를 시작
  showSlides();

  // 슬라이드를 자동으로 변경하는 함수
  function showSlides() {
    let slides = $('.slide'); // 모든 슬라이드 요소를 선택
    let dots = $('.dot'); // 모든 도트(네비게이션 점) 요소를 선택
    slides.hide(); // 모든 슬라이드를 숨깁니다.
    dots.removeClass('active'); // 모든 도트에서 'active' 클래스를 제거

    // 슬라이드 인덱스를 증가시키고, 필요한 경우 처음으로 리셋
    slideIndex = (slideIndex % slides.length) + 1;
    // 현재 슬라이드와 해당 도트를 활성화
    slides.eq(slideIndex - 1).show();
    dots.eq(slideIndex - 1).addClass('active');

    // 2초 후에 함수를 다시 호출하여 다음 슬라이드를 표시
    setTimeout(showSlides, 2000);
  }

  // 각 도트에 클릭 이벤트 핸들러 추가
  $('.dot').each(function (index) {
    $(this).click(function () {
      currentSlide(index + 1);
    });
  });

  // 도트 클릭 시 특정 슬라이드로 이동하는 함수를 바인딩
  function currentSlide(n) {
    slideIndex = n - 1; // 인덱스를 조정
    showSlides(); // 슬라이드를 갱신
  }
});

// 페이징 처리, 제품 처리 부분

$(document).ready(function () {
  let products = []; // 전역 변수로 사용되어 제품 목록을 저장
  let originalProducts = []; // 필터링이나 정렬 시, 원본 데이터를 유지하기 위한 배열
  const itemsPerPage = 12; // 한 페이지에 표시할 제품의 수를 설정
  let currentPage = 1; // 현재 페이지 번호를 초기화

  // items.json에서 제품 데이터를 비동기적으로 로드
  $.getJSON('items.json', function (data) {
    products = data; // 로드된 데이터를 전역 변수 products에 저장
    originalProducts = [...data]; // 로드된 데이터의 복사본을 originalProducts에 저장
    displayProducts(currentPage); // 초기 페이지의 제품을 화면에 표시
    setupPagination(); // 페이지네이션을 설정
  });

  // 주어진 페이지의 제품을 화면에 표시하는 함수
  function displayProducts(page, productsToShow = products) {
    const startIndex = (page - 1) * itemsPerPage; // 현재 페이지의 첫 제품 인덱스를 계산
    const endIndex = startIndex + itemsPerPage; // 현재 페이지의 마지막 제품 인덱스를 계산
    const pageProducts = productsToShow.slice(startIndex, endIndex); // 현재 페이지에 해당하는 제품들을 추출

    const productsDiv = $('#products');
    productsDiv.empty(); // 이전에 표시된 제품들을 제거
    pageProducts.forEach((product) => {
      const productDiv = $('<div>')
        .addClass('product')
        .data('id', product.id) // 각 제품 div에 data-id 속성을 추가
        .append(
          $('<div>')
            .addClass('image-container')
            .append(
              $('<img>')
                .attr('src', product.image)
                .attr('id', 'imageDetailImage') //여기다
                .on('click', function () {}),
              $('<i>')
                .addClass(
                  product.liked
                    ? 'fas fa-heart like-icon'
                    : 'far fa-heart like-icon'
                )
                .css({
                  'font-size': '24px',
                  color: 'red',
                  position: 'absolute',
                  top: '5px',
                  right: '1px',
                  cursor: 'pointer',
                }),
              $('<i>').addClass('far fa-check-circle check-icon').css({
                'font-size': '24px',
                color: 'green',
                position: 'absolute',
                top: '5px',
                left: '1px',
                cursor: 'pointer',
              })
            ),
          $('<p>').text(`가격: ${product.price}`),
          $('<p>').text(`할인율: ${product.discount}`),
          $('<p>')
            .addClass(product.stock <= 5 ? 'stock-warning' : '')
            .text(`재고: ${product.stock}`),
          $('<p>').text(`배송 날짜: ${product.shipping_date}`)
        );

      productsDiv.append(productDiv); // 생성된 div를 productsDiv에 추가
    });
  }

  // 체크 표시 누른 제품 비교하는 모달창 띄우기
  let selectedProducts = [];

  $(document).on('click', '.check-icon', function (event) {
    event.stopPropagation();
    $(this).toggleClass('far fas');
    const productDiv = $(this).closest('.product');
    const productId = productDiv.data('id'); // 상품 ID를 저장할 방법이 필요합니다. 예를 들어, 각 제품 div에 data-id 속성을 추가하세요.

    if ($(this).hasClass('fas')) {
      // 선택된 경우, 배열에 추가
      const product = products.find((p) => p.id === productId); // id는 각 제품의 고유 식별자로 가정
      selectedProducts.push(product);
    } else {
      // 선택 취소된 경우, 배열에서 제거
      selectedProducts = selectedProducts.filter((p) => p.id !== productId);
    }
  });

  $('#comparator').click(function () {
    if (selectedProducts.length > 1) {
      showComparisonModal(selectedProducts);
    } else {
      alert('비교를 위해 최소 2개의 제품을 선택해주세요.');
    }
  });

  function showComparisonModal(products) {
    const modalContent = $('<div>').addClass('comparison-modal');
    products.forEach((product) => {
      modalContent.append(
        $('<div>')
          .addClass('product-comparison')
          .append(
            $('<img>').attr('src', product.image),

            $('<canvas>')
              .attr('id', `chart-${product.id}`)
              .css({ width: '400px', height: '400px' }),
            $('<p>').text(`가격: ${product.price}`),
            $('<p>').text(`할인율: ${product.discount}`),
            $('<p>').text(`판매량: ${product.sales}`),
            $('<p>').text(`별점: ${product.rating}`),
            $('<p>').text(`재고: ${product.stock}`),
            $('<p>').text(`배송 날짜: ${product.shipping_date}`)
          )
      );
    });

    // 엑스(X) 아이콘을 추가하여 모달을 닫는 기능 구현
    const closeButton = $('<button>')
      .addClass('close-button')
      .html('&times;')
      .on('click', function () {
        $('#modal-container').fadeOut();
      });

    modalContent.prepend(closeButton);
    $('#modal-container')
      .html(modalContent)
      .fadeIn(function () {
        createComparisonCharts(products);
      });
  }

  function createComparisonCharts(products) {
    products.forEach((product) => {
      const ctx = document
        .getElementById(`chart-${product.id}`)
        .getContext('2d');
      new Chart(ctx, {
        type: 'bar', // or 'radar'
        data: {
          labels: ['가격', '할인율', '판매량', '별점', '재고'],
          datasets: [
            {
              label: product.name,
              data: [
                parseInt(product.price.replace(/[^\d.]/g, '')) / 1000,
                product.discount.replace(/[^\d.]/g, ''),
                product.sales,
                product.rating,
                product.stock,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false, // 레전드를 비활성화
            },
          },
        },
      });
    });
  }

  // 페이지네이션을 설정하는 함수
  function setupPagination() {
    const pageCount = Math.ceil(products.length / itemsPerPage); // 전체 페이지 수를 계산
    const paginationDiv = $('#pagination');
    paginationDiv.empty(); // 이전 페이지네이션 링크를 제거

    for (let i = 1; i <= pageCount; i++) {
      const pageLink = $('<a>')
        .attr('href', '#')
        .text(i)
        .click(function (e) {
          e.preventDefault();
          currentPage = i; // 현재 페이지를 업데이트
          displayProducts(i); // 해당 페이지의 제품을 표시
          window.scrollTo({ top: 600 });
        });
      paginationDiv.append(pageLink); // 생성된 링크를 paginationDiv에 추가
    }
  }

  // 임시 HTML 페이지를 로드하고 제품 데이터를 표시하는 함수
  function loadTempHtml(productData) {
    $.ajax({
      url: 'temp.html',
      success: function (html) {
        $('#main-content').html(html); // 메인 콘텐츠 영역을 임시 HTML로 교체
        displayProductData(productData); // 제품 데이터를 화면에 표시
      },
    });
  }

  // 제품 데이터를 표시하는 함수
  function displayProductData(data) {
    const mainContent = $('#main-content');
    mainContent
      .empty()
      .append(
        $('<img>').attr('src', data.image),
        $('<p>').text(`할인율: ${data.discount}`),
        $('<p>').text(`가격: ${data.price}`),
        $('<p>').text(`재고: ${data.stock}`)
      );
  }

  // 전체 제품을 다시 표시하는 버튼의 이벤트 핸들러
  $('#all').click(function () {
    displayProducts(currentPage, originalProducts); // 원본 데이터로 화면을 다시 로드
  });

  // 정렬 함수를 사용하여 제품을 정렬하고 표시하는 함수
  function sortAndDisplay(sortFunction) {
    let sorted = [...products].sort(sortFunction); // 제품 배열을 정렬 함수에 따라 정렬
    displayProducts(currentPage, sorted); // 정렬된 데이터를 화면에 표시
  }

  // 가격과 할인율에 따른 정렬 버튼의 이벤트 핸들러
  $('#highPrice').click(() =>
    sortAndDisplay(
      (a, b) =>
        parseFloat(b.price.replace(/[^\d.]/g, '')) -
        parseFloat(a.price.replace(/[^\d.]/g, ''))
    )
  );
  $('#lowPrice').click(() =>
    sortAndDisplay(
      (a, b) =>
        parseFloat(a.price.replace(/[^\d.]/g, '')) -
        parseFloat(b.price.replace(/[^\d.]/g, ''))
    )
  );
  $('#sale').click(() =>
    sortAndDisplay(
      (a, b) =>
        parseFloat(b.discount.replace(/[^\d.]/g, '')) -
        parseFloat(a.discount.replace(/[^\d.]/g, ''))
    )
  );

  // 검색 기능 실행
  displaySearchHistory();

  // 검색 실행 함수
  function performSearch(searchQuery) {
    var filteredProducts = products.filter((product) => {
      return (
        (product.detail_explain &&
          product.detail_explain.includes(searchQuery)) ||
        (product.category && product.category.includes(searchQuery))
      );
    });

    console.log(filteredProducts);
    displayProducts(currentPage, filteredProducts); // 필터링된 제품을 화면에 표시
    saveSearchQuery(searchQuery); // 검색어 저장
    displaySearchHistory(); // 검색 기록 갱신
  }

  // 검색어를 localStorage에 저장하는 함수
  function saveSearchQuery(query) {
    if (!query) return; // 빈 쿼리는 저장하지 않음
    let searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (searches.includes(query)) return; // 이미 저장된 검색어는 중복 저장하지 않음
    searches.push(query);
    localStorage.setItem('searchHistory', JSON.stringify(searches));
  }

  // localStorage에서 검색 기록을 가져와서 화면에 표시하는 함수
  function displaySearchHistory() {
    let searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
    $('#searchHistory').empty().append($('<li>').text('최근 검색어'));
    searches.forEach(function (search) {
      $('#searchHistory').append(
        $('<li>')
          .text(search)
          .click(function () {
            $('.search').val(search); // 검색 입력창에 검색어 설정
            performSearch(search); // 검색 실행
          })
      );
    });
  }

  //-------------------------

  // 검색 기록 보이는 조건 걸기
  var $searchContent = $('#searchContent'); // 검색 입력 상자
  var $searchHistory = $('#searchHistory'); // 검색 기록 목록

  // 검색 입력 상자에 포커스가 갔을 때 검색 기록 표시
  $searchContent.focus(function () {
    updateSearchHistoryDisplay($searchContent.val()); // 현재 입력값에 기반한 검색 기록 표시
    $searchHistory.show();
  });

  // 입력 내용에 따라 검색 기록을 필터링하여 표시하는 함수
  function updateSearchHistoryDisplay(query) {
    let searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
    $searchHistory.empty(); // 기존 목록을 비웁니다.

    if (query === '') {
      $('#searchHistory').append($('<li>').text('최근 검색어'));
      // 검색어가 비어 있으면 전체 기록을 표시
      searches.forEach(function (search) {
        appendSearchItem(search);
      });
    } else {
      // 입력값에 따라 필터링
      let filteredSearches = searches.filter(function (search) {
        return search.toLowerCase().includes(query.toLowerCase());
      });
      filteredSearches.forEach(function (search) {
        appendSearchItem(search);
      });
    }
  }

  // 검색 기록 항목 추가 함수
  function appendSearchItem(search) {
    $searchHistory.append(
      $('<li>')
        .text(search)
        .click(function () {
          $searchContent.val(search); // 검색 입력창에 검색어 설정
          performSearch(search); // 검색 실행
        })
    );
  }

  // 검색창에 실시간으로 입력되는 내용을 감지
  $searchContent.on('input', function () {
    updateSearchHistoryDisplay($searchContent.val());
  });

  //-------------------------

  // 검색 기록 목록에서 마우스가 벗어났을 때 숨기기
  $searchHistory.mouseleave(function () {
    $searchHistory.hide();
  });

  // 검색 아이콘 클릭 이벤트
  $('#searchIcon').click(function () {
    var searchQuery = $('.search').val(); // 입력 필드에서 검색어를 가져옵니다.
    performSearch(searchQuery); // 검색 실행
    window.scrollTo({ top: 600 });
  });

  // 엔터 키 이벤트 추가
  $('.search').on('keypress', function (e) {
    if (e.which == 13) {
      // 엔터 키가 눌렸을 때
      performSearch(searchQuery); // 검색 실행
      var searchQuery = $('.search').val(); // 입력 필드에서 검색어를 가져옵니다.
      performSearch(searchQuery); // 검색 실행
      window.scrollTo({ top: 600 });
    }
  });

  // 카테고리 검색
  $('.dropdown_content ul li').on('click', function () {
    // 클릭된 항목의 텍스트 가져오기
    var itemText = $(this).text();
    console.log(`Clicked item: ${itemText}`);
    performSearch(itemText); // 검색 실행
  });

  // 화면 젤 위로 이동하는 아이콘
  // 이미지가 로드되기 전에 잠시 기본 크기로 표시되는거 방지용
  $(function () {
    $('#floatingImage')
      .on('load', function () {
        $(this).fadeIn(); // 로드 완료 후 서서히 표시
      })
      .each(function () {
        if (this.complete) $(this).load(); // 캐시된 이미지 대응
      });
  });

  $('#floatingImage').click(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 채팅봇
  // 이미지가 로드되기 전에 잠시 기본 크기로 표시되는거 방지용
  $(function () {
    $('#robotImage')
      .on('load', function () {
        $(this).fadeIn(); // 로드 완료 후 서서히 표시
      })
      .each(function () {
        if (this.complete) $(this).load(); // 캐시된 이미지 대응
      });
  });

  // 채팅봇

  // 질문 클릭 시 답변 토글
  $('#chatContent').on('click', '.question', function () {
    $(this).next('.answer').slideToggle();
  });

  // 로봇 이미지 클릭 시 모달 표시
  $('#robotImage').click(function () {
    $.getJSON('question.json', function (data) {
      var chatHtml = '';
      data.forEach(function (item) {
        chatHtml +=
          '<div class="p-2 question"><strong>Q: ' +
          item.question +
          '</strong></div>';
        chatHtml +=
          '<div class="p-2 answer" style="display:none;"><em>A: ' +
          item.answer +
          '</em></div>';
      });
      $('#chatContent').html(chatHtml);
      $('#chatModal').modal('show');
    });
  });

  // 카테고리 바 클릭 시 목록 토글
  $('.fa-bars').on('click', function () {
    $('.dropdown_content ul').toggle(); // 목록의 표시 상태를 토글
  });

  $(document).on('click', '.like-icon', function (event) {
    event.preventDefault(); // 기본 이벤트를 방지합니다.

    const $icon = $(this); // 현재 클릭된 아이콘
    const productId = $(this).closest('.product').data('id'); // 제품 ID를 가져옵니다.
    let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || []; // 저장된 찜 목록을 가져옵니다.
    const productIndex = likedProducts.findIndex((p) => p.id === productId); // 현재 제품이 찜 목록에 있는지 인덱스를 찾습니다.

    if (productIndex === -1) {
      // 제품이 찜 목록에 없다면 추가
      const product = products.find((p) => p.id === productId);
      likedProducts.push(product); // 제품 목록에 추가
      $icon.removeClass('far').addClass('fas'); // 아이콘을 채워진 하트로 변경
    } else {
      // 제품이 찜 목록에 있다면 제거
      likedProducts.splice(productIndex, 1); // 제품 목록에서 제거
      $icon.removeClass('fas').addClass('far'); // 아이콘을 빈 하트로 변경
    }

    localStorage.setItem('likedProducts', JSON.stringify(likedProducts)); // 변경된 찜 목록을 저장
  });

  // 찜 목록 보여주기
  $('#likeItems').click(function () {
    const likedProducts =
      JSON.parse(localStorage.getItem('likedProducts')) || [];

    console.log(likedProducts);

    likedProducts.forEach((product) => (product.liked = true));

    if (likedProducts.length > 0) {
      displayProducts(currentPage, likedProducts); // 각 찜한 제품 정보를 화면에   표시
    } else {
      mainContent.append($('<p>').text('찜한 제품이 없습니다.'));
    }
  });
});

//json 삽입
$(function img() {
  $('#products').on('click', '#imageDetailImage', function (event) {
    event.stopPropagation;
    $.ajax({
      url: 'a.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        
        let resultWindow = window.open('DetailShopping.html');
      
        if (resultWindow) {
          resultWindow.onload = function () {
          
            const resultDoc = resultWindow.document;

            const resultul = resultDoc.getElementById('navi_ul');

            data.forEach((item) => {
              let html = `      
              <li><a href="${item.apple1}"><img src="${item.apple1}" alt="해당없음"></a></li>
              <li><a href="${item.apple2}"><img src="${item.apple2}" alt="해당없음"></a></li>
              <li><a href="${item.apple3}"><img src="${item.apple3}" alt="해당없음"></a></li>
              <li><a href="${item.apple4}"><img src="${item.apple4}" alt="해당없음"></a></li>
              `;
              resultul.insertAdjacentHTML('beforeend', html);
            });

            //상품 정보
            let resultproduct = resultDoc.getElementById('product_text');

            data.forEach((item) => {
              let html = `
                <h3>${item.item_id}</h3>
                <br>
                <h2>${item.item_fee}</h2>
                <ul class="list">
                  <li><h5><span>카테고리</span>: ${item.item_category}</h5></li>
                  <li><h5><span>재고</span>: ${item.item_availibility}</h5></li>
                </ul>
                <hr>
                <div class="product_count">
                  <ul class="list">
                    <li>
                      <h7><span>수량 : </span></h7>
                      <div class="Quantity">                 
                        <div class="plus"><a onclick="increaseValue()"><i class="fa-solid fa-plus"></i></a></div>
                        <input type="text" name="Quantity" id="Quantity" value="1" readonly="readonly">
                        <div class="minus"><a onclick="decreaseValue()"><i class="fa-solid fa-minus"></i></a></div>            
                      </div> 
                      <button onclick="saveToLocalStorage()"><a class="button primary-btn" href="BasketShopping.html">장바구니</a></button>
                      <button><a class="button primary-btn" href="order.html">구매하기</a></button>
                    </li>
                    <br>
                    <li>
                      <a href="#"><i class="fa-regular fa-gem"></i></a>&nbsp;&nbsp;&nbsp;<a href="#"><i class="fa-regular fa-heart"></i></a>
                    </li>
                  </ul>
                </div>
              `;
              resultproduct.insertAdjacentHTML('beforeend', html);
            });

            //물품 상세정보
            let resultmyTabContent = resultDoc.getElementById('myTabContent');

            data.forEach((item) => {
              let html = `
              <div class="tab-pane" id="Description" role="tabpanel" aria-labelledby="Description-tab">
                <br>
                <h4>상품평</h4>
                <p>동일한 상품에 대해 작성된 상품평으로, 판매자는 다를 수 있습니다.</p>
                <div class="star-rating">
                    <span class="filled-stars" style="width:100%">★★★★★</span>
                    <span>☆☆☆☆☆</span>
                </div>
                <br>
                <p id="totalVotes" onclick="toggleDetailView()">(58,868)&nbsp;&nbsp;자세히 보기></p>
              

                <div id="detailView" class="detail-view">
                    <div class="star-rating">71%<span class="filled-stars" style="width:100%">★★★★★</span><span>☆☆☆☆☆</span></div>
                    <div class="star-rating">16%<span class="filled-stars" style="width:80%">★★★★☆</span><span>☆☆☆☆</span></div>
                    <div class="star-rating">7%&nbsp;<span class="filled-stars" style="width:60%">★★★☆☆</span><span>☆☆☆</span></div>
                    <div class="star-rating">3%&nbsp;<span class="filled-stars" style="width:40%">★★☆☆☆</span><span>☆☆</span></div>
                    <div class="star-rating">2%&nbsp;<span class="filled-stars" style="width:20%">★☆☆☆☆</span><span>☆</span></div>
                </div>
                <hr>
                <br>
                <table class="sortable text-center">
                  <tr style="background-color : #fafafa;">
                    <th onclick="sortTable(0)" style="width : 85px;">베스트순&nbsp; |</th> 
                    <th onclick="sortTable(1)">최신순</th>
                  </tr>
                  <tr>
                    <td>5점</td>
                    <td>2024-07-28</td>
                    <td><i class="fa-solid fa-circle-user"></i> 스마일꽃</td>
                    <td>
                      <div class="star-rating">
                        <span class="filled-stars" style="width:100%">★★★★★</span>
                        <span>☆☆☆☆☆</span>
                      </div>
                    </td>
                    <td><p>2024.07.22</p></td>
                    <td style="padding-left : 100px;"><img src="${item.itemreview}" alt="해당없음" width = 800px height = 150px><hr></td>
                  </tr>
                  <tr>
                    <td>3점</td>
                    <td>2024-07-27</td>
                    <td><i class="fa-solid fa-circle-user"></i> 김*지</td>
                    <td>
                      <div class="star-rating">
                        <span class="filled-stars" style="width:100%">★★★☆☆</span>
                        <span>☆☆☆☆☆</span>
                      </div>
                    </td>
                    <td><p>2024.07.22</p></td>
                    <td style="padding-left : 100px;"><img src="${item.itemreview1}" alt="해당없음" width = 800px height = 150px><hr></td>
                  </tr>
                  <tr>
                    <td>4점</td>
                    <td>2024-07-26</td>
                    <td><i class="fa-solid fa-circle-user"></i> 정*은</td>
                    <td>
                      <div class="star-rating">
                        <span class="filled-stars" style="width:100%">★★★★☆</span>
                        <span>☆☆☆☆☆</span>
                      </div>
                    </td>
                    <td><p>2024.07.22</p></td>
                    <td style="padding-left : 100px;"><img src="${item.itemreview2}" alt="해당없음" width = 800px height = 150px><hr></td>
                  </tr>
                  <tr>
                    <td>2점</td>
                    <td>2024-07-25</td>
                    <td><i class="fa-solid fa-circle-user"></i> 쏭쏭쏭</td>
                    <td>
                      <div class="star-rating">
                        <span class="filled-stars" style="width:100%">★★☆☆☆</span>
                        <span>☆☆☆☆☆</span>
                      </div>
                    </td>
                    <td><p>2024.07.22</p></td>
                    <td style="padding-left : 100px;"><img src="${item.itemreview3}" alt="해당없음" width = 800px height = 150px><hr></td>
                  </tr>
                </table>
              </div>
              <div class="tab-pane" id="Specification" role="tabpanel" aria-labelledby="Specification-tab">
                <div class="table-responsive">
                  <br> 
                  <h4>&nbsp;필수 표기 정보</h4>
                  <table class="table">
                    <tbody>
                      <tr>
                        <td><h5>품목 또는 명칭</h5></td>
                        <th><h5>${item.item_detail}</h5></th>
                        <td><h5>포장단위별 내용물의 용량(중량),수량,크기</h5></td>
                        <th><h5>${item.item_detail}</h5></th>
                      </tr>
                      <tr>
                        <td><h5>생산자(수입자)</h5></td>
                        <th><h5>${item.item_detail}</h5></th>
                        <td><h5>원산지</h5></td>
                        <th><h5>${item.item_detail}</h5></th>
                      </tr>
                      <tr>
                        <td><h5>제조연월일, 소비기한 또는 품질유지기한</h5></td>
                        <th><h5>${item.quality}</h5></th>
                        <td><h5>세부 품목군별 표시사항</h5></td>
                        <th><h5>${item.marking}</h5></th>
                      </tr>
                      <tr>
                        <td><h5>수입식품 문구 여부</h5></td>
                        <th><h5>${item.comment}</h5></th>
                        <td><h5>상품구성</h5></td>
                        <th><h5>${item.construct}</h5></th>
                      </tr>
                      <tr>
                        <td><h5>소비자상담관련 전화번호</h5></td>
                        <th colspan="3"><h5>${item.phoneinfo}</h5></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane" id="Comments" role="tabpanel" aria-labelledby="Comments-tab">
                <br>
                <h4>상품 문의</h4>
                <br>
                <div>
                  <ul class="li">
                    <li><i class="fa-solid fa-pen"></i> ${item.announcement1}</li>
                    <li><i class="fa-solid fa-pen"></i> ${item.announcement2}</li>
                    <li><i class="fa-solid fa-pen"></i> ${item.announcement3}</li>
                    <li><i class="fa-solid fa-pen"></i> ${item.announcement4}</li>
                    <li><i class="fa-solid fa-pen"></i> ${item.announcement5}</li>
                  </ul>
                </div>
                <hr>
                <div class="comment-box">
                  <div class="comment-info">
                    <button class="question-button1">질문</button>
                    <p style="padding-right: 700px;">${item.construct1}</p>
                    <div class="date-container">
                      <span class="date">2024/03/31 08:22:44</span>
                    </div><br>
                  </div>
                  <div class="comment-content">
                    <p>${item.review1}</p>
                  </div>
                </div>
                <div class="comment-box" style="background-color : #fafafa;">
                  <div class="comment-info">
                    <button class="question-button2">답변</button>
                    <p style="padding-right: 550px;">[${item.nickname}]</p>
                    <div class="date-container">
                      <span class="date">2024/03/31 08:22:44</span>
                    </div><br>
                  </div>
                  <div class="comment-content">
                    <p>${item.review2}</p>
                  </div>
                </div>
                <div class="comment-box" style="background-color : #fafafa;">
                  <div class="comment-info">
                    <button class="question-button2">답변</button>
                    <p style="padding-right: 550px;">[${item.nickname}]</p>
                    <div class="date-container">
                      <span class="date">2024/03/31 08:22:44</span>
                    </div><br>
                  </div>
                  <div class="comment-content">
                    <p>${item.review3}</p>
                  </div>
                </div>
                <div class="comment-box">
                  <div class="comment-info">
                    <button class="question-button1">질문</button>
                    <p style="padding-right: 700px;">${item.construct1}<?p>
                    <div class="date-container">
                      <span class="date">2024/03/31 08:22:44</span>
                    </div><br>
                  </div>
                  <div class="comment-content">
                    <p>${item.review4}</p>
                  </div>
                </div>
                <div class="comment-box" style="background-color : #fafafa;">
                  <div class="comment-info">
                    <button class="question-button2">답변</button>
                    <p style="padding-right: 550px;">[${item.nickname}]</p>
                    <div class="date-container">
                      <span class="date">2024/03/31 08:22:44</span>
                    </div><br>
                  </div>
                  <div class="comment-content">
                    <p>${item.review5}</p>
                  </div>
                </div>
                <div class="comment-box">
                  <div class="comment-info">
                    <button class="question-button1">질문</button>
                    <p style="padding-right: 700px;">${item.construct1}</p>
                    <div class="date-container">
                      <span class="date">2024/03/31 08:22:44</span>
                    </div><br>
                  </div>
                  <div class="comment-content">
                    <p>${item.review6}</p>
                  </div>
                </div>
                <div class="comment-box" style="background-color : #fafafa;">
                  <div class="comment-info">
                    <button class="question-button2">답변</button>
                    <p style="padding-right: 550px;">[${item.nickname}]</p>
                    <div class="date-container">
                      <span class="date">2024/03/31 08:22:44</span>
                    </div><br>
                  </div>
                  <div class="comment-content">
                    <p>${item.review7}</p>
                  </div>
                </div>
                <br>
                <div class="comment-box" style="background-color : #fafafa;">
                  <div class="comment-info">
                    <p class="question-button3" style="padding-right: 140px;">판매 부적격 상품 또는 허위과장광고 및 지식재산권을 침해하는 상품의 경우 신고하여 주시기 바랍니다.</ㅔ>
                    <div class="date-container">
                      <span class="date"><button>신고하기</button></span>
                    </div><br>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab">
                <p><img src="${item.notice}" alt="해당없음" width="1200"></p>
              </div>

              `;
              resultmyTabContent.insertAdjacentHTML('beforeend', html);
            });

            //이미지 더보기
            const resulimage_container =
              resultDoc.getElementById('imagecontainer');

            data.forEach((item) => {
              let html = `      
                <img src="${item.anotationsm}" alt="긴 사진" id="partial-image" style="max-width: 1300px;">
                <div id="more">
                  <img src="${item.anotationloing}" alt="긴 사진 전체" id="full-image" style="max-width: 1300px;">
                </div>
                <br>
                <button onclick="toggleMore()" id="myBtn">상품정보 더보기 ▼</button>
              `;
              resulimage_container.insertAdjacentHTML('beforeend', html);
            });

            //top_product
            let resulttop_product = resultDoc.getElementById('top_product');

            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top1}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top1_name}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top2}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top2_name}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top3}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top3_name}</h5>
                    <span>${item.sub_items_fee3}원</span>
                  </div>
                </li>

              `;
              resulttop_product.insertAdjacentHTML('beforeend', html);
            });

            //top_product1
            let resulttop_product1 = resultDoc.getElementById('top_product1');

            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top4}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top4_name}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top5}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top5_name}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top6}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top6_name}</h5>
                    <span>${item.sub_items_fee3}원</span>
                  </div>
                </li>

              `;
              resulttop_product1.insertAdjacentHTML('beforeend', html);
            });

            //top_product2
            let resulttop_product2 = resultDoc.getElementById('top_product2');

            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top7}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top7_name}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top8}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top8_name}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top9}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top9_name}</h5>
                    <span>${item.sub_items_fee3}원</span>
                  </div>
                </li>

              `;
              resulttop_product2.insertAdjacentHTML('beforeend', html);
            });

            //top_product3
            let resulttop_product3 = resultDoc.getElementById('top_product3');

            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top10}" alt="해당없음" style="max-width: 70px; max-height: 60px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top10_name}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top11}" alt="해당없음" style="max-width: 70px; max-height: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top11_name}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.top12}" alt="해당없음" style="max-width: 70px; max-height: 60px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.top12_name}</h5>
                    <span>${item.sub_items_fee3}원</span>
                  </div>
                </li>

              `;
              resulttop_product3.insertAdjacentHTML('beforeend', html);
            });
          };
        } else {
          console.error('Failed to open new tab');
        }
        console.log(data);
      },
      error: function (xhr, status, error) {
        console.error('Ajax request failed:', status, error);
      },
    });

    return false;
  });
});


/* 상품평 정렬(베스트순/최신순) */
$(document).ready(function() {

  function addClickListener(id) {
    $(id).on('click', 'img', function() { 
      const $this = $(this);
      const imageSrc = $this.attr('src');

      const startTime = new Date();
      console.log(startTime);

      const isTimerActive = localStorage.getItem('myKey') === 'true';

      // 타이머 시작
      let timer = setInterval(() => {
        if (!isTimerActive) {
          clearInterval(timer);
          const endTime = new Date();

          const duration = endTime - startTime;

          const result = JSON.stringify({ stayDuration: duration });

          console.log(imageSrc + ': ' + result);

          localStorage.setItem(imageSrc, result);
        }
      }, 500);
    });
  }

  addClickListener('#products');
});