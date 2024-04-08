import { useState,FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const userData = {
      username,
      email,
      password,
      confirmPassword, 
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'inscription');
      }

      setShowModal(true);
                setTimeout(() => {
                    router.push('/')
                }, 3000);
      // Gérer la réponse ici, comme la redirection vers une autre page
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleBack = () => {
    // Redirection vers la page d'accueil
    router.push('/');
  }
    return (
        <div className='relative h-screen bg-gray-100'>
         {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    Connecté avec succès!
                    
                </div>
            </div>
        )}
        <div className='absolute inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-md'>
        <div className='absolute top-0 left-0 p-4'>
                <button
                    onClick={handleBack}
                    className='text-sm font-medium text-blue-700 dark:text-blue-400'>
                    Retour
                </button>
                </div>
        </div>
        {/* Bouton de retour */}
    
        {/* Conteneur du formulaire, centré et avec un fond clair */}
        <div className='flex justify-center items-center h-screen'>
          <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-8 z-10 relative'>
          <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-light'
                >
                            Pseudo
                        </label>
                        <input
                            type='text'
                            id='name'
                            onChange={(e) => setUsername(e.target.value)}
                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='email'    
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-light'>
                            Votre email
                        </label>
                        <input
                            type='email'
                            id='email'
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
                            onChange={(e) => setPassword(e.target.value)}
                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='confirmPassword'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-light'>
                            confirmer le mot de passe
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                      J'accepte les{' '}
                      <a href='#' className='underline'>
                        conditions d'utilisation
                      </a>
                    </span>
            </label>
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Inscription nouvelle utilisateurs
          </button>
        </form>
      </div>
    </div>
  </div>
);
}