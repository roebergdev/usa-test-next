import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';
import { PREDEFINED_QUESTIONS } from '@/data/questions';

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function POST(request: Request) {
  const {
    difficulty,
    count = 3,
    excludeQuestions = [],
    category = null,
  } = await request.json();

  if (!process.env.GEMINI_API_KEY) {
    const local = PREDEFINED_QUESTIONS.filter(
      (q) =>
        q.difficulty >= difficulty - 1 &&
        q.difficulty <= difficulty + 1 &&
        (!category || q.category === category) &&
        !excludeQuestions.includes(q.text)
    );
    return NextResponse.json(shuffleArray(local).slice(0, count));
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const excludePart =
      excludeQuestions.length > 0
        ? `\nDO NOT generate any of the following questions: ${excludeQuestions.join(', ')}`
        : '';
    const categoryPart = category
      ? `\nAll questions must belong to this category: ${category}.`
      : '';

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Generate exactly ${count} multiple-choice trivia questions about the USA.
      Difficulty level: ${difficulty} (out of 10, where 1 is very easy and 10 is extremely hard).
      Focus on history, geography, culture, and government.${categoryPart}
      The questions should get progressively harder.${excludePart}
      Return ONLY a JSON array.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: 'The question text.' },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Exactly 4 options.',
              },
              correctAnswer: { type: Type.STRING, description: 'The correct option.' },
              category: { type: Type.STRING, description: 'The category (e.g., History).' },
            },
            required: ['text', 'options', 'correctAnswer', 'category'],
          },
        },
      },
    });

    let text = response.text || '';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    if (!text) throw new Error('Empty response from Gemini');

    const data = JSON.parse(text);
    const questions = data.map((q: Record<string, unknown>, index: number) => ({
      ...q,
      id: Math.random().toString(36).substring(7),
      difficulty: difficulty + index * 0.5,
    }));

    return NextResponse.json(questions);
  } catch (e) {
    console.error('Failed to generate questions:', e);
    const local = PREDEFINED_QUESTIONS.filter(
      (q) =>
        q.difficulty >= difficulty - 1 &&
        q.difficulty <= difficulty + 1 &&
        (!category || q.category === category) &&
        !excludeQuestions.includes(q.text)
    );
    return NextResponse.json(shuffleArray(local).slice(0, count));
  }
}
