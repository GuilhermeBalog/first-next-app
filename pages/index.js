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
          My repositories from <a href="https://github.com/GuilhermeBalog"><strong>Github</strong></a>
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
          href="https://guilhermebalog.ga"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by <strong>Guilherme Balog</strong>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://api.github.com/users/guilhermebalog/repos?per_page=100&sort=updated&direction=desc')
  const repositories = await response.json()

  return {
    props: {
      repositories: repositories.map(({
        id,
        name,
        description,
        homepage,
        html_url
      }) => ({
        id,
        name,
        description,
        homepage,
        html_url
      }))
    },
    revalidate: 60 * 60 * 24 // 1 day
  }
}
