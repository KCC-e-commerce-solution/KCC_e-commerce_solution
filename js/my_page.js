function generateOrderHTML(product, formatted_date) {
    let html = `<div class="order_list_body_wrap d-flex align-items-center p-3 justify-content-center mb-5">
                    <div class="order_list_body p-3">
                        <div class="order_title d-flex align-items-center mb-3">
                            <h4 class="order_date mb-0 me-2 bold">${formatted_date}</h4>
                            <span class="fs-4 bold">주문</span>
                            <span class="delivery_state_text fs-7 ms-2 bold">${product.delivery_state}</span>
                            <a href="order_detail.html" class="move_detail btn bold" data-order-no="${product.order_number}">주문 상세보기</a>
                        </div>
                        <div class="order_item_body d-flex align-items-center">
                        <div class="order_item_body_left_area ms-3 pe-3 pb-3 pt-3">
                                    <div
                                        class="order_item_title d-flex align-items-center justify-content-between mb-4">
                                        <h5 class="order_state_text mb-0 fs-4 bold">${product.order_state}</h5>
                                       
                                        <i class="fa-solid fa-trash-can fa-xl" style="color: #63E6BE;"></i>
                                    </div>`;


    // 각 아이템에 대한 HTML 생성
    product.item.forEach(item => {
        html += `<div class="order_item_info d-flex align-items-center pt-3 justify-content-center mb-4 pb-3 border-top border-bottom border-2">
                      <div class="order_img_box me-4">
                          <a href="#" class="order_img">
                              <img src="${item.item_img}" alt="">
                          </a>
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

    html += `</div>
                <div class="order_item_body_right_area mb-3 mt-3">
                    <div class="button_area d-flex flex-column">
                        <a href="check_delivery.html" class="delivery_check btn bold fs-5 mb-3" data-order-no="${product.order_number}">배송조회</a>
                        <a href="#" class="apply_cancel btn bold fs-5 mb-3" data-order-no="${product.order_number}">취소신청</a>
                        <a href="#" class="add_review btn bold fs-5">리뷰작성</a>
                        <div class="apply_cancel_text text-center fs-4 bold" style="display : none">취소 진행중</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    return html;
}



// 주문목록 json으로 불러오기
$(function () {
    $.ajax({
        url: '../js/order_info.json',
        type: 'get',
        dataType: 'json',
        success: function (data) {

            // 주문 날짜를 기준으로 내림차순
            data.sort(function (a, b) {
                if (a.order_date < b.order_date) {
                    return 1;
                } else if (a.order_date > b.order_date) {
                    return -1;
                } else {
                    return 0;
                }
            });

            $.each(data, function (index, product) {
                let order_date = product.order_date;

                // 정규표현식을 이용하여 2024-07-25 => 2024년 07월 25일로 변경
                let formatted_date = order_date.replace(
                    /^(\d{4})-(\d{2})-(\d{2})$/,
                    '$1년 $2월 $3일'
                );

                let html = generateOrderHTML(product, formatted_date);

                $('.main_inner').append(html);
            })
            let cancel_check = JSON.parse(localStorage.getItem('change'));
            $.each(cancel_check, function (index, item) {
                if (item.order_state === "취소 진행중") {
                    let cancelOrderNo = $(this).attr('order_number');
                    $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`)
                        .parents(
                            '.order_item_body'
                        )
                        .find('.order_item_title>h5')
                        .text(item.order_state);

                   $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.order_list_body').find('.delivery_state_text').css('display', 'none');
                   $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.button_area').find('a').css('display', 'none')
                   .end().find('div').css('display', 'block');
                    
                };
            })
        }
    })
})

// 검색창에서 클릭하여 리스트 띄우기
$(function () {
    $('#search').change(function () {
        const value = $('#search').val();
        $('.search_area> i').click(function () {
            $.ajax({
                url: '../js/order_info.json',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $('.order_list_body_wrap').remove();

                    // 주문 날짜를 기준으로 내림차순
                    data.sort(function (a, b) {
                        if (a.order_date < b.order_date) {
                            return 1;
                        } else if (a.order_date > b.order_date) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });

                    $.each(data, function (index, product) {
                        $.each(product.item, function (index, item) {
                            let order_date = product.order_date; // 주문 날짜

                            // 정규표현식을 이용하여 2024-07-25 => 2024년 07월 25일로 변경
                            let formatted_date = order_date.replace(
                                /^(\d{4})-(\d{2})-(\d{2})$/,
                                '$1년 $2월 $3일'
                            );

                            if ((item.item_name).includes(value) === true) {
                                let html = `<div
                        class="order_list_body_wrap d-flex align-items-center p-3 justify-content-center mb-5">
                        <div class="order_list_body p-3">
                            <div class="order_title d-flex align-items-center mb-3">
                                <h4 class="order_date mb-0 me-2 bold">${formatted_date}</h4>
                                <span class="fs-4 bold">주문</span>
                                 <span class="delivery_state_text fs-7 ms-2 bold" >${product.delivery_state}</span>
                                <a href="order_detail.html" class="move_detail btn bold" data-order-no="${product.order_number}">주문 상세보기</a>
                            </div>
                            <div class="order_item_body d-flex align-items-center">
                                <div class="order_item_body_left_area ms-3 pe-3 pb-3 pt-3">
                                    <div
                                        class="order_item_title d-flex align-items-center justify-content-between mb-4">
                                        <h5 class="order_state_text mb-0 fs-4 bold">${product.order_state}</h5>
                                        <i class="fa-solid fa-trash-can fa-xl" style="color: #63E6BE;"></i>
                                    </div>`;

                                $.each(product.item, function (index, item) {
                                    html += `<div class="order_item_info d-flex align-items-center pt-3 justify-content-center mb-4 pb-3 border-top border-bottom border-2">
                                                          <div class="order_img_box me-4">
                                                              <a href="#" class="order_img">
                                                                  <img src="${item.item_img}" alt="">
                                                              </a>
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

                                html += `</div>
                                <div class="order_item_body_right_area mb-3 mt-3">
                                    <div class="button_area d-flex flex-column">
                                        <a href="check_delivery.html" class="delivery_check btn bold fs-5 mb-3" data-order-no="${product.order_number}">배송조회</a>
                                        <a href="#" class="apply_cancel btn bold fs-5 mb-3" data-order-no="${product.order_number}">취소신청</a>
                                        <a href="#" class="add_review btn bold fs-5">리뷰작성</a>
                                       <div class="apply_cancel_text text-center fs-4 bold" style="display : none">취소 진행중</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                                $('.main_inner').append(html);
                            };

                            let cancel_check = JSON.parse(localStorage.getItem('change'));
                            if(cancel_check ===null) {
                                return;
                            } else {
                                $.each(cancel_check, function (index, item) {
                                    if (item.order_state === "취소 진행중") {
                                        hasCancelInProgress = true; // 취소 진행중 상태가 발견되면 true로 설정
    
                                        let cancelOrderNo = $(this).attr('order_number');
                                        $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`)
                                            .parents('.order_item_body')
                                            .find('.order_item_title>h5')
                                            .text(item.order_state);
                                        $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.order_list_body').find('.delivery_state_text').css('display', 'none');
                                        $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.button_area').find('a').css('display', 'none')
                                            .end().find('div').css('display', 'block');
                                    } 
                                });
                            }



                        })
                    })
                }
            });
        })
    })
})


