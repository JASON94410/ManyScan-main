import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from './authContext';
import ForgotPasswordModal from "./ForgotPasswordModal";
import { setCookie } from 'cookies-next';



export default function LoginForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal2, setShowModal2] = useState(false);
    
  

 
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    
                }),
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`)
            }

            const userData = await response.json()

            const { username, token , id} = userData; // Récupération du username et du token
            const role = userData.role || 'User';
    
            if (token) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 1);
                setCookie('token', token, { expires: expirationDate });
                setCookie('userId', id, { expires: expirationDate });
              
                login({ username ,token, role ,id}); // Mise à jour de l'état avec le token et le username
                setShowModal2(true);
                setTimeout(() => {
                    router.push('/')
                }, 3000);

            } else {
                console.error('Token non reçu')
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error)
        }
    };

    const handleBack = () => {
        router.push('/') 
    };

    const handleForgotPassword = () => {
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false)
        setMessage('')
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
              {showModal2 && (
            <div className="modal-overlay">
                <div className="modal-content">
                    Connecté avec succès!
                    
                </div>
            </div>
        )}
            <div className='absolute top-0 left-0 p-4'>
                <button
                    onClick={handleBack}
                    className='text-sm font-medium text-blue-700 dark:text-blue-400'>
                    Retour
                </button>
            </div>
            <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-8'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <label
                            htmlFor='email'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-light'>
                            Votre email
                        </label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='password'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-light'>
                            Mot de passe
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='terms' className='inline-flex items-center'>
                            <input
                                type='checkbox'
                                id='terms'
                                value='1'
                                className='form-checkbox'
                                required
                            />
                            <span className='ml-2 text-sm font-medium text-gray-900 dark:text-light'>
                                Se souvenir de moi
                            </span>
                        </label>
                    </div>
                    <button
                        type='submit'
                        className='text-light bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                        Connexion
                    </button>
                    <div className='mt-4'>
                        <span className='text-sm font-medium text-gray-900 dark:text-light'>
                            Vous n'avez pas de compte ?
                        </span>
                        <a
                            href='/auth/register'
                            className='text-sm font-medium text-blue-700 dark:text-blue-400'>
                            S'inscrire
                        </a>
                    </div>
                    <div className='mt-4'>
                        <a
                            onClick={handleForgotPassword}
                            className='text-sm font-medium text-blue-700 dark:text-blue-400'>
                            Mot de passe oublié ?
                        </a>
                        {showModal && (
                            <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50'>
                                <div className='bg-white p-6 rounded-lg'>
                                    <ForgotPasswordModal closeModal={closeModal} />
                                </div>
                                <button onClick={closeModal}>Fermer</button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}