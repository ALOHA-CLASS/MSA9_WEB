document.addEventListener("DOMContentLoaded", (event) => {
    const mainMenuList = document.querySelectorAll('.main-menu > .menu-item')

    mainMenuList.forEach(function(menu) {
        // 해당 메인 메뉴의 서브 메뉴
        // const submenu = menu.children[1]
        // 모든 서브 메뉴 (멀티)
        const subMenuList = document.querySelectorAll('.submenu')

        // 마우스 올렸을 때
        menu.addEventListener("mouseover", () => {
            subMenuList.forEach(function(submenu) {
                submenu.classList.add('active')
            })
        })
        
        // 마우스 벗어날 때
        menu.addEventListener("mouseout", () => {
            subMenuList.forEach(function(submenu) {
                submenu.classList.remove('active')
            })
        })
    })

})