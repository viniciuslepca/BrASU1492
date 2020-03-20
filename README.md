# Nubank+ Chrome Extension
**EN-US:** Nu+ is a Google Chrome extension meant to assist Nubank's customers 
in online shopping. Our main goal is to provide customers with more control over their
personal finances by tackling two main issues:
- Avoiding impulse buying
- Providing information to encourage thoughtful decisions for the common practice of 
splitting payments

This extension notifies users when they're about to make an online purchase that's above a
certain threshold (at the moment, 10% of monthly income). By clicking on the extension popup, 
it shows important information about the purchase and allows users to simulate the future installments 
of this purchase added to their other expenses. The bottom section provides educational statistics to encourage
the user to make better financial decisions.

All financial transactions are simulated in a Realtime Firebase database.

This project was developed by team BrASU1492 for BRASA Hacks 2020.

**PT-BR:** Nu+ é uma extensão para Google Chrome que busca auxiliar clientes da Nubank 
em compras online. Nosso principal objetivo é oferecer aos clientes mais controle sobre suas 
finanças pessoais, focando em dois pilares:
- Evitar compras por impulso
- Oferecer informações para estimular decisões conscientes sobre a decisão de parcelar a compra

Essa extensão notifica o usuário quando ele está prestes a fazer uma compra online que ultrapasse um
certo limite (no momento, 10% de sua renda mensal). Clicando no popup da extensão, o usuário pode ver informações
úteis sobre a compra e simular as parcelas futuras dessa compra, somadas às suas outras despesas. A última seção 
mostra estatísticas educacionais para estimular o usuário a tomar decisões financeiras melhores.

As transações financeiras são simuladas em uma base de dados Realtime Firebase.

Esse projeto foi desenvolvido pelo time BrASU1492 para a BRASA Hacks 2020.

## Usage / Uso
**EN-US:**
1. Download the `credit-control-extension` folder.
2. Type and enter `chrome://extensions` in the Google Chrome search bar.
3. On the top right, enable "Developer Mode".
4. Click on "Load Unpacked" and select the `credit-control-extension` folder.

**PT-BR:**
1. Baixe a pasta `credit-control-extension`.
2. Digite `chrome://extensions` na barra de pesquisa do Google Chrome e aperte enter.
3. No canto superior direito, ative o "Modo do desenvolvedor".
4. Clique em "Carregar sem compactação" e selecione a pasta `credit-control-extension`.

## Technologies used / Tecnologias utilizadas
- HTML, CSS, Javascript
- [React](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)
- [Notifications.js](https://www.cssscript.com/minimal-notification-popup-pure-javascript/)
- [Firebase](https://firebase.google.com/)
- [Chrome Extension API](https://developer.chrome.com/extensions)

The BrASU1492 team would like to thank BRASA and Nubank for offering this opportunity and proposing this very interesting
challenge.  
O time BrASU1492 gostaria de agradecer à BRASA e à Nubank por oferecer essa oportunidade e propor esse desafio extremamente
interessante.