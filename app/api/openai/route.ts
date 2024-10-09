import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    const { message } = await req.json();

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const assistantResponse = response.data.choices[0].message.content;
        return NextResponse.json({ assistantResponse });
    } catch (error) {
        console.error('Axios Error:', error); // Log the full error

        // Type guard to check if error is an AxiosError
        if (axios.isAxiosError(error)) {
            console.error('Error Response Data:', error.response?.data); // Log response from the API (if any)

            const status = error.response?.status || 500;
            const errorMessage = error.response?.data?.error || 'Error communicating with OpenAI API';

            return NextResponse.json({ error: errorMessage }, { status });
        } else {
            // Handle unexpected error
            console.error('Unexpected Error:', error);
            return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}
