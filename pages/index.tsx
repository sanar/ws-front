import React, { useContext, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import moment from 'moment'
import _ from 'lodash'
import styles from '../styles/Home.module.css'

const routes = {
  highlights: '/api/highlights',
  feed: '/api/feed',
};

const ApiContext = React.createContext(routes);

const Home = () => {
  const [f, setF] = useState<any>([]);
  const [h, setH]  = useState<any>([]);

  if (!h.length || !f.length) return <></>;

  useEffect(() => {
    const routes = useContext(ApiContext);

    fetch(routes.highlights).then((res) => res.json()).then((d) => {
      const value = _.slice(d, 0, 3);
      setH(value);

      fetch(routes.feed).then((res) => res.json()).then((d) => {
        setF(d);
      });
    });
  }, []);

  return (
      <div className={styles.container}>
        <Head>
          <title>Hub</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.nav} style={{ padding: '40px'}}>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example.com/'}>Medicina</div>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example2.com/'}>Sanar Saúde</div>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example3.com/'}>Sobre a Sanar</div>
        </div>

        <div className={styles.nav} style={{ padding: '40px'}}>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example4.com/'}>Residência</div>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example5.com/'}>Covid-19</div>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example6.com/'}>Artigos</div>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example7.com/'}>Casos clínicos</div>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example8.com/'}>Resumos</div>
          <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'https://www.example9.com/'}>Mais conteúdos</div>
        </div>

        <div className={styles.main}>
          <div className={styles.highlights}>
            {h.map((h: any) => {
              const showAuthorName = () => { 
                if(h)
                  if(h['author'])
                      if(h['author']['name'])
                          return true
              }

              return (
                <div className='highlight'>
                  <img src={h.featuredMediaUrl} />
                  <div className='title'>{h.title}</div>
                  <div className='description'>{h.description}</div>
                  <div className='info'>
                    <img src={h.author.avatarUrl} />
                    {showAuthorName() && <div>{h.author.name}</div>}
                    <div>{h.readingTime}</div>
                    <div>{moment(new Date(h.createdAt)).fromNow()}</div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className={styles.feed}>
            {f.map((h: any) => (
              <div className='feed-item'>
                <img src={h.featuredMediaUrl} />
                <div className='title'>{h.title}</div>
                <div className='description'>{h.description}</div>
                <div className='info'>
                  <div>
                    <img src={h.author.avatarUrl} />
                    <div>{h.author.name}</div>
                  </div>
                  <div>{h.readingTime}</div>
                  <div>{moment(new Date(h.createdAt)).fromNow()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

const Page: NextPage = () => {
  return (
    <ApiContext.Provider value={routes}>
      <Home />
    </ApiContext.Provider>
  )
}

export default Page
