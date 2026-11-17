// // const SubmitPopup = document.getElementById('cross');

// // SubmitPopup.addEventListener('click', () => {
// //     document.getElementById('popParent').classList.remove('flex')
// //     document.getElementById('popParent').classList.add('hidden')

// // })
const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" }
});

const fetchdata = async () => {
    try {
        const results = await api.get('/activites');

        if (results.status != 200) {
            console.log("API status " + results.status);
            return [];
        }
        displayCrads(results.data)
    }
    catch (err) {
        console.log("this is error : " + err);
        return [];
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
    div.classList.add('w-full', 'min-w-80', 'h-100', 'rounded-[15px]', 'bg-gray-400', 'pl-4', 'space-y-5', 'flex', 'flex-col', 'justify-center')
    h2.classList.add('text-[30px]', 'font-medium')
    p2.classList.add('font-normal', 'text-[18px]')
    p3.classList.add('font-normal', 'text-[18px]')
    p5.classList.add('font-normal', 'text-[18px]')
    p4.classList.add('font-normal', 'text-[18px]', 'rounded-2xl', 'w-fit', 'px-5', 'py-1', 'bg-white')
    p1.classList.add('font-normal', 'text-[18px]')
}

const displayCrads = (argm) => {
    console.log(argm);

    argm.map((index) => {
        CreateCards(index.auteur, index.description, index.duree, index.objectifs, index.theme, index.titre)
    })
}