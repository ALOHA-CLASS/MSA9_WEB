let request

document.addEventListener("DOMContentLoaded", function() {
    read()
})

// 게시글 수정화면으로 이동
function update() {
    // 글번호 (no)
    const params = new URLSearchParams(location.search)
    const no = params.get('no')

    location.href = `update.html?no=${no}`
}

// 게시글 조회
function read() {
    // XMLHttpRequest 객체 생성
    request = new XMLHttpRequest()
    // 글번호 (no)
    const params = new URLSearchParams(location.search)
    const no = params.get('no')

    // 요청 설정
    let url = `http://192.168.30.119:8080/board/${no}`

    $.ajax({
        type: 'GET',
        url: url,                           // 요청 URL
        contentType: "application/json",    // 요청 데이터 타입
        dataType: "html",                   // 응답 데이터 타입
        success: function(response, status) {

            if( response == '' ) {
                alert('응답된 데이터가 없습니다.')
            }
            else {
                // JSON.parse : text ➡ JSON 
                let board = JSON.parse(response)
                console.log(board);

                $('#title').val(board.title)
                $('#writer').val(board.writer)
                $('#content').val(board.content)
            }
        },
        error: function(xhr, status, error) {
            console.error('상태:', status)
            console.error('에러:', error)
        }
    })

}