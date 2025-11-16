export interface ChatSuggestion {
  text: string;
  category: 'general' | 'candidate' | 'developper' | 'support' | 'technical';
}

export const chatSuggestions: ChatSuggestion[] = [
  // Suggestions générales
  { text: 'Qu’est-ce que Axiom ?', category: 'general' },
  { text: 'Quels sont les objectifs de la bibliothèque Axiom ?', category: 'general' },
  { text: 'Axiom fait-il partie de l’écosystème Pro Gestion Soft ?', category: 'general' },


  // Recruteurs
  { text: 'Comment installer Axiom dans mon projet ?', category: 'developper' },
  { text: 'Quels types d’utilitaires Axiom propose-t-il ?', category: 'developper' },
  { text: 'Comment utiliser les fonctions de manipulation de chaînes ?', category: 'developper' },
  { text: 'Comment fonctionne le module des tableaux ?', category: 'developper' },
  { text: 'Comment intégrer Axiom dans un projet Nuxt ou Node ?', category: 'developper' },
  { text: 'Axiom est-il compatible avec TypeScript ?', category: 'developper' },
  { text: 'Puis-je utiliser Axiom côté backend Sails.js ?', category: 'developper' },

  // Suggestions de support
  { text: 'Je rencontre une erreur en utilisant Axiom', category: 'support' },
  { text: 'Comment contacter l’équipe technique Axiom ?', category: 'support' },
  { text: 'Proposez-vous une documentation pour les développeurs ?', category: 'support' },
  { text: 'Comment signaler un bug ou proposer une amélioration ?', category: 'support' },

  // Suggestions techniques
  { text: 'Puis-je combiner Axiom avec d’autres bibliothèques ?', category: 'technical' },
  { text: 'Axiom supporte-t-il le tree-shaking ?', category: 'technical' },
  { text: 'Où trouver la liste complète des fonctions disponibles ?', category: 'technical' },
  { text: 'Comment contribuer au développement d’Axiom ?', category: 'technical' },
  { text: 'Axiom utilise-t-il des dépendances externes ?', category: 'technical' },

  // Suggestions côté candidats
  { text: 'Comment créer mon profil candidat ?', category: 'candidate' },
  { text: 'Comment postuler à une offre sur SuitOps HIRE ?', category: 'candidate' },
  { text: 'Puis-je importer mon CV ou mon profil LinkedIn ?', category: 'candidate' },
  { text: 'Comment suivre l’évolution de ma candidature ?', category: 'candidate' },
  { text: 'Comment modifier ou supprimer ma candidature ?', category: 'candidate' },
  { text: 'Puis-je recevoir des alertes d’emploi selon mon profil ?', category: 'candidate' },
  { text: 'Est-ce que les recruteurs voient toutes mes informations personnelles ?', category: 'candidate' },
  { text: 'Comment préparer un entretien via la plateforme ?', category: 'candidate' },
  { text: 'Que faire si je ne reçois pas de réponse à ma candidature ?', category: 'candidate' },
  { text: 'Comment mettre en valeur mes compétences sur mon profil ?', category: 'candidate' },
  { text: 'Puis-je enregistrer des offres pour plus tard ?', category: 'candidate' },
  { text: 'Comment savoir si mon CV a été consulté ?', category: 'candidate' },
  { text: 'Y a-t-il des tests ou évaluations sur SuitOps HIRE ?', category: 'candidate' },
  { text: 'Comment garantir la confidentialité de mes données ?', category: 'candidate' },
  { text: 'Puis-je être recommandé à une entreprise ?', category: 'candidate' },
  { text: 'Comment contacter un recruteur via SuitOps HIRE ?', category: 'candidate' },
  { text: 'Comment participer à des campagnes de recrutement ?', category: 'candidate' },
  { text: 'Est-ce que HIRE est gratuit pour les candidats ?', category: 'candidate' },
  { text: 'Puis-je accéder à mes anciennes candidatures ?', category: 'candidate' },
  { text: 'Comment supprimer mon compte candidat ?', category: 'candidate' }

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
