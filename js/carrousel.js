class Carrousel {
    /**
     *  @param {object} options.slidesToScroll Nombre d'élements à faire défiler
     *  @param {object} options.slidesVisible Nombre d'élement visible dans un slide
     *  @param element
     *  @param option
     */
    constructor(element, option = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        this.children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDiv('carousel')
        this.container = this.createDiv('carrousel_container')
        root.appendChild(this.container)
        this.element.appendChild(root)
        this.items = children.map((child) => {
            let item = this.createDiv('carrousel_item')
            item.style.width = "33.33%"
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
    }


    /**
     * @param Applique les bonnes dimensions aux élements du carrousel
     */
    setStyle() {
        let ration = this.children.length / this.options.slidesVisible
        this.container.style.width = (ration * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ration) + "%")
    }

    /**
     *
     */
    createNavigation() {
        let nextButton = this.createDiv('carrousel_next')
        let prevButton = this.createDiv('carrousel_prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    next () {
    this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev () {
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * Déplace le carousel
     * @param {number} index
     */
    goToItem (index) {
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
    }


    /**
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDiv(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}

document.addEventListner('DOMContentLoaded', function () {
    new Carrousel(document.querySelector(".carrousel"), {
        slidesToScroll: 3,
        slidesVisible: 3,
    })
})