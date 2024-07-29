// 로컬 스토리지로 받아온 거 주문 상세 정보 띄우기
$(function() {
    let order = JSON.parse(localStorage.getItem('original'));                     // 주문 리스트
    let cancel = JSON.parse(localStorage.getItem('change'));                      // 취소가 포함된 주문 리스트
    let orderNumber = JSON.parse(localStorage.getItem('original_number'));        // 주문번호
  
    let cancelData;
    if(cancel !== null) {
      for(let i=0; i<cancel.length; i++) {
          console.log(cancel[i].order_state);
          if(cancel[i].order_number===orderNumber && cancel[i].order_state === '취소 진행중') {
              cancelData =true;
          }
      }
  } else {
      cancelData = false;
  }
  console.log(cancelData);
    if(!cancelData) {
      $.each(order, function(index, product) {
        if(product.order_number === orderNumber) {
          let order_date = product.order_date; // 주문 날짜
  
          // 정규표현식을 이용하여 2024-07-25 => 2024년 07월 25일로 변경
          let formatted_date = order_date.replace(
              /^(\d{4})-(\d{2})-(\d{2})$/,
              '$1년 $2월 $3일'
          );
          let html = `<div
                          class="order_list_body_wrap d-flex align-items-center p-3 justify-content-center mb-5">
                          <div class="order_list_body p-3">
                              <div class="order_title d-flex align-items-center mb-3">
                                  <h4 class="order_date mb-0 me-2 bold">${order_date}</h4>
                                  <span class="fs-4 bold me-3">주문</span>
                                  <span class="delivery_state_text fs-7 me-2 bold" >${product.delivery_state}</span>
                                  <span class="fs-6">주문번호 ${orderNumber}<span></div>
                                      <div class="order_item_body d-flex">
                                          <div class="order_item_body_left_area ms-3 pe-3 pb-3 pt-3">
                                              <div
                                                  class="order_item_title d-flex align-items-center justify-content-between mb-4">
                                                  <h5 class="order_state_text mb-0 fs-4 bold">${product.order_state}</h5>
                                              </div>`;
  
                                    $.each(product.item, function (index, item) {
                                      
                                    html +=  `<div class="order_item_info d-flex align-items-center pt-3 justify-content-center mb-4 pb-3 border-top border-bottom border-2">
                                                  <div class="order_img_box me-4">
                                                      <img src="${item.item_img}" class="order_img">
                                                  </div>
                                                  <div class="order_item_box">
                                                      <div class="order_item_text_body">
                                                          <div class="order_item_name mb-3">
                                                              <a href="#" class="order_item_name_text bold fs-5">${item.item_name}</a>
                                                          </div>
                                                      </div>
                                                      <div class="order_item_text_footer d-flex align-items-center">
                                                          <span class="price bold fs-5">${item.item_price}</span><span class="me-3 fs-5">원</span>
                                                          <span class="count bold ms-3 fs-5">${item.item_count}</span><span class="fs-5 me-3">개</span>
                                                          <button class="add_cart btn fs-5 bold">장바구니 담기</button>
                                                      </div>
                                                  </div>
                                              </div>`;
                                    });
                                              
  
                                    html +=`</div>
                                              <div class="order_item_body_right_area mb-3 mt-3 d-flex align-items-center">
                                                  <div class="button_area d-flex flex-column">
                                                      <a href="check_delivery.html" class="delivery_check btn bold fs-5 mb-3" data-order-no="${orderNumber}">배송조회</a>
                                                      <a href="#" class="apply_cancel btn bold fs-5 mb-3" data-order-no="${orderNumber}">취소신청</a>
                                                      <a href="#" class="add_review btn bold fs-5">리뷰작성</a>
                                                      <div class="apply_cancel_text text-center fs-4 bold" style="display : none">취소 진행중</div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>`;
                                  html +=`<div class="recipient_info_box ps-3 mb-5">
                                            <div class="recipient_info_header pb-3">
                                                <h4 class="info_header_title bold">받는사람 정보</h4>
                                            </div>
                                            <div class="recipient_info_body pt-3 pb-3">
                                                <table class="recipient_info">
                                                    <colgroup>
                                                        <col width="200">
                                                        <col>
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <th>받는사람</th>
                                                            <td>${product.receiver_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>연락처</th>
                                                            <td>${product.receiver_tel}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>받는주소</th>
                                                            <td>${product.receiver_address}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>배송요청사항</th>
                                                            <td>${product.receiver_request}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>`;
                                let total = 0;
                                let price = 0;
                                let count = 0;
                                for(let i = 0; i<product.item.length; i++) {
                                  price = parseInt((product.item[i].item_price).replace(/,/g, ''));
                                  count = parseInt((product.item[i].item_count));
                                  total += (price * count);
                                }
                                let discount_price = parseInt(product.discount_price.replace(/,/g, ''));                              
                                let delivery_price = parseInt(product.delivery_price.replace(/,/g, ''));
                                let finalPrice = total - discount_price + delivery_price;
                                
                                total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                discount_price = discount_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                delivery_price = delivery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                finalPrice = finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                  
  
                                  html +=`<div class="payment_info ps-3">
                                            <div class="payment_info_header pb-3">
                                                <h4 class="info_header_title bold">결제정보</h4>
                                            </div>
                                            <div
                                                class="payment_info_body bold d-flex align-items-center justify-content-around p-4">
                                                <div class="item_price_info">
                                                    <div class="item_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">상품 금액</div>
                                                    <div class="item_price text-center fs-5 pb-3">${total}<span class="text">원</span></div>
                                                </div>
                                                <div class="sales_price_info">
                                                    <div class="sales_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">할인 금액</div>
                                                    <div class="sales_price d-flex align-items-center justify-content-center pb-3">
                                                        <i class="fa-solid fa-minus me-1 mt-1" style="color : red;"></i>
                                                        <div class="sales_price_text fs-5" style="color : red;">${discount_price}<span class="text fs-5">원</span></div>
                                                    </div>
                                                </div>
                                                <div class="delivery_price_info">
                                                    <div class="delivery_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">배송비</div>
                                                    <div class="delivery_price d-flex align-items-center justify-content-center pb-3">
                                                        <i class="fa-solid fa-plus me-1 mt-1" style="color : blue;"></i>
                                                        <div class="delivery_price_text fs-5" style="color : blue;">${delivery_price}<span class="text fs-5">원</span></div>
                                                    </div>
                                                </div>
                                                <div class="total_price_info">
                                                    <div class="total_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">총 결제금액</div>
                                                    <div class="total_price_text text-center fs-5 pb-3">${finalPrice}<span class="text fs-5">원</span></div>
                                                </div>
                                                <div class="payment_method_info">
                                                    <div class="payment_method_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">결제수단</div>
                                                    <div class="payment_method">
                                                        <div class="payment_method_card_name text-center fs-5 pb-3">${product.payment_method}</div>
                                                    </div>
                                                </div>
                                            </div>
                                          </div>`;        
  
                                  $('.order_detail_header').after(html);
                                  if($('.order_state_text').text() ==="취소 진행중") {
                                      $('.order_item_body_right_area>.button_area').find('a').css('display', 'none').end().find('div').css('display', 'block');
                                      $('.delivery_state_text').css('display', 'none');
                                  }
        }
      })
    } else if(cancelData) {
      $.each(cancel, function(index, product) {
        if(product.order_number === orderNumber) {
          let order_date = product.order_date; // 주문 날짜
  
          // 정규표현식을 이용하여 2024-07-25 => 2024년 07월 25일로 변경
          let formatted_date = order_date.replace(
              /^(\d{4})-(\d{2})-(\d{2})$/,
              '$1년 $2월 $3일'
          );
  
          let html = `<div
                          class="order_list_body_wrap d-flex align-items-center p-3 justify-content-center mb-5">
                          <div class="order_list_body p-3">
                              <div class="order_title d-flex align-items-center mb-3">
                                  <h4 class="order_date mb-0 me-2 bold">${order_date}</h4>
                                  <span class="fs-4 bold me-3">주문</span>
                                  <span class="fs-6">주문번호 ${orderNumber}<span></div>
                                      <div class="order_item_body d-flex">
                                          <div class="order_item_body_left_area ms-3 pe-3 pb-3 pt-3">
                                              <div
                                                  class="order_item_title d-flex align-items-center justify-content-between mb-4">
                                                  <h5 class="order_state_text mb-0 fs-4 bold">${product.order_state}</h5>
                                                 
                                              </div>`;
  
                                    $.each(product.item, function (index, item) {
                                      console.log(item);
                                      
                                    html +=  `<div class="order_item_info d-flex align-items-center pt-3 justify-content-center mb-4 pb-3 border-top border-bottom border-2">
                                                  <div class="order_img_box me-4">
                                                      <img src="${item.item_img}" class="order_img">
                                                  </div>
                                                  <div class="order_item_box">
                                                      <div class="order_item_text_body">
                                                          <div class="order_item_name mb-3">
                                                              <a href="#" class="order_item_name_text bold fs-5">${item.item_name}</a>
                                                          </div>
                                                      </div>
                                                      <div class="order_item_text_footer d-flex align-items-center">
                                                          <span class="price bold fs-5">${item.item_price}</span><span class="me-3 fs-5">원</span>
                                                          <span class="count bold ms-3 fs-5">${item.item_count}</span><span class="fs-5 me-3">개</span>
                                                          <button class="add_cart btn fs-5 bold">장바구니 담기</button>
                                                      </div>
                                                  </div>
                                              </div>`;
                                    });
                                              
  
                                    html +=`</div>
                                              <div class="order_item_body_right_area mb-3 mt-3 d-flex align-items-center">
                                                  <div class="button_area d-flex flex-column">
                                                      <a href="check_delivery.html" class="delivery_check btn bold fs-5 mb-3" data-order-no="${orderNumber}">배송조회</a>
                                                      <a href="#" class="apply_cancel btn bold fs-5 mb-3" data-order-no="${orderNumber}">취소신청</a>
                                                      <a href="#" class="add_review btn bold fs-5">리뷰작성</a>
                                                       <div class="apply_cancel_text text-center fs-4 bold" style="display : none">취소 진행중</div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>`;
                                  html +=`<div class="recipient_info_box ps-3 mb-5">
                                            <div class="recipient_info_header pb-3">
                                                <h4 class="info_header_title bold">받는사람 정보</h4>
                                            </div>
                                            <div class="recipient_info_body pt-3 pb-3">
                                                <table class="recipient_info">
                                                    <colgroup>
                                                        <col width="200">
                                                        <col>
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <th>받는사람</th>
                                                            <td>${product.receiver_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>연락처</th>
                                                            <td>${product.receiver_tel}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>받는주소</th>
                                                            <td>${product.receiver_address}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>배송요청사항</th>
                                                            <td>${product.receiver_request}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>`;
                                let total = 0;
                                let price = 0;
                                let count = 0;
                                console.log(product);
                                for(let i = 0; i<product.item.length; i++) {
                                  price = parseInt((product.item[i].item_price).replace(/,/g, ''));
                                  count = parseInt((product.item[i].item_count));
                                  total += (price * count);
                                }
                                let discount_price = parseInt(product.discount_price.replace(/,/g, ''));                              
                                let delivery_price = parseInt(product.delivery_price.replace(/,/g, ''));
                                let finalPrice = total - discount_price + delivery_price;
                                
                                total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                discount_price = discount_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                delivery_price = delivery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                finalPrice = finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                  
  
                                  html +=`<div class="payment_info ps-3">
                                            <div class="payment_info_header pb-3">
                                                <h4 class="info_header_title bold">결제정보</h4>
                                            </div>
                                            <div
                                                class="payment_info_body bold d-flex align-items-center justify-content-around p-4">
                                                <div class="item_price_info">
                                                    <div class="item_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">상품 금액</div>
                                                    <div class="item_price text-center fs-5 pb-3">${total}<span class="text">원</span></div>
                                                </div>
                                                <div class="sales_price_info">
                                                    <div class="sales_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">할인 금액</div>
                                                    <div class="sales_price d-flex align-items-center justify-content-center pb-3">
                                                        <i class="fa-solid fa-minus me-1 mt-1" style="color : red;"></i>
                                                        <div class="sales_price_text fs-5" style="color : red;">${discount_price}<span class="text fs-5">원</span></div>
                                                    </div>
                                                </div>
                                                <div class="delivery_price_info">
                                                    <div class="delivery_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">배송비</div>
                                                    <div class="delivery_price d-flex align-items-center justify-content-center pb-3">
                                                        <i class="fa-solid fa-plus me-1 mt-1" style="color : blue;"></i>
                                                        <div class="delivery_price_text fs-5" style="color : blue;">${delivery_price}<span class="text fs-5">원</span></div>
                                                    </div>
                                                </div>
                                                <div class="total_price_info">
                                                    <div class="total_price_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">총 결제금액</div>
                                                    <div class="total_price_text text-center fs-5 pb-3">${finalPrice}<span class="text fs-5">원</span></div>
                                                </div>
                                                <div class="payment_method_info">
                                                    <div class="payment_method_header_text text-center mb-3 fs-5 border-bottom border-2 pb-3">결제수단</div>
                                                    <div class="payment_method">
                                                        <div class="payment_method_card_name text-center fs-5 pb-3">${product.payment_method}</div>
                                                    </div>
                                                </div>
                                            </div>
                                          </div>`;        
  
                                          $('.order_detail_header').after(html);
                                        }
                                        
                                      })
                                      if($('.order_state_text').text() ==="취소 진행중") {
                                        $('.order_item_body_right_area>.button_area').find('a').css('display', 'none').end().find('div').css('display', 'block');
                                      }
    }
  })
  
  
  // 주문내역에서 취소 신청하는 버튼
  $(function () {
      $('body').on('click', '.apply_cancel', function () {
          const order_number = $(this).data('order-no');
          $.ajax({
              url: '../js/order_info.json',
              type: 'GET',
              dataType: 'json',
              success: function (data) {
                  // 기존 데이터 가져오기
                  let existingData = JSON.parse(localStorage.getItem('change')) || []; // 기존 데이터가 없으면 빈 배열로 초기화
  
                  $.each(data, function (index, product) {
                      let order_no = parseInt(product.order_number);
  
                      if (order_number === order_no) {
                          if (product.delivery_state === "상품 준비중" || product.delivery_state === "결제완료") {
                              product.order_state = '취소 진행중';
                              let cancelYear = new Date().getFullYear();
                              let cancelMonth = ('0' + (new Date().getMonth() + 1)).slice(-2); // 두 자리로 보장
                              let cancelDate = new Date().getDate();
                              product.cancel_date = `${cancelYear}-${cancelMonth}-${cancelDate}`;
  
                              // 기존 데이터에 현재 제품 추가
                              existingData.push(product); // 기존 데이터 배열에 추가
                              localStorage.setItem('change', JSON.stringify(existingData)); // 업데이트된 데이터 저장
  
                              
                              $(`.apply_cancel[data-order-no="${order_number}"]`)
                                  .parents('.order_item_body')
                                  .find('.order_item_title>h5')
                                  .text(product.order_state);
                              
                              $('.order_item_body_right_area>.button_area')
                                  .find('a').css('display', 'none')
                                  .end().find('div').css('display', 'block');
  
                                  $('.delivery_state_text').css('display', 'none');    
  
                          } else if (product.delivery_state === "배송시작") {
                              alert("이미 배송이 시작되어 취소는 불가능합니다.");
                              return false;
                          } else if (product.delivery_state === "배송중") {
                              alert("배송중이어서 취소 신청이 불가능합니다.");
                              return false;
                          } else {
                              alert("배송이 완료되어 취소는 불가능합니다.");
                          }
                      }
                  });
              }
          });
      });
  });
  
  
  // 배송조회
  $(function () {
      $('body').on('click', '.delivery_check', function () {
          let order_number = $(this).data('order-no');
          $.ajax({
              url: '../js/order_info.json',
              type: 'GET',
              dataType: 'json',
              success: function (data) {
                  localStorage.setItem('original', JSON.stringify(data));
                  JSON.parse(localStorage.getItem('original'));
                  $.each(data, function (index, product) {
                      let orderFound = false;
  
                      let order_no = parseInt(product.order_number);
                      if (order_number === order_no) {
  
                          orderFound = true;
                          localStorage.setItem('original_number', JSON.stringify(product.order_number));
                          JSON.parse(localStorage.getItem('original_number'));
  
                      }
                  })
              }
  
          })
      })
  })