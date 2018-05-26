import React, { Component } from 'react';

class App extends Component {
  state = { selection: [] }
  receive(m) {
    console.log(m);
  }

  generateTables() {
    this.matrix = [];
    for (let left = 1; left < 13; left++) {
      for (let right = 1; right < 13; right++) {
        this.matrix.push({ left, right, answer: left * right })
      }
    }
  }

  getSelection() {
    const selection = [];
    for (let numberOfQuestions = 0; numberOfQuestions < 100; numberOfQuestions++) {
      let exists = true;
      while (exists) {
        const index = Math.floor(Math.random() * 143) + 1;
        exists = selection.includes(index)
        if (!exists)
          selection.push(index);
      }
    }
    return selection;
  }

  componentDidMount() {
    this.generateTables();
  }

  onNext() {
    if (this.state.index < 99) {
      this.setState({ index: this.state.index + 1 })
      return;
    }
    this.setState({ index: -1 })
  }

  startTest() {
    const selection = this.getSelection();
    const index = 0;
    this.startTime = (new Date()).getTime();
    this.setState({ selection, index, completed: 0 })
    window.setTimeout(() => this.setState({ completed: this.state.index }), 120000)
  }

  render() {
    const { index, selection } = this.state;
    return (
      <div style={{ height: "500px" }}>
        <p>Maths Test</p>

        {
          index === -1 ?
            <div style={{ height: "500px" }}>
              <div>CONGRATULATIONS!!! You finished in  {((new Date()).getTime() - this.startTime) / 1000} seconds</div>
              <div>In two minutes you answered {this.state.completed} questions</div>
              <input style={{ fontSize: 25, height: 100 }} type="button" value="Try Again" onClick={() => this.startTest()} />
            </div>
            : index !== undefined ?
              <Question
                index={index}
                question={this.matrix[selection[index]]}
                onSuccess={answer => this.onNext()} />
              : <input style={{ fontSize: "30px" }} type="button" value="Start" onClick={() => this.startTest()} />
        }
      </div>
    );
  }
}

class Question extends Component {
  state = { answer: "" };


  submitAnswer(answer) {
    const { question, onSuccess } = this.props;

    if (question.answer === Number(answer)) {
      this.setState({ answer: "", wrongAnswer: "" });
      onSuccess();
      return;
    }
    this.setState({ answer: answer});
    //    onChange={e => this.setState({ answer: e.target.value })}
    //
  }

  render() {
    const { index, question } = this.props;
    const { wrongAnswer, answer } = this.state;
    return (
      <div>
        <span> {index + 1}) </span>
        <span>{question.left}</span>
        <span> X </span>
        <span>{question.right}</span>
        <span> = </span>
        <span>
          <input
            style={{ fontSize: 25 }}
            autoFocus
            type="tel"
            value={answer}
            onChange={e => { this.submitAnswer(e.target.value) }}
          />
        </span>
        <div>
          {wrongAnswer ? "Oops: its not " + wrongAnswer + " Try Again" : "Keep Going"}
        </div>
      </div>)
  }
}

export default App;



        // WEBPACK FOOTER //
// src/App.js