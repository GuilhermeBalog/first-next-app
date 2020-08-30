import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ repositories }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Guilherme Balog's Repositories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Guilherme Balog's Repositories
        </h1>

        <p className={styles.description}>
          My repositories from Github
        </p>

        <div className={styles.grid}>
          {repositories.map(repo => (
            <a href={repo.homepage || repo.html_url} className={styles.card} key={repo.id}>
              <h3>{repo.name} &rarr;</h3>
              <p>{repo.description}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(){
  const response = await fetch('https://api.github.com/users/guilhermebalog/repos')
  const repositories = await response.json()

  return { 
    props: { 
      repositories
    }
  }
}