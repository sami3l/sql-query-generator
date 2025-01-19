"use client";
import React, { useState, useEffect } from "react";
import ChatSupport from "./components/ChatSupport/ChatSupport";

const HomePage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Function to check scroll position and toggle button visibility
  const checkScrollTop = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold">SQL Script Generator</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#home" className="hover:text-gray-300">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-gray-300">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-gray-300">
                  Aperçu
                </a>
              </li>
              <li>
                <a href="contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-white text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800">
          Générez vos scripts SQL rapidement et efficacement
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Fournissez une description simple de votre base de données, et nous
          générons les scripts nécessaires pour vous.
        </p>
        <div className="flex justify-center mb-12">
          <ChatSupport />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features bg-gray-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Pourquoi utiliser SQL Script Generator ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="feature-item bg-white shadow-lg p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-green-600">Simplicité</h3>
              <p className="text-gray-600 mt-4">
                Décrivez vos tables, colonnes, et relations en texte clair.
              </p>
            </div>
            <div className="feature-item bg-white shadow-lg p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-green-600">Automatisation</h3>
              <p className="text-gray-600 mt-4">
                Générez des scripts SQL en un clic, sans effort manuel.
              </p>
            </div>
            <div className="feature-item bg-white shadow-lg p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-green-600">Flexibilité</h3>
              <p className="text-gray-600 mt-4">
                Ajoutez des clés étrangères, index et contraintes uniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Aperçu
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Voici un exemple d'entrée et de sortie pour le générateur :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Example */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Description d'entrée :
              </h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 font-mono">
                Table: Users
                <br />
                - id: integer, primary key
                <br />
                - name: varchar(255), not null
                <br />
                - email: varchar(255), unique
              </pre>
            </div>
            {/* Output Example */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Script SQL généré :
              </h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 font-mono">
                CREATE TABLE Users (
                <br />
                &nbsp;&nbsp;id INT PRIMARY KEY,
                <br />
                &nbsp;&nbsp;name VARCHAR(255) NOT NULL,
                <br />
                &nbsp;&nbsp;email VARCHAR(255) UNIQUE
                <br />
                );
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 SQL Script Generator(4IIR-Gr_4_6). Tous droits réservés.</p>
          <ul className="flex justify-center space-x-6 mt-4">
            <li>
              <a href="" className="hover:text-gray-400">
                Accueil
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-gray-400">
                Fonctionnalités
              </a>
            </li>
            <li>
              <a href="contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* Scroll-to-Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default HomePage;