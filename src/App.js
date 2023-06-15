import './App.css';
import SideNav from './components/SideNav';
import TableData from './components/TableData';

function App() {
  return (
    <div className='App' >
       <header className="App-header-logo">
        <a href='https://www.innominds.com/' target='_blank' rel="noreferrer">
          <img src='https://www.innominds.com/hubfs/logo%20-03.png' alt='logo'></img>
        </a>
      </header>
      <div className='arrange'>
        <SideNav/> 
        <TableData />
        

      </div>
      
    </div>
  );
}

export default App;
