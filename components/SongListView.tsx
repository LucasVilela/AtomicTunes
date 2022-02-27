import React, { FC, useState } from 'react'
import { convertTime } from '../libs/convertTime'
import { api } from '../services/api'

interface SongListViewProps {
  trackName: string
  artistName: string,
  trackTimeMillis: number
  id: string
}

const SongListView: FC<SongListViewProps> = ({ trackName, trackTimeMillis, artistName, id }) => {
  const [songPreviewUrl, setSongPreviewUrl] = useState("")

  async function getSong(id: string) {

    try {
      const query = await api.get(`/us/lookup?id=${id}`)
      console.log('query :>> ', query);

      setSongPreviewUrl(query.data.results[0].previewUrl)

    } catch (e) {
      alert(e)
    }
  }


  return (
    <div>
      <li>
        <p>{trackName}</p>
        <p>Artist: {artistName}</p>
        <p>duration: {convertTime(trackTimeMillis)}</p>
        <p onClick={() => getSong(id)}>preview Song</p>
        {songPreviewUrl ? <audio controls src={songPreviewUrl} /> : null}
      </li>
    </div>
  )
}

export default SongListView