// 개월 별로 주문목록 필터링하여 리스트로 나열하기
$(function () {
    $('.select_month_btn_area>:nth-child(n)').click(function () {
        const btn = $(this).attr('data-month');
        let today = new Date();
        const year = today.getFullYear();
        const month = parseInt('0' + (today.getMonth() + 1));

        $.ajax({
            url: '../js/order_info.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('.order_list_body_wrap').remove();

                // 주문 날짜를 기준으로 내림차순
                data.sort(function (a, b) {
                    if (a.order_date < b.order_date) {
                        return 1;
                    } else if (a.order_date > b.order_date) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                $.each(data, function (index, product) {
                    let past = new Date(product.order_date);
                    const order_year = past.getFullYear();
                    const order_month = ('0' + (past.getMonth() + 1));
                    let order_date = product.order_date; // 주문 날짜

                    // 정규표현식을 이용하여 2024-07-25 => 2024년 07월 25일로 변경
                    let formatted_date = order_date.replace(
                        /^(\d{4})-(\d{2})-(\d{2})$/,
                        '$1년 $2월 $3일'
                    );
                    if (order_month >= month - btn && order_month <= month && order_year === year) {
                        let html = generateOrderHTML(product, formatted_date);
                        $('.main_inner').append(html);
                    }
                })
                let cancel_check = JSON.parse(localStorage.getItem('change'));
                $.each(cancel_check, function (index, item) {
                    if(item.order_state ==="취소 진행중") {
                        let cancelOrderNo = $(this).attr('order_number')
                        $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`)
                          .parents('.order_item_body').find('.order_item_title>h5').text(item.order_state);
                                    
                          $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.button_area').find('a').css('display', 'none')
                          .end().find('div').css('display', 'block');

                          $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.order_list_body').find('.delivery_state_text').css('display', 'none');
                    };
                })
            }
        });
    })
})

// 년도 별로 필터링하여 주문목록 나열하기
$(function () {
    $('.select_year_btn_area>:nth-child(n)').click(function () {
        const btn = parseInt($(this).attr('data-year'));
        let today = new Date();
        const year = today.getFullYear();

        $.ajax({
            url: '../js/order_info.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('.order_list_body_wrap').remove();

                // 주문 날짜를 기준으로 내림차순
                data.sort(function (a, b) {
                    if (a.order_date < b.order_date) {
                        return 1;
                    } else if (a.order_date > b.order_date) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                $.each(data, function (index, product) {
                    let past = new Date(product.order_date);
                    const order_year = past.getFullYear();

                    let order_date = product.order_date; // 주문 날짜

                    // 정규표현식을 이용하여 2024-07-25 => 2024년 07월 25일로 변경
                    let formatted_date = order_date.replace(
                        /^(\d{4})-(\d{2})-(\d{2})$/,
                        '$1년 $2월 $3일'
                    );
                    if (order_year === btn) {
                        let html = generateOrderHTML(product, formatted_date);
                        $('.main_inner').append(html);
                    }
                })
                let cancel_check = JSON.parse(localStorage.getItem('change'));
                $.each(cancel_check, function (index, item) {
                    if(item.order_state ==="취소 진행중") {
                        let cancelOrderNo = $(this).attr('order_number')
                        $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`)
                          .parents('.order_item_body').find('.order_item_title>h5').text(item.order_state);
                       
                        $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.button_area').find('a').css('display', 'none')
                        .end().find('div').css('display', 'block');

                        $(`.apply_cancel[data-order-no="${cancelOrderNo}"]`).parents('.order_list_body').find('.delivery_state_text').css('display', 'none');
                    };
                })
            }
        });
    })
})

