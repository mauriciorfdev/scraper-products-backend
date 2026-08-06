export const analysisSchema = {
  type: 'OBJECT',
  properties: {
    novaClassification: {
      type: 'INTEGER',
      description:
        'Clasificación NOVA del producto (número entero del 1 al 4).',
    },
    novaJustification: {
      type: 'STRING',
      description:
        'Breve explicación científica (máximo 15 palabras) de por qué se asignó ese nivel NOVA, mencionando el ingrediente clave.',
    },
    summary: {
      type: 'STRING',
      description:
        'Un resumen amigable y directo de una sola oración (máximo 20 palabras) sobre la naturaleza del producto, ideal para el usuario final.',
    },
    sugars: {
      type: 'ARRAY',
      items: { type: 'STRING' },
      description:
        'Lista con los nombres exactos de todos los azúcares, jarabes y endulzantes encontrados. Si no hay, retornar arreglo vacío.',
    },
    diets: {
      type: 'ARRAY',
      description:
        'Evaluación detallada de la compatibilidad del producto con dietas específicas.',
      items: {
        type: 'OBJECT',
        properties: {
          name: {
            type: 'STRING',
            enum: ['Vegana', 'Vegetariana', 'Sin Gluten'],
            description: 'Nombre de la dieta evaluada.',
          },
          compatible: {
            type: 'BOOLEAN',
            description:
              'Indica true si el producto es estrictamente apto para la dieta, o false si no lo es.',
          },
          reasons: {
            type: 'ARRAY',
            description:
              'Si compatible es false, incluye aquí el nombre exacto del ingrediente (tal como aparece en la lista original) que causa la exclusión. Si es compatible, retorna un arreglo vacío [].',
            items: {
              type: 'STRING',
            },
          },
        },
        required: ['name', 'compatible', 'reasons'],
      },
    },
    additives: {
      type: 'ARRAY',
      description: 'Lista detallada de cada aditivo alimentario detectado.',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING', description: 'Nombre común del aditivo.' },
          code: {
            type: 'STRING',
            description:
              'Código del aditivo (ej. E-621). Si no tiene, dejar vacío.',
          },
          purpose: {
            type: 'STRING',
            description:
              'Función tecnológica en una sola palabra (ej. Conservante, Acidulante).',
          },
        },
        required: ['name', 'code', 'purpose'],
      },
    },
    allergens: {
      type: 'ARRAY',
      description:
        'Lista única de alérgenos críticos presentes. Si un alérgeno se repite en los ingredientes, incluirlo solo una vez. Si no hay, retornar un arreglo vacío [].',
      items: {
        type: 'STRING',
        enum: ['Soya', 'Gluten', 'Leche / Lácteos', 'Trigo'],
      },
    },
  },
  required: [
    'novaClassification',
    'novaJustification',
    'summary',
    'sugars',
    'diets',
    'additives',
    'allergens',
  ],
};
