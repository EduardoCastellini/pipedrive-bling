# API pipedrive-bling

Projeto desenvolvido para a integração entre as plataformas PIPEDRIVE e BLING.

## Referência

A fim de facilitar os testes, foi feito o deploy do projeto utilizando o serviço do Heroku.

URL de produção: https://pipedrive-bling.herokuapp.com

#### Executa sincronização entre as plataformas:

```http
 POST /synchronize
```

#### Endpoint que retorna os dados consolidados:

```http
 GET /deals
```

## Executando a aplicação local

1. Baixe o repositório do projeto em seu computador.
2. Acesse o diretório raiz do projeto.
3. Crie o arquivo .env e adicione as variáveis de ambiente conforme o arquivo de exemplo: .env.example.
4. Execute os seguintes comandos:

```bash
# instalar dependências
$ npm i

# executar aplicação
$ npm run dev
```
