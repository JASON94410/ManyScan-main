// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// const ChapterReaderPage = () => {
//   const router = useRouter();
//   const { chapterId } = router.query;
//   const [chapterImages, setChapterImages] = useState<{ url: string; language: string }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [readingMode, setReadingMode] = useState('horizontal');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [chapters, setChapters] = useState<string[]>([]);
//   const [isPrevChapterAvailable, setIsPrevChapterAvailable] = useState(false);
//   const [isNextChapterAvailable, setIsNextChapterAvailable] = useState(false);

//   const toggleReadingMode = () => {
//     setReadingMode(readingMode === 'horizontal' ? 'vertical' : 'horizontal');
//   };

//   const goToNextPage = () => {
//     if (currentPage < chapterImages.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToPreviousChapter = () => {
//     const currentIndex = chapters.findIndex(chap => chap === chapterId);
//     if (currentIndex > 0) {
//       const prevChapterId = chapters[currentIndex - 1];
//       router.push(`?chapterId=${prevChapterId}`);
//     }
//   };

//   const goToNextChapter = () => {
//     const currentIndex = chapters.findIndex(chap => chap === chapterId);
//     if (currentIndex >= 0 && currentIndex < chapters.length - 1) {
//       const nextChapterId = chapters[currentIndex + 1];
//       router.push(`?chapterId=${nextChapterId}`);
//     }
//   };

//   useEffect(() => {
//     setChapters(JSON.parse(localStorage.getItem('chapters') || '[]'));



//     const fetchChapterImages = async () => {
//       if (typeof chapterId === 'string') {
//         setIsLoading(true);
//         try {
//           const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
//           const data = await response.json();
//           console.log(data);

//           if (data.result === 'ok') {
//             const baseUrl = data.baseUrl;
//             const chapterHash = data.chapter.hash;
//             const pageFilenames = data.chapter.data;
//             const language = data.chapter.translatedLanguage;

//             const imageUrls = pageFilenames.map((filename: string) => ({
//               url: `${baseUrl}/data/${chapterHash}/${filename}`,
//               language: language || 'Langue inconnue',
//             }));

//             setChapterImages(imageUrls);
//           }
//         } catch (error) {
//           console.error('Error fetching chapter images:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchChapterImages();
//   }, [chapterId]);

//   useEffect(() => {
//     const currentIndex = chapters.findIndex(chap => chap === chapterId);
//     setIsPrevChapterAvailable(currentIndex > 0);
//     setIsNextChapterAvailable(currentIndex >= 0 && currentIndex < chapters.length - 1);
//   }, [chapters, chapterId]);

//   if (isLoading) {
//     return <div>Chargement du chapitre...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 relative">
//         <div>
//           <button onClick={() => router.back()} className="mb-12 text-sm px-4 py-2 rounded shadow bg-gray-200 dark:bg-gray-600">
//             Retour
//           </button>
//         </div>
//         <div>
//           <button onClick={toggleReadingMode} className="mb-4 p-2 bg-blue-500 text-white rounded">
//             {readingMode === 'horizontal' ? 'Lecture Verticale' : 'Lecture Horizontale'}
//           </button>
//         </div>
//         {readingMode === 'horizontal' ? (
//           <>
//             <div className="relative">
//               <button onClick={goToPreviousPage} disabled={currentPage === 0} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded">
//                 &lt;
//               </button>
//               <img src={chapterImages[currentPage].url} alt={`Page ${currentPage + 1}`} className="w-full" />
//               <button onClick={goToNextPage} disabled={currentPage === chapterImages.length - 1} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded">
//                 &gt;
//               </button>
//             </div>
//             <div className="flex justify-center mt-4">
//               <span>Page {currentPage + 1} sur {chapterImages.length}</span>
//             </div>
//           </>
//         ) : (
//           <div>
//             {chapterImages.map((image, index) => (
//               <div key={index} className="text-center">
//                 <img src={image.url} alt={`Page ${index + 1}`} className="w-full" />
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="mt-4 flex justify-between w-full px-4">
//           <button 
//             onClick={goToPreviousChapter} 
//             disabled={!isPrevChapterAvailable}
//             className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
//             Chapitre Précédent
//           </button>
//           <button 
//             onClick={goToNextChapter} 
//             disabled={!isNextChapterAvailable}
//             className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
//             Chapitre Suivant
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterReaderPage;


// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// const ChapterReaderPage = () => {
//   const router = useRouter();
//   const { chapterId } = router.query;
//   const [chapterImages, setChapterImages] = useState<{ url: string; language: string }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [readingMode, setReadingMode] = useState('horizontal');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [chapters, setChapters] = useState<string[]>([]);
//   const [selectedChapter, setSelectedChapter] = useState(chapterId);
//   const [isPrevChapterAvailable, setIsPrevChapterAvailable] = useState(false);
//   const [isNextChapterAvailable, setIsNextChapterAvailable] = useState(false);

//   const toggleReadingMode = () => {
//     setReadingMode(readingMode === 'horizontal' ? 'vertical' : 'horizontal');
//   };

//   const goToNextPage = () => {
//     if (currentPage < chapterImages.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };
//   const goToPreviousChapter = () => {
//     const currentIndex = chapters.findIndex(chap => chap === chapterId);
//     if (currentIndex > 0) {
//       const prevChapterId = chapters[currentIndex - 1];
//       router.push(`?chapterId=${prevChapterId}`);
//     }
//   };

//   const goToNextChapter = () => {
//     const currentIndex = chapters.findIndex(chap => chap === chapterId);
//     if (currentIndex >= 0 && currentIndex < chapters.length - 1) {
//       const nextChapterId = chapters[currentIndex + 1];
//       router.push(`?chapterId=${nextChapterId}`);
//     }
//   };


//   useEffect(() => {
    
//     const fetchChapterImages = async () => {
//       if (typeof chapterId === 'string') {
//         try {
//           const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
//           const data = await response.json();
//           console.log(data);

//           if (data.result === 'ok') {
//             const baseUrl = data.baseUrl;
//             const chapterHash = data.chapter.hash;
//             const pageFilenames = data.chapter.data;
//             const language = data.chapter.translatedLanguage;

//             const imageUrls = pageFilenames.map((filename: string) => ({
//               url: `${baseUrl}/data/${chapterHash}/${filename}`,
//               language: language || 'Langue inconnue',
//             }));

//             if (currentPage === chapterImages.length - 1) {
//               goToNextChapter(); 
//             }

//             const currentIndex = chapters.findIndex(chap => chap === chapterId);
//             setIsPrevChapterAvailable(currentIndex > 0);
//             setIsNextChapterAvailable(currentIndex >= 0 && currentIndex < chapters.length - 1);
            
//             setChapterImages(imageUrls);
        
//           }
//         } catch (error) {
//           console.error('Error fetching chapter images:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchChapterImages();
   
//   }, [chapterId]);

//   if (isLoading) {
//     return <div>Chargement du chapitre...</div>;
//   }
 

  

//   return (
//     <div className="flex flex-col items-center">
//       <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 relative">
// <div>
//       <button onClick={() => router.back()} className="mb-12 text-sm px-4 py-2 rounded shadow bg-gray-200 dark:bg-gray-600">
//               Retour
//             </button>
//             </div>
//             <div>
//         <button onClick={toggleReadingMode} className="mb-4 p-2 bg-blue-500 text-white rounded">
//           {readingMode === 'horizontal' ? 'Lecture Vertical' : 'Lecture Horizontal'}
//         </button>
// </div>
//         {readingMode === 'horizontal' ? (
//           <>
//             <div className="relative">
//               <button onClick={goToPreviousPage} disabled={currentPage === 0} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded">
//                 &lt;
//               </button>
//               <img src={chapterImages[currentPage].url} alt={`Page ${currentPage + 1}`} className="w-full" />
//               <button onClick={goToNextPage} disabled={currentPage === chapterImages.length - 1} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded">
//                 &gt;
//               </button>
//             </div>
//             <div className="flex justify-center mt-4">
//               <span>Page {currentPage + 1} sur {chapterImages.length} - Langue: {chapterImages[currentPage].language}</span>
//             </div>
//           </>
//         ) : (
//           <div>
//             {chapterImages.map((image, index) => (
//               <div key={index} className="text-center">
//                 <img src={image.url} alt={`Page ${index + 1}`} className="w-full" />
//                 <span className="block mt-1">Langue: {image.language}</span>
//               </div>
//             ))}
//           </div>
//         )}
//        <div className="mt-4 flex justify-between w-full px-4">
//         <button 
//           onClick={goToPreviousChapter} 
//           disabled={!isPrevChapterAvailable}
//           className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
//           Chapitre Précédent
//         </button>
//         <button 
//           onClick={goToNextChapter} 
//           disabled={!isNextChapterAvailable}
//           className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
//           Chapitre Suivant
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterReaderPage;
// [chapterId].tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ChapterImage {
    url: string;
    language: string;
}

