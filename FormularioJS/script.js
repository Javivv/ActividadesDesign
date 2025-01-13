document.addEventListener("DOMContentLoaded", function () { // Con esto hacemos que el script espere a que el documento este cargado

    const arrayImagenes = [
        "images/imagen1.png",
        "images/imagen2.png",
        "images/imagen3.png",
        "images/imagen4.png",
        "images/imagen5.webp",
        "images/imagen6.png",
        "images/imagen7.png",
        "images/imagen8.webp"
    ];
    let color = "white";

    document.querySelector("select").addEventListener("change", function () {
        color = this.value;
        console.log(color);
    });

    document.querySelector(".addElements").addEventListener("click", function () {
        let imagenAleatoria = arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)];

        document.querySelector(".container").insertAdjacentHTML(
            "beforeend",
            `<div class="elemento" style="background-color: ${color};">
                <img src="${imagenAleatoria}" alt=""/>
                <button class="btn-change">Cambiar</button>
                <button class="btn-delete">Borrar</button>
            </div>`
        );
    });

    document.querySelector(".colorChange").addEventListener("click", function () {
        document.querySelectorAll(".elemento").forEach(function (elemento) {
            elemento.style.backgroundColor = color;
        });
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-change")) {
            let imagenAleatoria = arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)];
            event.target.previousElementSibling.setAttribute("src", imagenAleatoria); // Cambia la imagen
        }

        if (event.target.classList.contains("btn-delete")) {
            event.target.parentElement.remove(); // Elimina el elemento
        }
    });

    document.querySelector(".resetColors").addEventListener("click", function () {
        color = "white";
        document.querySelectorAll(".elemento").forEach(function (elemento) {
            elemento.style.backgroundColor = color;
        });
    });
});
