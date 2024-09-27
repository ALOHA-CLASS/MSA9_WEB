document.addEventListener("DOMContentLoaded", (event) => {
    const mainMenu = document.getElementById('main-menu')
    // 서브메뉴 배경
    const back = document.getElementById('back')
    // 모든 서브 메뉴 (멀티)
    const subMenuList = document.querySelectorAll('.submenu')

    // 마우스 올렸을 때
    mainMenu.addEventListener("mouseover", () => {
        subMenuList.forEach(function(submenu) {
            submenu.classList.add('active')
        })
        back.classList.add('active')
    })
    
    // 마우스 벗어날 때
    mainMenu.addEventListener("mouseout", () => {
        subMenuList.forEach(function(submenu) {
            submenu.classList.remove('active')
        })
        back.classList.remove('active')
    })
})