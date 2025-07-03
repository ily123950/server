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

      return new Response(await response.text(), {
        status: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
    } catch (e) {
      return new Response("Ошибка: " + e.message, { status: 500 })
    }
  }
}
