# 🕋 Guide Omrah - Application Mobile Progressive

Une application web progressive (PWA) complète pour guider les pèlerins à travers toutes les étapes de la Omrah, avec support hors ligne et interface mobile optimisée.

## ✨ Fonctionnalités

- **📱 Interface Mobile Optimisée** - Design responsive et fluide, optimisé pour les écrans mobiles
- **🔌 Mode Hors Ligne** - Fonctionne entièrement sans connexion internet grâce au Service Worker
- **📥 Installation sur Écran d'Accueil** - Peut être installé comme une application native
- **🔄 Compteurs Intégrés** - Compteurs pour le Tawaf (7 tours) et le Sa'i (7 trajets)
- **📖 Guide Complet** - 28 étapes détaillées de A à F
- **🤲 Invocations Complètes** - Arabe, translittération, traduction française et significations
- **💾 Sauvegarde Automatique** - La progression est sauvegardée automatiquement
- **🎨 Interface Intuitive** - Navigation simple et claire, une étape à la fois

## 📋 Structure des Sections

### A - À la maison (5 étapes)

Préparation avant le départ : Ghusl, épilation, parfum, vêtements d'Ihram

### B - Dans l'avion (4 étapes)

Entrée en état d'Ihram, Talbiyah, interdictions

### C - Entrer dans Masjid Al-Haram (3 étapes)

Portes d'entrée, invocations, direction vers la Kaaba

### D - Al-Tawaf (10 étapes)

7 tours autour de la Kaaba, prière à Maqam Ibrahim, eau Zamzam

### E - Al-Sa'i (4 étapes)

7 trajets entre Safa et Marwa, invocations

### F - Al-Halq (1 étape)

Se raser ou couper les cheveux

## 🚀 Installation et Utilisation

### Option 1 : Utilisation Locale Simple

1. **Télécharger les fichiers**

   ```bash
   cd /chemin/vers/omguide
   ```

2. **Ouvrir avec un serveur local**

   Avec Python 3 :

   ```bash
   python3 -m http.server 8000
   ```

   Avec Node.js (npx) :

   ```bash
   npx serve
   ```

   Avec PHP :

   ```bash
   php -S localhost:8000
   ```

3. **Ouvrir dans le navigateur**

   ```
   http://localhost:8000
   ```

4. **Sur mobile** : Scannez le QR code généré ou utilisez l'adresse IP locale de votre ordinateur

### Option 2 : Déploiement en Ligne (Recommandé)

#### GitHub Pages (Gratuit)

1. Créer un repository GitHub
2. Pusher les fichiers
3. Activer GitHub Pages dans Settings > Pages
4. L'app sera disponible sur `https://username.github.io/omguide`

#### Netlify (Gratuit)

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier `omguide`
3. L'app sera déployée instantanément avec HTTPS

#### Vercel (Gratuit)

1. Installer Vercel CLI : `npm i -g vercel`
2. Dans le dossier : `vercel`
3. Suivre les instructions

### Option 3 : Installation comme Application Mobile

Une fois l'app ouverte dans le navigateur mobile :

**Sur Android (Chrome/Edge) :**

1. Ouvrir l'app dans Chrome
2. Cliquer sur les 3 points en haut à droite
3. Sélectionner "Ajouter à l'écran d'accueil"
4. L'icône apparaîtra sur votre écran d'accueil

**Sur iOS (Safari) :**

1. Ouvrir l'app dans Safari
2. Cliquer sur le bouton "Partager" (carré avec flèche)
3. Sélectionner "Sur l'écran d'accueil"
4. L'icône apparaîtra sur votre écran d'accueil

## 📁 Fichiers du Projet

```
omguide/
├── index.html              # Structure HTML principale
├── styles.css              # Styles CSS avec animations
├── app.js                  # Logique de l'application et données
├── sw-register.js          # Enregistrement du Service Worker
├── service-worker.js       # Cache et mode hors ligne
├── manifest.json           # Configuration PWA
├── icon-192.png            # Icône 192x192
├── icon-512.png            # Icône 512x512
├── prompt.md               # Spécifications originales
└── README.md               # Ce fichier
```

## 🎯 Utilisation de l'Application

1. **Navigation** : Utilisez les boutons "Précédent" et "Suivant" pour naviguer entre les étapes

2. **Compteurs** :
   - Pour le Tawaf (Étape D.3) : Appuyez sur + après chaque tour (7 tours requis)
   - Pour le Sa'i (Étape E.3) : Appuyez sur + après chaque trajet (7 trajets requis)

3. **Progression** : Votre progression est sauvegardée automatiquement. Vous pouvez fermer et rouvrir l'app sans perdre votre place.

4. **Réinitialisation** : Utilisez le bouton "🔄 Réinitialiser la progression" en bas pour recommencer

5. **Mode Hors Ligne** : Une fois l'app chargée une première fois, elle fonctionne entièrement hors ligne

## 🎨 Personnalisation

### Modifier les Couleurs

Dans [styles.css](styles.css), modifiez les variables CSS :

```css
:root {
  --primary: #2c5f2d; /* Couleur principale (vert) */
  --secondary: #d4af37; /* Couleur secondaire (or) */
  --danger: #dc3545; /* Couleur d'alerte (rouge) */
}
```

### Ajouter/Modifier des Étapes

Dans [app.js](app.js), modifiez le tableau `omrahSteps` :

```javascript
const omrahSteps = [
  {
    section: "A",
    sectionTitle: "À la maison",
    sectionSubtitle: "Préparation",
    sectionIcon: "🏠",
    step: 1,
    title: "Titre de l'étape",
    description: "Description...",
    duaa: {
      arabic: "...",
      transliteration: "...",
      translation: "...",
      meaning: "...",
    },
  },
  // ...
];
```

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations et design responsive
- **JavaScript (Vanilla)** - Logique sans framework
- **Service Worker API** - Mode hors ligne
- **Local Storage API** - Sauvegarde de progression
- **PWA** - Installation et fonctionnalités natives

## 📱 Compatibilité

- ✅ Chrome/Edge (Android & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (Android & Desktop)
- ✅ Samsung Internet
- ✅ Tous les navigateurs modernes

## 🤲 Invocations Incluses

Toutes les invocations sont fournies en :

- **Arabe** (texte original)
- **Translittération** (phonétique)
- **Traduction française**
- **Signification/Contexte**

## 💡 Conseils pour Votre Ami

1. **Avant le Départ** :
   - Installer l'app sur son téléphone
   - L'ouvrir une fois en ligne pour activer le mode hors ligne
   - Tester la navigation

2. **Pendant la Omrah** :
   - Mode Avion activé (l'app fonctionne quand même)
   - Suivre les étapes une par une
   - Ne pas se presser

3. **Batterie** :
   - Charger le téléphone régulièrement
   - Activer le mode économie d'énergie si nécessaire

## 📞 Support

Pour toute question ou amélioration, vous pouvez :

- Modifier le code source directement
- Ajouter des étapes supplémentaires
- Traduire dans d'autres langues

## 📄 Licence

Ce projet est libre d'utilisation pour des fins personnelles et religieuses.

---

**🤲 Qu'Allah accepte la Omrah de votre ami et lui facilite tous les rites.**

**اللَّهُمَّ تَقَبَّلْ مِنَّا**

---

Développé avec ❤️ pour faciliter l'accomplissement de la Omrah
