import CategoryList from '../../components/CategoryList/CategoryList';
import HeaderUser from '../../components/HeaderUser/HeaderUser';
import HortaList from '../../components/HortaList/HortaList';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import './style.css';
import { useMemo, useState } from 'react';
import imgHorta1 from '../../assets/img/img_horta_01.png';
import imgHorta2 from '../../assets/img/img_horta_02.png';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

export default function InitialScreenClient() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllHortas, setShowAllHortas] = useState(false);
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: 'Horta do João',
      description: 'Horta comunitária com variedade de hortaliças.',
      image: imgHorta1,
      isFavorite: false,
      type: 'hortas',
    },
    {
      id: 2,
      name: 'Hortifrúti da Maria',
      description: 'Hortifrúti orgânico com frutas frescas.',
      image: imgHorta2,
      isFavorite: true,
      type: 'hortas',
    },
    {
      id: 3,
      name: 'Horta da Ana',
      description: 'Horta local com plantas medicinais.',
      image: imgHorta1,
      isFavorite: false,
      type: 'organicos',
    },

    {
      id: 4,
      name: 'Hortifrúti do Pedro',
      description: 'Hortifrúti com variedade de frutas e verduras.',
      image: imgHorta2,
      isFavorite: false,
      type: 'hortifruits',
    },
    {
      id: 5,
      name: 'Hortifrúti da Clara',
      description: 'Hortifrúti orgânico com produtos frescos.',
      image: imgHorta1,
      isFavorite: true,
      type: 'hortifruits',
    },
    
  ]);

  function toggleFavorite(id) {
    setPlaces((previousPlaces) =>
      previousPlaces.map((horta) =>
        horta.id === id
          ? { ...horta, isFavorite: !horta.isFavorite }
          : horta
      )
    );
  }

  const filteredPlaces = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('pt-BR');

    return places.filter((place) => {
      const matchesCategory = !activeCategory || place.type === activeCategory;
      const matchesSearch = !normalizedSearch || [place.name, place.description]
        .some((text) => text.toLocaleLowerCase('pt-BR').includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, places, searchTerm]);

  const hortas = filteredPlaces.filter((place) => place.type === 'hortas' || place.type === 'organicos');
  const hortifrutis = filteredPlaces.filter((place) => place.type === 'hortifruits');
  const visibleHortas = showAllHortas ? hortas : hortas.slice(0, 2);

  return (
    <div className="initial-screen-client">
      <HeaderUser />

      <main className="home-client-content">
        <SearchComponent value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

        <CategoryList
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {hortas.length > 0 && (
          <section className="home-section" aria-labelledby="nearby-gardens">
            <div className="text-content">
              <h2 id="nearby-gardens">Hortas perto de você</h2>
              {hortas.length > 2 && (
                <button className="view-more" onClick={() => setShowAllHortas((current) => !current)}>
                  {showAllHortas ? 'Mostrar menos' : 'Ver mais'}
                </button>
              )}
            </div>
            <HortaList hortas={visibleHortas} toggleFavorite={toggleFavorite} />
          </section>
        )}

        {hortifrutis.length > 0 && (
          <section className="home-section" aria-labelledby="nearby-produce">
            <div className="text-content">
              <h2 id="nearby-produce">Hortifrutis</h2>
            </div>
            <HortaList hortas={hortifrutis} toggleFavorite={toggleFavorite} />
          </section>
        )}

        {filteredPlaces.length === 0 && (
          <p className="empty-results">Nenhum resultado encontrado. Tente outra busca ou categoria.</p>
        )}
      </main>

      <BottomNavigation activeItem="home" />
    </div>
  );
}
