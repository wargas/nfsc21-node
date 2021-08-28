# GERADOR DE NOTAS FISCAIS DE SERVIÇO DE COMUNICAÇÃO

## Primeiros passos

Instale a biblioteca: 

`npm i nfsc21-node`

Gere um array como os campos e linhas

`const nfsc = new Nfsc(data)`
`const { cadastros, items, mestres} = nfsc.make()`

Os arquivos serão gerados pelo usuário da forma mais conveniente.
