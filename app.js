const templeList = document.querySelector('#temple-list');
const form = document.querySelector("#add-temple-form");

// create element and render
function renderTemple(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'X';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    templeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

// geting data
db.collection('temples').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTemple(doc);
    });
})

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('temples').add({
        name:form.name.value, 
        city:form.city.value
    })
    form.name.value = '';
    form.city.value = '';
})