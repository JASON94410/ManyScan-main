import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'

export default function ConfirmNewPasswordForgotPassword() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        resetToken: '',
    })
    console.log(user)
    const [message, setMessage] = useState('');

    // Récupére l'email associé au token
    const fetchEmailFromToken = async () => {
        try {
            // Récupérez le token de l'URL (à l'aide de React Router par exemple)
            const params = new URLSearchParams(window.location.search)
            const resetToken = params.get('token') // Supposons que le token soit dans les paramètres de l'URL

            // Effectuez une requête vers votre endpoint API pour récupérer l'email associé au token
            const response = await fetch(`http://localhost:8080/api/auth/get-reset-token?token=${resetToken}`)
            const data = await response.json()

            if (response.ok) {
                setUser((prevState) => ({
                    ...prevState,
                    email: data.email || '', 
                    resetToken: resetToken || '', 
                }))
            }
        } catch (error) {
            console.error('Error fetching email from token:', error)
        }
    }

    // Déclenche la fonction fetchEmailFromToken 
    useEffect(() => {
        fetchEmailFromToken() 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleNewPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (user.password !== user.confirmPassword.trim()) {
            setMessage('Les mots de passe ne correspondent pas')
            return
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/new-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'reset-token': user.resetToken,
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                }),
            })

            if (response.ok) {
                setMessage('Mot de passe réinitialisé avec succès')
            } else {
                setMessage('Échec de la réinitialisation du mot de passe')
            }
        } catch (error) {
            setMessage('Une erreur s\'est produite lors de la réinitialisation du mot de passe')
        }
    };

  return (
    <>
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-8'>
            <form className="flex flex-col space-y-3" onSubmit={handleNewPassword}>
                <div className='mt-3'>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-900 dark:text-light'>
                        Votre email
                    </label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        required
                    />
                </div>
                <div className='mt-3'>
                    <label
                        htmlFor='newPassword'
                        className='block text-sm font-medium text-gray-900 dark:text-light'>
                        Nouveau mot de passe
                    </label>
                    <input
                        type='password'
                        id='newPassword'
                        name='password'
                        onChange={(e) => handleChange(e)}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        required
                    />
                </div>
                <div className='mt-3'>
                    <label
                        htmlFor='confirmNewPassword'
                        className='block text-sm font-medium text-gray-900 dark:text-light'>
                        Confirmez votre nouveau mot de passe
                    </label>
                    <input
                        type='password'
                        id='confirmNewPassword'
                        name='confirmPassword'
                        onChange={(e) => handleChange(e)}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        required
                    />
                </div>
                <input
                    type='submit'
                    className='text-light mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-center'
                    value="Réinitialiser votre nouveau mot de passe"
                />
            </form>
            {message && (
                <div className={`text-center mt-5 text-sm ${message.includes('succès') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </div>
            )}
        </div>
    </div>        
    </>
  )
}
