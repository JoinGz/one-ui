import * as React from 'react'

let a:string = '1'
function x(u) {
  return u
}
let y = '123'
class App extends React.Component {
  render() {
    return (
      <div className="app">
        Hello React {a}
        {x()}
        {y}
      </div>
    )
  }
}
export default App