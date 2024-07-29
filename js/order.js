$(document).ready(function () {
  let orders = [];

  // 서버에서 JSON 형식으로 제품 데이터를 로드
  $.getJSON('b.json', function (data) {
    orders = data;
    displayOrders(orders);
    displayBills(orders);
    displayOrderItems(orders);
  });

  // 제품 데이터를 화면에 표시하는 함수
  function displayOrders(data) {
    const ordersDiv = $('#orders');
    ordersDiv.empty();
    data.forEach((order) => {
      ordersDiv.append(createOrderDiv(order));
    });
  }

  // 각 제품에 대한 HTML 요소를 생성하는 함수
  function createOrderDiv(order) {
    return $('<div>')
      .addClass('order')
      .append(
        $('<img>').attr('src', order.image).attr('id', 'item')
      );
  }

  // 주문 테이블을 화면에 표시하는 함수
  function displayBills(data) {
    const billsDiv = $('#bills');
    billsDiv.empty();
    data.forEach((bill) => {
      billsDiv.append(createBillDiv(bill));
    });
  }

  // 각 테이블에 대한 HTML 요소를 생성하는 함수
  function createBillDiv(bill) {
      const $table = $('<table>').addClass('bill');
    
      for (let i = 0; i < 1; i++) {
        const $tr = $('<tr>');
        $tr.append($('<th>').html(`<br><i class="fa-regular fa-user"></i> ${bill.name}`));
        $table.append($tr);
      }

      for (let i = 0; i < 1; i++) {
        const $tr = $('<tr>');
        $tr.append($('<th>').html(`${bill.name} ${bill.phone}`));
        $table.append($tr);
      }

      for (let i = 0; i < 1; i++) {
        const $tr = $('<tr>');
        $tr.append($('<th>').html(`${bill.address}`));
        $table.append($tr);
      }

      for (let i = 0; i < 1; i++) {
        const $tr = $('<tr>');
        const $th = $('<th>');
        const $select = $('<select>').attr('id', 'delivery_message');

        $select.append($('<option>').attr('value', 'option1').html('배송전 연락 바랍니다.'));
        $select.append($('<option>').attr('value', 'option2').html('배송시 요청 사항을 선택 해주세요.'));
        $select.append($('<option>').attr('value', 'option3').html('직접 수령하겠습니다.'));
        $select.append($('<option>').attr('value', 'option4').html('부재시 경비실에 맡겨주세요.'));
        $select.append($('<option>').attr('value', 'option5').html('부재시 문 앞에 놓아주세요.'));
        
        $th.append($select);
        $tr.append($th);

        $table.append($tr)
      }

      for (let i = 0; i < 1; i++) {
        const $tr = $('<tr>');
        $tr.append($('<th style="padding-left : 10px;">').html(`<hr><i class="fa-solid fa-face-smile-wink"></i> 스마일 프레시 <button style="margin: 42px;" onclick="openPopup()">날짜 / 시간 선택하기</button>`));
        $table.append($tr);
      }

      for (let i = 0; i < 1; i++) {
        const $tr = $('<tr>');
        $tr.append($('<th class="text-center">').html(`${bill.deliveryTime}`));
        $table.append($tr);
      }

      for (let i = 0; i < 1; i++) {
        const $tr = $('<tr>');
        $tr.append($('<th>').attr('id', 'point').html(`
          <hr>할인 및 포인트 사용 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <p>나의 포인트 ${bill.point}원</p>
          <div class="payment-box">
            <span class="price">0원</span>
            <button class="use-all-button">전액사용</button>
          </div><br><hr>
        `));

        $table.append($tr);
      }

    
      return $table;
    
    
  }

  // 주문상품 데이터를 화면에 표시하는 함수
  function displayOrderItems(data) {
    const orderItemsDiv = $('#orderItems');
    orderItemsDiv.empty();
    data.forEach((orderItem) => {
      orderItemsDiv.append(createOrderItemDiv(orderItem));
    });
  }

  // 주문상품에 대한 HTML 요소를 생성하는 함수
  function createOrderItemDiv(orderItem) {
    const $table = $('<table>').addClass('orderItem');

    for (let i = 0; i < 1; i++) {
      const $tr = $('<tr>');
      $tr.append($('<th colspan="2">').html(`주문 상품 3개`));
      $table.append($tr);
    }

    for (let i = 0; i < 1; i++) {
      const $tr = $('<tr>');
      $tr.append($('<td colspan="2" class="text-start">').html(`
        <i class="fa-solid fa-face-smile-wink"></i> 스마일프레시<br><img src="${orderItem.image}">
        <span class="product-name">${orderItem.item_information}</span>
        <br><br>${orderItem.item_price}원 / ${orderItem.pieces}개<br><br>
        배송비 | 15,000원 이상 구매 시 무료&nbsp;${orderItem.delivery_fee}원
      `));
      $table.append($tr);
    }

    for (let i = 0; i < 1; i++) {
      const $tr = $('<tr>');
      $tr.append($('<td>').html(`상품 금액`));
      $tr.append($('<td class="text-end">').html(`${orderItem.item_price}원`));
      $table.append($tr);
    }

    for (let i = 0; i < 1; i++) {
      const $tr = $('<tr>');
      $tr.append($('<td>').html(`배송비`));
      $tr.append($('<td class="text-end">').html(`${orderItem.delivery_fee}원`));
      $table.append($tr);
    }

    for (let i = 0; i < 1; i++) {
      const $tr = $('<tr>');
      $tr.append($('<th colspan="2" class="total text-end">').html(`총 결제 금액: ${orderItem.total_price}`));
      $table.append($tr);
    }

    for (let i = 0; i < 1; i++) {
      const $tr = $('<tr>');
      $tr.append($('<th colspan="2">').html(`<button class="btn btn-primary btn-lg w-10 d-flex justify-content-between" style="margin-left:400px;" onclick="payment()">결제하기</button>`));
      $table.append($tr);
    }

    return $table;
  }
});

// 선택 메뉴
const delivery = document.getElementById('delivery_message');
delivery.addEventListener('change', function() {
  const selectedValue = dropdown.value;
});

//결제하기
function payment() {
  window.location.href = 'Card.html';
}

