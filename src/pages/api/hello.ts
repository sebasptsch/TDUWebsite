// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextRequest } from 'next/server'

type Data = {
  name: string
}

export const config = {
  runtime: 'edge',
}

export default function handler(
  req: NextRequest,
) {
  return new Response(JSON.stringify({ name: 'John Doe' }), {
    headers: { 'content-type': 'application/json' },
  })
}
