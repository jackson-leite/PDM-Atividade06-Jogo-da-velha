class Jogo extends React.Component {

  render() {

    return (

      React.createElement("div", { className: "jogo" },
      React.createElement("div", { className: "jogo-tabuleiro" },
      React.createElement(Tabuleiro, null)),

      React.createElement("div", { className: "jogo-info" })));





  }}


class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true };

  }

  restart() {
    alert('Restart');
    this.setState({ quadrados: Array(9).fill(null), xIsNext: true });
  }

  chooseRandom() {
    const quadrados = this.state.quadrados.slice();
    let resultado = calculateWinner(quadrados);

    if (resultado) {
      alert('Jogo acabou. Vencedor ' + resultado);
      return;
    }

    let random_num = Math.random();

    random_num = Math.floor(random_num * 9);
    if (!quadrados[random_num]) {
      quadrados[random_num] = this.state.xIsNext ? 'X' : '0';
      this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
      return;
    } else
    {
      return this.chooseRandom();
    }
  }

  handleClick(i) {
    //faço uma cópia do vetor
    const quadrados = this.state.quadrados.slice();
    let resultado = calculateWinner(quadrados);

    if (resultado) {
      alert('Jogo acabou. Vencedor ' + resultado);
      return;
    }
    if (quadrados[i]) {
      alert('Quadrado ocupado!');
      return;
    }
    quadrados[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "jogo-opcoes" },
      "Opções", React.createElement("br", null), this.renderizarBotaoRestart(), React.createElement("br", null), this.renderizarBotaoRandomChoice()),

      React.createElement("div", { className: "linha-tabuleiro" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)),

      React.createElement("div", { className: "linha-tabuleiro" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),

      React.createElement("div", { className: "linha-tabuleiro" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8))));




  }
  renderizarBotaoRestart() {
    return (
      React.createElement(Botao, {
        value: 'Restart',
        onClick: () => {this.restart();} }));


  }

  renderizarBotaoRandomChoice() {
    return (
      React.createElement(Botao, {
        value: 'Choose Randomly',
        onClick: () => {this.chooseRandom();} }));


  }

  renderizarQuadrado(i) {
    return (//devolve uma expressão JSX
      React.createElement(Quadrado, {
        value: this.state.quadrados[i],
        onClick: () => {this.handleClick(i);},
        pos: i }));



  }}

function calculateNextWinner(quadrados) {

}

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    return squares[a];
  }
  return null;
}

class Botao extends React.Component {
  render() {
    return (
      React.createElement("button", { className: "botao", onClick: () => {this.props.onClick();} },
      this.props.value));


  }}


class Quadrado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null };

  }
  render() {
    return (//O jogador X sempre começa, por isso, o valor setado é X
      React.createElement("button", { className: "quadrado", onClick: () => {this.props.onClick();} },
      this.props.value /*no corpo do elemento botão dizendo o valor*/));


  }}



ReactDOM.render(
React.createElement(Jogo, null),
document.getElementById("root"));


/*function Quadrado(props){ //props de properties, ele é um objeto JSON
                                    return (//expressão JSX
                                      <button className="quadrado" onClick={props.onClick} > 
                                        {props.value}
                                      </button> /*Para escrever Javascript em uma expressão JSX, usa-se chaves
                                    );
                                  }*/




/*ReactDOM.render(
                                        <Tabuleiro quadrados={Array(9).fill().map((value, pos) => pos)}
                                          
                                        />,
                                        document.getElementById("root")
                                      );*/

/*ReactDOM.render(
                                             <Quadrado
                                               onClick={() => {alert('Clicou');}}
                                               value={2+2}
                                              />,
                                             document.getElementById("root")
                                           );*/