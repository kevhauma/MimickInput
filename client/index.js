window.addEventListener('load', init, false)


function init() {
    let w = 750
    let h = 600
    let c = document.getElementById("mimick");
    let ctx = c.getContext("2d");

    let currentKey = "up"
    let currentMouse = ""

    let socket = io()
    socket.on('keyDown', (key) => {
        currentKey = key;
        resetCanvas()

    })
    socket.on("keyUp", () => {
        currentKey = "up";
        resetCanvas()
    })
    socket.on('mouse', (mouse) => {
        currentMouse = mouse.x + "-" + mouse.y
        resetCanvas()
    })

    function resetCanvas() {
        ctx.clearRect(0, 0, c.width, c.height);
        let baseImg = document.getElementById("base")
        let keyImg = document.getElementById(currentKey)
        let mouseImg = document.getElementById(currentMouse)
        console.log(baseImg, currentKey, mouseImg)
        ctx.drawImage(baseImg, 0, 0, w, h)
        ctx.drawImage(keyImg, 0, 0, w, h)
        ctx.drawImage(mouseImg, 0, 0, w, h)



    }
}
