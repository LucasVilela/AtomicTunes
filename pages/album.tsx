import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import SongListView from '../components/SongListView'
import { api } from '../services/api'

type AlbumResponse = {
  collectionName: string
  releaseDate: Date
  artworkUrl100: string
  trackName: string
  trackTimeMillis: number
  artistViewUrl: string
  trackId: string
  artistName: string
  wrapperType: "track" | "collection"
}

type ApiResponse = {
  data: {
    results: AlbumResponse[]
  }
}


const Album = () => {
  const [data, setData] = useState<AlbumResponse[]>([])
  const [collection, setCollection] = useState<AlbumResponse>()

  const router = useRouter()
  const albumId = router.query.albumId as string

  async function getSongs(albumId: string) {
    try {
      const query: ApiResponse = await api.get(`/lookup?country=US&entity=song&id=${albumId}`)
      setData(query.data.results.filter(item => item.wrapperType === 'track'))
      setCollection(query.data.results[0])
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    if (albumId) {
      getSongs(albumId)
    }
  }, [albumId])


  return (
    <div>{collection?.artistName} - {collection?.collectionName}
      <ol>
        {data?.map((item, index) => (
          <SongListView
            key={index}
            trackName={item.trackName}
            trackTimeMillis={item.trackTimeMillis}
            id={item.trackId}
            artistName={item.artistName}
          />
        ))}
      </ol>
    </div>

  )
}

export default Album


