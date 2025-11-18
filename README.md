# @progestionsoft/axiom

Bibliothèque d'utilitaires moderne pour les développeurs JavaScript/TypeScript. Une collection de fonctions fiables et bien testées pour les tâches de programmation courantes.

[![npm version](https://img.shields.io/npm/v/@progestionsoft/axiom.svg)](https://www.npmjs.com/package/@progestionsoft/axiom)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Fonctionnalités

- 🚀 Syntaxe moderne ES2020+
- 📦 Builds ESM et CommonJS optimisés par tree-shaking
- 💪 Prise en charge complète de TypeScript avec définitions de types complètes
- ✅ Tests unitaires complets
- 🔒 Aucune dépendance
- 📖 Bien documenté avec des commentaires JSDoc

**21 fonctions utilitaires** organisées en 6 modules :

#### Utilitaires de chaînes de caractères (4 fonctions)
- `slugify()` - Convertit le texte en slugs compatibles avec les URL
- `capitalize()` - Met la première lettre en majuscule
- `truncate()` - Tronque le texte avec des points de suspension
- `randomString()` - Génère des chaînes de caractères aléatoires

#### Utilitaires de nombres (4 fonctions)
- `formatNumber()` - Formate les nombres avec des séparateurs de milliers
- `clamp()` - Limite une valeur entre un minimum et un maximum
- `roundTo()` - Arrondit à un nombre de décimales spécifié
- `percent()` - Calcule les pourcentages

#### Utilitaires de dates (3 fonctions)
- `formatDate()` - Formate les dates selon la locale
- `timeAgo()` - Affiche le temps écoulé de manière lisible
- `isValidDate()` - Valide les dates

#### Utilitaires d'objets (4 fonctions)
- `deepClone()` - Crée une copie complète et indépendante d'un objet, y compris tous les niveaux imbriqués
- `merge()` - Combine plusieurs objets en un seul en fusionnant récursivement leurs propriétés
- `omit()` - Crée un nouvel objet en excluant certaines propriétés spécifiques
- `pick()` - Crée un nouvel objet en ne gardant que les propriétés sélectionnées

#### Utilitaires de tableaux (5 fonctions)
- `unique()` - Supprime les doublons
- `chunk()` - Divise un tableau en plusieurs morceaux
- `flatten()` - Aplatit les tableaux imbriqués
- `groupBy()` - Regroupe les éléments par clé/fonction
- `paginate()` - Pagine un tableau avec plusieurs stratégies (offset, page, cursor)

#### Utilitaires de formatage (1 fonction)
- `formatTimestamp()` - Formate un timestamp UNIX en différents formats de date lisibles

## Installation

```bash
npm install @progestionsoft/axiom
```

```bash
yarn add @progestionsoft/axiom
```

```bash
pnpm add @progestionsoft/axiom
```

## Utilisation

### Importations nommées (recommandé)

```typescript
import { formatNumber, slugify } from '@progestionsoft/axiom';

console.log(formatNumber(1234567.89)); // "1,234,567.89"
console.log(slugify('Hello World!')); // "hello-world"
```

### Importation par défaut

```typescript
import axiom from '@progestionsoft/axiom';

console.log(axiom.formatNumber(1234567.89)); // "1,234,567.89"
console.log(axiom.slugify('Hello World!')); // "hello-world"
```

## Référence API

### Utilitaires de chaînes de caractères

#### `slugify(text: string): string`

Convertit une chaîne de caractères en un slug compatible avec les URL.

```typescript
slugify('Hello World!'); // "hello-world"
slugify('Café Français'); // "cafe-francais"
```

#### `capitalize(text: string): string`

Met la première lettre d'une chaîne de caractères en majuscule.

```typescript
capitalize('hello world'); // "Hello world"
capitalize('HELLO'); // "Bonjour"
```

#### `truncate(text: string, maxLength?: number, suffix?: string): string`

Tronque une chaîne de caractères à une longueur spécifiée et ajoute des points de suspension.

```typescript
truncate('Lorem ipsum dolor sit amet', 10); // "Lorem ipsu..."
truncate('Hello World', 8, '…'); // "Hello W…"
```

#### `randomString(length?: number, charset?: string): string`

Génère une chaîne de caractères aléatoire de longueur spécifiée.

```typescript
randomString(8); // "aB3dE7fG"
randomString(6, 'ABC123'); // "A1B2C3"
```

---

### Utilitaires numériques

#### `formatNumber(value: number, decimals?: number, locale?: string): string`

Formate un nombre avec des séparateurs de milliers et des décimales.

```typescript
formatNumber(1234567.89); // "1,234,567.89"
formatNumber(1234.5, 0); // "1,235"
formatNumber(1234.56, 2, 'de-DE'); // "1.234,56"
```

#### `clamp(value: number, min: number, max: number): number`

Limite un nombre entre une valeur minimale et maximale.

```typescript
clamp(10, 0, 5); // 5
clamp(-5, 0, 10); // 0
clamp(7, 0, 10); // 7
```

#### `roundTo(value: number, decimals?: number): number`

Arrondit un nombre à un nombre spécifié de décimales.

```typescript
roundTo(3.14159, 2); // 3.14
roundTo(2.5); // 3
```

#### `percent(value: number, total: number, decimals?: number): number`

Calcule le pourcentage d'une valeur par rapport à un total.

```typescript
percent(25, 100); // 25
percent(1, 3, 2); // 33.33
```

### Utilitaires de date

#### `formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions, locale?: string): string`

Formate une date selon une locale.

```typescript
formatDate(new Date('2024-01-15')); // "15/01/2024"
formatDate(new Date(), { dateStyle: 'full' }); // "lundi 15 janvier 2024"
formatDate(Date.now(), { year: 'numeric', month: 'long' }); // "janvier 2024"
```

#### `timeAgo(date: Date | string | number): string`

Renvoie la différence de temps par rapport à maintenant, dans un format lisible.

```typescript
timeAgo(new Date(Date.now() - 60000)); // "il y a 1 minute"
timeAgo(new Date(Date.now() + 3600000)); // "dans 1 heure"
```

#### `isValidDate(date: Date | string | number): boolean`

Vérifie si une date est valide.

```typescript
isValidDate(new Date()); // true
isValidDate('2024-01-15'); // true
isValidDate('invalid'); // false
```

### Utilitaires d'objets

Les fonctions d'objets permettent de manipuler les structures de données complexes de manière sûre et efficace.

#### `deepClone<T>(obj: T): T`

Crée une copie complète et indépendante d'un objet, incluant tous les niveaux imbriqués. Contrairement à une copie superficielle, les modifications sur le clone n'affectent pas l'original.

#### Cas d'usage :

- Créer une copie de données pour les modifier sans affecter l'original
- Éviter les effets de bord lors de la manipulation d'objets
- Sauvegarder un état avant modification

```typescript
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3; // original.b.c reste 2
```

#### `merge<T>(target: T, ...sources: Partial<T>[]): T`

Combine plusieurs objets en un seul en fusionnant récursivement leurs propriétés. Les propriétés des objets sources écrasent celles de la cible, mais les objets imbriqués sont fusionnés plutôt que remplacés.

#### Cas d'usage :

- Fusionner des configurations par défaut avec des paramètres utilisateur
- Combiner plusieurs options partielles en un objet complet
- Créer des objets composites à partir de plusieurs sources

```typescript
merge({ a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
merge({ a: { x: 1 } }, { a: { y: 2 } }); // { a: { x: 1, y: 2 } }
```

#### `omit<T, K>(obj: T, keys: K[]): Omit<T, K>`

Crée un nouvel objet en excluant certaines propriétés spécifiques. Utile pour filtrer les données sensibles ou indésirables.

#### Cas d'usage :

- Supprimer des propriétés sensibles avant d'envoyer des données (ex: mots de passe)
- Nettoyer des objets en retirant des champs temporaires ou inutiles
- Préparer des données pour des API qui n'acceptent que certains champs

```typescript
omit({ a: 1, b: 2, c: 3 }, ['b', 'c']); // { a: 1 }
```

#### `pick<T, K>(obj: T, keys: K[]): Pick<T, K>`

Crée un nouvel objet en ne gardant que les propriétés sélectionnées. C'est l'inverse de omit.

#### Cas d'usage :

- Extraire seulement les données nécessaires d'un objet volumineux
- Créer des vues partielles d'objets complexes
- Sélectionner des champs spécifiques pour une API ou un formulaire

```typescript
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```

### Utilitaires pour les tableaux

#### `unique<T>(arr: T[]): T[]`

Retourne un tableau avec des valeurs uniques.

```typescript
unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
unique(['a', 'b', 'a']); // ['a', 'b']
```

#### `chunk<T>(arr: T[], size: number): T[][]`

Divise un tableau en morceaux de taille spécifiée.

```typescript
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

#### `flatten<T>(arr: unknown[], depth?: number): T[]`

Aplatit un tableau imbriqué jusqu'à une profondeur spécifiée.

```typescript
flatten([1, [2, [3, [4]]]]); // [1, 2, [3, [4]]]
flatten([1, [2, [3, [4]]]], 2); // [1, 2, 3, [4]]
flatten([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
```

#### `groupBy<T>(arr: T[], key: keyof T | ((item: T) => string | number)): Record<string, T[]>`

Regroupe les éléments d'un tableau par une clé ou une fonction.

```typescript
groupBy([{ age: 21 }, { age: 22 }, { age: 21 }], 'age');
// { '21': [{ age: 21 }, { age: 21 }], '22': [{ age: 22 }] }

groupBy([1.3, 2.1, 2.4], Math.floor);
// { '1': [1.3], '2': [2.1, 2.4] }
```

#### `paginate<T>(arr: T[], options: PaginationOptions<T>): PaginationResult<T>`

Pagine un tableau avec plusieurs stratégies : offset, page ou cursor. Retourne les données paginées avec les métadonnées associées.

#### Stratégies de pagination :

1. **Offset-based** : Utilise un décalage (offset) et une limite pour paginer
2. **Page-based** : Utilise un numéro de page et une taille de page
3. **Cursor-based** : Utilise un curseur pour naviguer dans les données (idéal pour les flux continus)

```typescript
// Pagination par offset
paginate([1, 2, 3, 4, 5], { type: 'offset', offset: 2, limit: 2 })
// returns { type: 'offset', data: [3, 4], total: 5, hasMore: true, offset: 2, limit: 2 }

// Pagination par page
paginate([1, 2, 3, 4, 5], { type: 'page', page: 2, pageSize: 2 })
// returns { type: 'page', data: [3, 4], total: 5, hasMore: true, page: 2, pageSize: 2, totalPages: 3 }

// Pagination par curseur
const items = [{ id: '1' }, { id: '2' }, { id: '3' }];
paginate(items, { type: 'cursor', cursor: '1', limit: 2, getCursorValue: item => item.id })
// returns { type: 'cursor', data: [{ id: '2' }, { id: '3' }], total: 3, hasMore: false, nextCursor: null, prevCursor: '1' }
```

### Utilitaires de formatage

#### `formatTimestamp(timestamp: number, format?: DateFormatType, locale?: string): string | number`

Formate un timestamp UNIX (en millisecondes) en différents formats de date lisibles.

#### Formats disponibles :

- `'timestamp'` - Retourne le timestamp d'origine (par défaut)
- `'full'` - Format complet : "vendredi 14 novembre 2025"
- `'compact'` - Format compact : "vend. 14 novembre 2025"
- `'long'` - Format long : "14 novembre 2025"
- `'medium'` - Format moyen : "14 nov. 2025"
- `'short'` - Format court : "14/11/2025"
- `'datetime'` - Date et heure : "14 nov. 2025 10:04:02"
- `'time'` - Heure uniquement : "22:14:03"
- `'iso'` - Format ISO 8601 : "2025-11-14T22:14:03.001Z"
- `'relative'` - Format relatif : "il y a 2 jours"

```typescript
formatTimestamp(1756868642754, 'full'); // "vendredi 14 novembre 2025"
formatTimestamp(Date.now(), 'relative'); // "il y a 2 jours"
formatTimestamp(1756868642754, 'iso'); // "2025-11-14T22:14:03.001Z"
formatTimestamp(1756868642754, 'short'); // "14/11/2025"
formatTimestamp(1756868642754, 'time'); // "22:14:03"
formatTimestamp(1756868642754, 'datetime', 'en-US'); // "Nov 14, 2025 10:04:02 PM"
```

## Espace de test

Testez toutes les fonctions de manière interactive avec notre **Axiom Playground** conçu avec Nuxt et Tailwind CSS !

L'espace de test comprend des pages interactives pour tester chaque catégorie d'utilitaires avec des résultats en temps réel.

Consultez [playground/README.md](playground/README.md) pour plus de détails.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request.

1. Forkez le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commitez vos modifications (`git commit -m 'Ajout d'une fonctionnalité incroyable'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Auteur

[ProGestionSoft](https://github.com/ProGestionSoft)

## Support

Si vous avez des questions ou rencontrez des problèmes, veuillez ouvrir une issue sur [GitHub](https://github.com/ProGestionSoft/Axiom/issues).