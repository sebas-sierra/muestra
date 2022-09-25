//difinicion de la clase constructora para el objeto resultado
class Resultado {
    constructor(id, local, visitante, golesL, golesV, ) {
        this.id = id,
        this.equipoLocal = local;
        this.equipoVisitante = visitante;
        this.golesLocal = golesL;
        this.golesVisitante = golesV;
    }    
}


//esto tosavia no esta en uso
/*
class partidoDeLaFecha{
    constructor(id, horario, estadio, equipoLocal, equipoVisitante, golesLocal, golesVisitante, ganadorDelPartido, perdedorDelPartido, empate){
        this.id = id,
        this.horario = horario,
        this.estadio = estadio,
        this.equipoLocal = equipoLocal, 
        this.equipoVisitante = equipoVisitante,
        this.golesLocal = golesLocal,
        this.golesVisitante = golesVisitante,
        this.ganadorDelPartido = ganadorDelPartido,
        this.perdedorDelPartido = perdedorDelPartido,
        this.partidoEmpatado = empate, 
    }
    pronostico(){
        //esto puede crear un elemento en el dom y mostrar el texto
        const pronosticoHTML = document.createElement('<p>');
        pronosticoHTML.innerText = `<span>Tu pronostico para este patido es Equipo local: " + ${match.equipoLocal} + " Equipo visitante: " + ${match.equipoVisitante}</span>`;
    }
}
*/

// -  Array vacio donde se almacenan mis resultados porvenientes del formulario mediante la ejecucion de la fn 'agregarProde'
const resultadosAlmacenados = [];
//array donde se van a guardar los resultados cargados por el usuario
let resultadosUser = []

let golesL = '';
let golesV = '';
resultadosUser.push(new Resultado(resultadosUser.length+1,"Banfield", "Defensa y Justicia", golesL, golesV));
resultadosUser.push(new Resultado(resultadosUser.length+1,"Quilmes", "Arsenal de Sarandi", golesL, golesV));
resultadosUser.push(new Resultado(resultadosUser.length+1,"Deportivo Moron", "Patronato", golesL, golesV));
resultadosUser.push(new Resultado(resultadosUser.length+1,"Central Cordoba", "Atlanta", golesL, golesV));

// - Formulario donde el usuario asigna los resultados
/* - Formulario donde cargo el usuario carga sus resultados, usando la fn 'agregarProde' estos resultados se guardan en el array resultados Almacenados
     */
     const resultadosdelusuario = document.querySelector('#resultadosDelUsuario');

// - Tabla de puntajes de usuarios
/* - la idea es que cada usuario pueda comprar sus resultados con los "resultados oficiales" y obtenga un puntaje en base a dicha 
     comparacion y por lo tanto una ubicacion dentro de la tabla de posiciones. Esta tabla de posiciones se muestra a travez de la fn "mostrarPuntajes",
     dentro de la conts "tablaPuntos" en el div con id="tablapuntaje"
     */
     const tablaPuntos = document.querySelector("#tablapuntaje tbody");

// - Tabla Resultados cargadoa
/* - De la izquierda abajo, muestra los partidos para los cuales el usuario ha cargado un resultado, a traves de la fn "mostrarListado" creo una 
     constante llamada 'partidoHTML' y un elemento <tr> para cada uno de los elementos 'partido' que encuentra dentro del array "resultadosAlmacenados".
     **/
     const tablaResultadosGuardados = document.querySelector('#misResultadosGuardados')



//funcion que me trae la plantilla del formulario
mostrarPlantilla();

