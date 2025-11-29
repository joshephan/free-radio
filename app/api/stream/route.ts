import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FreeRadio/1.0)",
        "Icy-MetaData": "1",
      },
    });

    if (!response.ok) {
      return new Response(`Stream error: ${response.status}`, {
        status: response.status,
      });
    }

    const contentType =
      response.headers.get("content-type") || "audio/mpeg";

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Stream proxy error:", error);
    return new Response("Failed to fetch stream", { status: 500 });
  }
}
