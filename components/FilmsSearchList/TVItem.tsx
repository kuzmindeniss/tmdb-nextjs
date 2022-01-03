import React from 'react';
import styles from './FilmsSearchList.module.scss';
import { formatDate } from 'utils';
import { IFilmsSearchMovieItemProps, IFilmsSearchTVItemProps } from './types';
import Image from 'next/image';
import Link from 'next/link';

const TVItem: React.FC<IFilmsSearchTVItemProps> = (props: IFilmsSearchTVItemProps) => {
    const name = props.item.name || "";
    const imgPath = props.item.poster_path ? "http://image.tmdb.org/t/p/w154" + props.item.poster_path : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;
    const releaseDate = props.item.first_air_date ? formatDate(props.item.first_air_date) : "";
    const overview = props.item.overview || "";
    const alt = props.item.original_name || "";
    const id = props.item.id;

    return (
        <li className={styles.item}>
            <Link href={`/tv/${id}`}>
                <a className={styles.imgWrapper}>
                    <Image
                        src={imgPath}
                        alt={alt}
                        className={styles.img}
                        layout="fill"
                    />
                </a>
            </Link>
            <div className={styles.itemInfo}>
                <Link href={`/tv/${id}`}>
                    <a className={styles.itemName}>
                        { name }
                    </a>
                </Link>
                <span className={styles.itemDate}>
                    { releaseDate }
                </span>
                {overview && (
                    <div className={styles.itemPreview}>
                        <p>{ overview }</p>
                    </div>
                )}
            </div>
        </li>
    )
}

export default TVItem;