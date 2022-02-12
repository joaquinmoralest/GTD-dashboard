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
        }, 2000)
    };

    mostrarInbox({tasks}) {
        this.limpiarHTML();

        tasks.forEach(task => {
            const {id, texto} = task;
            const newId = 'id' + id;
            
            const btnTask = document.createElement('button');
            const divCollapsed = document.createElement('div');
            const divCard = document.createElement('div');
            const labelNow = document.createElement('label');
            const inputNow = document.createElement('input');
            const labelDate = document.createElement('label');
            const inputDate = document.createElement('input');
            const labelProject = document.createElement('label');
            const inputProject = document.createElement('select');
            const option = document.createElement('option');

            btnTask.dataset.id = id;
            btnTask.setAttribute('type', 'button');
            btnTask.setAttribute('data-bs-toggle', 'collapse');
            btnTask.setAttribute('data-bs-target', `#${newId}`);
            btnTask.setAttribute('aria-expanded', 'false');
            btnTask.setAttribute('aria-controls', newId);
            btnTask.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-light');

            btnTask.innerHTML = 
            `
                <input class="form-check-input me-1" type="checkbox" value="">
                ${texto}
            `

            divCollapsed.setAttribute('id', newId);
            divCollapsed.classList.add('collapse');
            divCard.classList.add('card', 'card-body', 'd-flex', 'flex-row-lg', 'justify-content-between');

            labelNow.classList.add('form-check-label', 'mb-3');
            labelNow.setAttribute('for', 'input-now');
            labelNow.textContent = 'Now?';
            inputNow.classList.add('form-check-input', 'me-1');
            inputNow.setAttribute('type', 'checkbox');
            inputNow.setAttribute('id', 'input-now');
            labelNow.appendChild(inputNow);

            labelDate.classList.add('form-label', 'mb-3');
            labelDate.setAttribute('for', 'input-date');
            labelDate.textContent = 'Date';
            inputDate.classList.add('form-control');
            inputDate.setAttribute('type', 'date');
            inputDate.setAttribute('id', 'input-date');
            labelDate.appendChild(inputDate);

            labelProject.classList.add('form-label', 'mb-3');
            labelProject.setAttribute('for', 'input-project');
            labelProject.textContent = 'Choose a project...';
            inputProject.classList.add('form-select');
            inputProject.setAttribute('aria-label', 'default select');
            inputProject.setAttribute('id', 'input-project');
            option.textContent = 'Empty';
            inputProject.appendChild(option);
            labelProject.appendChild(inputProject);

            divCard.appendChild(labelNow);
            divCard.appendChild(labelDate);
            divCard.appendChild(labelProject);
            divCollapsed.appendChild(divCard);

            listadoInbox.appendChild(btnTask);
            listadoInbox.appendChild(divCollapsed);
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