//funcion que arma la plantilla que el usuario debe cargar
function mostrarPlantilla(){
    resultadosdelusuario.innerHTML = "";
    resultadosUser.forEach((match) => {
        const matchHTML = document.createElement('div');
        matchHTML.innerHTML = `
        
                <div class="card mb-3 " id="juego_${match.id}" >
                    <div class="card-body">
                        <div class="datosParaGuardar">

                            <h6 class="card-title"><label id="partido-ID${match.id}">Partido nro.: ${match.id}</label></h6>
                            <div class="input-group mb-3">
                                <label id="equipo-local${match.id}" for="golLocal" class="input-group-text">${match.equipoLocal}</label>
                                <input class="form-control" id="goles-local${match.id}" type="number" name="golLocal" >
                            </div>
                            <div class="input-group mb-3">
                                <label id="equipo-visitante${match.id}" for="golVisitante" class="input-group-text">${match.equipoVisitante}</label>
                                <input class="form-control" id="goles-visitante${match.id}" type="number" name="golVisitante" value=" ">
                            </div>
                        </div>
                        <button id="guardarBtn_${match.id}" type="button" onclick="agregarProde(event)" class="btn btn-primary">Guardar resultado</button>

                    </div>
                </div>   
            </div>`
                
                ;
    resultadosdelusuario.appendChild(matchHTML);
    })
}
console.log(resultadosUser);


const datosParaGuardar = document.querySelectorAll('#datosParaGuardar');

// - Funcion 'agregarProde'
/* - Con esta fn 'agregarProde' tomo los valores ingresados en la plantilla y los guardo en el array 'resultadosAlmacenados' y llamo 
     a la fn 'mostrarListado', el id del boton 'guardarBtn_id' tiene que ser igual al 'match.id'
     */
function agregarProde(event) {

    const btn = event.target;
    const id = btn.id.split('_')[1];
    console.log("Partido nro: " + id);

    const encuentro = resultadosUser.filter((result) => result.id == id)[0];
    console.log('Imprimo el id: ' + encuentro.id + encuentro.equipoLocal);
    //console.dir(encuentro) 

    let idNuevoProde = document.getElementById("partido-ID" + id).innerText;
    let equipoLocalNuevoProde = document.getElementById("equipo-local" + id).innerText;
    let equipoVisitanteNuevoProde = document.getElementById("equipo-visitante" + id).innerText;
    let golesLocalNuevoProde = document.getElementById("goles-local" + id).value;
    let golesVisitanteNuevoProde = document.getElementById("goles-visitante" + id).value;

    const nuevoProde = new Resultado(
        idNuevoProde,
        equipoLocalNuevoProde,
        equipoVisitanteNuevoProde,
        golesLocalNuevoProde,
        golesVisitanteNuevoProde
    );
    
    resultadosAlmacenados.push(nuevoProde);

    console.log(resultadosAlmacenados);
    mostrarListado();
    //compararResultados()
}

function mostrarListado() {
    tablaResultadosGuardados.innerHTML = "";

    resultadosAlmacenados.forEach((partido) => {
        const partidoHTML = document.createElement('tr');
        partidoHTML.innerHTML = `<td>${partido.id}</td>
                                 <td id="glocal">${partido.equipoLocal}: <span id="localg">${partido.golesLocal}</span></td>
                                 <td id="gvisitante">${partido.equipoVisitante}: <span id="visitanteg">${partido.golesVisitante}</span></td>
                                 <td><button id="editarBtn_${partido.id}" type="button" onclick="editarResultado(event)" class="btn btn-outline-primary">editar resultado</button></td>`;
        tablaResultadosGuardados.appendChild(partidoHTML);
        partidoHTML.setAttribute('id', `position_${partido.id}`);
    })
};








//- - - - - - - - - - LOCALSTORAGE && JASON - - - - - - - - - - 


//Aca esta mi array de usuarios para guardar en el localStorage
let usuarios =[ 
    {id:1, nombre:'Noe-CARP', aciertos_exactos: 4, puntos_total: 12 },
    {id:2, nombre:'Toni_capo_del_sur', aciertos_exactos: 3, puntos_total: 9 },
    {id:3, nombre:'NegroEl31', aciertos_exactos: 3, puntos_total: 9 },
    {id:4, nombre:'ParrillaCaco', aciertos_exactos: 2, puntos_total: 6 },
    {id:5, nombre:'Toni_capo_del_sur', aciertos_exactos: 0, puntos_total: 90 }
];

//Guardo cada uno de los objetos del array en el localStorage
const usuariosJSON = (clave, valor) =>{localStorage.setItem(clave, valor)};
/*for (const usuario of usuarios) {
    usuariosJSON(usuario.id, JSON.stringify(usuario));
    
}*/
usuariosJSON('listausuarios', JSON.stringify(usuarios));

