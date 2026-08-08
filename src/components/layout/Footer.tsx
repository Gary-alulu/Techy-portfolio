"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--color-glass-border)] bg-gradient-to-b from-transparent to-black/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/MY LOGO.png" alt="Logo" width={240} height={96} className="h-16 md:h-24 w-auto object-contain" />
            </Link>
            <p className="text-[var(--color-secondary)] max-w-sm mt-4">
              Crafting Brands. Designing Experiences. Building Products. A premium digital design studio dedicated to elevating your digital presence.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-6">Navigation</h3>
            <ul className="flex flex-col gap-4 text-[var(--color-secondary)]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/work" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-6">Contact</h3>
            <ul className="flex flex-col gap-4 text-[var(--color-secondary)]">
              <li>
                <a href="mailto:alulugary5@gmail.com" className="hover:text-white transition-colors">alulugary5@gmail.com</a>
              </li>
              <li>
                <a href="mailto:alulutechy@gmail.com" className="hover:text-white transition-colors">alulutechy@gmail.com</a>
              </li>
              <li>
                <a href="tel:+254769680739" className="hover:text-white transition-colors">+254 769 680 739</a>
              </li>
              <li>
                <a href="tel:+254736211607" className="hover:text-white transition-colors">+254 736 211 607</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-6">Socials</h3>
            <ul className="flex flex-col gap-4 text-[var(--color-secondary)]">
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-white transition-colors group">
                  Twitter <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/_techy55" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors group">
                  Instagram <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="https://www.behance.net/garyalulu5" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors group">
                  Behance <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Gary-alulu" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors group">
                  GitHub <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[var(--color-secondary)] text-sm">
          <p className="text-center md:text-left mb-6 md:mb-0">© {new Date().getFullYear()} Gary Design Studio. All rights reserved.</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors px-6 py-2 border border-[var(--color-glass-border)] rounded-full md:border-transparent md:px-0 md:py-0"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
