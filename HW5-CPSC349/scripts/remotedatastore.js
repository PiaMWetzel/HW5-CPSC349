
//Firebase backend


const pendingOrders = document.querySelectorAll('.panel-body')[1];

const form = document.querySelector('.panel-body form');



function renderOrders(doc){
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    let data = document.createElement('span');

    
    li.setAttribute('data-id', doc.id);
    checkbox.setAttribute('type', 'checkbox');
    data.textContent = doc.data().size + " " + doc.data().flavor + " " + doc.data().order + " " + "(" + doc.data().email + ")" + " " + "[x" + doc.data().caffein + "]";
    

    li.appendChild(checkbox);
    li.appendChild(data);

    pendingOrders.appendChild(li);

    // deleting data
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('coffee-orders').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('coffee-orders').add({
        size: form.size.value,
        flavor: form.flavorShot. value,
        order: form.coffeeOrder.value,
        email: form.emailInput.value,
        caffein: form.strengthLevel.value
    });
    form.emailInput.value = '';
    form.coffeeOrder.value = '';
    form.coffeeOrder.value = '';
});

//real-time updates
db.collection('coffee-orders').orderBy('flavor').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){

            renderOrders(change.doc);
        } else if (change.type == 'removed'){

            let li = pendingOrders.querySelector('[data-id=' + change.doc.id + ']');
            pendingOrders.removeChild(li);
        }
    });
});


