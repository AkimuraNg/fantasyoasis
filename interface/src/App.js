import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/home';
import Navbar from './components/navbar';
import StoryPage from './components/storyPage';
// import Compose from './components/compose';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container-fluid'>
        <main className='wrapper'>
          <h1 style={{ textTransform: 'uppercase' }}>Fantasy Oasis</h1>
          <p>Write your own fantasy novels</p>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            {/* <Route path='/compose' element={<Compose />}></Route> */}
            <Route path='/server/:id' element={<StoryPage />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