interface Chapter {
    id: string;
    title: string;
    chapterNumber: string;
    language: string;
}

const ChapterReaderPage: React.FC = () => {
  const router = useRouter();
  const { chapterId } = router.query as { chapterId: string };
  const [chapterImages, setChapterImages] = useState<ChapterImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readingMode, setReadingMode] = useState('horizontal');
  const [currentPage, setCurrentPage] = useState(0);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isPrevChapterAvailable, setIsPrevChapterAvailable] = useState(false);
  const [isNextChapterAvailable, setIsNextChapterAvailable] = useState(false);

  const toggleReadingMode = () => {
    setReadingMode(readingMode === 'horizontal' ? 'vertical' : 'horizontal');
  };

  const goToNextPage = () => {
    if (currentPage < chapterImages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPreviousChapter = () => {
    const currentIndex = chapters.findIndex(chap => chap.id === chapterId);
    if (currentIndex > 0) {
      const prevChapterId = chapters[currentIndex - 1].id;
      router.push(`?chapterId=${prevChapterId}`);
    }
  };

  const goToNextChapter = () => {
    const currentIndex = chapters.findIndex(chap => chap.id === chapterId);
    if (currentIndex >= 0 && currentIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentIndex + 1].id;
      router.push(`?chapterId=${nextChapterId}`);
    }
  };

  useEffect(() => {
    if (router.query.chapters && typeof router.query.chapters === 'string') {
      const chaptersData: Chapter[] = JSON.parse(router.query.chapters);
      setChapters(chaptersData);
    }
  }, [router.query]);

  useEffect(() => {
    setIsPrevChapterAvailable(chapters.findIndex(chap => chap.id === chapterId) > 0);
    setIsNextChapterAvailable(chapters.findIndex(chap => chap.id === chapterId) < chapters.length - 1);
  }, [chapters, chapterId]);

  useEffect(() => {
    const fetchChapterImages = async () => {
      if (chapterId) {
        setIsLoading(true);
        try {
          const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
          const data = await response.json();

          if (data.result === 'ok') {
            const baseUrl = data.baseUrl;
            const chapterHash = data.chapter.hash;
            const pageFilenames = data.chapter.data;
            const language = data.chapter.translatedLanguage;

            const imageUrls = pageFilenames.map((filename: string) => ({
              url: `${baseUrl}/data/${chapterHash}/${filename}`,
              language: language || 'Langue inconnue',
            }));

            setChapterImages(imageUrls);
          }
        } catch (error) {
          console.error('Error fetching chapter images:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChapterImages();
  }, [chapterId]);

  if (isLoading) {
    return <div>Chargement du chapitre...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 relative">
        <div>
          <button onClick={() => router.back()} className="mb-12 text-sm px-4 py-2 rounded shadow bg-gray-200 dark:bg-gray-600">
            Retour
          </button>
        </div>
        <div>
          <button onClick={toggleReadingMode} className="mb-4 p-2 bg-blue-500 text-white rounded">
            {readingMode === 'horizontal' ? 'Lecture Verticale' : 'Lecture Horizontale'}
          </button>
        </div>
        {readingMode === 'horizontal' ? (
          <>
            <div className="relative">
              <button onClick={goToPreviousPage} disabled={currentPage === 0} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded">
                &lt;
              </button>
              <img src={chapterImages[currentPage].url} alt={`Page ${currentPage + 1}`} className="w-full" />
              <button onClick={goToNextPage} disabled={currentPage === chapterImages.length - 1} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded">
                &gt;
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <span>Page {currentPage + 1} sur {chapterImages.length}</span>
            </div>
          </>
        ) : (
          <div>
            {chapterImages.map((image, index) => (
              <div key={index} className="text-center">
                <img src={image.url} alt={`Page ${index + 1}`} className="w-full" />
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex justify-between w-full px-4">
          <button 
            onClick={goToPreviousChapter} 
            disabled={!isPrevChapterAvailable}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
            Chapitre Précédent
          </button>
          <button 
            onClick={goToNextChapter} 
            disabled={!isNextChapterAvailable}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
            Chapitre Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterReaderPage;
