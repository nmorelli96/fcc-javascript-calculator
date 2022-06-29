class Keypad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button id='clear' value='AC'>AC</button>
        <button id='erase' value='CE'>CE</button>
        <button id='divide' value='/'>/</button>
        <button id='multiply' value='*'>X</button>
        <button id='seven' value='7'>7</button>
        <button id='eight' value='8'>8</button>
        <button id='nine' value='9'>9</button>
        <button id='subtract' value='-'>-</button>
        <button id='four' value='4'>4</button>
        <button id='five' value='5'>5</button>
        <button id='six' value='6'>6</button>
        <button id='add' value='+'>+</button>
        <button id='one' value='1'>1</button>
        <button id='two' value='2'>2</button>
        <button id='three' value='3'>3</button>
        <button id='equals' value='='>=</button>
        <button id='zero' value='0'>0</button>
        <button id='tripleZero' value='000'>000</button>
        <button id='decimal' value='.'>.</button>
      </div>
    )
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    /*this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.showInfoModal = this.showInfoModal.bind(this);
    this.closeModal = this.closeModal.bind(this);*/
  }
  /*componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }*/

  render() {
    return (
      <Keypad />
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));