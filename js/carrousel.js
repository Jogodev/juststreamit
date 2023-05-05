class Carrousel {

    /**
     * @callback moveCallback
     * @param {number} index
     */

    /**
     * @param {HTMLElement} element
     * @param {{}} options
     *  @param {Object} options.slidesToScroll Nombre d'élements à faire défiler
     *  @param {Object} options.slidesVisible Nombre d'élement visible dans un slide*
     *  @param {boolean} options.loop Boucler en fin de slide ou pas
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1, slidesVisible: 1, loop: false,
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.moveCallbacks = []
        //
        this.root = this.createDiv('carrousel')
        this.container = this.createDiv('carrousel_container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDiv('carrousel_item')
            item.style.width = "33.33%"
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(callback => callback())
    }


    /**
     * @param Applique les bonnes dimensions aux élements du carrousel
     */
    setStyle() {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
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
        if (this.options.loop === true) {
            return
        }
        this.onSlide(index => {
            if (index === 0) {
                prevButton.classList.add('carrousel_prev_hidden')
            } else {
                prevButton.classList.remove('carrousel_prev_hidden')
            }
            if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem) {
                nextButton.classList.add('carrousel_next_hidden')
            } else {
                nextButton.classList.remove('carrousel_next_hidden')
            }
        })
    }

    next() {
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev() {
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * Déplace le carousel
     * @param {number} index
     */
    goToItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined)) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
        this.moveCallbacks.forEach(callBack => callBack(index))
    }

    /**
     * @param {moveCallback} callBack
     *
     */
    onSlide(callBack) {
        this.moveCallbacks.push(callBack)
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

setTimeout(() => {

    new Carrousel(document.querySelector("#best_movies"), {
        slidesToScroll: 1, slidesVisible: 4, loop: false,
    })

    new Carrousel(document.querySelector("#mystery"), {
        slidesToScroll: 1, slidesVisible: 4,
    })

    new Carrousel(document.querySelector("#comedy"), {
        slidesToScroll: 1, slidesVisible: 4,
    })

    new Carrousel(document.querySelector("#thriller"), {
        slidesToScroll: 1, slidesVisible: 4,
    })
}, 1000)