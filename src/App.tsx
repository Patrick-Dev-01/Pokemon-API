import './App.css';
import { FavoritesContextProvider } from './contexts/FavoritesContext';
import { Router } from './routes/router';

function App() {
  return (
    <FavoritesContextProvider>
      <Router />
    </FavoritesContextProvider>
  )
}

export default App;
