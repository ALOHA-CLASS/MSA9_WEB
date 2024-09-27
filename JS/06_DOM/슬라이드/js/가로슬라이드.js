// 문서 준비 이벤트
document.addEventListener("DOMContentLoaded", (event) => {
    // 이미지 3장
    const slides = document.querySelectorAll('.slide img')
    let index = 0
    const size = 1200

    function slide() {
        // 다음 순서 지정
        index = (index + 1) % 3
        // 0  1  2  3  4  5  6
        // 0  1  2  0  1  2
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            slide.style.transform 
             = `translateX( calc(${size}px * -${index}) )`
        }
    }
    setInterval(slide, 3000)
})