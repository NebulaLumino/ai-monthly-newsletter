import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY environment variable");
  return new OpenAI({ apiKey, baseURL: "https://api.deepseek.com/v1" });
}

export async function POST(req: NextRequest) {
  try {
    const { companyName, monthYear, highlights, productUpdates, teamNews, industryNews } = await req.json();

    const prompt = `You are an expert content writer and brand copywriter. Generate a polished monthly newsletter for ${companyName} for ${monthYear}.

**Company:** ${companyName}
**Month:** ${monthYear}
**Highlights:** ${highlights}
**Product Updates:** ${productUpdates}
**Team News:** ${teamNews}
**Industry News:** ${industryNews}

Generate a newsletter with these sections:

1. **Header** — Catchy subject line and preview text
2. **Greeting** — Warm, engaging opening that reflects ${companyName}'s brand voice
3. **Top Story** — The most important highlight from the month, written as a mini-story (2-3 paragraphs)
4. **Product Updates** — What's new, written in an exciting, benefit-focused way (bulleted format)
5. **Team Spotlight** — Celebrate the team news with genuine enthusiasm
6. **In the News** — Industry news context, tied back to why it matters for readers
7. **Looking Ahead** — What's coming next month (teaser)
8. **Footer** — Unsubscribe link, social links placeholder

Tone: Engaging, human, not corporate. Write for an audience that cares about ${companyName}.`;

    const client = getClient();
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are an expert brand content writer and newsletter copywriter." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const result = completion.choices[0]?.message?.content || "No content generated.";
    return NextResponse.json({ result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
