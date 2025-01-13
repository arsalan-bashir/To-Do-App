import Home from './pages/Home'
import './style.css'
import logo from './logo512.png'

function App() {
  return (
    <>
    <div className='header'>
      <img src={logo} alt='logo' className='logo' />
      <h1 className='heading'>TASK BUDDY - To Do App</h1>
    </div>
      <Home />
    </>
  );
}

export default App;
