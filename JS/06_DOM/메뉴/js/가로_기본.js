document.addEventListener("DOMContentLoaded", (event) => {
    const mainMenuList = document.querySelectorAll('.main-menu > .menu-item')

    mainMenuList.forEach(function(menu) {
        // 해당 메인 메뉴의 서브 메뉴
        const submenu = menu.children[1]

        // 마우스 올렸을 때
        menu.addEventListener("mouseover", () => {
            console.log( menu.children );
            submenu.classList.add('active')
        })
        
        // 마우스 벗어날 때
        menu.addEventListener("mouseout", () => {
            submenu.classList.remove('active')
        })
    })

})