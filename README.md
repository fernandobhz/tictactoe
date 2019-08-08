# Tic Tac Toe Testing for DTI

# Requisitos
* Node Version 8 ou maior.

# Instalação das dependências
```
npm install
```

# Execução
```
npm start
```

# Como usar
Apesar de não solicitado, desenvolvi um front-end bem simples
para testar a api, basta acessar o browser em http://localhost:3000

# Testando
```
npm test
```

Existe um teste especial que iterará todas as possibilidades de jogos do jogo da velha (9*8*7*6*5*4*3*2*1), entretanto o mesmo encontra-se comentado, para não causar estranheza. Caso desejem ativar, comentar o a linha abaixo.

```js
	it('Should not return exceptions, all possibles games', function () {
		return; // <<<<<<<<<<<<<<<<<		
```

# git
https://gitlab.com/fernandobhz/tictactoe