//Para sacar los objetos del array defino una clase constructora
class Usuario {
    constructor(el) {
        this.nombre = el.nombre;
        this.aciertos_exactos = el.aciertos_exactos;
        this.puntos_total = el.puntos_total;
    }
}

//Tomo la mi listadusuarios del localStorage y la separo usando un for para formatear 
//el string con la clase constructora anterior y lo meto en un nuevo array guardados
const guardados = JSON.parse(localStorage.getItem('listausuarios'));
usuarios = [];

for (const coso of guardados) {
    usuarios.push(new Usuario(coso));
    
};

//lo muestro por consola
console.log(usuarios);
console.log(guardados[2].nombre);

//Esta es la fn que toma los datos de los usuarios dentro del array 'guardados' y me los muestra en una tabla a traves de la constante tablaPuntos
function mostrarpuntajes() {
    tablaPuntos.innerHTML = "";
    guardados.forEach((usuarioenguardados) => {
        const puntajeHTML = document.createElement("tr");
        puntajeHTML.innerHTML = `<th scope="row">${usuarioenguardados.id}</th>
                          <td>${usuarioenguardados.nombre}</td>
                          <td>${usuarioenguardados.aciertos_exactos}</td>
                          <td>${usuarioenguardados.puntos_total}</td>
                           `;
        tablaPuntos.appendChild(puntajeHTML);
    });
}
mostrarpuntajes()


//Esta es la clase constructor de losobjetos del array resultadoOficial
class Partido2 {
    constructor(local, visitante, golesA, golesB) {
        this.equipoLocal = local;
        this.equipoVisitante = visitante;
        
        this.golesLocal = golesA;
        this.golesVisitante = golesB;
    }    
}
let resultadoOficial=[]
resultadoOficial.push(new Partido2("equipoLocalA", "equipoVisitanteB" , 1, 2));




//- - - - - - - - - - USO DE OPERADOR TERNARIO Y DESESTRUCTURACION - - - - - - - - - - 

function compararResultados(){
    swal("Bien ahi!", "Clickeaste el boton Comparar resultados!", "success",{
        buttons: false,
        timer: 3000,
      });


const [{golesLocal:mrgl}] = resultadosAlmacenados;
const [{golesVisitante:mrgv}] = resultadosAlmacenados;

const [{golesLocal:rogl}] = resultadoOficial;
const [{golesVisitante:rogv}] = resultadoOficial;

console.log(mrgv, mrgl);
console.log(rogv, rogl);

//Mensajes que se muestran segun el resultado de la ejecucion de los condicionales
let msg1 = "Tu pronostico fue exacto, sumas 5 puntos extra!" ;
let msg2 = "Tu pronostico no fue exacto, pero el partido fue empate";
let msg3 = "Tu pronostico no fue exacto, pero acertaste el ganador local";
let msg4 = "Tu pronostico no fue exacto, pero acertaste el ganador visitante";
let msg5 = "Tu pronostico fue errado, no sumas puntos";


//TERNARIO
//por ultimo estecondicional lo pase a operador ternario
(mrgl == rogl) && (mrgv == rogv)? console.log(msg1) : (mrgl == mrgv) && (rogl == rogv)? console.log(msg2): (mrgl > mrgv) && (rogl > rogv)? console.log(msg3) : (mrgl < mrgv) && (rogl < rogv )? console.log(msg4) : console.log(msg5);
chequeoDeArray();

}

const sologoleslocal = []

function chequeoDeArray(){
for (let i = 0; i < resultadosAlmacenados.length; i++) {
    sologoleslocal.push(resultadosAlmacenados[i].golesLocal, resultadosAlmacenados[i].golesVisitante)
    
}console.log(sologoleslocal);
}
/*
function chequeoDeArray(){
    for (let i = 0; i < resultadosAlmacenados.length; i++) {
        sologoleslocal.push(resultadosAlmacenados[i].golesLocal, resultadosAlmacenados[i].golesVisitante)
        
    }console.log(sologoleslocal);
    }*/