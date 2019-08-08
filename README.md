# Tic Tac Toe Testing for DTI

Fernando Reis Guimarães

# Requisitos
* Node, Versão 8 ou maior.

# Instalação das dependências
```
npm install
```

# Execução
```
npm start
```

# Como usar
Apesar de não solicitado, desenvolvi um front-end extremamente simples
para testar a api, basta acessar o browser em http://localhost:3000

# Testando
```
npm test
```

Existe um teste especial que iterará todas as possibilidades de jogos do jogo da velha, entretanto o mesmo encontra-se desabilitado, para não causar estranheza. Caso deseje ativar, comentar o a linha abaixo.

```js
	it('All possibles games', function () {		
		console.log('All possible games is disabled, because, that will take too long time.');
		return; // <<<<<<<<<<<<<<<<<	
```

# git
https://gitlab.com/fernandobhz/tictactoe
