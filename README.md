# TimeTravel Agency

Webapp premium et interactive pour une agence de voyages temporels. L'expérience met en scène trois destinations emblématiques (Paris 1889, Crétacé -65M, Florence 1504) avec chatbot IA, quiz de personnalisation et parcours de réservation.

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- Framer Motion
- React Router

## Fonctionnalités
- Landing page immersive en dark mode + accents dorés
- Galerie des destinations avec cards interactives et lazy loading
- Pages dynamiques `/destinations/:id`
- Quiz de personnalisation avec recommandation
- Chatbot IA (mode démo + mode API réel)
- Réservation avec validation simple et récapitulatif
- Animations (scroll reveal, hover, transitions de pages)

## IA & providers
- Mode démo sans clé API (réponses mock)
- Mode API via OpenRouter
- Présentation IA : Bolt (idéation UI) + provider chatbot

## Installation
```bash
npm install
npm run dev
```

## Variables d’environnement
Créer un fichier `.env` (basé sur `.env.example`).

```
VITE_LLM_PROVIDER=demo
VITE_API_KEY=your_api_key_here
VITE_LLM_MODEL=openai/gpt-4o-mini
OPENROUTER_API_KEY=your_server_key_here
```

## Déploiement (Vercel)
- Configure `OPENROUTER_API_KEY` côté serveur (Environment Variables Vercel).
- Le frontend appelle `/api/chat`, qui relaie la requête vers OpenRouter.

## Structure
- `src/components` : Header, Footer, Hero, DestinationCard, ChatWidget, Quiz, BookingForm
- `src/pages` : Home, Destinations, DestinationDetail, Booking, QuizPage, About
- `src/data/destinations.ts` : contenus des destinations
- `src/services/chatService.ts` : connexion IA
- `src/hooks/useLocalStorage.ts` : persistance chat

## Crédits assets
- Images issues d'Unsplash (placeholders remplaçables)
- Polices Google Fonts : Cinzel, Manrope
- Illustrations et données fictives créées pour le projet

## Licence
Projet pédagogique.
