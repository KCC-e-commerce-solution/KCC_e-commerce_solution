// json 삽입
// 서버에서 JSON 형식으로 제품 데이터를 로드
$(function img() {
  $('#products').click(function () {
    $.ajax({
      url: 'a.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        
        let resultWindow = window.open('DetailShopping.html');
        
        if (resultWindow) {
          resultWindow.onload = function () {
          
            const resultDoc = resultWindow.document;

            // 싱픔 이미지
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

            // 상품 정보
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

            // 물품 상세 정보
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

            let resulttop_product = resultDoc.getElementById('top_product');

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

            let resulttop_product1 = resultDoc.getElementById('top_product1');

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

            let resulttop_product2 = resultDoc.getElementById('top_product2');

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


