export type Destination = {
  id: string;
  name: string;
  era: string;
  heroImage: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  activities: string[];
  safetyTips: string[];
  practicalInfo: {
    duration: string;
    riskLevel: string;
    conditions: string;
  };
  pricing: {
    classic: string;
    prestige: string;
    elite: string;
  };
};

export const destinations: Destination[] = [
  {
    id: "paris-1889",
    name: "Paris 1889",
    era: "Belle Epoque, Exposition Universelle",
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    // Replace with your own hosted URL if needed.
    shortDescription:
      "Une capitale vibrante, éclairée par la Tour Eiffel naissante et les salons d'avant-garde.",
    longDescription:
      "Plongez dans le Paris de 1889, entre innovations, arts et nuits festives. Nos guides privés vous ouvrent les portes des cercles intellectuels et des expositions exclusives.",
    tags: ["Belle Epoque", "Architecture", "Gastronomie"],
    activities: [
      "Visite nocturne privée de la Tour Eiffel et du Champ-de-Mars",
      "Dîner orchestré par un chef de la haute cuisine parisienne",
      "Salon d'art avec rencontres d'artistes impressionnistes",
    ],
    safetyTips: [
      "Respecter les codes vestimentaires de l'époque pour éviter toute dissonance temporelle.",
      "Limiter les échanges sur la technologie moderne.",
      "Rester dans le périmètre sécurisé défini par votre guide.",
    ],
    practicalInfo: {
      duration: "3 à 5 jours",
      riskLevel: "Faible",
      conditions: "Printemps doux, soirées fraîches et animées.",
    },
    pricing: {
      classic: "9 800 € / voyageur",
      prestige: "14 500 € / voyageur",
      elite: "21 000 € / voyageur",
    },
  },
  {
    id: "cretaceous-65m",
    name: "Crétacé -65M",
    era: "Fin du Crétacé, faune préhistorique",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    // Replace with your own hosted URL if needed.
    shortDescription:
      "Un sanctuaire sauvage, dominé par les géants de la Terre et des paysages intacts.",
    longDescription:
      "Explorez une planète luxuriante où la nature règne en maître. Accompagnés d'experts paléontologues, vous observez les dinosaures dans leur habitat naturel, en toute sécurité.",
    tags: ["Dinosaures", "Nature", "Aventure"],
    activities: [
      "Safari chrono-guidé sur les plaines jurassiques",
      "Observation aérienne en dôme antigravité",
      "Campement premium avec dômes transparents",
    ],
    safetyTips: [
      "Ne jamais quitter la zone protégée sans escorte.",
      "Utiliser les communications silencieuses fournies.",
      "Respecter les protocoles de camouflage olfactif.",
    ],
    practicalInfo: {
      duration: "2 à 4 jours",
      riskLevel: "Élevé",
      conditions: "Chaleur tropicale, forte humidité.",
    },
    pricing: {
      classic: "12 500 € / voyageur",
      prestige: "18 900 € / voyageur",
      elite: "28 500 € / voyageur",
    },
  },
  {
    id: "florence-1504",
    name: "Florence 1504",
    era: "Renaissance italienne",
    heroImage:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
    // Replace with your own hosted URL if needed.
    shortDescription:
      "Ateliers, palais et chefs-d'oeuvre. Vivez l'âge d'or artistique italien.",
    longDescription:
      "Rencontrez les maîtres de la Renaissance dans une Florence effervescente. Ateliers privés, visites de palais et concerts exclusifs composent un séjour raffiné.",
    tags: ["Renaissance", "Art", "Élégance"],
    activities: [
      "Atelier privé avec un maître sculpteur",
      "Bal au Palazzo Vecchio en tenue d'époque",
      "Visite nocturne des ateliers de Michel-Ange",
    ],
    safetyTips: [
      "Suivre les consignes de discrétion culturelle.",
      "Éviter toute mention d'événements futurs.",
      "Préférer les paiements en florins fournis par l'agence.",
    ],
    practicalInfo: {
      duration: "4 à 6 jours",
      riskLevel: "Modéré",
      conditions: "Printemps lumineux, air doux.",
    },
    pricing: {
      classic: "10 900 € / voyageur",
      prestige: "16 200 € / voyageur",
      elite: "24 800 € / voyageur",
    },
  },
];
