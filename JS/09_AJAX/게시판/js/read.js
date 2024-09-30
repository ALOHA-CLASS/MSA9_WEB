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
    // request.open("요청메소드", URL, 비동기여부)
    request.open("GET", url, true)

    // 상태변화 이벤트 (응답 확인)
    request.onreadystatechange = function() {
        let response = ''
        // 요청 완료 및 응답 성공
        if( request.readyState == request.DONE && request.status == 200 ) {
            response = request.responseText     // 응답 데이터

            // {no: 1, title: '...', ...}
            if( response == '' ) {
                alert('응답된 데이터가 없습니다.')
            }
            else {
                // JSON.parse : text ➡ JSON 
                let board = JSON.parse(response)
                console.log(board);

                let title = document.getElementById('title')
                let writer = document.getElementById('writer')
                let content = document.getElementById('content')

                // 조회된 게시글 정보 출력
                title.value = board.title
                writer.value = board.writer
                content.value = board.content

            }
        }
    } /* 상태변화 이벤트 끝 */
    // 요청 전송
    request.send()
}