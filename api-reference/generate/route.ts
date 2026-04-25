import { OpenAI } from "openai";

export async function POST(req: Request) {
  const { topic } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "You are a master direct-response copywriter. Write a non-salesy, helpful blog post for European car owners in Doylestown, PA. Focus on Audi/Porsche. Labor rate: $204/hr vs Dealer $300/hr. CTA: Call 267-279-9477." },
      { role: "user", content: `Topic: ${topic}` }
    ],
  });

  const blogContent = completion.choices[0].message.content;
  const auth = Buffer.from(`${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_APP_PASSWORD}`).toString('base64');

  const wpRes = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: `The Truth About ${topic} in Doylestown`, content: blogContent, status: 'draft' })
  });

  if (wpRes.ok) {
    return new Response(JSON.stringify({ message: "Success! Post sent to WordPress as a Draft." }));
  } else {
    return new Response(JSON.stringify({ message: "WordPress Error. Check your App Password." }));
  }
}
