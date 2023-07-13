import './App.scss';
import Home from './components/home';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container-fluid'>
        <main className='wrapper'>
          <Home />
        </main>
      </div>
    </div>
  );
}

export default App;
