import OpenAI from 'openai';

interface IOptions {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: IOptions,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          Te seran proveidos textos en español latino con posibles errores ortograficos y gramticales,
          Las palabras deben existir en el diccionario de la RAE.
          Debes de responder en formato texto,
          tu tarea es corregirlos y retornar información de las solicitudes,
          también debes de dar un porcetanje de acierto por el usuario.
          
          Si no hay errores, debes de retornar un mensaje de felicitaciones
          
          Ejemplo de salida:
          {
            userScore: number,
            errors: string[], //['error => solucion']
            message: string // Usa emojis y texto para felicitar al usuario
          }


          `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 150,
  });
  const jsonResp = JSON.parse(completion.choices[0].message.content);
  return jsonResp;
};
