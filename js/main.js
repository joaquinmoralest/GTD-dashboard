// Variables
const formulario = document.querySelector('form');
const textoInput = document.querySelector('#texto');
const listadoInbox = document.querySelector('#listado-inbox');
const btnNow = document.querySelector('#btn-now');
const btnSoon = document.querySelector('#btn-soon');
const btnProjects = document.querySelector('#btn-projects');
const listadoNow = document.querySelector('#now');
const listadoSoon = document.querySelector('#soon');
const listadoProjects = document.querySelector('#projects');

const objInbox = {
    id: '',
    texto: '',
    now: '',
    fecha: '',
    proyecto: '',
    done: '',
};

// Clases
class Tasks {
    constructor() {
        this.tasks = [];
    }

    agregarTask(task) {
        this.tasks = [...this.tasks, task];
    };

    editarTask(taskActualizada) {
        this.tasks = this.tasks.map(task => task.id === taskActualizada.id ? taskActualizada : task);
    };

    eliminarTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    };
};

class UI {
    mostrarAlerta(mensaje, tipo) {
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('alert', 'text-center', 'd-block', 'col-12');
        divAlerta.textContent = mensaje;

        if(tipo === 'error') {
            divAlerta.classList.add('alert-danger');
        } else {
            divAlerta.classList.add('alert-success');
        }

        document.querySelector('#inbox').insertBefore(divAlerta, document.querySelector('form'));

        setTimeout(() => {
            divAlerta.remove();
        }, 2500)
    };

    mostrarInbox({tasks}) {
        this.limpiarHTML();

        tasks.forEach(task => {
            const {id, texto} = task;
            
            const divTask = document.createElement('div');
            divTask.dataset.id = id;
            divTask.classList.add('list-group-item');

            divTask.innerHTML = 
            `
                <input class="form-check-input me-1" type="checkbox" value="">
                ${texto}
            `

            listadoInbox.appendChild(divTask);
        })
    };

    mostrarReview() {};

    limpiarHTML() {
        while(listadoInbox.firstChild) {
            listadoInbox.removeChild(listadoInbox.firstChild);
        }
    };
}

const administrarTasks = new Tasks;
const ui = new UI;

// Funciones
eventListener();
function eventListener() {
    textoInput.addEventListener('input', datosTask)

    formulario.addEventListener('submit', nuevaTask);
}

function datosTask(e) {
    objInbox[e.target.name] = e.target.value;
}

function nuevaTask(e) {
    e.preventDefault();
    
    const {texto} = objInbox;

    if(texto === '') {
        ui.mostrarAlerta('Debes ingresar informacion', 'error');

        return;
    }

    objInbox.id = Date.now()
    administrarTasks.agregarTask({...objInbox});

    ui.mostrarAlerta('Ingresado correctamente');

    formulario.reset();
    reiniciarObj();

    ui.mostrarInbox(administrarTasks);
}

function reiniciarObj() {
    objInbox.id = '';
    objInbox.texto = '';
    objInbox.now = '';
    objInbox.fecha = '';
    objInbox.proyecto = '';
    objInbox.done = '';
}