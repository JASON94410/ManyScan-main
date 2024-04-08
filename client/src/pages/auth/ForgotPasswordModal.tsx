import React, { useState } from 'react'

interface ForgotPasswordModalProps {
    closeModal: () => void 
};

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ closeModal }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                alert('Un email de réinitialisation a été envoyé si l\'adresse est reconnue.');
                setTimeout(closeModal, 50);
            } else {
                throw new Error('Réponse du serveur non valide.');
            }
        } catch (error) {
            alert('Une erreur s\'est produite lors de la demande de réinitialisation du mot de passe.');
        }
    };

    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg relative'>
                <div className='absolute top-4 right-4'>
                    <button onClick={closeModal} className='text-gray-600 focus:outline-none p-1'>
                        X
                    </button>
                </div>
                <div className='mb-6'>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-light'>
                        Votre email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className='text-light bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Réinitialiser le mot de passe
                </button>
            </div>
        </div>
    )
}

export default ForgotPasswordModal;
