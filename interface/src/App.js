import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/home';
import Navbar from './components/navbar';
import StoryPage from './components/storyPage';
import CategoryPage from './components/categoryPage';
import AddNew from './components/addNew';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container-fluid'>
        <main className='wrapper'>
          
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/server/:id' element={<StoryPage />}></Route>
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path='/write' element={<AddNew />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
