import { Component } from "../core/kimfield";

export default class About extends Component {
  render() {
    const { a, b, c } = history.state
    this.el.innerHTML = `
      <h1>About!</h1>
      <h2>${a}</h2>
      <h2>${b}</h2>
      <h2>${c}</h2>
    `
  }
}