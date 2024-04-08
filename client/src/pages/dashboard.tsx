
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { RxAvatar } from 'react-icons/rx';
import { FaBookOpen } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import InfoCard from '../cards/InfoCard';
import { ReviewCard } from '../cards/ReviewCard';
import { useAuth } from '../pages/auth/authContext';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isOnline: boolean;
  createdAt: string;
}

interface DashboardProps {
    loggedInUserCount: number;
}

interface MangaStat {
    mangaName: string;
    commentCount: number;
}

const MangaStatsGraph = ({ data }: { data: MangaStat[] }) => {
  const chartData = {
    labels: data.map((item) => item.mangaName),
    datasets: [
      {
        label: 'Nombre de commentaires',
        data: data.map((item) => item.commentCount),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

 

    return <Bar data={chartData} />;
};

export default function Dashboard() {
  const [mangaStats, setMangaStats] = useState<MangaStat[]>([]);
  const [loggedInUserCount, setLoggedInUserCount] = useState<number>(0);
  const [BookCount, setBookCount] = useState<number>(840);
  const [membersCount, setMembersCount] = useState<number>(6);
  const [issueCount, setIssueCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { token } = useAuth();


  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/get-users', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
  
        const data = await response.json();
        setUsers(data); // Mettez à jour la variable users avec les données obtenues
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };
  
    fetchUsers();
  }, []);

  useEffect(() => {
         const fetchMangaStats = async () => {
           const response = await fetch('https://api.mangadex.org/statistics/manga/.');
           const data = await response.json();
          
           setMangaStats(data.statistics.map((stat: any) => ({
             mangaName: stat.mangaName, 
             commentCount: stat.commentCount 
           })));
         };
    
         fetchMangaStats();
       }, []);

       interface Message {
        _id: string; 
        username: string;
        email: string;
        message: string;
        picture?: string; 
        createdAt: string; 
      }

      useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/contact');
            const data = await response.json();
            setMessages(data);
          } catch (error) {
            console.error("Erreur lors de la récupération des messages:", error);
          }
        };
      
        if (activeTab === 'messages') {
          fetchMessages();
        }
      }, [activeTab]);

      interface Review {
        _id: string; 
        title: string;
        content: string;
        rating: number;
        createdAt: string;
      }
      useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/reviews');
            const data = await response.json();
            setReviews(data);
          } catch (error) {
            console.error("Erreur lors de la récupération des avis:", error);
          }
        };
      
        if (activeTab === 'reviews') {
          fetchReviews();
        }
      }, [activeTab]);
      
  

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-gray-800 text-white" aria-label="Sidebar">
          <div className="py-4 px-3">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Menu</h2>
            <ul className="space-y-2">
              <li className={`${activeTab === 'home' ? 'bg-gray-700' : ''} hover:bg-gray-700 p-2 rounded`} onClick={() => setActiveTab('home')}>Accueil</li>
              <li className={`${activeTab === 'messages' ? 'bg-gray-700' : ''} hover:bg-gray-700 p-2 rounded`} onClick={() => setActiveTab('messages')}>Messages</li>
              <li className={`${activeTab === 'reviews' ? 'bg-gray-700' : ''} hover:bg-gray-700 p-2 rounded`} onClick={() => setActiveTab('reviews')}>Avis</li>
            </ul>
          </div>
        </aside>
        <main className="flex-1">
          <div className="bg-blue-500 text-white p-4 shadow-md">
            <h1 className="text-xl font-semibold">Tableau de Bord</h1>
          </div>
          {activeTab === 'home' && (
            <div className="p-4">
             
              <InfoCard 
  icon={< RxAvatar />}
  title="Logged In User"
  value={loggedInUserCount} 
  className="bg-red-500"
/>
<InfoCard 
  icon={< FaBookOpen />}
  title="Number of Books"
  value={BookCount} 
  className="bg-red-500"
/>
<InfoCard
  icon={< FaUsers />}
  title="Number of Users"
  value={membersCount}
  className="bg-red-500"
/>
<InfoCard
  icon={< BiError />}
  title="Issues reported"
  value={issueCount}
  className="bg-red-500"
/>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-4">
              <section className="bg-white p-4 rounded-lg shadow flex-1">
                <h2 className="font-semibold text-xl mb-3">Statistiques Manga</h2>
                <MangaStatsGraph data={mangaStats} />
              </section>
              
              <section className="bg-white p-4 rounded-lg shadow flex-1">
          <h2 className="font-semibold text-xl mb-3">Nouveaux Membres</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                </tr>
              </thead>
              <tbody>
  {Array.isArray(users) && users.map((user) => (
    <tr key={user._id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt || 'N/A'}</td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </section>
            </div>
          </div>
        
        
      </div>
             
          )}
          {/* Contenu de l'onglet Messages */}
          {activeTab === 'messages' && (
            <div className="p-4">
              {activeTab === 'messages' && (
  <div className="p-4">
    <h2 className="font-semibold text-xl mb-3">Messages</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de l'expéditeur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'envoi</th>
          </tr>
        </thead>
        <tbody>
        {messages.map((message) => (
  <tr key={message._id}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.username}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.message}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.createdAt}</td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  </div>
)}

            </div>
          )}
          {/* Contenu de l'onglet Avis */}
          {activeTab === 'reviews' && (
  <div className="p-4">
    <h2 className="font-semibold text-xl mb-3">Avis</h2>
    <div className="space-y-4">
    {reviews.length > 0 ? (
  reviews.map((review) => (
    <ReviewCard key={review._id} review={review} />
  ))
) : (
  <p>Aucun avis pour le moment.</p>
)}

    </div>
  </div>
)}

        </main>
      </div>
    </>
  );
}
