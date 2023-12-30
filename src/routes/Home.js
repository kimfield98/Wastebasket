import { Component } from "../core/kimfield";

export default class Home extends Component {
  render() {
    this.el.innerHTML = `
      <h1>HOME!</h1>
    `
  }
}