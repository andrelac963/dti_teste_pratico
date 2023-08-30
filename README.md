# Teste prático para vaga de desenvolvedor na DTI Digital
Este projeto foi desenvolvido para o teste prático da DTI Digital. O projeto consiste em uma aplicação web para encontrar o melhor preço de PetShop para o usuário, de acordo com a distância e o dia da semana.

## Tecnologias utilizadas
- Frontend: ReactJS, Typescript, Styled Components, Jest, React Testing Library
- Backend: .NET 7.0, C#, xUnit


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