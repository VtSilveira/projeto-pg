# Projeto 2 de Processamento Gráfico

Para rodar esse projeto, é necessário ter o node instalado. 
Clique no link para instalar https://nodejs.org/en.
Após instalado, siga as seguintes instruções:

## Instalação

Rode o projeto usando npm:
```bash
  git clone https://github.com/VtSilveira/projeto-pg/
  cd projeto-pg
  npm install vite
  npm run dev 
```
Após isso, deve abrir um servidor local, basta acessá-lo para ver o projeto.

## Controles

No projeto, é possível trocar de camera com as teclas 'a' e 'b', sendo que a câmera que começa é a do atalho 'a'.
Também é possível explorar o projeto usando o mouse, segurando o clique e movendo.
Além disso, ao usar as setinhas do teclado, é possível mover o objeto em formato de rosquinha.

## Sobre o projeto

O projeto consiste em 3 objetos espalhados sobre o espaço, dentre esses tem um torus (rosquinha), uma bola de futebol e um bloco de minecraft. 

Objetos Implementados

Torus: Foi implementado pelo Vitor Silveira, consiste em um objeto em forma de rosquinha, sobre ele foi aplicado o nosso shader próprio, ele também está rotacionando sobre os eixos x, y e z e foi implementada a possibilidade de movimentar ele sobre o espaço utilizando as setinhas.

Bola: Foi implementado pelo Dival Siqueira Neto, consiste em um objeto de forma esferica, sobre ele foi colocado uma textura de bola de futebol e ela está rotacionando sobre o eixo y.

Bloco: Foi implementado pelo Lucas Alves Zito, consiste em um objeto de forma cubica, sobre ele foi colocado uma textura de bloco de minecraft e feitas alterações sobre a cor e o brilho, e assim como a bola, ele está rotacionando sobre o eixo y.

Rotação: Tanto a bola, quanto o bloco estão rotacionando sobre seu eixo y. Enquanto o torus está rotacionando sobre todos os eixos: x, y e z.

Translação: O torus pode ser transladado sobre o espaço utilizando as setas do teclado.

## Câmeras

O projeto possui um total de duas câmeras, sendo ambas câmeras móveis e rotáteis, sendo uma delas com um FOV de 75 graus e a outra 90 graus, ambas implementadas pelo Vitor Silveira.

## Shader (RawShaderMaterial)

O vertex shader é responsável por processar os vértices dos objetos, aplicando transformações de modelo-visualização e projeção. Nesse caso, o shader recebe as posições dos vértices (attribute vec3 position) e suas cores (attribute vec4 color). Ele também recebe matrizes de modelo-visualização (modelViewMatrix) e projeção (projectionMatrix).

O shader envia a posição (vPosition) e a cor (vColor) dos vértices para o fragment shader, após aplicar as transformações de matriz necessárias. A linha gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); calcula a posição final do vértice após as transformações e a envia para o pipeline de renderização.

Fragment Shader (fragmentShader):

O fragment shader processa cada fragmento (pixel) que será renderizado na tela. Ele recebe as informações da posição do vértice interpoladas (varying vec3 vPosition) e a cor do vértice interpolada (varying vec4 vColor). Também recebe uma variável uniform float time que provavelmente é usada para criar uma animação baseada no tempo.

O shader foi aplicado sobre o objeto Torus.
