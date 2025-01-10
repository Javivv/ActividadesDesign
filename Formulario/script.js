$(function(){ // Con esto hacemos que el script espere a que el documento este cargado

    const arrayImagenes = [
        "images/imagen1.png",
        "images/imagen2.png",
        "images/imagen3.png",
        "images/imagen4.png",
        "images/imagen5.webp",
        "images/imagen6.png",
        "images/imagen7.png",
        "images/imagen8.webp"
    ]
    let color = "white"

    $("select").change(function(){
        color = $(this).val()
        console.log(color);
    })

    $(".addElements").click(function() {
        let imagenAleatoria = arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)];
    
        $(".container").append(
            `<div class="elemento" style="background-color: ${color};">
                <img src="${imagenAleatoria}" alt=""/>
                <button class="btn-img">Cambiar</button>
                <button class="btn-img">Borrar</button>
            </div>`
        );
    });
    

    $(".colorChange").click(function(){

        $(".elemento").css("background-color", color);
    })
    
    $(".btn-change").click(function(){
        
        let imagenAleatoria = arrayImagenes[Math.floor(Math.random() * arrayImagenes.length)];


        $(this).siblings("img").attr("src", imagenAleatoria);        // Se debe usar $(this) para que lo tome como un objeto jquery
    })

    $(".btn-delete").click(function(){

        $(this).parent().remove();
        // Se debe usar $(this) para que lo tome como un objeto jquery
    })

    $(".resetColors").click(function(){

        color = "white"
        $(".elemento").css("background-color", color);
        // Se debe usar $(this) para que lo tome como un objeto jquery
    })







})