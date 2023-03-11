import type { FetchOptions } from "../../types/fetchData";

export async function fetchData(options: FetchOptions) {
    const response = await fetch(options.url + (options.query ? `?${options.query}` : ''), {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body || null
    })

    if (response.status !== 200) {
        return undefined
    } else {
        return response.json()
    }
}