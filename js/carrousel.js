class Carrousel {

    /**
     * @callback moveCallback
     * @param {number} index
     */

    /**
     * @param {HTMLElement} element
     * @param {{}} options
     *  @param {Object} options.slidesToScroll Nombre d'élements à faire défiler
     *  @param {Object} options.slidesVisible Nombre d'élement visible dans un slide
     *  @param {boolean} options.loop Boucler en fin de slide ou pas
     *  @param {boolean} options.infinite défilement infini
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1, slidesVisible: 1, loop: false,
            infinite: true,
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.moveCallbacks = []

        //Modification du DOM
        this.root = this.createDiv('carrousel')
        this.container = this.createDiv('carrousel_container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDiv('carrousel_item')
            item.appendChild(child)
            return item
        })
        if (this.options.infinite) {
            this.offset = this.options.slidesVisible * 2 - 1
            this.items = [
                ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
            ]
            this.goToItem(this.offset, false)
        }
        this.items.forEach(item => this.container.appendChild(item))
        this.setStyle()
        this.createNavigation()

        //Evenements
        this.moveCallbacks.forEach(callback => callback(this.currentItem))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        if (this.options.infinite) {
            this.container.addEventListener('transitionend', this.resetInfinite.bind(this))
        }
    }

    /**
     * @param Applique les bonnes dimensions aux élements du carrousel
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
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
            if (this.items[this.currentItem + this.slidesVisible] === undefined) {
                nextButton.classList.add('carrousel_next_hidden')
            } else {
                nextButton.classList.remove('carrousel_next_hidden')
            }
        })
    }

    next() {
        this.goToItem(this.currentItem + this.slidesToScroll)
    }

    prev() {
        this.goToItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Déplace le carousel
     * @param {number} index
     * @param {boolean} [animation = true]
     */
    goToItem(index, animation = true) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem)) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        if (animation === false) {
            this.container.style.transition = 'none'
        }
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.container.offsetHeight // force repaint
        if (animation === false) {
            this.container.style.transition = ''
        }
        this.currentItem = index
        this.moveCallbacks.forEach(callBack => callBack(index))
    }

    /**
     * Déplace le carrousel de pour donner l'impression qu'il est infini
     *
     */
    resetInfinite() {
        if (this.currentItem <= this.options.slidesToScroll) {
            this.goToItem(this.currentItem + this.items.length - 2 * this.offset, false)
        } else if (this.currentItem >= this.items.length - this.offset) {
            this.goToItem(this.currentItem - (this.items.length - 2 * this.offset), false)
        }
    }

    /**
     * @param {moveCallback} callBack
     *
     */
    onSlide(callBack) {
        this.moveCallbacks.push(callBack)
    }

    onWindowResize() {
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(callback => callback(this.currentItem))
        }
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

    /**
     * @returns {number}
     */
    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

    /**
     * @returns {number}
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}


setTimeout(() => {

    new Carrousel(document.querySelector("#best_movies"), {
        slidesToScroll: 1, slidesVisible: 4,
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