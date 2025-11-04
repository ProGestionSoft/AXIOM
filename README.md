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


**20 fonctions utilitaires** organisées en 5 modules :

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
- `deepClone()` - Clone les objets en profondeur
- `merge()` - Fusionne les objets de manière récursive
- `omit()` - Supprime des clés spécifiques
- `pick()` - Sélectionne des clés spécifiques

#### Utilitaires de tableaux (4 fonctions)
- `unique()` - Supprime les doublons
- `chunk()` - Divise un tableau en plusieurs morceaux
- `flatten()` - Aplatit les tableaux imbriqués
- `groupBy()` - Regroupe les éléments par clé/fonction

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

---

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

---

### Utilitaires d'objets

#### `deepClone<T>(obj: T): T`

Crée un clone profond d'un objet.

```typescript
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3; // original.b.c reste 2
```

#### `merge<T>(target: T, ...sources: Partial<T>[]): T`

Fusionne profondément deux objets ou plus.

```typescript
merge({ a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
merge({ a: { x: 1 } }, { a: { y: 2 } }); // { a: { x: 1, y: 2 } }
```

#### `omit<T, K>(obj: T, keys: K[]): Omit<T, K>`

Crée un nouvel objet en omettant les clés spécifiées.

```typescript
omit({ a: 1, b: 2, c: 3 }, ['b', 'c']); // { a: 1 }
```

#### `pick<T, K>(obj: T, keys: K[]): Pick<T, K>`

Crée un nouvel objet contenant uniquement les clés spécifiées.

```typescript
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```

---

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