// pages/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockLawyers } from '@/shared/context/AppContext';
import { FeatureComingSoonModal } from '@/shared/components/modal/FeatureComingSoonModal';

const HomePage: React.FC = () => {
  const [openFeatureModal, setOpenFeatureModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Tu <span className="text-indigo-600 dark:text-indigo-400">Bufete Digital</span> desde República Dominicana
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-10">
            Conecta con abogados especializados, gestiona tus casos y realiza pagos 100% online.
          </p>
          <FeatureComingSoonModal open={openFeatureModal} onOpenChange={() => setOpenFeatureModal(false)} />

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/directorio">
              <Button className="px-8 cursor-pointer py-6 text-lg bg-indigo-600 hover:bg-indigo-700 text-white">Buscar Abogado</Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setOpenFeatureModal(true)}
              className="px-8 py-6 cursor-pointer text-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Soy Abogado
            </Button>
          </div>
        </div>
      </section>
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity my-50 justify-center">
        <img src="/logo.svg" alt="Logo" style={{ height: '90px', width: '90px' }} />

        <span className="text-4xl font-bold text-gray-800 dark:text-white">DomiLaw</span>
      </Link>

      {/* Features */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Cómo funciona DomiLaw</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '1. Encuentra tu abogado',
                description: 'Filtra por especialidad, ubicación y ratings.',
                icon: '🔍',
              },
              {
                title: '2. Agenda online',
                description: 'Reserva citas en línea con calendarios integrados.',
                icon: '📅',
              },
              {
                title: '3. Gestión 100% digital',
                description: 'Documentos, pagos y comunicaciones en un solo lugar.',
                icon: '⚡',
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700">
                <CardHeader>
                  <span className="text-4xl mb-4">{feature.icon}</span>
                  <CardTitle className="text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Abogados Destacados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockLawyers.slice(0, 4).map((lawyer) => (
              <Card
                key={lawyer.id}
                className="hover:shadow-md transition-shadow text-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <CardHeader>
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={lawyer.avatar} />
                    <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xl">
                      {lawyer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-gray-900 dark:text-white">{lawyer.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{lawyer.specialty}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                  <div className="flex items-center gap-1 text-yellow-500">★ {lawyer.rating}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/directorio">
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Ver todos los abogados ({mockLawyers.length}+)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Desarrollado por Onix Technology</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Somos una empresa de desarrollo de software especializada en soluciones legales. DomiLaw es nuestra plataforma insignia diseñada para
            modernizar la práctica jurídica en República Dominicana. creada por Onix Technology constituida por Odil Martinez.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => window.open('https://odineck.com', '_blank')}
            >
              Conoce más
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-16 px-4 bg-indigo-600 dark:bg-indigo-800 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Información</h3>
              <p className="mb-2">📞 (809) 671-5201</p>
              <p className="mb-2">✉️ odildmartinezcuello@gmail.com</p>
              <p>📍 Carr. Sanchez, San Cristóbal</p>
            </div>
            <div>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <Input
                  placeholder="Nombre"
                  className="bg-indigo-500 dark:bg-indigo-700 border-indigo-400 dark:border-indigo-600 placeholder:text-indigo-200 text-white"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="bg-indigo-500 dark:bg-indigo-700 border-indigo-400 dark:border-indigo-600 placeholder:text-indigo-200 text-white"
                />
                <textarea
                  placeholder="Mensaje"
                  rows={4}
                  className="w-full bg-indigo-500 dark:bg-indigo-700 border border-indigo-400 dark:border-indigo-600 rounded-md p-2 placeholder:text-indigo-200 text-white"
                />
                <Button onClick={() => setOpenFeatureModal(true)} variant="secondary" className="w-full bg-white text-indigo-600 hover:bg-gray-100">
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
