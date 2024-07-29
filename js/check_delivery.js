$(function () {
    let orderNumber = JSON.parse(localStorage.getItem('original_number'));
    let order = JSON.parse(localStorage.getItem('original'));

    $.each(order, function (index, product) {
        if (product.order_number === orderNumber) {
            switch (product.delivery_state) {
                case '결제완료':
                    $('.delivery_state_footer').find('div[class=line]').addClass('gray_line');
                    $('.delivery_state_body').find('div>i').slice(0, 1).css('color', 'black').addClass('animate__bounce');
                    break;
                case "상품 준비중":
                    $('.delivery_state_footer').find('div[class*=gray_dot]').slice(0,1).removeClass('gray_dot');
                    $('.delivery_state_body').find('div>i').slice(0, 2).css('color', 'black').addClass('animate__bounce');
                    break;
                case '배송시작':
                    $('.delivery_state_footer').find('div[class*=gray_dot]').slice(0,2).removeClass('gray_dot');
                    $('.delivery_state_footer').find('div[class*=gray_line]').slice(0, 1).removeClass('gray_line')
                    $('.delivery_state_body').find('div>i').slice(0, 3).css('color', 'black').addClass('animate__bounce');
                    break;
                case '배송중':
                $('.delivery_state_footer').find('div[class*=gray_dot]').slice(0,3).removeClass('gray_dot');
                        $('.delivery_state_footer').find('div[class*=gray_line]').slice(0, 2).removeClass('gray_line')
                        $('.delivery_state_body').find('div>i').slice(0, 4).css('color', 'black').addClass('animate__bounce');
                    break;
                case '배송완료':
                  $('.delivery_state_footer').find('div[class*=gray_dot]').slice(0,4).removeClass('gray_dot');
                        $('.delivery_state_footer').find('div[class*=gray_line]').slice(0, 3).removeClass('gray_line')
                        $('.delivery_state_body').find('div>i').slice(0, 5).css('color', 'black').addClass('animate__bounce');
                    break;

            }

            let html = `
            <table class="table">
                        <tbody>
                            <tr>
                                <th>받는사람</th>
                                <td>${product.receiver_name}</td>
                            </tr>
                            <tr>
                                <th>받는주소</th>
                                <td>${product.receiver_address}</td>
                                <td><a href="#" class="btn">변경하기</a></td>
                            </tr>
                            <tr>
                                <th>배송요청사항</th>
                                <td>${product.receiver_request}</td>
                                <td><a href="#" class="btn">변경하기</a></td>
                            </tr>
                        </tbody>
                    </table>
            `;
            
            
            $('.receiver_info_header>.header_title').after(html);
          }
          
        })

})
