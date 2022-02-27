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
    <li>
      <img src={image} alt={collectionName} />
      <p>{collectionName}</p>
      <p>Artist:{artist}</p>
      <Link href={`/album?albumId=${collectionId}`} >
        See Album
      </Link>
    </li>
  )
}

export default AlbumListView