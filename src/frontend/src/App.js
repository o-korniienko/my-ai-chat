import logo from './logo.svg';
import './App.css';
import Chat from './chat/Chat.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
     <Router>
       <Switch>
         <Route path='/' exact={true} component={Chat}/>
       </Switch>
     </Router>
    </CookiesProvider>
  );
}

export default App;
