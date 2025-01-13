document.addEventListener("DOMContentLoaded", function () {

    let waitingScreen = true;
    let redScreen = false;
    let greenScreen = false;
    let firstClick = "";
    let secondClick = "";

    document.querySelector(".container").addEventListener("click", async function () {

        if (waitingScreen) {
            waitingScreen = false;
            redScreen = true;

            this.innerHTML = '<h1 style="color: white;"> Pulse cuando sea verde ... </h1>';
            this.style.backgroundColor = "#e74c3c";

            timeToGreen();

        } else if (redScreen) {
            this.style.backgroundColor = "#3498db";
            this.innerHTML = '<h1 style="color: white;"> Demasiado pronto! </h1> <h3>Haga click para volver a intentar.</h3>';
            waitingScreen = true;
            redScreen = false;

        } else {
            secondClick = Date.now();

            this.style.backgroundColor = "#3498db";
            this.innerHTML = `<h1 style="color: white;"> ${secondClick - firstClick} ms </h1> <h3>Haga click para volver a intentar.</h3>`;

            greenScreen = false;
            waitingScreen = true;
        }
    });

    function esperar(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function timeToGreen() {
        const min = 3;
        const max = 9;
        const waitingTime = Math.floor(Math.random() * (max - min + 1) * 1000);

        await esperar(waitingTime);

        if (!waitingScreen) { // Comprobamos que no haya clicado antes de tiempo
            const container = document.querySelector(".container");
            container.style.backgroundColor = "#2ecc71";
            container.innerHTML = '<h1 style="color: white;"> Click! </h1>';
            greenScreen = true;
            firstClick = Date.now();
            redScreen = false;
        }
    }
});
