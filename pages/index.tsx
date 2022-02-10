import type { NextPage } from 'next'



const HomePage: NextPage = () => {
  const testEnvSecret = process.env.TEST_SECRET ?? 'secret not available'
  return (
    <div>
      <h3>SWAPLINGS</h3>
      <p>Minimal starting setup</p>
      <p>{testEnvSecret}</p>
    </div>
  )
}

export default HomePage

