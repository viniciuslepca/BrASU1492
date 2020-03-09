
function getIds() {
    fetch('/clients').then(response => response.json()).then((clients) => {
        const clientIdsElement = document.getElementById('client-ids');
        clients.forEach((client) => {
            clientIdsElement.appendChild(createDropDownMenu(client.id));
        })
    });
}

function createDropDownMenu(id) {
    const idElement = document.createElement("option");
    idElement.setAttribute("value", id);
    idElement.setAttribute("label", id);

    return idElement;
}
