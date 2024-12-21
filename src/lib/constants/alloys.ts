export const ALLOYS = [
  {
    id: 'steel',
    name: 'Acier',
    levelRequired: 5,
    basePrice: 100,
    expReward: 15,
    recipe: [
      { resourceId: 'iron', amount: 2 },
      { resourceId: 'coal', amount: 1 },
    ],
    craftingTime: 3000,
  },
  {
    id: 'mithril',
    name: 'Mithril',
    levelRequired: 10,
    basePrice: 300,
    expReward: 30,
    recipe: [
      { resourceId: 'silver', amount: 2 },
      { resourceId: 'steel', amount: 1 },
      { resourceId: 'magic-essence', amount: 1 },
    ],
    craftingTime: 6000,
  },
  {
    id: 'adamantium',
    name: 'Adamantium',
    levelRequired: 15,
    basePrice: 800,
    expReward: 60,
    recipe: [
      { resourceId: 'mithril', amount: 2 },
      { resourceId: 'dragon-scale', amount: 1 },
      { resourceId: 'magic-essence', amount: 2 },
    ],
    craftingTime: 10000,
  },
] as const;