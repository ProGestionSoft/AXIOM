// playground/utils/chatSuggestions.ts
export interface ChatSuggestion {
  text: string;
  category: 'installation' | 'usage' | 'examples' | 'technical' | 'support';
}

export const chatSuggestions: ChatSuggestion[] = [
  // Installation et configuration
  { text: 'Comment installer AXIOM avec npm ?', category: 'installation' },
  { text: 'AXIOM fonctionne-t-il avec TypeScript ?', category: 'installation' },
  { text: 'Comment importer AXIOM dans mon projet React ?', category: 'installation' },
  { text: 'Quelle est la différence entre ESM et CommonJS ?', category: 'installation' },
  { text: 'AXIOM a-t-il des dépendances externes ?', category: 'installation' },

  // Usage général
  { text: 'Quelles sont toutes les fonctions disponibles ?', category: 'usage' },
  { text: 'Comment utiliser slugify() pour les URLs ?', category: 'usage' },
  { text: 'Quelle fonction pour formater des nombres ?', category: 'usage' },
  { text: 'Comment cloner un objet en profondeur ?', category: 'usage' },
  { text: 'Comment grouper des données avec groupBy() ?', category: 'usage' },

  // Exemples concrets
  { text: 'Montre un exemple avec formatDate()', category: 'examples' },
  { text: 'Comment utiliser merge() pour fusionner des objets ?', category: 'examples' },
  { text: 'Donne un exemple de truncate() pour les textes longs', category: 'examples' },
  { text: 'Comment utiliser chunk() pour paginer un tableau ?', category: 'examples' },
  { text: 'Exemple avec timeAgo() pour les dates relatives', category: 'examples' },

  // Questions techniques
  { text: 'AXIOM supporte-t-il le tree-shaking ?', category: 'technical' },
  { text: 'Comment tester mes fonctions qui utilisent AXIOM ?', category: 'technical' },
  { text: 'Quelles sont les performances des fonctions ?', category: 'technical' },
  { text: 'AXIOM fonctionne-t-il avec Deno ou Bun ?', category: 'technical' },
  { text: 'Comment contribuer au projet AXIOM ?', category: 'technical' },

  // Support et dépannage
  { text: 'J\'ai une erreur d\'import avec AXIOM', category: 'support' },
  { text: 'Comment signaler un bug ou proposer une amélioration ?', category: 'support' },
  { text: 'Où trouver la documentation complète ?', category: 'support' },
  { text: 'AXIOM est-il compatible avec Node.js ?', category: 'support' },
  { text: 'Comment contacter l\'équipe de support ?', category: 'support' },

  // Cas d'usage avancés
  { text: 'Comment utiliser AXIOM dans une application Vue.js ?', category: 'usage' },
  { text: 'Exemple avec pick() et omit() pour les objets', category: 'examples' },
  { text: 'Comment utiliser randomString() pour générer des IDs ?', category: 'usage' },
  { text: 'Quelle fonction pour supprimer les doublons d\'un tableau ?', category: 'usage' },
  { text: 'Comment arrondir des nombres avec roundTo() ?', category: 'examples' },

  // Fonctions spécifiques
  { text: 'Comment utiliser capitalize() pour les noms propres ?', category: 'usage' },
  { text: 'Exemple avec flatten() pour les tableaux imbriqués', category: 'examples' },
  { text: 'Comment utiliser clamp() pour limiter des valeurs ?', category: 'usage' },
  { text: 'Quelle fonction pour calculer des pourcentages ?', category: 'usage' },
  { text: 'Comment valider une date avec isValidDate() ?', category: 'usage' }
];

/**
 * Retourne un nombre aléatoire de suggestions (par défaut 3)
 */
export function getRandomSuggestions(count: number = 3): string[] {
  const shuffled = [...chatSuggestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(s => s.text);
}

/**
 * Retourne des suggestions par catégorie
 */
export function getSuggestionsByCategory(category: ChatSuggestion['category'], count: number = 3): string[] {
  const filtered = chatSuggestions.filter(s => s.category === category);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(s => s.text);
}
