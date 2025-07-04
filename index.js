export default {
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname

    const params = new URLSearchParams(url.search)
    if (!params.has("sortOrder")) {
      params.set("sortOrder", "Desc")
    }

    const realUrl = `https://games.roblox.com${path}?${params.toString()}`

    try {
      const response = await fetch(realUrl, {
        headers: {
          "User-Agent": "roproxy-custom"
        }
      })

      const text = await response.text()
      return new Response(text, {
        status: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
    } catch (e) {
      // Возвращаем JSON даже при ошибке
      return new Response(JSON.stringify({ error: true, message: e.message }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
    }
  }
}
