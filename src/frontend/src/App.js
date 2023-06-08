import './App.css';
import Chat from './chat/Chat.jsx';
import Translate from './translate/Translate.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
     <Router>
       <Routes>
         <Route exact path='/' element={<Chat/>}/>
         <Route exact path='/translate' element={<Translate/>}/>
       </Routes>
     </Router>
    </CookiesProvider>
  );
}

export default App;
