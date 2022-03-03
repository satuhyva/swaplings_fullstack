import type { NextPage } from 'next'

const HomePage: NextPage = () => {
  const testEnvSecret = process.env.TEST_SECRET ?? 'secret not available'

  return (
    <div>
      <h3 data-cy="home-page">SWAPLINGS</h3>
      <p>Minimal starting setup</p>
      <p>TEST_SECRET: {testEnvSecret}</p>
      <p>NODE_ENV: {process.env.NODE_ENV ?? 'not available'}</p>
      <p>NEXT_PUBLIC_API_SERVER: {process.env.NEXT_PUBLIC_API_SERVER ?? 'not available'}</p>
      <p>NEXT_PUBLIC_API_SERVER_BASE: {process.env.NEXT_PUBLIC_API_SERVER_BASE ?? 'not available'}</p>
    </div>
  )
}

export default HomePage

// MITEN ESTÄÄ se, että nextjs ei buildaa serveriä?!!!
// https://geeknabe.com/blog/how-to-use-cloudflare-cdn-with-vercel/

// https://levelup.gitconnected.com/how-to-set-up-cloudflare-with-zeit-93daa7d45dd
