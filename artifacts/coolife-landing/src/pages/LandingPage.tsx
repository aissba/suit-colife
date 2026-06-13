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
  CreditCard,
  Menu,
  Search,
  Bell,
  LayoutList
} from "lucide-react";
import { Button } from "@/components/ui/button";

const IMAGES = [
  { src: "/coolife-hero.jpg", label: "Vue ensemble" },
  { src: "/coolife-detail1.jpg", label: "Détail roues" },
  { src: "/coolife-detail2.jpg", label: "Serrure TSA" },
  { src: "/coolife-detail3.jpg", label: "Intérieur" },
  { src: "/coolife-detail4.jpg", label: "Vue latérale" },
  { src: "/coolife-detail5.jpg", label: "Poignée" },
];

export default function LandingPage() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isStickyCTA, setIsStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyCTA(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % IMAGES.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        {/* Top bar: hamburger | logo | icons */}
        <div className="px-3 sm:px-5 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Hamburger */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors flex-shrink-0"
            data-testid="button-menu"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Center: ALDI logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/aldi-logo.svg"
              alt="ALDI"
              className="h-10 sm:h-12 w-auto"
              data-testid="img-aldi-logo"
            />
          </div>

          {/* Right: icons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
              data-testid="button-notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              data-testid="button-offers-list"
              aria-label="Liste des offres"
            >
              <LayoutList className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Search bar row */}
        <div className="px-3 sm:px-5 pb-3">
          <button
            className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-150 active:bg-gray-200 rounded-full px-4 py-2.5 transition-colors text-left"
            data-testid="button-search"
            onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
          >
            <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-400 font-normal">Encuentra ofertas</span>
          </button>
        </div>
      </header>
      {/* Main Product Section */}
      <main className="container mx-auto px-4 py-5 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16">

          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-3 sm:space-y-4"
          >
            {/* Main Image — premium card with deep shadow */}
            <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl bg-[#f7f5f2] overflow-hidden"
              style={{ boxShadow: "0 8px 40px 0 rgba(60,40,20,0.13), 0 1.5px 6px 0 rgba(0,0,0,0.07)" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIndex}
                  src={IMAGES[currentImgIndex].src}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  alt={IMAGES[currentImgIndex].label}
                  className="w-full h-full object-contain p-3 sm:p-5"
                />
              </AnimatePresence>

              {/* Nav arrows */}
              <button
                onClick={prevImg}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white hover:bg-gray-50 active:scale-95 rounded-full flex items-center justify-center transition-all"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
                data-testid="button-gallery-prev"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white hover:bg-gray-50 active:scale-95 rounded-full flex items-center justify-center transition-all"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
                data-testid="button-gallery-next"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* "En stock" badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-green-100"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.10)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                En stock
              </div>

              {/* Image label bottom-right */}
              <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
                {IMAGES[currentImgIndex].label}
              </div>

              {/* Dot indicators for mobile */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                {IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImgIndex ? 'bg-white w-5' : 'bg-white/50 w-1.5'}`}
                    aria-label={`Image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails strip */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-2.5">
              {IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  data-testid={`button-thumbnail-${idx}`}
                  className={`relative flex-shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-200 bg-[#f7f5f2] ${
                    idx === currentImgIndex
                      ? 'ring-2 ring-[#1a4b99] scale-105'
                      : 'ring-1 ring-gray-200 hover:ring-gray-300 hover:scale-[1.03]'
                  }`}
                  style={{ boxShadow: idx === currentImgIndex ? "0 4px 16px rgba(26,75,153,0.18)" : "0 1px 4px rgba(0,0,0,0.07)" }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1.5 text-xs sm:text-sm font-medium text-gray-600">
                97% taux de satisfaction
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4 tracking-tight">
              Ensemble de bagages 3 pièces Coolife
            </h1>

            {/* Price */}
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 bg-red-50 px-3 sm:px-4 py-2.5 rounded-xl border border-red-100 w-full">
              <span className="bg-destructive text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide whitespace-nowrap flex-shrink-0">
                –85%
              </span>
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-gray-400 line-through text-base sm:text-lg font-medium whitespace-nowrap">€180.00</span>
                <span className="text-destructive font-black text-3xl sm:text-4xl leading-none">€9.99</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-7">
              {[
                "Ensemble de trois pièces : bagages 20'', 24'' et 28''",
                "Serrure approuvée par la TSA",
                "Livraison gratuite jusqu'à minuit",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700 font-medium">{item}</span>
                </div>
              ))}
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 bg-orange-50/80 rounded-lg border border-orange-100">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-destructive font-bold">
                  Juin 11 – Il n'en reste que 9 en stock !
                </span>
              </div>
            </div>

            <p className="text-xs font-semibold text-orange-600 mb-2.5 uppercase tracking-wide">
              Veuillez lire l'alerte avant d'effectuer l'achat
            </p>

            {/* Main CTA */}
            <Button
              size="lg"
              className="w-full h-14 sm:h-16 text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 active:bg-primary/80 text-white shadow-xl shadow-primary/20 animate-pulse-ring mb-4 group touch-manipulation"
              data-testid="button-main-cta"
              onClick={() => window.open("https://goalfbay.shop/checkout/07b38775329a", "_blank")}
            >
              Commander – économisez 85%
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Safe Checkout Badges */}
            <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Paiement 100% sécurisé</span>
              <div className="flex flex-wrap justify-center items-center gap-3 text-gray-400">
                <Lock className="w-4 h-4" />
                <CreditCard className="w-5 h-5" />
                <div className="font-bold text-xs border border-gray-300 rounded px-1.5 py-0.5">VISA</div>
                <div className="font-bold text-xs border border-gray-300 rounded px-1.5 py-0.5">Stripe</div>
                <div className="font-bold text-xs border border-gray-300 rounded px-1.5 py-0.5 italic">PayPal</div>
                <div className="font-bold text-xs border border-gray-300 rounded px-1.5 py-0.5">SSL</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-16 bg-amber-50 border border-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto shadow-sm"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <div className="space-y-3 text-amber-900 leading-relaxed min-w-0">
              <p className="text-sm sm:text-base font-medium">Nous proposons notre stock de 2025 Coolife Luggage Suitcase à un prix réduit. Cette décision nous permet de nous conformer aux politiques de l'entreprise et d'éviter des amendes potentielles de la part de Coolife. Profitez de cette opportunité jusqu'à épuisement des stocks !</p>
              <p className="text-sm sm:text-base opacity-90">Cette offre est une excellente occasion d'acheter un ensemble Coolife Luggage Suitcase au prix habituel. De plus, la garantie de 30 jours reste valable au cas où le Coolife bagages ne fonctionnerait pas comme décrit.</p>
            </div>
          </div>
        </motion.div>

        {/* Ergonomic Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-20 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left: headline + features */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Conception ergonomique pour les déplacements et un soutien optimal
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Fabriquée en polypropylène rigide, elle assure une excellente protection de vos objets tout en restant légère. Sa conception durable lui permet de résister aux chocs et aux rayures.
              </p>

              {/* Feature blocks */}
              <div className="space-y-5">
                {[
                  {
                    emoji: "🔒",
                    title: "Serrure de haute qualité",
                    body: "Équipé d'une serrure TSA, ce sac offre un niveau de sécurité élevé pour votre tranquillité d'esprit en voyage. La serrure permet aux bagages d'être inspectés par les autorités sans avoir à la briser."
                  },
                  {
                    emoji: "🤝",
                    title: "Construction de haute qualité",
                    body: "Ces sacs Coolife sont conçus pour être suffisamment solides et fonctionnels pour répondre à toutes vos exigences en matière de voyage."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-blue-50/40 transition-colors"
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base mb-1">{item.title}</p>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-white font-bold rounded-2xl shadow-lg group text-sm sm:text-base touch-manipulation"
                style={{ backgroundColor: "#1e2939" }}
                onClick={() => window.open("https://goalfbay.shop/checkout/07b38775329a", "_blank")}
              >
                Commandez maintenant 85%
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right: specs card */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Specs header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-gray-900 text-white">
                <span className="text-xl">🛡️</span>
                <span className="font-bold text-sm sm:text-base tracking-wide uppercase">Spécifications avancées</span>
              </div>

              {/* Dimensions */}
              <div className="p-5 space-y-4">
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Disponible en trois tailles différentes (20 / 24 / 28 pouces) pour répondre à vos différents besoins.
                </p>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Dimensions</p>
                  <div className="divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100">
                    {[
                      { size: "20″", dim: "55 × 40 × 20 cm" },
                      { size: "24″", dim: "65 × 45 × 25 cm" },
                      { size: "28″", dim: "75 × 50 × 30 cm" },
                    ].map((row) => (
                      <div key={row.size} className="flex items-center justify-between px-4 py-3 bg-gray-50 even:bg-white">
                        <span className="text-sm font-semibold text-gray-700">{row.size}</span>
                        <span className="text-sm text-gray-500 font-mono">{row.dim}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Poids</p>
                  <div className="divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100">
                    {[
                      { size: "20″", weight: "2,7 kg" },
                      { size: "24″", weight: "3,5 kg" },
                      { size: "28″", weight: "4,2 kg" },
                    ].map((row) => (
                      <div key={row.size} className="flex items-center justify-between px-4 py-3 bg-gray-50 even:bg-white">
                        <span className="text-sm font-semibold text-gray-700">{row.size}</span>
                        <span className="text-sm text-gray-500 font-mono">{row.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-13 text-white font-bold rounded-xl shadow group text-sm touch-manipulation"
                  style={{ backgroundColor: "#1e2939" }}
                  onClick={() => window.open("https://goalfbay.shop/checkout/07b38775329a", "_blank")}
                >
                  Commandez maintenant 85%
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-10 sm:mt-20 grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Lock,
              title: "Serrure TSA",
              desc: "Approuvée par les agents de sécurité."
            },
            {
              icon: Plane,
              title: "3 Tailles",
              desc: "20'', 24'' et 28'' inclus."
            },
            {
              icon: Truck,
              title: "Livraison",
              desc: "Gratuite jusqu'à minuit."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-2 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                <feature.icon className="w-4 h-4 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-lg leading-tight">{feature.title}</h3>
              <p className="text-gray-500 text-[10px] sm:text-sm leading-snug hidden sm:block">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trustpilot Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 sm:mt-24 max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <img src="/trustpilot-logo.webp" alt="Trustpilot" className="h-7 sm:h-8 w-auto" />
              <img src="/verified-company.webp" alt="Verified Company" className="h-6 sm:h-7 w-auto" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-900 text-center">
              Sur la base de <span className="text-[#00b67a]">1 732 avis</span>
            </p>

            {/* Rating bars */}
            <div className="w-full max-w-md space-y-2 mt-1">
              {[
                { label: "EXCELLENT", pct: 76, color: "#00b67a" },
                { label: "GREAT",     pct: 20, color: "#73cf11" },
                { label: "AVERAGE",   pct: 4,  color: "#dcdce6" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-3 text-xs sm:text-sm">
                  <span className="w-20 font-semibold text-gray-600 text-right flex-shrink-0">{bar.label}</span>
                  <div className="flex-1 h-3 sm:h-3.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: bar.color }}
                    />
                  </div>
                  <span className="w-8 font-bold text-gray-700 flex-shrink-0">{bar.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                name: "Lisa J.",
                avatar: "/reviewer-lisa.webp",
                stars: 5,
                text: "J'ai récemment acheté la valise Coolife Luggage Suitcase Hardside Spinner, et elle a été un ajout fantastique à mon équipement de voyage.",
                photo: "/review-luggage-white.png",
              },
              {
                name: "Anna S.",
                avatar: "/reviewer-anna.webp",
                stars: 5,
                text: "Je suis très impressionné par la valise Coolife Luggage Suitcase Hardside Spinner. La qualité de fabrication est exceptionnelle et il est clair que le design a fait l'objet de beaucoup de réflexion.",
                photo: "/review-luggage-silver.png",
              },
              {
                name: "Mia P.",
                avatar: "/reviewer-mia.jpeg",
                stars: 5,
                text: "La valise Coolife Luggage Suitcase Hardside Spinner est rapidement devenue ma valise de prédilection pour tous mes voyages. Son design est élégant et moderne, et sa coque rigide offre une excellente protection à mes effets personnels.",
                photo: "/review-luggage-open.png",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4"
              >
                {/* Reviewer header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-gray-100"
                    />
                    <div>
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-0.5">
                        {Array.from({ length: review.stars }).map((_, s) => (
                          <svg key={s} viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#00b67a]">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    </div>
                  </div>
                  {/* Posted on Trustpilot badge */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">Posted on</span>
                    <img src="/trustpilot-logo.webp" alt="Trustpilot" className="h-3.5 w-auto" />
                  </div>
                </div>

                {/* Review text */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-1">{review.text}</p>

                {/* Luggage photo */}
                <div className="rounded-xl overflow-hidden bg-gray-50 h-40 sm:h-44">
                  <img
                    src={review.photo}
                    alt="Valise Coolife"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guarantee / Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-20 mx-auto max-w-5xl"
        >
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#e8f5f0] flex flex-col sm:flex-row items-center gap-0">

            {/* Image — centered square on mobile, fixed width column on desktop */}
            <div className="w-full sm:w-2/5 flex-shrink-0 flex justify-center items-center bg-black/5 py-6 sm:py-0">
              <img
                src="/reviews-collage.webp"
                alt="Clients satisfaits et garantie remboursement"
                className="w-52 h-52 sm:w-full sm:h-full object-contain sm:object-cover"
              />
            </div>

            {/* Text + CTA — centered on mobile, left-aligned on desktop */}
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left px-6 py-6 sm:px-10 sm:py-10 gap-4 w-full">
              {/* Stars */}
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  évalué à <strong>4,8/5</strong> sur plus de <strong>1000 avis</strong>
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Des milliers de clients aiment les bagages Coolife
              </h2>

              {/* Body */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-sm sm:max-w-md">
                Et si vous ne l'aimez pas ? Vous serez remboursé. Mais c'est très peu probable.
                Les commentaires de nos clients sont éloquents.
              </p>

              {/* CTA */}
              <Button
                size="lg"
                className="mt-1 w-full sm:w-auto text-white font-bold h-14 px-8 text-sm sm:text-base rounded-xl shadow-lg group touch-manipulation"
                style={{ backgroundColor: "#1e2939" }}
                data-testid="button-guarantee-cta"
                onClick={() => window.open("https://goalfbay.shop/checkout/07b38775329a", "_blank")}
              >
                Commandez maintenant 85%
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 mt-12 sm:mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-4 sm:space-y-6">
          <img src="/aldi-logo.svg" alt="ALDI" className="h-10 sm:h-12 w-auto opacity-40" />
          <p className="text-xs sm:text-sm max-w-md px-4">
            Offre promotionnelle limitée. Les prix et la disponibilité sont sujets à changement sans préavis.
            Copyright © {new Date().getFullYear()} ALDI / Coolife.
          </p>
          <div className="flex gap-5 text-xs sm:text-sm">
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.12)] z-50 lg:hidden safe-bottom"
          >
            <div className="flex items-center gap-3 max-w-md mx-auto">
              <div className="flex flex-col flex-shrink-0">
                <span className="text-xs text-gray-400 line-through leading-none">€180</span>
                <span className="text-xl font-black text-destructive leading-tight">€9.99</span>
              </div>
              <Button
                className="flex-1 bg-destructive hover:bg-destructive/90 active:bg-destructive/80 text-white font-bold h-12 shadow-lg text-sm touch-manipulation"
                onClick={() => window.open("https://goalfbay.shop/checkout/07b38775329a", "_blank")}
                data-testid="button-sticky-cta"
              >
                Commander – 85% de réduction
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
