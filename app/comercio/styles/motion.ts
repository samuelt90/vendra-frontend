export const commerceEase = {
  enter: [0.16, 1, 0.3, 1] as const,

  exit: [0.4, 0, 1, 1] as const,

  spatial: [0.22, 1, 0.36, 1] as const,

  smooth: [0.33, 1, 0.68, 1] as const,
};

export const commerceDuration = {
  micro: 0.18,
  fast: 0.28,
  interface: 0.42,
  transition: 0.68,
  scene: 1.1,
};

export const commerceSpring = {
  soft: {
    type: "spring" as const,
    stiffness: 210,
    damping: 25,
    mass: 0.85,
  },

  physical: {
    type: "spring" as const,
    stiffness: 150,
    damping: 20,
    mass: 1.05,
  },
};

export const commerceStagger = {
  tight: 0.035,
  normal: 0.065,
  scene: 0.11,
};
