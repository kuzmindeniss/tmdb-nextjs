import Image from 'next/image';
import React from 'react';
import { IMovieItemProps } from './types';
import styles from './FilmsSelectionList.module.scss';
import { formatDate } from 'utils';
import Link from 'next/link';

const MovieItem: React.FC<IMovieItemProps> = (props: IMovieItemProps) => {
    const id = props.item.id
    const photoSrc = props.item.poster_path ? `http://image.tmdb.org/t/p/w300${props.item.poster_path}` : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;

    return (
        <li className={styles.item}>
            <Link href={`/movie/${id}`}>
                <a className={styles.imageWrapper}>
                    <Image className={styles.itemImage} src={photoSrc} layout="fill"/>
                </a>
            </Link>
            <Link href={`/movie/${id}`}>
                <a className={styles.itemName}>
                    { props.item.title }
                </a>
            </Link>
            <span className={styles.itemDate}> { formatDate(props.item.release_date) } </span>
        </li>
    )
}

export default MovieItem;