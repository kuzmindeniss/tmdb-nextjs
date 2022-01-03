import Image from 'next/image';
import React from 'react';
import { IRecommendationsTVItemProps } from './types';
import styles from './Recommendations.module.scss';
import { formatDate } from 'utils';
import Link from 'next/link';

const RecommendationsMovieItem: React.FC<IRecommendationsTVItemProps> = (props: IRecommendationsTVItemProps) => {
    const id = props.item.id
    const photoSrc = props.item.backdrop_path ? `http://image.tmdb.org/t/p/w300${props.item.backdrop_path}` : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;
    const name = props.item.name;
    const href = `/tv/${id}`;

    return (
        <li className={styles.item}>
            <Link href={href}>
                <a className={styles.imageWrapper}>
                    <Image className={styles.itemImage} src={photoSrc} layout="fill"/>
                </a>
            </Link>
            <div className={styles.itemBottom}>
                <Link href={href}>
                    <a className={styles.itemName}>
                        { name }
                    </a>
                </Link>
                <span className={styles.itemPercent}>
                    {Math.floor(props.item.vote_average * 10)} %
                </span>
            </div>
            {/* <span className={styles.itemDate}> { formatDate(props.item.release_date) } </span> */}
        </li>
    )
}

export default RecommendationsMovieItem;