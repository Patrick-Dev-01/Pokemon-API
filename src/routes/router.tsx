import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { PokemonDetailsCard } from '../pages/PokemonDetailsCard/PokenmonDetailsCard';

export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='pokemon/:id' element={<PokemonDetailsCard />}/>
            </Routes>
        </BrowserRouter>
    );
}