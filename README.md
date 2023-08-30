# Teste prático para vaga de desenvolvedor na DTI Digital
Este projeto foi desenvolvido para o teste prático da DTI Digital. O projeto consiste em uma aplicação web para encontrar o melhor preço de PetShop para o usuário, de acordo com a distância e o dia da semana.

## Tecnologias e Premissas

Frontend:
Para o frontend, foi utilizado o framework ReactJS, com Typescript para tipagem, Styled Components para estilização, Jest e React Testing Library para testes unitários. Decidi utilizar ReactJS com Typescript e Styled Components pois atualmente é a tecnologia mais recomendada para aplicar boas práticas de desenvolvimento web. Como o projeto é pequeno e possui apenas uma página, não foi necessário utilizar rotas, mas tentei componentizar o máximo possível para que o código ficasse mais organizado e reutilizável. Na implementação do projeto existem os inputs para o usuário inserir os dados, e algumas validações, como a validação de data maior que a data atual, e foi utilizado modais de alerta para informar o usuário sobre erros e para mostrar o resultado do cálculo. Para os testes, foi utilizado o Jest e o React Testing Library, que são as ferramentas mais recomendadas para testes em ReactJS.


Backend:
Para o backend, foi utilizado o framework .NET 7.0, com C# para a linguagem de programação. Decidi utilizar .NET pois é uma tecnologia que eu vinha estudando recentemente e é utilizada pela DTI Digital. Na implementação do projeto foi utilizado um DbContext para persistência de dados em memória já que não era necessário persistir os dados em um banco de dados. As especificações só exigiam uma rota para o cálculo do melhor preço, mas decidi implementar o CRUD completo para PetShops e para o usuário, para que fosse possível testar a aplicação de forma mais completa.


# Instruções para rodar o projeto

## Clonar o repositório
```bash
git clone https://github.com/andrelac963/dti_teste_pratico.git
cd dti_teste_pratico
```

## Frontend

### Pré-requisitos:
NodeJS: https://nodejs.org/en/download/

Npm: https://www.npmjs.com/get-npm

### Instalação e execução:
```bash
cd client
npm i
npm run dev
```

### Testes:
```bash
npm run test
```

## Backend

### Pré-requisitos:
SDK .NET 7.0: https://dotnet.microsoft.com/download/dotnet/7.0

### Instalação e execução:
```bash
cd api
dotnet restore
dotnet build
dotnet run
```

### Testes:
```bash
dotnet test
```