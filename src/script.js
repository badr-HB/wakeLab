
const TitreRegex = /[a-zA-Z-0-9- ]{5,100}/;
const DescriptionRegex = /[a-zA-Z-0-9- ]{20,1000}/;
const username = /[a-zA-Z-0-9- ]{5}/;

// 
const submitFormbtn = document.getElementById('submitForm');
const ConfirmUserName = document.getElementById('registeruser');
const editname = document.getElementById('editName');
const search = document.getElementById('clicksearch');
const filterbyjeu = document.getElementById('filterjeu');
const filterbyapprentisage = document.getElementById('filterappre');
const filterbyexercice = document.getElementById('filterex');
const filterbyothers = document.getElementById('filterothers');
let box = JSON.parse(localStorage.getItem('name'));

document.getElementById('showName').textContent = `"${box}"`
// 

if (box == null) {
    document.getElementById('popParent').classList.remove('flex')
    document.getElementById('themain').classList.add('pointer-events-none')

}
else {
    document.getElementById('popParent').classList.add('hidden')
    document.getElementById('themain').classList.remove('pointer-events-none')
}

editname.addEventListener('click', () => {
    document.getElementById('popParent').classList.remove('hidden')
    document.getElementById('popParent').classList.add('flex')
    document.getElementById('themain').classList.add('pointer-events-none')
})

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" }
});

const fetchdata = async (searchForThis) => {
    try {
        const results = await api.get('/activites');
        const container = results.data;
        if ((typeof searchForThis) == "string" && searchForThis != "") {
            let filters = container.filter(t => t.titre.toUpperCase() == searchForThis.toUpperCase());
            if (filters.length == 0) {
                filters = container.filter(t => t.theme.toUpperCase() == searchForThis.toUpperCase())
                if (filters.length == 0) {
                    filters = container.filter(t => t.auteur.toUpperCase() == searchForThis.toUpperCase())
                }
            }
            displayCards(filters)
        }
        else {
            displayCards(container)
        }
    }
    catch (err) {
        console.log("this is error : " + err);
        return [];
    }
}

const AddNewActivity = async (title, description, objectifs, duration, options) => {
    box = JSON.parse(localStorage.getItem('name'));

    const data = {
        titre: title,
        theme: options,
        objectifs: objectifs,
        duree: Number(duration),
        description: description,
        auteur: box
    }
    try {
        const results = await api.post('/activites', data)
    }
    catch (err) {
        console.log("cannot post because: " + err);
    }

}

const DeleteActivity = async (id) => {
    try {
        if (box == null) {
            return []
        }
        await api.delete(`/activites/${id}`);
    }
    catch (err) {
        console.log("error in : " + err);

    }
}

fetchdata()

const CreateCards = (auteur, description, duree, objectifs, theme, titre, id) => {
    const parent = document.getElementById('CardContainer');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    const p4 = document.createElement('p')
    const p5 = document.createElement('p')
    const buttondelete = document.createElement('input');
    const buttonedit = document.createElement('input');
    parent.appendChild(div);
    div.appendChild(h2)
    div.appendChild(p1)
    div.appendChild(p5)
    div.appendChild(p2)
    div.appendChild(p3)
    div.appendChild(p4)
    div.appendChild(div2)
    div2.appendChild(buttondelete)
    div2.appendChild(buttonedit)
    h2.textContent = `${titre}`;
    p1.textContent = `auteur: ${auteur}`;
    p2.textContent = `${description}`;
    p3.textContent = `duration of activity ${duree} min`;
    p4.textContent = `${theme}`;
    p5.textContent = `${objectifs}`;
    div.dataset.id = `${id}`
    div.classList.add('w-full', 'min-w-80', 'h-100', 'rounded-[15px]', 'bg-gray-400', 'pl-4', 'space-y-5', 'flex', 'flex-col', 'justify-center', 'overflow-auto')
    h2.classList.add('text-2xl', 'font-medium')
    p2.classList.add('font-normal', 'text-[18px]')
    p3.classList.add('font-normal', 'text-[18px]')
    p5.classList.add('font-normal', 'text-[18px]')
    p4.classList.add('font-normal', 'text-[18px]', 'rounded-2xl', 'w-fit', 'px-5', 'py-1', 'bg-white')
    p1.classList.add('font-normal', 'text-[18px]')
    div2.classList.add('space-x-3', 'btnsparent')
    buttondelete.type = "button";
    buttondelete.classList.add('px-6', 'py-2', 'rounded-xl', 'bg-red-500', 'text-white', 'cursor-pointer', 'delete')
    buttondelete.value = "delete";
    buttonedit.type = "button";
    buttonedit.classList.add('px-6', 'py-2', 'rounded-xl', 'bg-blue-500', 'text-white', 'cursor-pointer', 'edit')
    buttonedit.value = "edit";
}

