import  Link from "next/link";
import {  FaStar } from 'react-icons/fa';
const Header = () => (
        <header className="text-white p-4">
        <nav>
            <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/favorites" className="hover:underline">Favorites</Link></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
        </nav>
        <Link href="/" className="flex justify-center-safe">
            <img
                src="/images/Rick_and_Morty_logo.webp"
                alt="Rick and Morty"
                className="w[250px]"
            />
        </Link>
        </header>
    );
export { Header };