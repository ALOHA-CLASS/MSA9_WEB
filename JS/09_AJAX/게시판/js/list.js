let request

document.addEventListener("DOMContentLoaded", function() {
    // 게시글 목록 요청
    list()
})

// 게시글 목록 조회
function list() {
    // XMLHttpRequest 객체 생성
    request = new XMLHttpRequest()

    // 요청 설정
    let url = `http://192.168.30.119:8080/board`
    // request.open("요청메소드", URL, 비동기여부)
    request.open("GET", url, true)

    // 상태변화 이벤트 (응답 확인)
    request.onreadystatechange = function() {
        let response = ''
        // 요청 완료 및 응답 성공
        if( request.readyState == request.DONE && request.status == 200 ) {
            response = request.responseText     // 응답 데이터

            // JSON.parse : text ➡ JSON 
            let boardList = JSON.parse(response)
            // [{no: 1, title: '...', ...}, {no: 2, title: '...'} ...]
            if( boardList.length == 0 ) {
                alert('응답된 데이터가 없습니다.')
            }
            else {
                console.log(boardList);
                let $boardList = document.getElementById('board-list')
                // 날짜 포맷 지정
                for (const board of boardList) {
                    // let date = board.regDate.substring(0, 10)
                    let date = new Date(board.regDate)
                    let year = date.getFullYear()
                    let month = date.getMonth() + 1
                    let day = date.getDate()
                    let h = date.getHours()
                    let m = date.getMinutes()
                    let s = date.getSeconds()
                    date = `${year}-${month}-${day} ${h}:${m}:${s}`
                    let tr = `<tr>
                                <td>${board.no}</td>
                                <td>
                                    <a href="read.html?no=${board.no}">${board.title}</a>
                                </td>
                                <td>${board.writer}</td>
                                <td>${date}</td>
                             </tr>`
                    $boardList.innerHTML += tr
                }
            }
        }
    } /* 상태변화 이벤트 끝 */
    // 요청 전송
    request.send()
}