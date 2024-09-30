
// 게시글 등록
function insert() {

    // 입력 정보
    let title = $('#title').val()
    let writer = $('#writer').val()
    let content = $('#content').val()
 
    // JSON 객체
    let data = {
        'title' : title,
        'writer' : writer,
        'content' : content,
    }

    // 요청 설정
    let url = `http://192.168.30.119:8080/board`
    $.ajax({
        type            : "POST",                   // 요청 메소드
        url             : url,                      // 요청 URL
        data            : JSON.stringify(data),     // 요청 데이터
        contentType     : "application/json",       // 요청 데이터 타입
        dataType        : "html",                   // 응답 데이터 타입
        success         : function(response, status) {
            alert("SUCCESS")
            location.href = "list.html"
        },
        error           : function(xhr, status, error) {
            console.error('상태: ' + status)
        }
    })
}