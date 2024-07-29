// 사진용

$(function () {
  $('#navi_ul').on('click', 'a', function (event) { // 'a' 태그 클릭 이벤트 핸들러
    event.preventDefault(); // 기본 동작 방지

    var newImageSrc = $(this).children('img').attr('src'); // 클릭한 이미지의 'src' 속성 가져오기
    $('#main img').attr('src', newImageSrc); // 'main' 영역의 이미지 'src' 속성 변경
  });
});


// $(function () {
//   $('#navi a').click(function (event) {
//     // 내가 누를 a 태그
//     event.preventDefault(); //form하고  a는 기본이벤트를 가지고 있어서 해지 해야 함.

//     $('#main img').before('<img src="' + $(this).attr('href') + '">'); // 여기서 this는 img - main img를 내가 클릭한 이미지로 덮어주세요.
//     $('#main img:last').remove(); // 실제 태그를 완전히 삭제 해주세요.
//   });
// });

//$(function() {
//  $('#navi a').click(function(event) {
//      event.preventDefault();
//
//      // 클릭된 a 태그의 href 속성 값 가져오기
//      const newImageSrc = $(this).attr('href');

//      // #main 영역의 첫 번째 이미지 src 속성 변경
//      $('#main img:first').attr('src', newImageSrc);
//  });
//});

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

//Quantity 수량용
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

// 로컬 스토리지
function saveToLocalStorage() {
  const inputField = document.getElementById('Quantity');
  const currentValue = parseInt(inputField.value);
  const itemQuantities = [currentValue, currentValue];
  localStorage.setItem('item_quantities', JSON.stringify(itemQuantities));
}

// 상세 보기
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

// // 차트 용
// // 이미지를 클릭했을 때의 시간을 저장할 변수
// let startTime = {};

// 이미지에 클릭 이벤트 리스너를 추가하는 함수
// function addClickListener(id) {
//     document.getElementById(id).addEventListener("click", function() {
//         // 이미지를 클릭한 시간을 저장
//         startTime[id] = new Date();

//         // 새 창을 열고, 그 창이 닫힐 때까지 기다림
//         let newWindow = window.open("UserShopping.html");
//         let timer = setInterval(function() {
//             if(newWindow.closed) {
//                 clearInterval(timer);
//                 let endTime = new Date();

//                 // 머무른 시간을 계산 (밀리초 단위)
//                 let duration = endTime - startTime[id];

//                 // 결과를 JSON 형식으로 변환
//                 let result = JSON.stringify({ stayDuration: duration });

//                 console.log(id + ": " + result);

//                 // 결과를 localStorage에 저장
//                 localStorage.setItem(id, result);
//             }
//         }, 500);
//     });
// }

/*
let startTime = {};
// 이미지에 클릭 이벤트 리스너를 추가하는 함수
function addClickListener(id) {
  document.getElementById(id).addEventListener('click', function () {
    // 이미지를 클릭한 시간을 저장
    startTime[id] = new Date();
    console.log(startTime[id]);
    console.log(startTime);

    // 로컬 스토리지에서 값을 확인
    let isTimerActive = localStorage.getItem('myKey') === 'true';

    console.log(isTimerActive);

    let timer = setInterval(function () {
      if (isTimerActive === false) {
        clearInterval(timer);
        let endTime = new Date();

        // 머무른 시간을 계산 (밀리초 단위)
        let duration = endTime - startTime[id];

        // 결과를 JSON 형식으로 변환
        let result = JSON.stringify({ stayDuration: duration });

        console.log(id + ': ' + result);

        // 결과를 localStorage에 저장
        localStorage.setItem(id, result);
      }
    }, 500);
  });
}*/

// 되는거
/*
$(document).ready(function() {
  // 이미지에 클릭 이벤트 리스너를 추가하는 함수
  function addClickListener(id) {
      $(id).on('click', function() {
          // 이미지를 클릭한 시간을 저장
          const startTime = new Date();
          console.log(startTime);

          // 로컬 스토리지에서 값을 확인
          const isTimerActive = localStorage.getItem('myKey') === 'true';

          // 타이머 시작
          let timer = setInterval(() => {
              if (!isTimerActive) {
                  clearInterval(timer);
                  const endTime = new Date();

                  // 머무른 시간을 계산 (밀리초 단위)
                  const duration = endTime - startTime;

                  // 결과를 JSON 형식으로 변환
                  const result = JSON.stringify({ stayDuration: duration });

                  console.log(id + ': ' + result);

                  // 결과를 localStorage에 저장
                  localStorage.setItem(id, result);
              }
          }, 500);
      });
  }

  addClickListener('#products');
});
*/

$(document).ready(function() {
  // 이미지에 클릭 이벤트 리스너를 추가하는 함수
  function addClickListener(id) {
    $(id).on('click', 'img', function() { // 이미지 요소만 선택
      const $this = $(this);
      const imageSrc = $this.attr('src');

      // 이미지를 클릭한 시간을 저장
      const startTime = new Date();
      console.log(startTime);

      // 로컬 스토리지에서 값을 확인
      const isTimerActive = localStorage.getItem('myKey') === 'true';

      // 타이머 시작
      let timer = setInterval(() => {
        if (!isTimerActive) {
          clearInterval(timer);
          const endTime = new Date();

          // 머무른 시간을 계산 (밀리초 단위)
          const duration = endTime - startTime;

          // 결과를 JSON 형식으로 변환
          const result = JSON.stringify({ stayDuration: duration });

          console.log(imageSrc + ': ' + result); // 이미지 src를 id로 사용

          // 결과를 localStorage에 저장
          localStorage.setItem(imageSrc, result);
        }
      }, 500);
    });
  }

  addClickListener('#products');
});


/* 상품평 */
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

      if (n == 0 && parseInt(x.innerHTML) < parseInt(y.innerHTML)) { // 별 갯수로 정렬
        shouldSwitch = true;
        break;
      } else if (n == 1 && new Date(x.innerHTML) < new Date(y.innerHTML)) { // 날짜로 정렬
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

/* star */
function toggleDetailView() {
  var detailView = document.getElementById("detailView");
  if (detailView.style.display === "none") {
      detailView.style.display = "block";
  } else {
      detailView.style.display = "none";
  }
}

