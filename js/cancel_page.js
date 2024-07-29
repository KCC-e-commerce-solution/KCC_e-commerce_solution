$(function () {
  
    if (JSON.parse(localStorage.getItem('change') === null)) {
        $('.cancel_info_area')
            .text('취소 신청한 내역이 존재하지 않습니다.')
            .addClass('fs-2')
            .addClass('text-center')
            .addClass('animate__backInRight');
    } else {
        let cancel = JSON.parse(localStorage.getItem('change'));
        
        $.each(cancel, function (index, product) {
            console.log(product);
            let order_date = product.order_date; // 주문 날짜
            let cancel_date = product.cancel_date; // 취소 날짜

            // 정규표현식을 이용하여 2024-07-25 => 2024년 07월 25일로 변경
            let formatted_order_date = order_date.replace(
                /^(\d{4})-(\d{2})-(\d{2})$/,
                '$1년 $2월 $3일'
            );

            let formatted_cancel_date = cancel_date.replace(
                /^(\d{4})-(\d{2})-(\d{2})$/,
                '$1년 $2월 $3일'
            );

            let html = `
            <div class="cancel_info_area p-3 mb-5 animate__animated">
              <div
              class="cancel_info_header d-flex justify-content-between mb-3 align-items-center pe-3 pt-3 pb-3">
                <div class="cancel_date_area d-flex align-items-center">
                  <h4 class="info_header_title mb-0 bold me-3">취소접수일</h4>
                  <div class="cancel_date bold">${formatted_cancel_date}</div>  
                </div>
                <div class="order_date_area d-flex align-items-center">
                  <h4 class="info_header_title mb-0 bold me-3">주문접수일</h4>
                  <div class="order_date bold me-5">${formatted_order_date}</div>
                  <div class="order_number">
                  <span class="text bold ">주문번호: ${product.order_number}</span>
                </div>
              </div>
            </div>`;

            $.each(product.item, function (index, item) {
                html += `<div
                    class="cancel_info_body d-flex justify-content-evenly align-items-center p-3 mb-3">
                    <div class="img_box d-flex justify-content-center">
                        <img src="${item.item_img}" class="item_img"></a>
                    </div>
                    <div class="order_detail_area text-center bold">
                        <div class="item_name mb-3">${item.item_name}</div>
                    </div>
                    <div class="price_info text-center bold">
                        <div class="count mb-3">${item.item_count}<span class="text">개</span>
                        </div>
                        <div class="price">${item.item_price}<span class="text">원</span>
                        </div>
                    </div>
                    <div class="cancel_state bold text-center">
                        <div class="cancel_state_text">${product.order_state}</div>
                    </div>
                </div>`;
              })
            html+= `</div>`;
            
            
            $('.order_cancel_header').after(html);
          })
    };

})