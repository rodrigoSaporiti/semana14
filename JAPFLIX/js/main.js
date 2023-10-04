const api = "https://japceibal.github.io/japflix_api/movies-data.json";


async function apiFetch(){
  let res = await fetch(api);
  let data = await res.json();
  return data
};




let boton = document.getElementById("btnBuscar");


boton.addEventListener("click", async function(){

let buscar = document.getElementById("inputBuscar").value;
let productos = await apiFetch();

 let nuevoArray= productos.filter((element)=> buscar == element.name || );

 console.log(nuevoArray);

    


});