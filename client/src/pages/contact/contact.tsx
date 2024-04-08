

export default function ContactForm() {
    return (
        <div className='relative flex h-screen items-center justify-center'>
        {/* Image de gauche pour les écrans medium et plus */}
        <div className='hidden md:block absolute left-0 top-0 bottom-0 z-0' style={{ width: 'calc(50% - 300px)' }}>
            <img src="/mailer.png" alt="mailer" className='h-full w-full object-cover' />
        </div>

            {/* Conteneur du formulaire avec un z-index plus élevé pour le placer au-dessus des images */}
            <div className='z-10 px-4 py-8 w-full md:max-w-md bg-white border-4 border-red-600 rounded-lg shadow-lg' style={{ maxWidth: '600px' }}>
                <h2 className='text-3xl font-bold mb-8 text-gray-900'>VENEZ PRENDRE LE THÉ</h2>
                <form>
                    <div className='flex mb-4'>
                     
                        <div className='w-1/2'>
                            <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900'>Pseudo</label>
                            <input type='text' id='username' className='bg-red-600 border border-red-300 text-white text-sm rounded-lg block w-full p-2.5' required />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>E-mail</label>
                        <input type='email' id='email' className='bg-red-600 border border-red-300 text-white text-sm rounded-lg block w-full p-2.5' required />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900'>Message</label>
                        <textarea id='message' rows={4} className='bg-red-600 border border-red-300 text-white text-sm rounded-lg block w-full p-2.5'></textarea>
                    </div>
                    <div className='flex justify-between items-center mb-8'>
                        <button type='button' className='px-4 py-2 bg-red-600 text-white text-sm rounded-lg'>Télécharger une image(jpg, pdf)</button>
                        <button type='reset' className='px-4 py-2 bg-gray-300 text-gray-900 text-sm rounded-lg'>Effacer</button>
                        <button type='submit' className='px-4 py-2 bg-red-600 text-white text-sm rounded-lg'>Envoyer</button>
                    </div>
                </form>
                <a href='#' className='inline-block text-red-600 text-sm'>RETOUR À L'ACCUEIL</a>
            </div>


          
       
        </div>
    );
}

        