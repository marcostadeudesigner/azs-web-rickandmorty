"use client";
import  Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import {Modal} from '../Modal/Modal';
import { EpisodeSearch } from '../EpisodeSearch/EpisodeSearch';
import { FaSearch } from "react-icons/fa";
import { useHeader } from './useHeader';
const Header = () => {
 
    const { isModalOpen, setIsModalOpen } = useHeader();

    return(
        <header className="text-white p-4">
        <nav>
            <ul className="flex items-center space-x-4">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><Link href="/favorites" className="hover:text-teal-600">Favorites</Link></li>
            <li><Link href="#contact" className="hover:text-teal-600">Contact</Link></li>
            <li>
                <button
                onClick={() => setIsModalOpen(true)}
                className="flex gap-3 border items-center cursor-pointer text-[10px] border-teal-200 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
                <FaSearch /> <span className="hidden sm:inline">CTRL+K or CMD+K</span>
            </button>
            </li>
            </ul>
        </nav>
        

        <Link href="/" className="max-w-fit flex justify-center-safe m-auto">
            <img
                src="/images/Rick_and_Morty_logo.webp"
                alt="Rick and Morty"
                className="w[250px]"
            />
        </Link>
        <Modal title="Search Episodes" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EpisodeSearch setIsModalOpen={setIsModalOpen} />
      </Modal>
        </header>
    )
};
export { Header };