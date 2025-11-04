# Premiers pas avec @progestionsoft/axiom

Ce guide couvre tout ce que vous devez savoir pour développer, tester et publier la bibliothèque d'utilitaires Axiom.

## Présentation du projet

Il s'agit d'un monorepo composé de deux parties principales :

1. **@progestionsoft/axiom** - La bibliothèque d'utilitaires principale (répertoire racine)
2. **axiom-playground** - Un environnement de test interactif Nuxt (répertoire playground)

## Démarrage rapide

### 1. Configuration initiale

```bash
# Cloner le dépôt
git clone https://github.com/progestionsoft/axiom.git
cd axiom

# Installer toutes les dépendances (pour la bibliothèque et l'environnement de test)
npm install
```

### 2. Exécuter l'environnement de test

```bash
# Démarrer l'environnement de test interactif
npm run dev

# Ouvrez http://localhost:3000 dans votre navigateur
# Vous pouvez maintenant tester toutes les fonctions d'Axiom de manière interactive !
``` ```

### 3. Exécuter les tests

```bash
# Exécuter tous les tests une seule fois
npm test

# Exécuter les tests en mode surveillance (réexécution automatique en cas de modifications)
npm run test:watch

# Exécuter les tests avec rapport de couverture
npm run test:coverage
```

### 4. Compiler la bibliothèque

```bash
# Compiler les versions ESM et CommonJS
npm run build

# Vérifier les fichiers générés
ls -la dist/
```

## Structure du projet

```
axiom/
├── src/                          # Code source
│   ├── string/                   # Fonctions utilitaires pour les chaînes de caractères
│   ├── number/                   # Fonctions utilitaires pour les nombres
│   ├── date/                     # Fonctions utilitaires pour les dates
│   ├── object/                   # Fonctions utilitaires pour les objets
│   ├── array/                    # Fonctions utilitaires pour les tableaux
│   └── index.ts                  # Fichier d'exportation principal
│
├── tests/                        # Tests unitaires (Vitest)
│   ├── string.test.ts
│   ├── number.test.ts
│   ├── date.test.ts
│   ├── object.test.ts
│   └── array.test.ts
│
├── playground/                   # Environnement de test interactif (Nuxt)
│   ├── pages/                    # Pages de l'environnement de test
│   ├── assets/css/               # Configuration de Tailwind CSS
│   ├── app.vue                   # Layout principal
│   ├── nuxt.config.ts            # Configuration Nuxt
│   └── tailwind.config.ts        # Configuration Tailwind
│
├── dist/                         # Bibliothèque compilée (générée)
├── node_modules/                 # Dépendances
│
├── package.json                  # Configuration du package racine
├── tsconfig.json                 # Configuration TypeScript
├── tsup.config.ts                # Configuration de la compilation
│
├── README.md                     # Documentation principale
├── NPM_PUBLICATION_GUIDE.md      # Guide de publication sur npm
├── GETTING_STARTED.md            # Ce fichier
└── LICENSE                       # Licence MIT
```

## Flux de développement

### Ajouter une nouvelle fonction

1. **Créer la fonction** dans le module approprié (`src/string/`, `src/number/`, etc.)

```typescript
// src/string/index.ts
export function myFunction(input: string): string {
// Votre implémentation
return result;
}
``` }
```

2. **Exporter depuis l'index principal**

```typescript
// src/index.ts
export { myFunction } from './string/index.js';
```

3. **Écrire des tests**

```typescript
// tests/string.test.ts
describe('myFunction', () => {
it('should do something', () => {
expect(myFunction('input')).toBe('expected');
});
});
```

4. **Ajouter au playground** (facultatif)

Créez un composant de test dans le playground pour démontrer la fonction.

### Tests

```bash
# Exécuter un fichier de test spécifique
npm test -- tests/string.test.ts

# Exécuter les tests correspondant à un motif
npm test -- --grep "slugify"

# Générer un rapport de couverture HTML
npm run test:coverage
# Ouvrir coverage/index.html dans le navigateur
```

### Qualité du code

```bash
# Analyser le code avec ESLint
npm run lint

# Formater le code avec Prettier
npm run format

# Corriger les problèmes de linting
npm run lint -- --fix
```

## Playground

Le playground est une application Nuxt 3 pour les tests interactifs.

### Exécuter le Playground

```bash
npm run dev
```

Visitez `http://localhost:3000` pour voir :
- Page d'accueil avec des cartes de catégories
- Page des utilitaires de chaînes de caractères
- Page des utilitaires de nombres
- Page des utilitaires de dates
- Page des utilitaires d'objets
- Page des utilitaires de tableaux

Chaque page contient :
- Champs de saisie pour les tests
- Affichage des résultats en temps réel
- Exemples de valeurs
- Documentation claire

### Ajouter au Playground

1. Créez une nouvelle page dans `playground/pages/`
2. Importez les fonctions de @progestionsoft/axiom
3. Utilisez les références réactives de Vue 3 pour l'état
4. Affichez les résultats dans des composants stylisés

Exemple :

