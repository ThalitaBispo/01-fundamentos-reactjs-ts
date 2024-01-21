import { Post, PostType } from './components/Post.jsx';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';

import './global.css';

import styles from './App.module.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/thalitabispo.png',
      name: 'Thalita Bispo',
      role: 'CTO @TAlK'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa, É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' }
    ],
    publishedAt: new Date('2023-05-08 17:12:30'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/andreneery.png',
      name: 'André Nery',
      role: 'CEO @TAlK'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋', },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa, É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' }
    ],
    publishedAt: new Date('2023-05-09 18:00:00'),
  }
];

function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                //precisa passar para a key qual é a informação única
                post={post}
              />
            )
          })}
        </main>
      </div>

    </div>
  )
}

export default App
