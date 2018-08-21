import React, { Component } from 'react';
import Quill from 'quill';
import './App.css';
import 'quill/dist/quill.snow.css';


class Counter {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on('text-change', this.update.bind(this));
    this.update();  // Account for initial contents
  }

  calculate() {
    let text = this.quill.getText();
    if (this.options.unit === 'word') {
      text = text.trim();
      // Splitting empty text returns a non-empty array
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }
  
  update() {
    var length = this.calculate();
    var label = this.options.unit;
    if (length !== 1) {
      label += 's';
    }
    this.container.innerText = length + ' ' + label;
  }
}


class App extends Component {

  componentDidMount() {
    Quill.register('modules/counter', Counter);

    var quill = new Quill('#editor', {
      modules: {
        counter: {
          container: '#counter',
          unit: 'word'
        }
      }
    });
  }

  render() {
    return (
      //Create the editor container
      [<div id={"editor"}>
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
      </div>,
      <div id={"counter"}>0</div>]
    );
  }
}



export default App;
