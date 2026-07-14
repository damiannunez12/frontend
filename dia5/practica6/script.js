lista = new Array("imagen/producto1.jpg","imagen/producto2.webp","imagen/producto3.webp");
indice = 0;
galeria = document.getElementById('galeria');
function cambiarImagen(event){
    if(event.target.id == "btn-siguiente"){
        x = 1;
    }else{
        x = -1;
    }
       indice = indice + x;     
        
        if(indice >= lista.length){
        indice = 0;
    }else if(indice< 0){
        indice = lista.length -1
    }
 galeria.src = lista[indice];
}

BotonAnterior = document.getElementById('btn-anterior');
BotonAnterior.addEventListener('click' , cambiarImagen);
BotonSiguiente = document.getElementById('btn-siguiente');
BotonSiguiente.addEventListener('click' , cambiarImagen);