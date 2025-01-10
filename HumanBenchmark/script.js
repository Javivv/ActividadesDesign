$(function(){

    let waitingScreen = true
    let redScreen = false
    let greenScreen = false
    let firstClick = ""
    let secondClick = ""

    $(".container").click(async function(){

        
        if (waitingScreen) {
            waitingScreen = false
            redScreen = true

            $(this).html('<h1 style="color: white;"> Pulse cuando sea verde ... </h1>')
            $(this).attr("style", "background-color: #e74c3c;")

            timeToGreen()


            
        } else if (redScreen) {
            $(this).attr("style", "background-color: #3498db;")
            $(this).html('<h1 style="color: white;"> Demasiado pronto! </h1> <h3>Haga click para volver a intentar.</h3>' )
            waitingScreen = true
            redScreen = false

        } else {
            secondClick = Date.now()

            $(this).attr("style", "background-color: #3498db;")
            $(this).html(`<h1 style="color: white;"> ${secondClick - firstClick} ms </h1> <h3>Haga click para volver a intentar.</h3>` )

            greenScreen = false
            waitingScreen = true


        }

    })

    function esperar(time){


        return new Promise(resolve => setTimeout(resolve, time));


    }


    async function timeToGreen() {

        const min = 3;
        const max = 9;
        const waitingTime = Math.floor(Math.random() * (max - min + 1) * 1000);

        await esperar(waitingTime)

        if(waitingScreen == false) { // Comprobamos que no haya clickado antes de tiempo
            $(".container").attr("style", "background-color: #2ecc71;")
            $(".container").html('<h1 style="color: white;"> Click! </h1>' )
            greenScreen = true
            firstClick = Date.now()
            redScreen = false
        }

    }


})