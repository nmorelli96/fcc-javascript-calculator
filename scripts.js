const Title = function () {
  return (
    <div id='title'><span id="react-span">React</span>.<span id="js-span">js</span>&nbsp;Calculator</div>
  );
};

const Footer = function () {
  return (
    <div id='footer'> by &nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/nmorelli96/fcc-javascript-calculator"
      >
        nmorelli96 &nbsp;
      </a> </div>
  );
};

class Formula extends React.Component {
  render() {
    return (
      <div id="formulaField">
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
          x
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
let subtractCount = 0;
let decimalsCount = 0;
let eraseCount = 0;
let isResult = false;

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
    subtractCount = 0;
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
    else if (
      ((value == 0 || value == "000") && this.state.val == 0) ||
      ((value == 0 || value == "000") && isResult == true)) {
      //impide meter ceros cuando no hay numeros
      this.setState((state) => ({
        val: 0,
        formula: 0
      }));
      isResult = false;
    }
    else if (isResult == true) {
      // evita ceros a la izquierda cuando escribimos un numero nuevo despues del =, y reinicia la formula
      this.setState((state) => ({
        val: value,
        previousVal: 0,
        formula: value
      }));
      isResult = false;
    }
    else if (eraseCount > 0) {
      //impide usar 2 veces consecutivas el CE
      this.setState((state) => ({
        val: value,
        formula: `${this.state.formula}` + `${value}`
      }));
      eraseCount = 0;
    }
    else if (this.state.previousVal === "") {
      //evita el 0 a la izq al escribir valores
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
    console.log(`number ${value}`);
    console.log(this.state);
  }

  handleOperator(e) {
    const value = e.target.value;
    isResult = false;
    eraseCount = 0;
    decimalsCount = 0;
    if (value.match(/[/*+]/)) {
      operatorsCount += 1;
    }
    if (value.match(/-/)) {
      subtractCount += 1;
    }
    if (operatorsCount <= 2 && subtractCount <= 2) {
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
    eraseCount = 0;
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
    eraseCount += 1;
    operatorsCount = 0;
    subtractCount = 0;
    const strToEraseLen = this.state.val.length;
    const currentFormula = `${this.state.formula}`;
    if (eraseCount <= 1) {
      this.setState((state) => ({
        val: 0,
        formula: currentFormula.slice(0, -strToEraseLen)
      }));
    }
    console.log("erase");
    console.log(this.state);
  }

  clearAll() {
    eraseCount = 0;
    decimalsCount = 0;
    operatorsCount = 0;
    subtractCount = 0;
    isResult = false;
    this.setState((state) => ({
      val: 0,
      previousVal: "",
      formula: ""
    }));
    console.log("clearAll");
  }

  handleEqual() {
    let formulaToAnalyze = this.state.formula;
    let arrFormula = formulaToAnalyze.split("");
    function analyze() {
      for (let i = arrFormula.length - 1; i >= 0; i--) {
        if (arrFormula[i].match(/[/*+]/) || arrFormula[i] == "") {
          let operatorIndex = arrFormula.lastIndexOf(arrFormula[i]);
          //for (let j = arrFormula.slice(0, operatorIndex).length ; i >= 0 ; i--){
          if (arrFormula[operatorIndex - 1].match(/[-/*+]/)) {
            arrFormula[operatorIndex - 1] = "";
            analyze();
          }
        }
      }
      return arrFormula.join("");
    }
    console.log(formulaToAnalyze);
    if (this.state.val.toString().match(/[0-9]/)) {
      this.setState((state) => ({
        val: eval(analyze()),
        //val: eval(this.state.formula),
        formula: eval(analyze())
        //formula: eval(this.state.formula)
      }));
      isResult = true;
      console.log("equal");
      console.log(this.state);
    }
  }

  render() {
    return (
      <div>
        <Title />
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
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
