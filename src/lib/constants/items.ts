export const ITEMS = [
  // Niveau 1
  {
    id: 'iron-sword',
    name: 'Épée en Fer',
    description: 'Une épée basique mais fiable',
    basePrice: 50,
    expReward: 10,
    levelRequired: 1,
    resourcesRequired: [{ resourceId: 'iron', amount: 2 }],
    craftingTime: 5000,
  },
  // Niveau 5
  {
    id: 'steel-sword',
    name: 'Épée en Acier',
    description: 'Une lame plus résistante',
    basePrice: 150,
    expReward: 25,
    levelRequired: 5,
    resourcesRequired: [
      { resourceId: 'steel', amount: 2 },
      { resourceId: 'iron', amount: 1 },
    ],
    craftingTime: 8000,
  },
  // Niveau 10
  {
    id: 'mithril-sword',
    name: 'Épée en Mithril',
    description: 'Une lame légendaire aux reflets bleutés',
    basePrice: 500,
    expReward: 50,
    levelRequired: 10,
    resourcesRequired: [
      { resourceId: 'mithril', amount: 2 },
      { resourceId: 'steel', amount: 1 },
    ],
    craftingTime: 12000,
  },
  // Niveau 15
  {
    id: 'adamantium-sword',
    name: 'Épée en Adamantium',
    description: 'Une arme quasi-indestructible',
    basePrice: 1000,
    expReward: 100,
    levelRequired: 15,
    resourcesRequired: [
      { resourceId: 'adamantium', amount: 2 },
      { resourceId: 'mithril', amount: 1 },
    ],
    craftingTime: 15000,
  },
] as const;