// 주문 내역 삭제
$(function () {
    $('body').on('click', '.fa-trash-can', function () {
        if (confirm("정말로 해당 주문내역을 삭제하시겠습니까? 삭제할 경우 해당 주문내역은 복구할 수 없습니다.")) {
            $(this)
                .parents('.order_list_body_wrap')
                .remove();
        } else {
            return false;
        }
    })
})

// // 취소 버튼 누르면 취소진행중이라고 보여주기 && LocalStorage에 저장하기
$(function () {
    $('body').on('click', '.apply_cancel', function () {
        const order_number = $(this).data('order-no');
        $.ajax({
            url: '../js/order_info.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let existingData = JSON.parse(localStorage.getItem('change')) || []; // 기존 데이터 가져오기
                localStorage.setItem('change', JSON.stringify(data)); // 새 데이터 저장

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
                            existingData.push(product);
                            localStorage.setItem('change', JSON.stringify(existingData)); // 업데이트된 데이터 저장

                            $(`.apply_cancel[data-order-no="${order_number}"]`)
                                .parents('.order_item_body')
                                .find('.order_item_title>h5')
                                .text(product.order_state);
                            
                            $(`.apply_cancel[data-order-no="${order_number}"]`).parents('.button_area').find('a').css('display', 'none')
                                .end().find('div').css('display', 'block');
                            
                        } else if (product.delivery_state === "배송시작") {
                            alert("이미 배송이 시작되어 취소는 불가능합니다.");
                            return;
                        } else if (product.delivery_state === "배송중") {
                            alert("배송중이어서 취소 신청이 불가능합니다.");
                            return;
                        } else {
                            alert("배송이 완료되어 취소는 불가능합니다.");
                            return;
                        }
                    } else {
                        console.log('xxxxxxxx');
                    }
                });
            }
        });
    });
});


// 주문 상세 버튼 누르면 주문 정보를 localstorage에 저장하기
$(function () {
    $('body').on('click', '.move_detail', function () {
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

// 배송 조회 버튼 누르면 관련된 배송정보를 localstorage에 저장하기
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
