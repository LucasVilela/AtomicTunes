/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SongListView from '../../components/SongListView';
import { itunesApi } from '../../services/api';
import { NextPage } from 'next/types';
import { AlbumResponseType } from '..';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import Link from 'next/link';
import { config } from 'process';

type ApiResponse = {
  data: {
    results: AlbumResponseType[];
  };
};

const Album: NextPage = () => {
  const [data, setData] = useState<AlbumResponseType[]>([]);
  const [collection, setCollection] = useState<AlbumResponseType>();
  const [status, setStatus] = useState<'loading' | 'empty' | 'done'>('loading');

  const router = useRouter();
  const { id } = router.query as { id: string };

  async function getSongs(albumId: string) {
    try {
      const query: ApiResponse = await itunesApi.get(
        `lookup?country=US&entity=song&id=${albumId}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      }
      )
      setData(
        query.data.results.filter((item) => item.wrapperType === 'track')
      );
      setCollection(query.data.results[0]);
      setStatus('done');
    } catch (e) {
      console.error(e);
      setStatus('empty');
    }
  }

  useEffect(() => {
    if (id) {
      setStatus('loading');
      getSongs(id);
    }
  }, [id]);

  return (
    <Layout title={collection?.artistName}>
      <main className="Album">
        {status === 'loading' && <LoadingSpinner />}
        {status === 'empty' && (
          <div>
            <p>Sorry, album not found</p>
          </div>
        )}
        {status === 'done' && (
          <div className="AlbumHeader">
            <img
              src={collection?.artworkUrl100.replace('100x100bb', '400x400bb')}
              alt=""
            />
            <h2>{collection?.collectionName}</h2>
            <h3>{collection?.artistName}</h3>
          </div>
        )}
        {status === 'done' && (
          <ol className="songList">
            {data?.map((item, index) => (
              <SongListView
                key={index}
                trackName={item.trackName}
                trackTimeMillis={item.trackTimeMillis}
                artistName={item.artistName}
              />
            ))}
          </ol>
        )}
        <Link href="/">
          <a className="returnHomeLink">Return to Search</a>
        </Link>
      </main>
    </Layout>
  );
};

export default Album;
