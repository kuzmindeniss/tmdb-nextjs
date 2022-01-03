import Image from 'next/image';
import React from 'react';
import styles from './Review.module.scss';
import { ITVReviewProps } from './types';
import UserChart from 'components/UserChart';

const TVReview: React.FC<ITVReviewProps> = (props: ITVReviewProps) => {
    if (!props.item) {
        return null;
    }

    const name = props.item.name;
    const year = props.item.first_air_date ? props.item.first_air_date.slice(0, 4) : "";
    const genresTitlesArr = props.item.genres.map(genre => {
        return genre.name;
    });
    const genresTitlesString = genresTitlesArr.join(', ');
    const date = props.item.first_air_date.slice(0, 4);
    const percentAverage = props.item.vote_average * 10;
    const overview = props.item.overview;
    const imgPath = props.item.poster_path ? "http://image.tmdb.org/t/p/w300" + props.item.poster_path : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;
    const bgPath = props.item.backdrop_path ? "http://image.tmdb.org/t/p/original" + props.item.backdrop_path : "";

    let runTimeHours: string;
    let runTimeMinutes: string;
    if (props.item.episode_run_time[0]) {
        runTimeHours = Math.floor(props.item.episode_run_time[0] / 60) + 'h';
        runTimeMinutes = props.item.episode_run_time[0] - (parseInt(runTimeHours) * 60) + 'm';
    }
    const runTime = props.item.episode_run_time ? `${runTimeHours!} ${runTimeMinutes!}` : null;

    return (
        <div 
            className={styles.container}
            style={{
                backgroundImage: `url("${bgPath}")`
            }}
        >
            <div className={styles.containerBg}>
                <div className={styles.contentContainer}>
                    <div className={styles.containerLeft}>
                        <div className={styles.imgWrapper}>
                            <Image
                                src={imgPath}
                                layout="fill"
                            />
                        </div>
                    </div>
                    <div className={styles.containerRight}>
                        <div className={styles.infoTop}>
                            <span className={styles.filmName}>{ name }</span>
                            <span className={styles.filmYear}> ({ year })</span>
                        </div>
                        <div className={styles.infoFacts}>
                            <span className={styles.infoDate}>{ date }</span>
                            <span className={styles.infoGenres}>{ genresTitlesString }</span>   
                            <span className={styles.infoRuntime}>{ runTime }</span>
                        </div>
                        <UserChart percent={percentAverage}/>
                        {overview && 
                            <div className={styles.preview}>
                                <span className={styles.previewTitle}>Обзор</span>
                                <p className={styles.previewText}>{ overview }</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TVReview;