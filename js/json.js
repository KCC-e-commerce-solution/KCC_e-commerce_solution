// $(function() {
//   $('img').click(function() {
//     //console.log('aaaaa');
//     $('#dictionary').empty();
//     $.ajax({
//       // 객체 형식으로 넣어주어야 함
//       url: '/json/a.json',
//       type: 'get',
//       dataType: 'json',
//       success: function(data) {
//         $('#result').empty();

//         // 결과값 : 배열 => [{},{},{}] => HTML
//         $.each(data, function(index, item) {
//           let html = '<div class="entry">';
//           html += '<h3 class="term">' + item.term + '</h3>';
//           html += '<div class="part">' + item.part + '</div>';
//           html += '<div class="definiton">' + item.definition + '</div>';
//           html += '</div>';

//           $('#result').append(html); //id가 "dictionary"인 HTML 요소를 선택 후 선택된 요소의 마지막 자식 요소로 html 변수에 저장된 HTML 문자열을 삽입
//           window.open('result.html');
//         });
//       },
//       error: function(xhr, status, error) {
//         // 실패했을 때 에러 내용을 콘솔에 출력
//         console.error('Ajax 요청 실패:', status, error);
//         console.error(xhr);
//       }
//     });

//     return false;
//   });
// });

/*
$(function () {
  $('.test').click(function () {
    // AJAX 요청을 통해 JSON 데이터 불러오기
    $.ajax({
      url: '../json/a.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        // 새 창을 열고 기본 HTML 구조 설정
        let resultWindow = window.open();
        resultWindow.document.write(
          '<html>' + '<head>' + 
          '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">' +
          '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>' +
          '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer"/>' +
          '<link rel="stylesheet" href="./css/Userheader.css">' +
          '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>' +
          '<script type="text/javascript" src="./js/main.js"></script>' +
          '<script type="text/javascript" src="./js/json.js"></script>' +
          '</head><body><div id="result"></div></body></html>'
        );

        // 결과 데이터를 새 창의 #result 요소에 추가
        let resultDiv = resultWindow.document.getElementById('result');
        data.forEach((item) => {
          let html = '<div class="entry">';
          html += '<h3 class="term">' + item.term + '</h3>';
          html += '<div class="part">' + item.part + '</div>';
          html += '<div class="definition">' + item.definition + '</div>';
          html += '</div>';

          resultDiv.insertAdjacentHTML('beforeend', html);
          console.log("1")
        });
      },
      error: function (xhr, status, error) {
        console.error('Ajax 요청 실패:', status, error);
      },
    });

    return false; // 기본 이벤트 방지
  });
});
*/
/*
$(function() {
  $('.test').click(function() {
      $.ajax({
          url: '../json/a.json',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
              // 새 창을 열고 기본 HTML 구조 설정
              let resultWindow = window.open();
              resultWindow.document.write(`
                  <html>
                  <head>
                      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
                      <link rel="stylesheet" href="./css/Userheader.css">
                  </head>
                  <body>
                      <div id="result"></div>
                  </body>
                  </html>
              `);
              
              
              // 결과 데이터를 새 창의 #result 요소에 추가
              let resultDiv = resultWindow.document.getElementById('result');
              data.forEach(item => {
                  let html = `
                      <div class="entry">
                          <h3 class="term">${item.term}</h3>
                          <div class="part">${item.part}</div>
                          <div class="definition">${item.definition}</div>
                      </div>
                  `;
                  resultDiv.insertAdjacentHTML('beforeend', html);
              });
          },
          error: function(xhr, status, error) {
              console.error('Ajax 요청 실패:', status, error);
          }
      });

      return false;
  });
});
*/

/*
$(function() {
  $('#navi a').click(function(event) {
      event.preventDefault();

      // 클릭된 a 태그의 href 속성 값 가져오기
      const newImageSrc = $(this).attr('href');

      // #main 영역의 첫 번째 이미지 src 속성 변경
      $('#main img:first').attr('src', newImageSrc);
  });
});
*/
/*
// 버튼작동
$(document).ready(function () {
  // Remove the data-toggle attribute as Bootstrap 4 doesn't require it
  $('.nav-link').removeAttr('data-toggle');

  // Add a click event handler to the tab links
  $('.nav-link').click(function (event) {
      // Prevent default link behavior
      event.preventDefault();

      // Remove active class from all tabs
      $('.nav-link').removeClass('active');

      // Add active class to the clicked tab
      $(this).addClass('active');

      // Get the target content ID from the href attribute
      var targetContentId = $(this).attr('href');

      // Hide all tab content divs
      $('.tab-pane').hide();

      // Show the target content div
      $(targetContentId).show();
  });
});
*/

