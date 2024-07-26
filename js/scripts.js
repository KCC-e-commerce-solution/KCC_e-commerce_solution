$(function () {
    $('#floatingImage')
        .on('load', function () {
            $(this).fadeIn(); // 로드 완료 후 서서히 표시
        })
        .each(function () {
            if (this.complete) $(this).load(); // 캐시된 이미지 대응
        });
});

$('#floatingImage').click(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});