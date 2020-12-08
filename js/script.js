let contactos = [
    { name: "juan", surname: "aguilar", age: 34, phone: "687458711", email: "loquesea1@gmail.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "pepa", surname: "sanz", age: 24, phone: "642309825", email: "loquesea2@loquesea.com", gender: "f", address: "C/ Falsa,123", city: "Madrid" },
    { name: "alberto", surname: "perez", age: 40, phone: "687458711", email: "loquesea3@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "lucia", surname: "fernandez", age: 52, phone: "642309825", email: "loquesea4@loquesea.com", gender: "f", address: "C/ Falsa,123", city: "Madrid" },
    { name: "fermin", surname: "sanz", age: 39, phone: "642309825", email: "loquesea5@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "daniel", surname: "villar", age: 26, phone: "678746635", email: "loquesea6@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "juan antonio", surname: "garcía", age: 42, phone: "642309825", email: "loquesea7@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "pedro", surname: "romero", age: 46, phone: "687458711", email: "loquesea8@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "ana", surname: "sanchez", age: 46, phone: "642309825", email: "loquesea9@loquesea.com", gender: "f", address: "C/ Falsa,123", city: "Madrid" },
    { name: "antonia", surname: "casas", age: 33, phone: "687458711", email: "loquesea10@loquesea.com", gender: "f", address: "C/ Falsa,123", city: "Madrid" },
    { name: "felisa", surname: "jimenez", age: 54, phone: "642309825", email: "loquesea11@loquesea.com", gender: "f", address: "C/ Falsa,123", city: "Madrid" },
    { name: "hugo", surname: "martin", age: 50, phone: "687458711", email: "loquesea12@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "andres", surname: "nogal", age: 49, phone: "642309825", email: "loquesea13@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "joaquín", surname: "perez", age: 41, phone: "687458711", email: "loquesea14@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" },
    { name: "juan", surname: "tomillo", age: 38, phone: "642309825", email: "loquesea15@loquesea.com", gender: "m", address: "C/ Falsa,123", city: "Madrid" }
]

//Variables
let tarjeta = document.querySelector("#tarjeta")
let tarjetero = document.querySelector("#contact-list")
let form = document.querySelector("#frmcontacto")

//Conf al pulsar Agenda

document.querySelector("#agenda").onclick=()=>{
    showContacts()
}

//Conf botón NUEVO
let modal = document.querySelector(".modal")
document.querySelector("#btnnuevo").onclick=()=>{
    document.querySelector("#frmcontacto").reset()
    modal.classList.remove("modal-hidden")
    document.querySelector("main").classList.add("modal-blur")
}

//Conf botón CANCELAR
document.querySelector("button[name='cancelar']").onclick=()=>{
    modal.classList.add("modal-hidden")
    document.querySelector("main").classList.remove("modal-blur")
}

//Conf botón GUARDAR
document.querySelector("button[name='guardar']").onclick=()=>{
    modal.classList.add("modal-hidden")
    document.querySelector("main").classList.remove("modal-blur")
    saveContact()
}

//Crear tarjetas a partir del array contactos
showContacts()

function showContacts(){
    cleanContacts()
    sortContacts()
    for(let i=0;i<contactos.length;i++){
        let duplicado = tarjeta.cloneNode(true)
        duplicado.style.display="block"
        duplicado.id= "tarjeta" + i
        Object.keys(contactos[i]).forEach(key =>
            duplicado.querySelector(".data[name='" + key + "']").textContent = contactos[i][key]
        )
        if(contactos[i].gender=="f")
            duplicado.querySelector(".foto").src="img/chica.jpg"
        //Enlaces de la tarjeta duplicado
        let links = duplicado.querySelectorAll(".cabecera ul a")
        links.forEach(link => {
            links[0].onclick=()=>detailsContact(contactos[i])
            links[1].onclick=()=>deleteContact(contactos[i])
        })
        tarjetero.appendChild(duplicado)
    }
    
    function sortContacts(){
        contactos.sort((a,b)=>{
            if(a.name.toLowerCase()>b.name.toLowerCase()) return 1
            if(a.name.toLowerCase()<b.name.toLowerCase()) return -1
            if(a.name.toLowerCase()==b.name.toLowerCase()) return 0
        })
    }

    function cleanContacts(){
        while (tarjetero.firstChild){
            tarjetero.firstChild.remove()
        }
    }
}

function detailsContact (contacto){
    document.querySelector("main").classList.add("modal-blur")
    form.querySelector("input[name='txtname']").value = contacto.name
    form.querySelector("input[name='txtsurname']").value = contacto.surname
    form.querySelector("input[name='txtage']").value = contacto.age
    form.querySelector("input[name='txtphone']").value = contacto.phone
    form.querySelector("input[name='txtemail']").value = contacto.email
    form.querySelector("input[name='txtaddress']").value = contacto.address
    form.querySelector("input[name='txtcity']").value = contacto.city
    form.querySelector("select[name='txtgender']").value = contacto.gender
    modal.classList.remove("modal-hidden")
}

function saveContact (){
    let contacto = {}
    contacto.name = form.querySelector("input[name='txtname']").value
    contacto.surname = form.querySelector("input[name='txtsurname']").value
    contacto.age = form.querySelector("input[name='txtage']").value
    contacto.phone = form.querySelector("input[name='txtage']").value
    contacto.email = form.querySelector("input[name='txtemail']").value
    contacto.address = form.querySelector("input[name='txtaddress']").value
    contacto.city = form.querySelector("input[name='txtcity']").value
    contacto.gender = form.querySelector("select[name='txtgender']").value

    let oldContact = contactos.find(c=>c.email==contacto.email)
    if(oldContact==undefined)
        contactos.push(contacto)
    else
        contactos.splice(contactos.indexOf(oldContact),1,contacto)

    showContacts()
}

function deleteContact(contacto){
    if(confirm(`¿Deseas eliminar a ${contacto.name} ${contacto.surname}?`)){
        contactos.splice(contactos.indexOf(contacto),1)   
        showContacts()
    }
}

//Sidebar

let sidebar = document.querySelector("#nav")
let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"

for(let i=0;i<letras.length;i++){
    var letraEnlace = document.createElement("a")
    letraEnlace.href="#"
    var letra = document.createElement("li")
    sidebar.appendChild(letraEnlace).appendChild(letra).textContent=letras[i]
    letra.onclick=()=>{
        for(let j=0;j<contactos.length;j++){
            if(contactos[j].name.toLowerCase().indexOf(letras.toLowerCase()[i])=="0"){
                document.querySelector("#tarjeta" + j).style.display="block"
            }else{
                document.querySelector("#tarjeta" + j).style.display="none"
            }
        }
    }
}

//Buscador

document.querySelector("#buscar").onclick=()=>{
    let buscador = document.querySelector("#buscador").value
    for(let i=0;i<contactos.length;i++){
        if(contactos[i].name.toLowerCase().indexOf(buscador)!=-1){
            document.querySelector("#tarjeta" + i).style.display="block"
        }else{
            document.querySelector("#tarjeta" + i).style.display="none"
        }
    }
}