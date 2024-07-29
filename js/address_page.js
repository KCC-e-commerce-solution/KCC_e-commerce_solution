$(function () {
  $.ajax({
    url: '../js/order_info.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      $.each(data, function(index, item) {
        console.log(item);
        if(item.default_address === "1") {
        let html_header =`<div class="address_default_box d-flex mb-3 align-items-center p-5">
                        <div class="address_default_info_area">
                            <div class="address_name_area d-flex align-items-center mb-3">
                                <div class="receiver_name bold fs-5">${item.address_nickname}</div>
                                <div
                                    class="default_address_text border-2 rounded-pill border border-primary ms-3 p-1 ps-2 pe-2" data-default-address="${item.default_address}"
                                    style="--bs-border-opacity: .5;">기본배송지</div>
                            </div>
                            <div class="receiver_info_area mb-3">
                                <span class="receiver_name bold fs-5">${item.receiver_name}</span>
                                <span class="receiver_tel bold fs-5">${item.receiver_tel}</span>
                            </div>
                            <div class="address_detail_area">
                                <span class="zip_code fs-5">[${item.zip_code}]</span>
                                <span class="address_text fs-5">${item.receiver_address}</span>
                            </div>
                        </div>
                        <div class="change_button_area border border-2 ps-2 d-flex align-items-center">
                            <i class="fa-solid fa-pen-to-square fa-xl"></i>
                            <button class="btn change_btn fs-5 bold">수정</button>
                        </div>
                    </div>`;
                    $('.address_info_header').after(html_header);
          }
          
        })

        let html= `
        <div
            class="address_list_header d-flex mb-3 pb-3 border-bottom border-3 justify-content-between">
            <div class="list_count_area d-flex">
                <span class="count_list fs-4 bold">${data.length}</span>
                <span class="text fs-4 bold">개</span>
            </div>
            <div
                class="add_address_btn_area d-flex align-items-center border border-2 rounded btn p-0 ">
                <i class="fa-solid fa-plus text-align-center ms-2"></i>
                <button class="add_text btn border border-0 ps-1">새 배송지 등록</button>
            </div>
        </div>`;

        html += `<div class="address_list_body">
                            <table class="table table-default table-hover table-bordered align-middle">
                                <colgroup>
                                    <col>
                                    <col>
                                    <col width="121px">
                                </colgroup>
                                <tbody>`;
        
        $.each(data, function(index, item) {
            html += `<tr>
                        <th class="text-center border-2">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1">
                        </th>
                        <td class="p-4 border-2">
                            <div class="address_default_info_area">
                                <div class="address_name_area d-flex align-items-center mb-3">
                                    <div class="receiver_name bold fs-5">${item.address_nickname}</div>
                                       <div
                                        class="default_address_text border-2 rounded-pill border border-primary ms-3 p-1 ps-2 pe-2" data-default-address="${item.default_address}"
                                        style="--bs-border-opacity: .5;">기본배송지</div>
                                </div>

                                <div class="receiver_info_area mb-3">
                                    <span class="receiver_name bold fs-5">${item.receiver_name}</span>
                                    <span class="receiver_tel bold fs-5">${item.receiver_tel}</span>
                                </div>
                                <div class="address_detail_area">
                                    <span class="zip_code fs-5">[${item.zip_code}]</span>
                                    <span class="address_text fs-5">${item.receiver_address}</span>
                                </div>
                            </div>
                        </td>
                        <td class="border-2">
                            <div class="change_button_area border border-2 ps-2 d-flex align-items-center mb-3">
                                <i class="fa-solid fa-pen-to-square fa-xl"></i>
                                <button class="btn change_btn fs-5 bold">수정</button>
                            </div>
                            <div class="delete_button_area border border-2 ps-2 d-flex align-items-center">
                                <i class="fa-solid fa-trash-can fa-xl"></i>
                                <button class="btn delete_btn fs-5 bold">삭제</button>
                            </div>  
                        </td>
                    </tr>`;
                  })
                  html += `</tbody>
                  </table>
                  </div>`;
                  $('.address_list_footer').before(html);
                  $.each(data, function (index, item) {
                    if(item.default_address === "0") {
                      $('.default_address_text[data-default-address=0]').css('display', 'none');
                    } else {
                      $('.default_address_text[data-default-address=1]').parents('tr')
                      .find('.delete_button_area>:nth-child(n)').css('display','none').parents('.delete_button_area').removeClass('border');
                    }
                    
                  })
    }
  })
})