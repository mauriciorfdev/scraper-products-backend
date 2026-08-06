import { GoogleGenAI } from '@google/genai';
import { analysisSchema } from '../ai/schemas.js';
import { systemPrompt } from '../ai/prompts.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function analyzeIngredients(ingredients) {
  const userPrompt = `Ingredientes: ${ingredients}`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      config: {
        // Contexto o rol IA
        systemInstruction: systemPrompt,

        // Forzar resp en formato JSON que cumpla con el esquema
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,

        // Control de creatividad (bajo para análisis de datos)
        temperature: 0.1,
      },
      // Mensaje del usuario con los datos dinámicos a analizar
      contents: userPrompt,
    });

    const jsonResultado = JSON.parse(response.text);
    return jsonResultado;
  } catch (error) {
    console.error('Gemini Error: ', error);
    if (error.status === 503) {
      const appError = new Error(error.message);
      appError.status = error.status;
      throw appError;
    }
    throw error;
  }
}

export { analyzeIngredients };
