import React, { useRef, useState } from 'react';
import { ContentDataType, ContentTypes, IDataTV } from 'types';
import { IFilmsSearchList, SearchListSlugs } from './types';
import ListUl from './ListUl';
import styles from './FilmsSearchList.module.scss'
import { useRouter } from 'next/router';
import { Transition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { useEffect } from 'react';

const FilmsSearchList: React.FC<IFilmsSearchList> = (props: IFilmsSearchList) => {
    const router = useRouter();
    const listRef = useRef();

    // For nextjs bug
    const queryStringRef = useRef(router.query.q);

    const [listState, setListState] = useState<{
        listData: ContentDataType[],
        listType: ContentTypes,
        currentListSlug: SearchListSlugs,
    }>({
        listData: props.initialData,
        listType: props.initialType,
        currentListSlug: "movies",
    });

    const setMovies = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setListState({
            listData: props.initialData,
            listType: "movie",
            currentListSlug: "movies",
        });
    }
    
    const setTvShows = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const name = router.query.q || " ";
        const rawData = await fetch("/api/search/tv-shows/" + name);
        const data = await rawData.json() as IDataTV[];
        setListState({
            listData: data,
            listType: "tv",
            currentListSlug: "tv-shows",
        });
    }

    const selectionsData: {
        [key in SearchListSlugs]: {
            title: string
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
        }
    } = {
        "movies": {
            title: "Фильмы",
            onClick: setMovies,
        },
        "tv-shows": {
            title: "Серилы",
            onClick: setTvShows,
        }
    }

    const getSelections = (): JSX.Element[] => {
        const items = [];
        for (const key in selectionsData) {
            const item = selectionsData[key as SearchListSlugs];
            items.push(
                <li className={styles.selectionItem} key={key}>
                    <button
                        className={classNames(styles.selectionButton, {
                            [styles.selectionButtonActive]: key === listState.currentListSlug
                        })} onClick={item.onClick}
                    >{ item.title }</button>
                </li>
            )
        }
        return items;
    }

    const animationDuration = 300;

    useEffect(() => {
        // Next js bug
        const newQuery = router.query.q;
        if (newQuery !== queryStringRef.current) {
            queryStringRef.current = newQuery;
            setListState(({
                listData: props.initialData,
                listType: props.initialType,
                currentListSlug: "movies",
            }));
        }
    }, [router.query.q, props.initialData, props.initialType]);

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.selection}>
                    <div className={styles.selectionHeader}>
                        Результаты поиска
                    </div>
                    <ul className={styles.selectionList}>
                        { getSelections() }
                    </ul>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <TransitionGroup>
                    <Transition
                        key={`${listState.currentListSlug} ${queryStringRef.current}`}
                        timeout={animationDuration}
                        nodeRef={listRef}
                    >
                        {state => {
                            return <ListUl type={listState.listType} data={listState.listData} animationDuration={animationDuration} animationState={state}/>
                        }}
                    </Transition>
                </TransitionGroup>
            </div>
        </div>
    )
}

export default FilmsSearchList;