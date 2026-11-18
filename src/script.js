
const TitreRegex = /[a-zA-Z-0-9- ]{5,100}/;
const DescriptionRegex = /[a-zA-Z-0-9- ]{20,1000}/;
const username = /[a-zA-Z-0-9- ]{5}/;

const submitFormbtn = document.getElementById('submitForm');
const ConfirmUserName = document.getElementById('registeruser');
const SubmitPopup = document.getElementById('cross');
const editname = document.getElementById('editName');
const search = document.getElementById('clicksearch');
const box = JSON.parse(localStorage.getItem('name'));

if (box == null) {
    document.getElementById('popParent').classList.remove('flex')
}
else {
    document.getElementById('popParent').classList.add('hidden')
}

SubmitPopup.addEventListener('click', () => {
    document.getElementById('popParent').classList.remove('flex')
    document.getElementById('popParent').classList.add('hidden')
})
editname.addEventListener('click', () => {
    document.getElementById('popParent').classList.remove('hidden')
    document.getElementById('popParent').classList.add('flex')
})

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" }
});

const fetchdata = async (searchForThis) => {
    try {
        const results = await api.get('/activites', {
            headers: { "Content-Type": "application/json" }
        });
        const box = results.data;
        if ((typeof searchForThis) == "string" && searchForThis != "") {
            const filters = box.filter(t => t.titre == searchForThis)
            console.log(filters);

            displayCards(filters)
        }
        else {
            displayCards(box)
        }
        console.log(typeof searchForThis);
        console.log(searchForThis);
    }
    catch (err) {
        console.log("this is error : " + err);
        return [];
    }
}

const AddNewActivity = async (title, description, objectifs, duration, options) => {
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
        window.location.reload(fetchdata())
    }
    catch (err) {
        console.log("cannot post because: " + err);
    }

}

fetchdata()

const CreateCards = (auteur, description, duree, objectifs, theme, titre) => {
    const parent = document.getElementById('CardContainer');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    const p4 = document.createElement('p')
    const p5 = document.createElement('p')
    parent.appendChild(div);
    div.appendChild(h2)
    div.appendChild(p1)
    div.appendChild(p5)
    div.appendChild(p2)
    div.appendChild(p3)
    div.appendChild(p4)
    h2.textContent = `${titre}`;
    p1.textContent = `auteur: ${auteur}`;
    p2.textContent = `${description}`;
    p3.textContent = `duration of activity ${duree}`;
    p4.textContent = `${theme}`;
    p5.textContent = `${objectifs}`;
    div.classList.add('w-full', 'min-w-80', 'h-100', 'rounded-[15px]', 'bg-gray-400', 'pl-4', 'space-y-5', 'flex', 'flex-col', 'justify-center', 'overflow-auto')
    h2.classList.add('text-2xl', 'font-medium')
    p2.classList.add('font-normal', 'text-[18px]')
    p3.classList.add('font-normal', 'text-[18px]')
    p5.classList.add('font-normal', 'text-[18px]')
    p4.classList.add('font-normal', 'text-[18px]', 'rounded-2xl', 'w-fit', 'px-5', 'py-1', 'bg-white')
    p1.classList.add('font-normal', 'text-[18px]')
}

const displayCards = (data) => {
    document.getElementById('CardContainer').innerHTML = "";
    data.map((index) => {
        CreateCards(index.auteur, index.description, index.duree, index.objectifs, index.theme, index.titre)
    })
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