//json 삽입
$(function img() {
  $('#products').click(function () {
    $.ajax({
      url: 'a.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        // Open a new tab and load r.html
        let resultWindow = window.open('DetailShopping.html');
        // Check if the window is successfully opened
        if (resultWindow) {
          resultWindow.onload = function () {
            // Access the document of the new tab
            const resultDoc = resultWindow.document;

            //navi_ul의 li용
            const resultul = resultDoc.getElementById('navi_ul');

            // Process the data and populate the element in the new tab
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

            // Process the data and populate the element in the new tab
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
                <p id="totalVotes" onclick="toggleDetailView()">58,868&nbsp;&nbsp;자세히 보기></p>

                <div id="detailView" class="detail-view">
                    <div class="star-rating"><span class="filled-stars" style="width:100%">★★★★★</span><span>☆☆☆☆☆</span>71%</p></div>
                    <div class="star-rating"><span class="filled-stars" style="width:80%">★★★★☆</span><span>☆☆☆☆</span>16%</div>
                    <div class="star-rating"><span class="filled-stars" style="width:60%">★★★☆☆</span><span>☆☆☆</span>7%</div>
                    <div class="star-rating"><span class="filled-stars" style="width:40%">★★☆☆☆</span><span>☆☆</span>3%</div>
                    <div class="star-rating"><span class="filled-stars" style="width:20%">★☆☆☆☆</span><span>☆</span>2%</div>
                </div>
                <br>
                <table class="sortable">
                  <tr>
                    <th onclick="sortTable(0)">베스트순</th>
                    <th onclick="sortTable(1)">최신순 📅</th> 
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>2024-07-28</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>2024-07-27</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>2024-07-26</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>2024-07-25</td>
                  </tr>
                </table>
              </div>
              <div class="tab-pane" id="Specification" role="tabpanel" aria-labelledby="Specification-tab">
                <div class="table-responsive"> 
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
                <p>${item.notice}</p>
              </div>

              `;
              resultmyTabContent.insertAdjacentHTML('beforeend', html);
            });

            //이미지 더보기
            const resulimage_container =
              resultDoc.getElementById('imagecontainer');

            // Process the data and populate the element in the new tab
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

            // Process the data and populate the element in the new tab
            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image1}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items1}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image2}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items2}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image3}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items3}</h5>
                    <span>${item.sub_items_fee3}원</span>
                  </div>
                </li>

              `;
              resulttop_product.insertAdjacentHTML('beforeend', html);
            });

            //top_product1
            let resulttop_product1 = resultDoc.getElementById('top_product1');

            // Process the data and populate the element in the new tab
            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image1}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items1}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image2}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items2}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image3}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items3}</h5>
                    <span>${item.sub_items_fee3}원</span>
                  </div>
                </li>

              `;
              resulttop_product1.insertAdjacentHTML('beforeend', html);
            });

            //top_product2
            let resulttop_product2 = resultDoc.getElementById('top_product2');

            // Process the data and populate the element in the new tab
            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image1}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items1}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image2}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items2}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image3}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items3}</h5>
                    <span>${item.sub_items_fee3}원</span>
                  </div>
                </li>

              `;
              resulttop_product2.insertAdjacentHTML('beforeend', html);
            });

            //top_product3
            let resulttop_product3 = resultDoc.getElementById('top_product3');

            // Process the data and populate the element in the new tab
            data.forEach((item) => {
              let html = `
                <li style="display: flex; padding-top: 10px; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image1}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items1}</h5>
                    <span>${item.sub_items_fee1}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image2}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items2}</h5>
                    <span>${item.sub_items_fee2}원</span>
                  </div>
                </li>
                <li style="display: flex; padding-bottom: 10px;">
                  <a href="#"><img src="${item.image3}" alt="해당없음" style="max-width: 70px;"></a>
                  <div style="padding-left: 20px; padding-top: 10px;">
                    <h5>${item.sub_items3}</h5>
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


