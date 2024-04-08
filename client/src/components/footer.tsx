import Link from 'next/link'

function Footer() {
  return (
    <div className="transition flex justify-between py-4 items-center font-bold bg-light-card dark:bg-dark-card px-20 m-auto">
      <Link href="/contact" className="p-2 m-2 text-light text-lg transition">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Nous Contacter
      </button>
      </Link>
    </div>
  )
}

export default Footer;
