import React from 'react';
import PostForm from "./PostForm";
import Login from './Login';

class App extends Component{  

  render(){
    return (
      <>
      <div id = "header">
        <div>
        <button className = "login" onClick = {this.togglePop}> Logg inn</button>
        <Login />
        </div>
        <button className = "register"> Registrer deg</button>
      </div>
      </>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
)

export default App;