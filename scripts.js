class Formula extends React.Component {
  render() {
    return (
      <div id="formulaField">&nbsp;
        <span>{this.props.formula}</span>
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div id="displayField">
        <span id="display">{this.props.val}</span>
      </div>
    );
  }
}

class Keypad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='keypad'>
        <button id="clear" value="AC" onClick={this.props.clearAll}>
          AC
        </button>
        <button id="erase" value="CE" onClick={this.props.handleErase}>
          CE
        </button>
        <button id="divide" value="/" onClick={this.props.handleOperator}>
          /
        </button>
        <button id="multiply" value="*" onClick={this.props.handleOperator}>
          X
        </button>
        <button id="seven" value="7" onClick={this.props.handleNumber}>
          7
        </button>
        <button id="eight" value="8" onClick={this.props.handleNumber}>
          8
        </button>
        <button id="nine" value="9" onClick={this.props.handleNumber}>
          9
        </button>
        <button id="subtract" value="-" onClick={this.props.handleOperator}>
          -
        </button>
        <button id="four" value="4" onClick={this.props.handleNumber}>
          4
        </button>
        <button id="five" value="5" onClick={this.props.handleNumber}>
          5
        </button>
        <button id="six" value="6" onClick={this.props.handleNumber}>
          6
        </button>
        <button id="add" value="+" onClick={this.props.handleOperator}>
          +
        </button>
        <button id="one" value="1" onClick={this.props.handleNumber}>
          1
        </button>
        <button id="two" value="2" onClick={this.props.handleNumber}>
          2
        </button>
        <button id="three" value="3" onClick={this.props.handleNumber}>
          3
        </button>
        <button id="equals" value="=" onClick={this.props.handleEqual}>
          =
        </button>
        <button id="zero" value="0" onClick={this.props.handleNumber}>
          0
        </button>
        <button id="tripleZero" value="000" onClick={this.props.handleNumber}>
          000
        </button>
        <button id="decimal" value="." onClick={this.props.handleDecimal}>
          .
        </button>
      </div>
    );
  }
}

let operatorsCount = 0;
let decimalsCount = 0;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      val: 0,
      previousVal: "",
      formula: ""
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleErase = this.handleErase.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }
  /*componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }*/

  handleNumber(e) {
    operatorsCount = 0;
    const operatorCheck = this.state.previousVal.toString();
    const output = document.getElementById("display").innerHTML;
    const value = e.target.value;
    const previousPlusCurrent = `${this.state.val}` + `${value}`;
    /*console.log(output)
    console.log(value)
    console.log(previousPlusCurrent)*/
    if (operatorCheck.match(/[\/+*-]/) != null) {
      //console.log('OPERATOR DETECTED')
      this.setState((state) => ({
        val: value,
        previousVal: 0,
        formula: `${this.state.formula}` + `${value}`
      }));
    }
    else if ((value == 0 || value == '000') && this.state.val == 0) { //impide meter ceros cuando no hay numeros
      this.setState((state) => ({
        val: 0
      }));
    }
    else if (this.state.previousVal === "") { //evita el 0 a la izq al escribir valores
      this.setState((state) => ({
        val: value,
        previousVal: parseInt(this.state.val, 10),
        formula: `${this.state.formula}` + `${value}`
      }));
    }
    else {
      this.setState((state) => ({
        val: previousPlusCurrent,
        previousVal: parseInt(this.state.val, 10),
        formula: `${this.state.formula}` + `${value}`
      }));
    }
    console.log(`number + ${value}`);
    console.log(this.state);
  }

  handleOperator(e) {
    decimalsCount = 0;
    operatorsCount += 1;
    const value = e.target.value;
    if (operatorsCount <= 2) {
      this.setState((state) => ({
        previousVal: value,
        val: value,
        formula: `${this.state.formula}` + `${value}`
      }));
    }
    console.log("operator");
    console.log(this.state);
  }

  handleDecimal(e) {
    decimalsCount += 1;
    const value = e.target.value;
    const previousPlusCurrent = `${this.state.val}` + `${value}`;
    if (decimalsCount <= 1) {
      this.setState((state) => ({
        val: previousPlusCurrent,
        previousVal: parseFloat(this.state.val),
        formula: `${this.state.formula}` + `${value}`
      }));
    }
    console.log("decimal");
    console.log(this.state);
  }

  handleErase() {
    operatorsCount = 0;
    const strToEraseLen = this.state.val.length;
    const currentFormula = `${this.state.formula}`;
    this.setState((state) => ({
      val: 0,
      formula: currentFormula.slice(0, - strToEraseLen)
    }));
    console.log("erase");
    console.log(this.state);
  }

  clearAll() {
    decimalsCount = 0;
    this.setState((state) => ({
      val: 0,
      previousVal: "",
      formula: ""
    }));
    console.log("clearAll");
  }

  handleEqual() {
    this.setState((state) => ({
      val: eval(this.state.formula),
      formula: eval(this.state.formula)
    }))
    console.log("equal");
  }

  render() {
    return (
      <div>
        <Formula formula={this.state.formula} />
        <Display val={this.state.val} />
        <Keypad
          handleNumber={this.handleNumber}
          handleOperator={this.handleOperator}
          handleDecimal={this.handleDecimal}
          handleEqual={this.handleEqual}
          handleErase={this.handleErase}
          clearAll={this.clearAll}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
