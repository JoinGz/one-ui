import * as React from 'react'

let a:string = '1'

let y = '123'
class App extends React.Component {
  render() {
    return (
      <div className="app">
        Hello React {a}
        {y}
      </div>
    )
  }
}
export default App