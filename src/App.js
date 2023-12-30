// export default class App {
//   constructor() {
//     this.el = document.createElement('div')
//     this.el.textContent = 'Hello World!'
//   }
// }

import { Component } from "./core/kimfield"
import FruitItem from "./components/Fruititem"

export default class App extends Component {
  constructor () {
    super({
      state: {
        fruits: [
          { name: 'Apple', price: '1000'},
          { name: 'Banana', price: '2000'},
          { name: 'Cherry', price: '3000'},
        ]
      }
    })
  }
  render() {
    console.log(this.state.fruits)

    this.el.innerHTML = `
      <h1>Fruits</h1>
      <ul></ul>
    `

    const ulEl = this.el.querySelector('ul')
    ulEl.append(...this.state.fruits
      .map(fruit => new FruitItem({
        props: {
          name: fruit.name,
          price: fruit.price
        }
      }).el)
    )
  }
}