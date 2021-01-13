import './App.css';
import Home from "./components/Home"
import Form from "./components/Form"
import Saved from './components/Saved'
import {BrowserRouter, Link, Route, Switch} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" component={Form} />
          <Route path="/update" component={Form} />
          <Route path="/saved" component={Saved} /> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
