let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")

let input = document.querySelector("input")

let score = 0

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let chars = new Map()

input.addEventListener("keyup", () => {
    correctKana(input.value)
})


window.addEventListener("load", () => {
    input.focus()
})


function correctKana(value) {
    let result = chars.get(value)
    if( !!result ) {
        input.style.boder = "1px green solid"
        chars.delete(value)
        console.log(chars.size)
        input.value = ""
        score++
    } else {
        input.style.border = "1px red solid"
    }
}



let loseOffset = 500

class Hiragana {
    // ?????
    #hiraganas = ["a", "i", "e", "o", "u", "ka", "ki", "ke", "ko", "ku", "sa", "shi", "se", "so", "su", "ta", "ti", "te", "to", "tsu", "na", "ni", "ne", "no", "nu", "ha", "hi", "he", "ho", "hu", "ma", "mi", "me", "mo", "mu", "ra", "ri", "re", "ro", "ru", "ya", "yu", "yo", "wa", "wo", "n"];

    constructor() {
        this.hira = this.#hiraganas[Math.floor(Math.random() * this.#hiraganas.length)]
        this.image = new Image()
        this.path_display = `./assets/${this.hira}.png`
        this.opacity = 0
        
    
        this.x = Math.floor(Math.random() * (canvas.width - 200))
        this.y = Math.floor(Math.random() * (canvas.height - 200))
        this.w = 100
        this.h = 100
    }



    update() {
        this.image.src = this.path_display
        this.opacity+= 0.001
        this.rotation++
        this.w += Math.random()
        this.h+= Math.random()
    }

    draw() {
        c.globalAlpha = this.opacity

        if( this.w > loseOffset || this.h > loseOffset ) {
            alert("You lose")
            location.reload()
        }
       
        c.drawImage(this.image, this.x, this.y, this.w, this.h)
        c.restore()

    }


    
}

function init() {
    for(let i = 0; i < 10; i++) {
        let h = new Hiragana()
        chars.set(h.hira, h)
    }
    console.log(chars.size)
    
}


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)
    c.font= "2rem Sans-Serif"
    c.fillText(`Score: ${score}`, (canvas.width - 100) / 2 , canvas.height - 100)

    if(chars.size < 5) {
        init()
    }

    for(let [ele, value] of chars) {
        value.update()
        value.draw()
    }
}
init()


animate()