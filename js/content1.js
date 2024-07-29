// 사진 클릭으로 이미지 변경
$(function () {
  $('#navi_ul').on('click', 'a', function (event) { 
    event.preventDefault(); 

    var newImageSrc = $(this).children('img').attr('src'); 
    $('#main img').attr('src', newImageSrc); 
  });
});

// 해당 항목을 클릭하면 탭에서 상세 내용 표시
$(document).ready(function () {
  $('.nav-link').removeAttr('data-toggle');

  $('.nav-link').click(function (event) {
    event.preventDefault();

    $('.nav-link').removeClass('active');

    $(this).addClass('active');

    var targetContentId = $(this).attr('href');

    $('.tab-pane').hide();

    $(targetContentId).show();
  });
});

// 수량 증가 / 감소
function increaseValue() {
  const inputField = document.getElementById('Quantity');
  let currentValue = parseInt(inputField.value);
  if (currentValue < 100) {
    currentValue += 1;
  }
  inputField.value = currentValue;
}

function decreaseValue() {
  const inputField = document.getElementById('Quantity');
  let currentValue = parseInt(inputField.value);
  if (currentValue > 1) {
    currentValue -= 1;
  }
  inputField.value = currentValue;
}

// 수량의 값을 담는 로컬 스토리지
function saveToLocalStorage() {
  const inputField = document.getElementById('Quantity');
  const currentValue = parseInt(inputField.value);
  const itemQuantities = [currentValue, currentValue];
  localStorage.setItem('item_quantities', JSON.stringify(itemQuantities));
}

// 자세히 보기
function toggleMore() {
  var moreText = document.getElementById('more');
  var btnText = document.getElementById('myBtn');
  var partialImage = document.getElementById('partial-image');
  var fullImage = document.getElementById('full-image');

  if (moreText.style.display === 'none') {
    moreText.style.display = 'block';
    btnText.innerHTML = '간략히 보기 ▲';
    partialImage.style.display = 'none';
    fullImage.style.display = 'block';
  } else {
    moreText.style.display = 'none';
    btnText.innerHTML = '상품정보 더보기 ▼';
    partialImage.style.display = 'block';
    fullImage.style.display = 'none';
  }
}

// 상품에 머무른 시간 조회 차트
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


/* 상품평 정렬(베스트순/최신순) */
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementsByClassName("sortable")[0];
  switching = true;
  
  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (n == 0 && parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
        shouldSwitch = true;
        break;
      } else if (n == 1 && new Date(x.innerHTML) < new Date(y.innerHTML)) { 
        shouldSwitch = true;
        break;
      }
    }
    
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

/* star 통계 */
function toggleDetailView() {
  var detailView = document.getElementById("detailView");
  if (detailView.style.display === "none") {
      detailView.style.display = "block";
  } else {
      detailView.style.display = "none";
  }
}

