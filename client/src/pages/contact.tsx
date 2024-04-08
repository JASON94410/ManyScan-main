
import React,{useState} from 'react';
import { useRouter } from 'next/router';



export default function ContactForm() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username,email, message }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }
            setShowModal(true);
            setTimeout(() => {
                router.push('/')
            }, 3000);
    
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire:", error);
        }
    };
    
    return (
        <div className='relative flex h-screen items-center justify-center'>
        <div className='hidden md:block absolute left-0 top-0 bottom-0 z-0' style={{ width: 'calc(50% - 300px)' }}>
            <img src="/mailer.png" alt="mailer" className='h-full w-full object-cover' />
        </div>
        {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    Message envoyé avec succès!
                    
                </div>
            </div>
        )}

            <div className='z-10 px-4 py-8 w-full md:max-w-md bg-white border-4 border-red-600 rounded-lg shadow-lg' style={{ maxWidth: '600px' }}>
                <h2 className='text-3xl font-bold mb-8 text-gray-900'>VENEZ PRENDRE LE THÉ</h2>
                <form onSubmit={handleSubmit}>
                        <div className='flex mb-4'>
                            <div className='w-1/2'>

                                <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900'>Pseudo</label>
                                <input type='text' id='username' className='bg-red-600 border border-red-300 text-white text-sm rounded-lg block w-full p-2.5' value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                            </div>
                            <div className='w-1/2 pl-2'>
                                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                                <input type='email' id='email' className='bg-red-600 border border-red-300 text-white text-sm rounded-lg block w-full p-2.5' 
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                        </div>
                    <div className='mb-4'>
                        <label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900'>Message</label>
                        <textarea id='message' rows={4} className='bg-red-600 border border-red-300 text-white text-sm rounded-lg block w-full p-2.5'value={message}
                            onChange={(e) => setMessage(e.target.value)} required/>
                    </div>
                    <div className='flex justify-between items-center mb-8'>
                        <button type='submit' className='px-4 py-2 bg-red-600 text-white text-sm rounded-lg'>Envoyer</button>
                    </div>
                </form>
                <a href='#' className='inline-block text-red-600 text-sm'>RETOUR À L'ACCUEIL</a>
            </div>
</div>
       
    );
}

        