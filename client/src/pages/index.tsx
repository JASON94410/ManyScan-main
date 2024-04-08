'use client';
import { useState, useEffect } from 'react';
import Header from '../components/header';
import TopMangaCard from '../cards/TopMangaCard';
import DiscoverMangaCard from '../cards/DiscoverMangaCard';
import NewMangaCard from '../cards/NewMangaCard';
import TopVerticalMangaCard from '../cards/TopVerticalMangaCard';
import { fetchManga } from '../services/MangaTheqApi';
import MangaObjects from '../interfaces/mangaObjects';
import Footer from '../components/footer';

export default function Home() {
  const [mangas, setMangas] = useState<MangaObjects[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const mangaData = await fetchManga(1,20);

      setMangas(mangaData || []);
    };

    loadData();
  }, []);

  return (
    <div className='py-6'>
      <Header />
     
      <div className="lg:flex">
        <div className="lg:w-3/4">
          <div className="lg:flex">
            {mangas.length > 0 && (
              <div className="w-full lg:w-3/4 mt-12">
              
                <TopMangaCard mangas={mangas[0]} />
              </div>
            )}
            {mangas.length > 1 && (
              <div className="w-full lg:w-1/4 mt-12">
                
                <DiscoverMangaCard mangas={mangas[1]} />
              </div>
            )}
          </div>
          <div className="w-full">
            <NewMangaCard mangas={mangas} />
          </div>
        </div>
        <div className="lg:w-1/4 mt-12">
      
          <TopVerticalMangaCard mangas={mangas} title="Top Vertical" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
