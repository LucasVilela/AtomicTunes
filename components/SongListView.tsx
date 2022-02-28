import React, { FC, useState } from 'react';
import { convertTime } from '../libs/convertTime';
import { itunesApi } from '../services/api';

interface SongListViewProps {
	trackName: string;
	artistName: string;
	trackTimeMillis: number;
}

const SongListView: FC<SongListViewProps> = ({
	trackName,
	trackTimeMillis,
	artistName,
}) => {
	return (
		<li className="songTrack">
			<p>
				{trackName} - {artistName}
			</p>
			<p className="duration"> {convertTime(trackTimeMillis)}</p>
		</li>
	);
};

export default SongListView;
