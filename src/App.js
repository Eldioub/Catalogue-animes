import { Routes ,Route } from 'react-router-dom';
import Home from './home';
import AnimeDetail from './anime';
import Favoris from './favoris';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favoris' element={<Favoris />}  />
      <Route path='/anime/:id' element={<AnimeDetail />} />
    </Routes>
  );
}

export default App;

