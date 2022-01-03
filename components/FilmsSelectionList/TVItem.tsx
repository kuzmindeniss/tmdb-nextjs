import Image from 'next/image';
import React from 'react';
import { ITVItemProps } from './types';
import styles from './FilmsSelectionList.module.scss';
import { formatDate } from 'utils';
import Link from 'next/link';

const TVItem: React.FC<ITVItemProps> = (props: ITVItemProps) => {
    const id = props.item.id;
    const photoSrc = props.item.poster_path ? `http://image.tmdb.org/t/p/w300${props.item.poster_path}` : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;

    return (
        <li className={styles.item}>
            <Link href={`/tv/${id}`}>
                <a className={styles.imageWrapper}>
                    <Image className={styles.itemImage} src={photoSrc} layout="fill" alt="photo"/>
                </a>
            </Link>
            <Link href={`/tv/${id}`}>
                <a className={styles.itemName}>
                    { props.item.name }
                </a>
            </Link>
            <span className={styles.itemDate}> { formatDate(props.item.first_air_date) } </span>
        </li>
    )
}

export default TVItem;