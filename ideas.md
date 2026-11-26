structure  du site  et aussi les logos  definition des chartes  graphiques -

## ou je vais recuperer les films de facon gratuit ?



https://heiwastream.fr/embed/movie/1726?lang=vf&autoplay=1 
https://cinesrc.st/embed/movie/1726
https://fluxora.sbs/embed/zenix?tmdb=1726&type=movie&lang=vf
https://vidsrc.to/embed/movie/
https://vidzy.org/serie/341195/1/1/vf


SERVEURS  EN STOCKS 

https://www.2embed.cc/embed/
https://player.autoembed.me
https://bingeapi.st/embed/



## 0. STRUCTURE DES PAGES
    NAVBAR  
        - Accueil
        -Films 
        - Series 
        - Favoris 
        - Genres   
            Action
            Adventure
            Comedy
            Drama
            Horror
            Science Fiction
            Thriller
            
        [
        { "id": 28, "name": "Action" },
        { "id": 12, "name": "Adventure" },
        { "id": 35, "name": "Comedy" },
        { "id": 18, "name": "Drama" },
        { "id": 27, "name": "Horror" },
        { "id": 53, "name": "Thriller" }
        ]



    LAYOUT 
        ACCUEIL 
            - barre de recherche 
            - hero  section qui laisse defiler  les meilleurs  films  du moment 
            - TOP RATED 
            - Trending  movies  
            - series  populaire 
            - nouveaus   film 
            - Nouveaux series 
            -  bouton   pour une choix aleatoire 
        FILMS 
            -  tout les films  se charge que lorsque ca  se montre a ll'image  
            - choix  de categories dans la  page films  
        SERIES 
            -  tout les series    se charge que lorsque ca  se montre a ll'image  
            - choix  de categories dans la  page films 
        FAVORIS 
            - rien  affichie   une texte  qui  signale que cest vide 
                ou bien
            - les differents  cards  des favoris 
        
    FOOTER 
        - suggerer  un contenu  
        - signaler un probleme 
        - nous contacter -
        - conditions  d'utilisations 
        - mention legale 
        - politique de confidentialie 

## 1. Fonctionnalités a inclure

- Tu pourrai aussi  aimer 
- monter  les details du film 
    - detail films (nom -image  - -nombre de seasons si disponible -categorie-description-date de sortie -bande annone -language - ratings -)
    -  au  clic  d'un  film montrer 
        page detail   
            bouton favoris 
            nombre  de saison  aussi 
            image  en gros  format  qui prend  tout la largeur  
    - bouton regarder 
        -  montre une  page  avec seulement  la  video  et aussi  les  differents  serveurs  
        - les  differnets  sous  titres 


## 2.Architecture et choix techniques

**Stack technique**
    Langages de programmation: Typescript 
    Frontend : Next.js
    Hébergement et déploiement. :Vercel 


**Organisation du code** 

movieMax/
│
├── app/                       
│   ├── movies/             
│   │    └── page.tsx
│   │    └── [id]
|   │        └── page.tsx
│   ├── series/             
│   │    └── page.tsx
│   │    └── [id]
|   │        └── page.tsx
│   ├── favorites/             
│   │    └── page.tsx
│   ├─ privacy-policy
│   │    └── page.tsx
│   ├─ legal-notice
│   │    └── page.tsx
│   ├─ terms-of-sue
│   │    └── page.tsx
│   ├─ contact-us
│   │    └── page.tsx
   ├─ search
│   │    └── page.tsx
│   ├── api/                    # BACKEND : API REST  qui  appelle des  services  externes
│   │   │
│   │   └── feedback/
│   │       ├── route.ts
│   │   └── contact/
│   │       ├── route.ts
│   │
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css             # CSS global
│   ├── loading.tsx             # Chargement
│   ├── error.tsx               # Gestion des erreurs
│   └── not-found.tsx           # Page 404
│
├── components/   
│   ├─ Hero.tsx
│   ├─ MediaCard.tsx(image- name -favorite button -  date de sortie  -rating -browse  )
│   ├─ FeedbackModal.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── SearchBar.tsx
│       └── CategoriesSearch.tsx
│
├── lib/                     
│   ├── utils.ts   (randomFilm )            

├── services/                   
│   └── movie.service.ts 
│
├── hooks/                     
│   └── useFetch.ts
│   └── useLocalStorage.ts
│   └── useDebounce.ts
│   └── useIntersectionObserver.ts
├── context/ 
    └──FavoritesContext .tsx               

├── types/                      
│   └── type.ts
│
├── public/                    
       └── logo.png 


## 3. A  PREVOIR  A  LA FIN 

- le caching   de certains elements   cote client pour  ne pas  faire  trop d'appel  inutiles  a l'API 
-  gerer les publicites    pour ne pas  que ca  derange 
-   verifier  l'experience  utilisateur avec   quelques amis pour voir 

## 4. Interface utilisateur et identité visuelle

    Couleurs principales  :noir doux  -rouge douce-  blanc 

    couleurs  secondaires :  
        -doreee  pour les  ratings 
        -  rouge  pour les boutons  pour play 
        - noir bleute pour les cartes 
        -texte secondaire  blanc grise 
    Logo :  MOVIEMAX  en  texte et aussi une icone   avec  du  texte 

## 5. Planning prévisionnel

| 1. conception technique et fonctionnalites   Développement | Réalisation des fonctionnalités | [jeu] | 
| 2.|  Développement | Réalisation des fonctionnalités | [ven] | 
| 3. Tests | Vérification et correction | Déploiement | Mise en production | [sam] | 




##  6.SECURITE  
proteger  mon site contre les publicites  aussi    en  bloquant le maximum  possible 





