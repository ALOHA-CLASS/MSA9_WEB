document.addEventListener("DOMContentLoaded", function() {
    read()
})

// 게시글 수정
function update() {
    // 글번호 (no)
    const params = new URLSearchParams(location.search)
    const no = params.get('no')

    // 입력정보
    let title = $('#title').val()
    let writer = $('#writer').val()
    let content = $('#content').val()

    // JSON 
    let data = {
        'no'    : no,
        'title'    : title,
        'writer'    : writer,
        'content'    : content,
    }

    let url = `http://192.168.30.119:8080/board`

    $.ajax({
        type            : 'PUT',
        url             : url,
        data            : JSON.stringify(data),
        contentType     : "application/json",
        dataType        : "html",
        success: function(response, status) {
            alert('SUCCESS')
            location.href = 'list.html'
        },
        error: function(xhr, status, error) {
            console.error('상태:', status)
            console.error('에러:', error)
        }
    })
}

// 게시글 삭제
function remove() {
    // 글번호 (no)
    const params = new URLSearchParams(location.search)
    const no = params.get('no')

    const check = confirm('정말로 삭제하시겠습니까?')
    if( !check ) return

    let url = `http://192.168.30.119:8080/board/${no}`

    $.ajax({
        type            : 'DELETE',
        url             : url,
        contentType     : "application/json",
        dataType        : "html",
        success: function(response, status) {
            alert('SUCCESS')
            location.href = 'list.html'
        },
        error: function(xhr, status, error) {
            console.error('상태:', status)
            console.error('에러:', error)
        }
    })
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