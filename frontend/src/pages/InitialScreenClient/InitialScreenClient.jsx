import CategoryList from '../../components/CategoryList/CategoryList';
import HeaderUser from '../../components/HeaderUser/HeaderUser';
import HortaList from '../../components/HortaList/HortaList';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import './style.css';
import { useState } from 'react';
import imgHorta1 from '../../assets/img/img_horta_01.png';
import imgHorta2 from '../../assets/img/img_horta_02.png';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

export default function InitialScreenClient() {
  const [activeCategory, setActiveCategory] = useState(null);

  const [ setIsSidebarOpen] = useState(true);

  const [hortas, setHortas] = useState([
    {
      id: 1,
      name: 'Horta do João',
      description: 'Horta comunitária com variedade de hortaliças.',
      image: imgHorta1,
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Hortifrúti da Maria',
      description: 'Hortifrúti orgânico com frutas frescas.',
      image: imgHorta2,
      isFavorite: true,
    },
    {
      id: 3,
      name: 'Horta da Ana',
      description: 'Horta local com plantas medicinais.',
      image: imgHorta1,
      isFavorite: false,
    },

  ]);

  const hortifrutis = [
    {
      id: 1,
      name: 'Hortifrúti do Pedro',
      description: 'Hortifrúti com variedade de frutas e verduras.',
      image: imgHorta2,
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Hortifrúti da Clara',
      description: 'Hortifrúti orgânico com produtos frescos.',
      image: imgHorta1,
      isFavorite: true,
    },
    
  ]

  function toggleFavorite(id) {
    setHortas((prevHortas) =>
      prevHortas.map((horta) =>
        horta.id === id
          ? { ...horta, isFavorite: !horta.isFavorite }
          : horta
      )
    );
  }

  return (
    <div className="initial-screen-client">
      <HeaderUser />

      <SearchComponent />

      <CategoryList
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="text-content">
        <p>Hortas perto de Você</p>
        <button className="view-more">Ver mais</button>
      </div>

      <HortaList
        hortas={hortas}
        toggleFavorite={toggleFavorite}
      />

      <div className="text-content">
        <p>Hortifrutis</p>
        <button className="view-more">Ver mais</button>
      </div>

      <HortaList
        hortas={hortifrutis}
        toggleFavorite={toggleFavorite}
      />

      <BottomNavigation setIsSidebarOpen={setIsSidebarOpen} />
    </div>
  );
}