const displayCards = (data) => {
    document.getElementById('CardContainer').innerHTML = "";

    data.map((index) => {
        CreateCards(index.auteur, index.description, index.duree, index.objectifs, index.theme, index.titre, index.id)
    })
    getdelete(document.querySelectorAll('.delete'));

}

submitFormbtn.addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const objectifs = document.getElementById('objectifs');
    const duration = document.getElementById('duration');
    const select = document.getElementsByTagName('select');

    if (TitreRegex.test(title.value) || DescriptionRegex.test(description.value) || TitreRegex.test(objectifs.value) || (duration.value >= 10 && duration.value <= 20) || select[0].value != "") {
        if (TitreRegex.test(title.value)) {
            title.nextElementSibling.textContent = ''
        }
        if (DescriptionRegex.test(description.value)) {
            description.nextElementSibling.textContent = ''
        }
        if (TitreRegex.test(objectifs.value)) {
            objectifs.nextElementSibling.textContent = ''
        }
        if (duration.value >= 10 && duration.value <= 20) {
            duration.nextElementSibling.textContent = ''
        }
        if (select[0].value != "") {
            select[0].nextElementSibling.textContent = ''
        }
    }
    if (!TitreRegex.test(title.value) || !DescriptionRegex.test(description.value) || !TitreRegex.test(objectifs.value) || !(duration.value >= 10 && duration.value <= 20) || select[0].value == "") {
        if (!TitreRegex.test(title.value)) {
            title.nextElementSibling.textContent = 'minimum 5 caracters needed up to 100';
        }
        if (!DescriptionRegex.test(description.value)) {
            description.nextElementSibling.textContent = 'minimum 20 caracters needed up to 1000'
        }
        if (!TitreRegex.test(objectifs.value)) {
            objectifs.nextElementSibling.textContent = 'please fill this section'
        }
        if (!(duration.value >= 10 && duration.value <= 20)) {
            duration.nextElementSibling.textContent = '10 min is minimum up to 20 min'
        }

        if (select[0].value == "") {
            select[0].nextElementSibling.textContent = 'choose an option'
        }
    }

    if (TitreRegex.test(title.value) && DescriptionRegex.test(description.value) && TitreRegex.test(objectifs.value) && (duration.value >= 10 && duration.value <= 20) && select[0].value != "") {
        AddNewActivity(title.value, description.value, objectifs.value, duration.value, select[0].value);
        Swal.fire({
            title: "well done",
            text: "success",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(fetchdata())
            }
        })
    }

});

ConfirmUserName.addEventListener('click', (event) => {
    event.preventDefault();
    const error = document.querySelector('.danger');
    const inputName = document.getElementById('usernameInput');

    if (username.test(inputName.value) && / /.test(inputName.value)) {
        localStorage.setItem('name', JSON.stringify(inputName.value));
        error.classList.add('hidden');
        if (inputName.value == box) {
            error.classList.remove('hidden');
            error.textContent = 'user already exists';
        }
        else {
            document.getElementById('popParent').classList.add('hidden')
            document.getElementById('themain').classList.remove('pointer-events-none')
        }

        box = JSON.parse(localStorage.getItem('name'));
        document.getElementById('showName').textContent = `"${box}"`;
    }
    else {
        error.classList.remove('hidden')
        error.textContent = 'no valid input'
    }
})

search.addEventListener('click', () => {
    const InputToSearch = document.getElementById('search');
    fetchdata(InputToSearch.value)

})

filterbyjeu.addEventListener('click', () => {
    fetchdata(filterbyjeu.value)
})

filterbyapprentisage.addEventListener('click', () => {
    fetchdata(filterbyapprentisage.value)
})

filterbyexercice.addEventListener('click', () => {
    fetchdata(filterbyexercice.value)
})

filterbyothers.addEventListener('click', () => {
    fetchdata(filterbyothers.value)
})
const getdelete = (para) => {
    for (let i = 0; i < para.length; i++) {
        para[i].addEventListener('click', (event) => {
            const id = event.currentTarget.parentElement.parentElement.dataset.id;
            DeleteActivity(id)
            setTimeout(() => {
                window.location.reload()
            }, 500)
        })
    }
}
