function loadClients() {
  fetch('/clients').then(response => response.json()).then((clients) => {
    const clientListElement = document.getElementById('client-list');
    clients.forEach((client) => {
      clientListElement.appendChild(createTaskElement(client));
    })
  });
}

/** Creates an element that represents a task, including its delete button. */
function createTaskElement(client) {
  const clientElement = document.createElement('li');
  clientElement.className = 'task';

  const titleElement = document.createElement('span');
  titleElement.innerText = client.title;

  clientElement.appendChild(titleElement);
  return clientElement;
}
