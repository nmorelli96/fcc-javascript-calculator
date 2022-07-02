const Title = function () {
  return (
    <div className="unselectable" id='title'><span id="react-span">React</span>.<span id="js-span">js</span>&nbsp;Calculator</div>
  );
};

const Footer = function () {
  return (
    <div className="unselectable" id='footer'> by &nbsp;
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
        <span id="display" onClick={copyToClipboard}>{this.props.val}</span>
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
        <button id="clear" value="AC" data-key="Delete" onClick={this.props.clearAll}>
          AC
        </button>
        <button id="erase" value="CE" data-key="Backspace" onClick={this.props.handleErase}>
          CE
        </button>
        <button id="divide" value="/" data-key="/" onClick={this.props.handleOperator}>
          /
        </button>
        <button id="multiply" value="*" data-key="*" onClick={this.props.handleOperator}>
          x
        </button>
        <button id="seven" value="7" data-key="7" onClick={this.props.handleNumber}>
          7
        </button>
        <button id="eight" value="8" data-key="8" onClick={this.props.handleNumber}>
          8
        </button>
        <button id="nine" value="9" data-key="9" onClick={this.props.handleNumber}>
          9
        </button>
        <button id="subtract" value="-" data-key="-" onClick={this.props.handleOperator}>
          -
        </button>
        <button id="four" value="4" data-key="4" onClick={this.props.handleNumber}>
          4
        </button>
        <button id="five" value="5" data-key="5" onClick={this.props.handleNumber}>
          5
        </button>
        <button id="six" value="6" data-key="6" onClick={this.props.handleNumber}>
          6
        </button>
        <button id="add" value="+" data-key="+" onClick={this.props.handleOperator}>
          +
        </button>
        <button id="one" value="1" data-key="1" onClick={this.props.handleNumber}>
          1
        </button>
        <button id="two" value="2" data-key="2" onClick={this.props.handleNumber}>
          2
        </button>
        <button id="three" value="3" data-key="3" onClick={this.props.handleNumber}>
          3
        </button>
        <button id="equals" value="=" data-key="Enter" onClick={this.props.handleEqual}>
          =
        </button>
        <button id="zero" value="0" data-key="0" onClick={this.props.handleNumber}>
          0
        </button>
        <button id="decimal" value="." data-key="." onClick={this.props.handleDecimal}>
          .
        </button>
      </div>
    );
  }
}

const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    const valueToCopy = document.getElementById("display").innerHTML;
    return navigator.clipboard.writeText(valueToCopy);
  }
  return Promise.reject('The Clipboard API is not available.');
};

let operatorsCount = 0;
let subtractCount = 0;
let decimalsCount = 0;
let eraseCount = 0;
let isResult = false;
let result = 0;

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Delete', 'Backspace', 'Enter', '+', '-', '/', '*', '.'];

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
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (keys.includes(e.key)) {
      document.querySelector(`[data-key='${e.key}']`).click();
      e.preventDefault(); // Disables the quick search trigger when pressing '/'
    }
  }

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
    console.log(this.state.formula)
    if (isResult == true) {
      // prevents 0 on the left when we write a new number after equal, and restarts the formula
      this.setState((state) => ({
        val: value,
        previousVal: 0,
        formula: value
      }));
      isResult = false;
      console.log('a');
    }
    else if (this.state.val.length > 16 || this.state.formula.length > 22) {
      this.setState((state) => ({
        val: 'digit limit reached',
        previousVal: 0,
        formula: ""
      }));
      setTimeout(() => {
        this.clearAll();
      }, 1500);
    }
    else if ((this.state.formula === 0 || this.state.formula === "0") && value.match(/[1-9]/)) {
      // prevents inserting 0 and then other number
      this.setState((state) => ({
        val: value,
        previousVal: 0,
        formula: value
      }));
      console.log('eeee')
    }
    else if (operatorCheck.match(/[\/+*-]/) != null) {
      this.setState((state) => ({
        val: value,
        previousVal: 0,
        formula: `${this.state.formula}` + `${value}`
      }));
      console.log('b');
    }
    else if (
      (value == 0 && this.state.val == 0) ||
      (value == 0 && isResult == true)) {
      // prevents the input of zeros when there's no numbers
      this.setState((state) => ({
        val: 0,
        formula: 0
      }));
      isResult = false;
      console.log('c');
    }
    else if (eraseCount > 0) {
      // prevents using 2 consecutive times the CE button
      this.setState((state) => ({
        val: value,
        formula: `${this.state.formula}` + `${value}`
      }));
      eraseCount = 0;
      console.log('d');
    }
    else if (this.state.previousVal === "") {
      //deletes the initial 0 on the left when input numbers
      this.setState((state) => ({
        val: value,
        previousVal: this.state.val,
        formula: `${this.state.formula}` + `${value}`
      }));
      console.log('e');
    }
    else {
      this.setState((state) => ({
        val: previousPlusCurrent,
        previousVal: parseInt(this.state.val, 10),
        formula: `${this.state.formula}` + `${value}`
      }));
      console.log('f');
    }
    console.log(`number ${value}`);
    console.log(this.state);
  }

  handleOperator(e) {
    const value = e.target.value;
    console.log(result);
    if (this.state.formula !== "") {
      eraseCount = 0;
      decimalsCount = 0;
      if (isResult == true) {
        // evita ceros a la izquierda cuando escribimos un numero nuevo despues del =, y reinicia la formula
        this.setState((state) => ({
          formula: `${result}` + `${value}`,
          val: value,
          previousVal: 0
        }));
        isResult = false;
      }
      else {
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
      }
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
      if (isResult == true) {
        // starts new calculation when input . after equal
        this.clearAll();
        isResult = false;
        setTimeout(() => {
          this.setState((state) => ({
            val: value,
            previousVal: parseFloat(this.state.val),
            formula: `${this.state.formula}` + `${value}`
          }));
        }, 50);
      }
      else {
        this.setState((state) => ({
          val: previousPlusCurrent,
          previousVal: parseFloat(this.state.val),
          formula: `${this.state.formula}` + `${value}`
        }));
      }
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
          if (arrFormula[operatorIndex - 1].match(/[-/*+]/)) {
            arrFormula[operatorIndex - 1] = "";
            analyze();
          }
        }
        else if (arrFormula[i].match(/-/)) {
          let operatorIndex = arrFormula.lastIndexOf(arrFormula[i]);
          if (arrFormula[operatorIndex - 1] !== " ") {
            arrFormula.splice(operatorIndex, 0, " ");
            if (arrFormula[operatorIndex - 1] == "-") {
              arrFormula.splice(operatorIndex - 1, 0, " ");
            }
          }
        }
      }
      return arrFormula.join("");
    }
    console.log(formulaToAnalyze);
    console.log(analyze());
    if (this.state.val.toString().match(/[0-9]/)) {
      result = Math.round(1000000000000 * eval(analyze())) / 1000000000000;
      this.setState((state) => ({
        val: result,
        //val: eval(this.state.formula),
        formula: formulaToAnalyze
        //formula: eval(this.state.formula)
      }));
      isResult = true;
      console.log("equal");
      console.log(this.state);
      console.log(isResult)
    }
    decimalsCount = 0;
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
