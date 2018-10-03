const ioHook = require("iohook")
let socket = require("socket.io")
let express = require("express")

let c = require("./config.json")

let prevX = -1
let prevY = -1

let portionX = c.resolution.x / c.sections
let portionY = c.resolution.y / c.sections

web = express()

let http = require('http').Server(web)
let io = require('socket.io')(http)

web.use(express.static('client'))
io.on('connection', function (socket) {

    console.log("connected")
    ioHook.on('mousemove', event => {
        handleMouse(event)

    })
    ioHook.on('keydown', event => {
        handleKeyDown(event)

    })
    ioHook.on('keyup', event => {
        handleKeyUp(event)
    })

    function handleKeyDown(event) {
        if (c.l.find(x => x == event.rawcode))
            io.emit("keyDown", "left")

        if (c.m.find(x => x == event.rawcode))
            io.emit("keyDown", "mid")

        if (c.r.find(x => x == event.rawcode))
            io.emit("keyDown", "right")
    }

    function handleKeyUp(event) {
        io.emit("keyUp")
    }

    function handleMouse(event) {
        let change = false;
        let currentX = Math.floor((event.x - c.offset.x) / portionX)
        currentX = restrain(currentX)
        if (currentX != prevX) {
            change = true
            prevX = currentX
        }
        let currentY = Math.floor((event.y - c.offset.y) / portionY)
        currentY = restrain(currentY)
        if (currentY != prevY) {
            change = true
            prevY = currentY
        }

        if (change) {
            io.emit("mouse", {
                x: currentX,
                y: currentY
            })
        }

        function restrain(x) {
            if (x > c.sections - 1)
                return (c.sections - 1)
            if (x < 0)
                return 0
            return x
        }
    }

})

http.listen(3001, function () {
    console.log('listening on *:3001')
})
ioHook.start();
