import { OpenAI } from "openai";

export async function POST(req: Request) {
  const { topic } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // 1. GENERATE THE KENNEDY-STYLE CONTENT
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "You are a master direct-response copywriter like Dan Kennedy and Gary Halbert." },
      { role: "user", content: `Write a compelling, non-salesy blog post for ${topic} in Doylestown, PA. 
        Focus on Audi/Porsche owners. Mention our labor rate is $204/hr vs Dealer $300/hr. 
        Focus on transparency. CTA: Call 267-279-9477. Format as HTML.` }
    ],
  });

  const blogContent = completion.choices[0].message.content;

  // 2. PUSH TO WORDPRESS
  const wpUser = process.env.WORDPRESS_USERNAME;
  const wpPass = process.env.WORDPRESS_APP_PASSWORD;
  const wpUrl = process.env.WORDPRESS_URL;
  const auth = Buffer.from(`${wpUser}:${wpPass}`).toString('base64');

  const wpRes = await fetch(`${wpUrl}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: `The Truth About ${topic} in Doylestown`,
      content: blogContent,
      status: 'draft'
    })
  });

  if (wpRes.ok) {
    return new Response(JSON.stringify({ message: "Content generated and saved as a Draft in WordPress!" }));
  } else {
    return new Response(JSON.stringify({ message: "OpenAI worked, but WordPress rejected the post. Check your App Password." }));
  }
}


