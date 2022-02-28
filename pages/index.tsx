import type { NextPage } from 'next';
import { useState } from 'react';

import AlbumListView from '../components/AlbumListView';
import Input from '../components/Input';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import { itunesApi } from '../services/api';

export type AlbumResponseType = {
  artistName: string;
  artistViewUrl: string;
  artworkUrl100: string;
  collectionId: string;
  collectionName: string;
  releaseDate: Date;
  trackId: string;
  trackName: string;
  trackTimeMillis: number;
  wrapperType: 'track' | 'collection';
};

type ApiResponse = {
  data: {
    results: AlbumResponseType[];
  };
};

const Home: NextPage = () => {
  const [albums, setAlbums] = useState<AlbumResponseType[]>([]);
  const [status, setStatus] = useState<
    'loading' | 'empty' | 'done' | 'initial'
  >('initial');

  async function getAlbum(artistName: string) {
    const searchTerm = artistName.replace(' ', '+');
    try {
      const albums: ApiResponse = await itunesApi.get(
        `/search?term=${searchTerm}&entity=album&country=US`
      );
      setAlbums(
        albums.data.results.filter((item) => item.wrapperType === 'collection')
      );
      setStatus('done');
    } catch (e) {
      console.error(e);
      setStatus('empty');
    }
  }

  const onSearch = (artistName: string) => {
    if (artistName) {
      setStatus('loading');
      getAlbum(artistName);
    }
  };

  return (
    <Layout>
      <main className="AlbumSearch">
        <div className="SearchSection">
          <h1 className="title"> ☢️ Atomic tunes</h1>
          <Input onSearch={onSearch} placeholder="Search for artist or album" />
        </div>
        <div className="ListView">
          {status === 'loading' && <LoadingSpinner />}
          {status === 'empty' && (
            <p>Sorry we could&rsquo;t find any album for this artist</p>
          )}
          {status === 'done' &&
            albums?.map((item, index) => (
              <AlbumListView
                key={`item.collectionName-${index}`}
                collectionName={item.collectionName}
                artist={item.artistName}
                image={item.artworkUrl100}
                collectionId={item.collectionId}
              />
            ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
