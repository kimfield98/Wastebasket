// export default class App {
//   constructor() {
//     this.el = document.createElement('div')
//     this.el.textContent = 'Hello World!'
//   }
// }

import { Component } from "./core/kimfield"

export default class App extends Component {
  render() {
    this.el.textContent = 'Hello, World!'
  }
}