
import React, { useState, useEffect } from 'react';
import { ViewState, Appointment } from './types';
import { SERVICES, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from './constants';
import WhatsAppButton from './components/WhatsAppButton';
import Booking from './components/Booking';
import Admin from './components/Admin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fadehouse_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load appointments", e);
      }
    }
  }, []);

  // Save to LocalStorage when changed
  useEffect(() => {
    localStorage.setItem('fadehouse_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleBookingSuccess = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
    setShowConfirmation(true);
    setView('home');
    window.scrollTo(0, 0);
    setTimeout(() => setShowConfirmation(false), 5000);
  };

  const navItemClass = (v: ViewState) => 
    `cursor-pointer font-bold uppercase tracking-widest text-sm transition-all ${view === v ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-800'}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('home')}
          >
            <span className="text-2xl font-black italic tracking-tighter">FADE HOUSE</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <span onClick={() => setView('home')} className={navItemClass('home')}>Home</span>
            <span onClick={() => setView('booking')} className={navItemClass('booking')}>Agendar</span>
            <span onClick={() => setView('admin')} className={navItemClass('admin')}>Área do Barbeiro</span>
          </nav>
          <button 
            onClick={() => setView('booking')}
            className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            Agendar Agora
          </button>
        </div>
      </header>

      {/* Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-600 text-white px-8 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-bold uppercase tracking-wider text-sm">Agendamento Realizado com Sucesso!</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1920" 
                  alt="Barbershop Atmosphere" 
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F2] via-transparent to-transparent"></div>
              </div>
              
              <div className="relative z-10 text-center px-6 max-w-4xl">
                <h2 className="text-gray-400 font-bold uppercase tracking-[0.5em] mb-4 text-sm md:text-base animate-pulse">Experience the Premium</h2>
                <h1 className="text-6xl md:text-9xl font-heading tracking-tight leading-none mb-8">SEU ESTILO<br/><span className="text-gray-400">COMEÇA AQUI.</span></h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => setView('booking')}
                    className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1"
                  >
                    Marcar Atendimento
                  </button>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    className="w-full sm:w-auto bg-white border-2 border-black px-10 py-[1.125rem] rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl hover:-translate-y-1 text-center"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="servicos" className="py-24 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-heading tracking-wider mb-2">Nossos Serviços</h2>
                <div className="w-12 h-1 bg-black mx-auto mb-4"></div>
                <p className="text-gray-500 max-w-lg mx-auto">Excelência em cada detalhe. Escolha o serviço ideal para o seu dia a dia.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES.map(service => (
                  <div key={service.id} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2">
                    <div className="mb-6 flex justify-between items-start">
                      <div className="bg-gray-100 p-4 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
                        </svg>
                      </div>
                      <span className="text-2xl font-black font-heading">R${service.price}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.durationMinutes} minutos
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section className="bg-black text-white py-24 px-6 overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                   <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-800 rounded-full opacity-50 blur-3xl"></div>
                   <h2 className="text-5xl md:text-7xl font-heading mb-8 relative z-10 leading-none">O CLIMA <br/><span className="text-gray-500">DA RUA,</span> <br/>COM O REFINO <br/><span className="text-gray-500">DOS CLÁSSICOS.</span></h2>
                   <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-8">
                     Fundada em 2024, a Fade House nasceu com o propósito de redefinir o conceito de barbearia. Não somos apenas um lugar para cortar o cabelo; somos um lifestyle.
                   </p>
                   <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                        <span className="font-bold uppercase tracking-widest text-sm">Especialistas em Fade e Freestyle</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                        <span className="font-bold uppercase tracking-widest text-sm">Cerveja Gelada e Café Premium</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                        <span className="font-bold uppercase tracking-widest text-sm">Ambiente Confortável e Moderno</span>
                     </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <img src="https://picsum.photos/400/600?random=1" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Interior 1" />
                   <img src="https://picsum.photos/400/600?random=2" className="rounded-2xl mt-8 grayscale hover:grayscale-0 transition-all duration-700" alt="Interior 2" />
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'booking' && (
          <Booking 
            existingAppointments={appointments} 
            onSuccess={handleBookingSuccess} 
          />
        )}

        {view === 'admin' && (
          <Admin appointments={appointments} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-2xl font-black italic tracking-tighter block mb-2">FADE HOUSE</span>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© 2024 Fade House - Todos os direitos reservados.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-400">Funcionamento</h4>
              <p className="text-sm font-semibold">Seg à Sex: 09h às 18h</p>
              <p className="text-sm font-semibold">Sáb: 07h às 12h</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-400">Localização</h4>
              <p className="text-sm font-semibold">Av. Principal, 1234</p>
              <p className="text-sm font-semibold">Centro - São Paulo/SP</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('admin')}
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                Acesso Restrito
              </button>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default App;
