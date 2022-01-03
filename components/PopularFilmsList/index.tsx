import UserChart from 'components/UserChart';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IDataMovie, IDataTV } from 'types';
import styles from './PopularFilmsList.module.scss';
import { IPopularFilmsListProps } from './types';

const PopularFilmsList: React.FC<IPopularFilmsListProps> = (props: IPopularFilmsListProps) => {
    if (!props.filmsObj) return null;

    const getLis = (): JSX.Element[] => {
        const items = props.filmsObj.results;
        const lis = items.map((item, idx) => {
            const id = item.id;
            const title = (item as IDataMovie).title || (item as IDataTV).name
            const href = `/${props.type}/${id}`;
            const imgHref = item.poster_path ? "http://image.tmdb.org/t/p/w220_and_h330_face/" +  item.poster_path : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;
            const percent = Math.floor(item.vote_average * 10);

            return <li className={styles.item} key={id}>
                <Link href={href}>
                    <a className={styles.imgWrapper}>
                        <Image src={imgHref} layout="fill"/>
                        <div className={styles.userChartContainer}>
                            <UserChart small percent={percent} />
                        </div>
                    </a>
                </Link>
                <Link href={href}>
                    <a className={styles.name}>
                        {title}
                    </a>
                </Link>
            </li>
        });
        return lis;
    }

    return <ul className={styles.list}>
        { getLis() }
    </ul>
}

export default PopularFilmsList;