import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Plane,
  Truck,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";

function AldiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-label="ALDI" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="60" rx="6" fill="#1a4b99"/>
      <text x="60" y="42" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="32" fill="white" letterSpacing="2">ALDI</text>
    </svg>
  );
}

const IMAGES = [
  "/luggage-white.png",
  "/luggage-rose.png",
  "/luggage-grey.png",
  "/luggage-salmon.png",
  "/luggage-navy.png",
];

const COLORS = [
  { name: "Blanc", color: "#f8f9fa" },
  { name: "Rose", color: "#e8c5c8" },
  { name: "Gris", color: "#9aa0a6" },
  { name: "Saumon", color: "#ffb4a2" },
  { name: "Bleu Marine", color: "#2b3a4a" },
];

export default function LandingPage() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isStickyCTA, setIsStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsStickyCTA(true);
      } else {
        setIsStickyCTA(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AldiLogo className="h-10 w-auto" />
            <div className="flex items-center gap-2 border-l pl-3 ml-1 border-gray-200">
              <span className="text-xl leading-none">🇫🇷</span>
              <span className="text-sm font-medium text-gray-600 hidden sm:inline-block">France</span>
            </div>
          </div>
          <Button 
            className="bg-destructive hover:bg-destructive/90 text-white font-semibold shadow-md hidden sm:flex"
            data-testid="button-header-cta"
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
          >
            Commandez maintenant et économisez 85% →
          </Button>
        </div>
      </header>

      {/* Main Product Section */}
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left: Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIndex}
                  src={IMAGES[currentImgIndex]}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  alt="Ensemble de bagages"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </AnimatePresence>
              
              <button 
                onClick={prevImg}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                data-testid="button-gallery-prev"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button 
                onClick={nextImg}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                data-testid="button-gallery-next"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-sm flex items-center gap-1 border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                En stock
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  data-testid={`button-thumbnail-${idx}`}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-gray-50 ${
                    idx === currentImgIndex ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Couleur ${idx}`} className="w-full h-full object-cover mix-blend-multiply p-1" />
                </button>
              ))}
            </div>
            
            {/* Color swatches */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm font-medium text-gray-500">Couleur:</span>
              <div className="flex gap-2">
                {COLORS.map((color, idx) => (
                  <div 
                    key={idx}
                    className={`w-6 h-6 rounded-full border border-gray-200 shadow-sm transition-transform ${idx === currentImgIndex ? 'scale-125 ring-2 ring-primary ring-offset-2' : ''}`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600">
                97% taux de satisfaction
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
              Ensemble de bagages 3 pièces Coolife
            </h1>

            <div className="flex items-center gap-3 mb-6 bg-red-50 w-fit px-4 py-2 rounded-xl border border-red-100">
              <span className="bg-destructive text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Sauvegarde 85%
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-400 line-through text-lg font-medium">€180.00</span>
                <span className="text-destructive font-black text-4xl">€9.99</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Ensemble de trois pièces comprenant un bagage de 20'', un bagage de 24'' et un bagage de 28''",
                "Serrure approuvée par la TSA",
                "Livraison gratuite jusqu'à minuit",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
              <div className="flex items-start gap-3 p-3 bg-orange-50/80 rounded-lg border border-orange-100">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5 animate-pulse" />
                <span className="text-destructive font-bold">
                  De June 11 - Il n'en reste que 9 en stock!
                </span>
              </div>
            </div>

            <p className="text-xs font-semibold text-orange-600 mb-2 uppercase tracking-wide">
              Veuillez lire l'alerte avant d'effectuer l'achat
            </p>

            <Button 
              size="lg" 
              className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 animate-pulse-ring mb-4 group"
              data-testid="button-main-cta"
            >
              Commandez maintenant et économisez 85%
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Safe Checkout Badges */}
            <div className="flex flex-col items-center gap-3 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Paiement 100% sécurisé</span>
              <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400">
                <Lock className="w-5 h-5" />
                <CreditCard className="w-6 h-6" />
                <div className="font-bold text-sm border border-gray-300 rounded px-2 py-0.5">VISA</div>
                <div className="font-bold text-sm border border-gray-300 rounded px-2 py-0.5">Stripe</div>
                <div className="font-bold text-sm border border-gray-300 rounded px-2 py-0.5 italic">PayPal</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer / Alert Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-4 text-amber-900 leading-relaxed">
              <p className="font-medium">
                Nous proposons notre stock de 2023 Coolife Luggage Suitcase à un prix réduit. Cette décision nous permet de nous conformer aux politiques de l'entreprise et d'éviter des amendes potentielles de la part de Coolife. Profitez de cette opportunité jusqu'à épuisement des stocks !
              </p>
              <p className="opacity-90">
                Cette offre est une excellente occasion d'acheter un ensemble Coolife Luggage Suitcase au prix habituel. De plus, la garantie de 30 jours reste valable au cas où le MFP ne fonctionnerait pas comme décrit.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Value Add Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Lock,
              title: "Serrure TSA",
              desc: "Approuvée par les agents de sécurité pour voyager en toute tranquillité."
            },
            {
              icon: Plane,
              title: "3 Tailles Incluses",
              desc: "20'', 24'' et 28'' pour tous vos types de voyages, du week-end aux longues vacances."
            },
            {
              icon: Truck,
              title: "Livraison Gratuite",
              desc: "Livraison rapide et gratuite jusqu'à minuit aujourd'hui."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-primary">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-6">
          <AldiLogo className="h-12 w-auto opacity-50" />
          <p className="text-sm max-w-md">
            Offre promotionnelle limitée. Les prix et la disponibilité sont sujets à changement sans préavis.
            Copyright © {new Date().getFullYear()} ALDI / Coolife.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <AnimatePresence>
        {isStickyCTA && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-50 lg:hidden"
          >
            <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 line-through">€180.00</span>
                <span className="text-lg font-black text-destructive leading-none">€9.99</span>
              </div>
              <Button 
                className="flex-1 bg-destructive hover:bg-destructive/90 text-white font-bold h-12 shadow-lg animate-pulse-ring"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-testid="button-sticky-cta"
              >
                Commander - 85%
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}