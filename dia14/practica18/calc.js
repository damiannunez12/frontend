display = document.getElementById("display");
valor_display =0;
op= "";
function escribir(Event){
    display.value += Event.target.textContent;
}

function operador(Event){
   op = Event.target.textContent; 
   valorDisplay =parseFloat(display.value);
   display.value="";
}
 function calcular(){
    if(op === "+"){
        display.value = valorDisplay + parseFloat(display.value);
    }else if(op === "-"){
        display.value = valorDisplay - parseFloat(display.value);
    }else if(op === "x"){
        display.value = valorDisplay * parseFloat(display.value);
    }else if ( op === "/"){
       display.value = valorDisplay / parseFloat(display.value);
    }
 }
boton1 = document.getElementById("b1");
boton1.addEventListener("click",escribir);

boton2 = document.getElementById("b2");
boton2.addEventListener("click",escribir);

boton3 = document.getElementById("b3");
boton3.addEventListener("click",escribir);

boton4 = document.getElementById("b4");
boton4.addEventListener("click",escribir);


boton5 = document.getElementById("b5");
boton5.addEventListener("click",escribir);


boton6 = document.getElementById("b6");
boton6.addEventListener("click",escribir);


boton7 = document.getElementById("b7");
boton7.addEventListener("click",escribir);


boton8 = document.getElementById("b8");
boton8.addEventListener("click",escribir);


boton9 = document.getElementById("b9");
boton9.addEventListener("click",escribir);

boton0 = document.getElementById("b0");
boton0.addEventListener("click",escribir);

botonSuma = document.getElementById("bs");
botonSuma.addEventListener("click",operador)

botonResta = document.getElementById("br");
botonResta.addEventListener("click",operador)

botonMultiplicacion = document.getElementById("mul");
botonMultiplicacion.addEventListener("click",operador)

botonDivision = document.getElementById("di");
botonDivision.addEventListener("click",operador)


botonResultado = document.getElementById("bres");
botonResultado.addEventListener("click",calcular)