```vue
<template>
<div class="card">
<input v-model="input" class="input" />
<div class="result-box">Résultat : {{ output }}</div>
</div>
</template>

<script setup lang="ts">
import { myFunction } from '@progestionsoft/axiom';

const input = ref('');
const output = computed(() => myFunction(input.value));
``` </script>
```

## Publication sur npm

### 1. Préparation

```bash
# Assurez-vous que tout fonctionne correctement
npm test
npm run build
npm run lint
```
### 2. Mise à jour de la version

```bash
# Mettre à jour la version (choisissez-en une)
npm version patch    # 1.0.0 → 1.0.1 (corrections de bugs)
npm version minor    # 1.0.0 → 1.1.0 (nouvelles fonctionnalités)
npm version major    # 1.0.0 → 2.0.0 (changements incompatibles)
```

### 3. Configuration npm

```bash
# Créer un compte npm sur https://www.npmjs.com/signup
# Se connecter à l'interface CLI npm
npm login

# Vérifier la connexion
npm whoami
```

### 4. Publication

```bash
# Publier sur npm (paquet public)
npm publish --access public
```

**Pour plus de détails, consultez [NPM_PUBLICATION_GUIDE.md](NPM_PUBLICATION_GUIDE.md)**

## Utilisation dans un autre projet

Une fois publié sur npm, les développeurs peuvent l'installer et l'utiliser :

```bash
npm install @progestionsoft/axiom
```

```javascript
import { slugify, formatNumber } from '@progestionsoft/axiom';

console.log(slugify('Hello World')); // 'hello-world'
console.log(formatNumber(1234567.89));
``` // '1,234,567.89'
```

## Scripts disponibles

### Scripts de la bibliothèque

```bash
npm run dev              # Surveille les modifications et reconstruit automatiquement
npm run build            # Construit la bibliothèque
npm test                 # Exécute les tests
npm run test:watch       # Exécute les tests en mode surveillance
npm run test:coverage    # Génère un rapport de couverture de code
npm run lint             # Analyse le code avec ESLint
npm run format           # Formate le code avec Prettier
```

### Scripts du bac à sable

```bash
npm run dev              # Démarre le serveur de développement Nuxt
npm run build            # Construit pour la production
npm run preview          # Prévisualise la version de production
npm run generate         # Génère le site statique
```

## Dépannage

### Les tests échouent après des modifications

```bash
npm run test:watch  # Réexécute automatiquement les tests
```

### Erreurs de compilation

```bash
rm -rf dist
npm run build
```

### Le port 3000 est déjà utilisé

```bash
npm run dev -- -p 3001
```

### Erreurs d'importation dans le bac à sable

```bash
cd playground
npm install
```

### Dépendances désynchronisées

```bash
npm install
npm run build
```

## Normes de documentation

### Commentaires JSDoc

Toutes les fonctions doivent avoir des commentaires JSDoc :

```typescript
/**
* Convertit le texte en un slug compatible avec les URL
* @param text - Le texte à convertir en slug
* @returns La chaîne de caractères convertie en slug
* @example
* slugify('Hello World!') // retourne 'hello-world'
*/
export function slugify(text: string): string {
// implémentation
}
```

### Définitions de types

Utilisez toujours TypeScript avec les types appropriés :

```typescript
export function myFunction(input: string, options?: Options): Result {
// ...
}

interface Options {
// ...
}

interface Result {
// ...
}
```

### Tests

Écrivez des tests complets :

```typescript
describe('myFunction', () => {
it('should handle normal case', () => {
expect(myFunction('input')).toBe('expected'); 
}); 

it('should handle edge cases', () => {
expect(myFunction('')).toBe('');
}); 

it('should throw on invalid input', () => {
expect(() => myFunction(null)).toThrow();
});
});
``` ```

## Flux de travail Git

### Flux de travail recommandé

```bash
# Créer une branche de fonctionnalité
git checkout -b feature/my-feature

# Apporter des modifications
# ... modifier les fichiers ...

# Exécuter les tests et la compilation
npm test
npm run build

# Commiter les modifications
git add .
git commit -m "feat: ajouter une nouvelle fonctionnalité"

# Pousser la branche
git push origin feature/my-feature

# Créer une Pull Request sur GitHub
```

### Format des messages de commit

```
feat: ajouter une nouvelle fonctionnalité
fix: corriger un bug
docs: mettre à jour la documentation
style: formater le code
refactor: refactoriser le code
test: ajouter des tests
chore: mettre à jour les dépendances
```

## CI/CD avec GitHub Actions

Le projet inclut un flux de travail GitHub Actions pour :
- L'exécution des tests lors d'un push
- L'analyse statique du code
- La compilation du projet
- La publication sur npm lors de la création de tags Git

Voir `.github/workflows/ci.yml`

## Licence

Licence MIT - voir [LICENSE](LICENSE)

## Ressources

- [Documentation npm](https://docs.npmjs.com/)
- [Documentation Nuxt](https://nuxt.com/docs)
- [Guide Vue 3](https://vuejs.org/guide/introduction.html)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Manuel TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation Vitest](https://vitest.dev/)

## Obtenir de l'aide

- Ouvrir une issue : [GitHub Issues](https://github.com/progestionsoft/axiom/issues)
- Consulter les issues et discussions existantes
- Lire le [README.md](README.md) et la [documentation de l'API](README.md#api-reference)

---

**Bon codage ! 🚀**
