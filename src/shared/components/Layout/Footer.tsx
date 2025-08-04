// components/Footer.tsx
'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DetailModal } from '../modal/DetailModal';

const Footer = () => {
  const [openModal, setOpenModal] = useState<'terms' | 'privacy' | 'about' | null>(null);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Branding */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">DomiLaw</h3>
            <p className="max-w-xs">La plataforma legal líder en República Dominicana</p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/directorio" className="hover:text-white transition-colors">
                  Directorio
                </Link>
              </li>
              <li>
                <button onClick={() => setOpenModal('about')} className="hover:text-white transition-colors text-left">
                  Nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setOpenModal('terms')} className="hover:text-white transition-colors text-left">
                  Términos
                </button>
              </li>
              <li>
                <button onClick={() => setOpenModal('privacy')} className="hover:text-white transition-colors text-left">
                  Privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="container mx-auto mt-12 pt-6 border-t border-gray-800 text-center">
          <p>© {currentYear} DomiLaw by Onix Technology. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de Términos */}
      <DetailModal open={openModal === 'terms'} onOpenChange={(open: boolean) => setOpenModal(open ? 'terms' : null)} title="Términos y Condiciones">
        <div className="prose prose-invert max-w-none">
          <h3 className="text-white">1. Aceptación de los Términos</h3>
          <p>Al utilizar DomiLaw, usted acepta cumplir con estos términos de servicio.</p>

          <h3 className="text-white mt-4">2. Uso del Servicio</h3>
          <p>DomiLaw es una plataforma para conectar clientes con profesionales legales. No proporcionamos asesoría legal directa.</p>

          <h3 className="text-white mt-4">3. Responsabilidades</h3>
          <p>Los abogados registrados son responsables de la veracidad de su información y de los servicios que ofrecen.</p>
        </div>
      </DetailModal>

      {/* Modal de Privacidad */}
      <DetailModal
        open={openModal === 'privacy'}
        onOpenChange={(open: boolean) => setOpenModal(open ? 'privacy' : null)}
        title="Política de Privacidad"
      >
        <div className="prose prose-invert max-w-none">
          <h3 className="text-white">1. Recopilación de Datos</h3>
          <p>Recopilamos información necesaria para conectar clientes con abogados, incluyendo nombre, contacto y detalles del caso.</p>

          <h3 className="text-white mt-4">2. Uso de la Información</h3>
          <p>La información se utiliza exclusivamente para facilitar los servicios legales y mejorar la plataforma.</p>

          <h3 className="text-white mt-4">3. Seguridad</h3>
          <p>Implementamos medidas de seguridad avanzadas para proteger sus datos.</p>
        </div>
      </DetailModal>

      {/* Modal de Nosotros */}
      <DetailModal open={openModal === 'about'} onOpenChange={(open: boolean) => setOpenModal(open ? 'about' : null)} title="Sobre Nosotros">
        <div className="prose prose-invert max-w-none">
          <h3 className="text-white">DomiLaw</h3>
          <p>Plataforma desarrollada por Onix Technology para modernizar la práctica legal en República Dominicana.</p>

          <h3 className="text-white mt-4">Nuestra Misión</h3>
          <p>Conectar a ciudadanos y empresas con los mejores profesionales legales del país mediante tecnología innovadora.</p>

          <h3 className="text-white mt-4">Contacto</h3>
          <p>
            Email: odildmartinezcuello@gmail.com
            <br />
            Teléfono: (809) 671-5201
          </p>
        </div>
      </DetailModal>
    </>
  );
};

export default Footer;
