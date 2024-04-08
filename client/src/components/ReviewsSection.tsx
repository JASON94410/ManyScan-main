import React, { useEffect, useState , useContext } from 'react';
import { useAuth } from '@/pages/auth/authContext';

interface Comment {
  title: string;
  content: string;
  rating: number;
  mangaId: string;
  user: string;
  createdAt?: Date;
}

interface CommentSectionProps {
    mangaId: string;
    
}

const CommentSection: React.FC<CommentSectionProps> = ({ mangaId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentTitle, setNewCommentTitle] = useState<string>('');
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [newCommentRating, setNewCommentRating] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const auth = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/reviews/${mangaId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          console.error('La réponse n\'est pas un tableau', data);
        }
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error('Erreur lors de la récupération des commentaires:', err);
        setError(err);
        setLoading(false);
      });
  }, [mangaId]);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!auth || !auth.user) {
      alert('Vous devez être connecté pour poster un commentaire');
      console.error('Erreur: Utilisateur non connecté');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: newCommentTitle,
        content: newCommentContent,
        rating: newCommentRating,
        mangaId: mangaId,
        user: auth.user.id, 
      };
  
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du commentaire');
      }
  
      const newComment: Comment = await response.json();
      setComments([...comments, newComment]);
      setNewCommentTitle('');
      setNewCommentContent('');
      setNewCommentRating(5);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du commentaire:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
      {comments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Titre</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Commentaire</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Note</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {comments.map((comment, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-4">{comment.title}</td>
                  <td className="py-3 px-4">{comment.content}</td>
                  <td className="py-3 px-4">{comment.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Aucun commentaire pour le moment.</p>
      )}
  
      {/* Formulaire pour ajouter un commentaire */}
      <div className="mt-8">
                <h3 className="text-xl font-semibold">Ajouter un commentaire</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newCommentTitle} 
                        onChange={(e) => setNewCommentTitle(e.target.value)} 
                        placeholder="Titre du commentaire" 
                        required 
                    />
                    <textarea 
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newCommentContent} 
                        onChange={(e) => setNewCommentContent(e.target.value)} 
                        placeholder="Votre commentaire" 
                        required 
                    />
                    <input 
                        type="number" 
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newCommentRating} 
                        onChange={(e) => setNewCommentRating(parseInt(e.target.value, 10))} 
                        min="1" 
                        max="5" 
                        required 
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                        Poster le commentaire
                    </button>
                </form>
            </div>
        </div>
    );
};
  
export default CommentSection;
