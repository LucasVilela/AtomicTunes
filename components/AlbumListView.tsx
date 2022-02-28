import Link from 'next/link'
import React, { FC } from 'react'


interface AlbumListViewProps {
  image: string
  collectionName: string
  artist: string
  collectionId: string
}

const AlbumListView: FC<AlbumListViewProps> = ({ image, collectionName, artist, collectionId }) => {
  return (
    <Link href={`/album/${collectionId}`} passHref>
      <div className='card'>
        <img src={image.replace("/100x100bb", "/400x400bb")} alt={collectionName} />
        <div className='details'>
          <h3>{artist}</h3>
          <h4>{collectionName}</h4>
        </div>
      </div>
    </Link>
  )
}

export default AlbumListView