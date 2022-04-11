import React, { useEffect, useRef, useState } from 'react';
import styles from './FilmsSelectionList.module.scss';
import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from 'types';
import { IFilmsListProps, FilmsListSelectionType } from './types';
import ListUl from './ListUl';
import { TransitionGroup, Transition } from 'react-transition-group';
import classNames from 'classnames';


const FilmsList: React.FC<IFilmsListProps> = (props: IFilmsListProps) => {
    console.log(props);
    const [listState, setListState] = useState<{
        listData: Array<ContentDataType>,
        listType: ContentTypes,
        currentList: FilmsListSelectionType | undefined,
    }>({
        listData: props.data,
        listType: props.type,
        currentList: props.firstSelectionType,
    });

    const listRef = useRef();
    const selectionBgState = useRef({
        left: 0,
        width: 0,
    });
    const firstSelectionNodeRef = useRef<HTMLButtonElement>(null);

    const setSelectionBg = (el: HTMLElement): void => {
        const width = getComputedStyle(el).getPropertyValue("width");
        const left = el.offsetLeft;
        selectionBgState.current = {
            width: parseFloat(width),
            left,
        }
    }

    const setDataOnTv = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const rawData = await fetch("/api/get-tvs/popular/ontv");
        const data = await rawData.json() as IDataTV[];
        setSelectionBg(e.target as HTMLElement);
        setListState({
            listData: data,
            listType: "tv",
            currentList: "tvs-popular-ontv",
        });
    }

    const setDataForRent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const rawData = await fetch("/api/get-tvs/popular/forrent");
        const data = await rawData.json() as IDataTV[];
        setSelectionBg(e.target as HTMLElement);
        setListState({
            listData: data,
            listType: "tv",
            currentList: "tvs-popular-forrent",
        });
    }

    const setDataOnline = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setSelectionBg(e.target as HTMLElement);
        setListState({
            listData: props.data,
            listType: "tv",
            currentList: "tvs-popular-online",
        })
    }

    const selectionsData: {
        [key in FilmsListSelectionType]: {
            title: string
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
        }
    } = {
        "tvs-popular-forrent": {
            title: "Напрокат",
            onClick: setDataForRent,
        },
        "tvs-popular-online": {
            title: "Онлайн",
            onClick: setDataOnline,
        },
        "tvs-popular-ontv": {
            title: "По тв",
            onClick: setDataOnTv,
        },
    }

    const getSelections = (data: typeof props.selectionTypes): JSX.Element[] | null => {
        if (!data) return null;

        const items:JSX.Element[] = data.map((slug, idx) => {
            const item = selectionsData[slug];
            return (
                <li className={classNames(styles.listSelectionItem, {
                    [styles.listSelectionItemActive]: slug === listState.currentList
                })} key={idx}>
                    <button ref={idx === 0 ? firstSelectionNodeRef : undefined} className={styles.listSelectionItemButton} onClick={item.onClick}>{ item.title }</button>
                </li>
            )
        })

        return items;
    }


    const animationDuration = 200;

    useEffect(() => {
        if (!firstSelectionNodeRef.current) return;
        setSelectionBg(firstSelectionNodeRef.current as HTMLElement);
        setListState(state => {
            return {
                ...state
            }
        });
    }, []);


    if (!props.data[0]) return null;

    return (
        <div className={styles.filmsListContainer}>
            <span className={styles.listName}>
                Что популярно
            </span>
            {props.selectionTypes && (
                <div className={styles.listSelectionContainer}>
                    <div className={styles.listSelectionBg}
                        style={{
                            width: selectionBgState.current.width,
                            left: selectionBgState.current.left,
                        }}
                    ></div>
                    <ul className={styles.listSelection}>
                        { getSelections(props.selectionTypes) }
                    </ul>
                </div>
            )}
            <div className={styles.listContainer}>
                <TransitionGroup>
                    <Transition
                        key={listState.currentList}
                        timeout={animationDuration}
                        nodeRef={listRef}
                    >
                        {state => {
                            return <ListUl data={listState.listData} type={listState.listType} ref={listRef} animationState={state} animationDuration={animationDuration} />
                        }}
                    </Transition>
                </TransitionGroup>
            </div> 
        </div>
    );
}

export default FilmsList