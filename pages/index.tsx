/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AlbumListView from '../components/AlbumListView'

import Layout from '../components/Layout'
import { api } from '../services/api'

type AlbumResponse = {
  collectionName: string
  releaseDate: Date
  artworkUrl100: string
  artistName: string
  artistId: string
  collectionId: string
}

type ApiResponse = {
  data: {
    results: AlbumResponse[]
  }
}


const Home: NextPage = () => {
  const [albums, setAlbums] = useState<AlbumResponse[]>([])

  async function getAlbum(artistName: string) {
    const searchTerm = artistName.replace(' ', '+')
    try {
      const albums: ApiResponse = await api.get(`/search?term=${searchTerm}}&entity=album&country=US`)
      setAlbums(albums.data.results)

    } catch (e) {
      console.error(e)
    }
  }


  console.log('data :>> ', albums);

  return (
    <div>
      <Layout>
        <h1>Search for album</h1>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            const artistName = (e.target as HTMLFormElement).elements.artistName.value
            getAlbum(artistName)
          }}
        >
          <input type="text" name="artistName" />
          <button type="submit">Search</button>
        </form>

        <ul>
          {albums?.map((item, index) => (
            <AlbumListView
              key={`item.collectionName-${index}`}
              collectionName={item.collectionName}
              artist={item.artistName}
              image={item.artworkUrl100}
              collectionId={item.collectionId}
            />
          ))}
        </ul>

      </Layout>
    </div>
  )
}

export default Home
