
import MangaObjects from '../interfaces/mangaObjects';

interface Props {
    manga: MangaObjects;
    width: number;
    height: number;
   
}

const Cover: React.FC<Props> = ({ manga, width, height,  }) => {

   

    return (
        <div className='relative'>
            <img
                className='mx-auto rounded-sm'
                src={manga.cover}
                alt={`Couverture de ${manga.title}`}
                width={width}
                height={height}
                
            />
       
        </div>
    );
};

export default Cover;
