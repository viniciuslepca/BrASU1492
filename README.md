# Nu+ Chrome Extension
**EN-US:** Nu+ is a Google Chrome extension meant to assist Nubank's customers 
in online shopping. Our main goal is to provide customers with more control over their
personal finances by tackling two main issues:
- Avoiding impulse buying
- Providing information to encourage thoughtful decisions for the common practice of 
splitting payments

This extension notifies users when they're about to make an online purchase that's above a
certain threshold (at the moment, 10% of monthly income). By clicking on the extension popup, 
it shows important information about the purchase and allows users to simulate the future installments 
of this purchase added to their other expenses. The graph has two visualization options:
- Installments visualization and calculator: this view calculates the installments of the current purchase based on 
the number of installments chosen by the user, then adds it to a graph that contains all the other installments the user
already has, data drawn from the database. It also includes a helpful "limit line", which is created from a special formula
we developed based on expert opinions.
- Full expenses visualization: this view takes the data from the installments view and includes the user's fixed monthly expenses,
which are calculated using an algorithm we developed, to offer a more holistic view. 
This time, the helper "limit line" shows the monthly expense ceiling for
that user, which is based on their income and the saving goal defined by the user in the [mobile version of Nu+](https://github.com/cldelahan/nu_mais_mobile).

The extension also recommends an optimal number of installments, which is calculated with our 
proprietary algorithm. 
It combines:
- the volatility of the market by using a Brownian Motion to analyze the risk of assuming future debt
- specialist recommendations of keeping installments under 30% of your income (weighed over time)
- the user's saving goals

The last section provides educational statistics to encourage the user to make better financial decisions.

All financial transactions are simulated in a Realtime Firebase database.

This project was developed by team BrASU1492 for BRASA Hacks 2020.

**PT-BR:** Nu+ é uma extensão para Google Chrome que busca auxiliar clientes da Nubank 
em compras online. Nosso principal objetivo é oferecer aos clientes mais controle sobre suas 
finanças pessoais, focando em dois pilares:
- Evitar compras por impulso
- Oferecer informações para estimular decisões conscientes sobre a decisão de parcelar a compra

Essa extensão notifica o usuário quando ele está prestes a fazer uma compra online que ultrapasse um
certo limite (no momento, 10% de sua renda mensal). Clicando no popup da extensão, o usuário pode ver informações
úteis sobre a compra e simular as parcelas futuras dessa compra, somadas às suas outras despesas. O gráfico tem duas 
opções de visualização:
- Calculadora e visualização de parcelas: essa visualização calcula o valor das parcelas da compra atual com base no 
número de parcelas escolhido pelo usuário, em seguida adiciona esses valores a um gráfico que contém todas as outras parcelas
que o usuário já tem no seu cartão, com informações extraídas da base de dados. O gráfico também inclui uma "linha limite" 
auxiliar, que é criada a partir de uma fórmula especial que desenvolvemos de acordo com a opinião de especialistas em finanças pessoais.
- Visualização de todos os gastos: essa visualização usa os valores da visualização de parcelas e adiciona os gastos mensais fixos
do usuário, que são calculados usando um algoritmo que desenvolvemos, para oferecer uma visão mais holística. Nesse caso, a "linha limite"
auxiliar mostra o teto mensal de gastos para o usuário, que é calculado com base em sua renda e no objetivo de economia definido 
pelo usuário na [versão mobile do Nu+](https://github.com/cldelahan/nu_mais_mobile).
 
A extensão também recomenda um número otimizado de parcelas, que é calculado com o nosso 
algoritmo proprietário.
Ele combina:
- a volatilidade do mercado, utilizando movimento Browniano para analisar o risco de assumir dívidas futuras
- recomendações de especialistas par manter o valor total de parcelas abaixo de 30% da sua renda mensal (ponderado pelo tempo)
- o objetivo de economia mensal do usuário
 
A última seção mostra estatísticas educacionais para estimular o usuário a tomar decisões financeiras melhores.

As transações financeiras são simuladas em uma base de dados Realtime Firebase.

Esse projeto foi desenvolvido pelo time BrASU1492 para a BRASA Hacks 2020.

## Usage / Uso
**EN-US:**
1. Clone this repository.
2. Run the server:
    - Using the terminal, run `cd server`
    - Create a virtual environment: `python3 -m venv env`
    - Activate the virtual environment: `source env/bin/activate`
    - Install all dependencies: `pip3 install -r requirements.txt`
    - Run the server: `python3 server.py`
3. Type and enter `chrome://extensions` in the Google Chrome search bar.
4. On the top right, enable "Developer Mode".
5. Click on "Load Unpacked" and select the `credit-control-extension` folder.

**PT-BR:**
1. Clone esse repositório.
2. Ative o servidor:
    - Usando o terminal, execute `cd server`
    - Crie um ambiente virtual: `python3 -m venv env`
    - Ative o ambiente virtual: `source env/bin/activate`
    - Instale as dependências: `pip3 install -r requirements.txt`
    - Execute o servidor: `python3 server.py`
3. Digite `chrome://extensions` na barra de pesquisa do Google Chrome e aperte enter.
4. No canto superior direito, ative o "Modo do desenvolvedor".
5. Clique em "Carregar sem compactação" e selecione a pasta `credit-control-extension`.

## Technologies used / Tecnologias utilizadas
- HTML, CSS, Javascript, Python
- [React.js](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)
- [Notifications.js](https://www.cssscript.com/minimal-notification-popup-pure-javascript/)
- [Firebase](https://firebase.google.com/)
- [Chrome Extension API](https://developer.chrome.com/extensions)
- [Flask](https://flask.palletsprojects.com/)

The BrASU1492 team would like to thank BRASA and Nubank for offering this opportunity and proposing this very interesting
challenge.  
O time BrASU1492 gostaria de agradecer à BRASA e à Nubank por oferecer essa oportunidade e propor esse desafio extremamente
interessante.
