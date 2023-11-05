let category = document.getElementById("category");
let quantity = document.getElementById("quantity");
let form = document.getElementById('formTickets')
let option;
let num;
let resultado


category.addEventListener("change", function () {
    let optionCategory = category.options[category.selectedIndex];
    option = optionCategory.text;
    payment(num, option);
});

quantity.addEventListener("input", () => {
    num = quantity.value;
    let validation = /^[0-9]+$/;
    if (!validation.test(num) && num != 0) {
        document.getElementById("messageError").className = "messageError";
        document.getElementById("messageError").textContent =
            "*Error, ingrese un número valido";
    } else {
        document.getElementById("messageError").className = "messageErrorDisabled";
        document.getElementById("messageError").textContent = "";
        payment(num, option);
    }
});

function payment(num, type) {
    let ticketPrice = 200
    resultado;
    let pay = document.getElementById("payment");
    if (type === "Estudiante") {
        resultado = Math.round(ticketPrice * (1 - 0.8) * num);
        pay.textContent = resultado;
    } else if (type === "Trainee") {
        resultado = Math.round(ticketPrice * (1 - 0.5) * num);
        pay.textContent = resultado;
    } else if (type === "Junior") {
        resultado = Math.round(ticketPrice * (1 - 0.15) * num);
        pay.textContent = resultado;
    }
    cancelPayment(pay);
    // buyTicket(pay)
}

function cancelPayment(i) {
    let btn = document.getElementById("reset");
    btn.addEventListener("click", () => {
        i.textContent = "";
        option = "";
        num = "";
        resultado= ''
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Compra cancelada",
            showConfirmButton: false,
            timer: 1500,
        });
    });
}

function showResumen(){
    let name = document.getElementById('name')
    let lastName = document.getElementById('lastName')
    let email = document.getElementById('email')
    const btnResumen = document.getElementById('btn-Resumen')
    btnResumen.addEventListener('click', ()=>{
        let body = document.getElementById('modal-body');
        body.innerHTML = `
        <div>                
            <p class="p-modal">Nombre Completo:<span class="span-modal">${name.value + ' ' + lastName.value}</span></p>
            <p class="p-modal">Correo:<span class="span-modal">${email.value}</span></p>
            <p class="p-modal">Cantidad de tickets: <span class="span-modal">${num}</span></p>
            <p class="p-modal">Tipo de descuento: <span class="span-modal">${option}</span></p>
            <p class="p-modal">Total a pagar: <span class="span-modal">${'$ '+resultado}</span></p>
        </div>`
        butIt()
})

}

function butIt(){
    document.getElementById('btn-Success').addEventListener('click', ()=>{
        let modalBody = document.getElementById('modal-body')
        while (modalBody.firstChild){
            modalBody.removeChild(modalBody.firstChild)
        }
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Compra realizada",
            showConfirmButton: false,
            timer: 1500,
        });
        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i];
            element.value = element.defaultValue;
        }
    })

}


showResumen()