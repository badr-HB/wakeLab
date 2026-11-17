// // const SubmitPopup = document.getElementById('cross');

// // SubmitPopup.addEventListener('click', () => {
// //     document.getElementById('popParent').classList.remove('flex')
// //     document.getElementById('popParent').classList.add('hidden')

// // })

const fetch = async () => {
    try {
        const results = await axios.get('http://localhost:3000/api/activites')
        console.log(results.data);
    }
    catch (err) {
        console.log("this is error : " + err);
    }
}

fetch()

