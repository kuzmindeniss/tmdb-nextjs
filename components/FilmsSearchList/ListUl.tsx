import React from 'react';
import styles from './FilmsSearchList.module.scss'
import Item from './Item';
import { IListUlProps } from './types';

const ListUl: React.FC<IListUlProps> = React.forwardRef<HTMLUListElement, IListUlProps>(function ListUlForward(props: IListUlProps, ref) {
    const getItems = (): JSX.Element[] => {
        const items: JSX.Element[] = props.data.map((item, idx) => {
            return <Item item={item} type={props.type} key={item.id}/>
        })

        return items;
    }

    const defaultStyle = {
        transition: `all ${props.animationDuration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles: {
        [key: string]: {
            [key: string] : number | string
        }
    } = {
        entering: {
            opacity: 1,
            transform: "scale(.001)"
        },
        entered:  {
            opacity: 1,
            transform: "scale(1)",
        },
        exiting:  {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            transform: "scale(.001)"
        },
        exited:   {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0
        },
    };

    if (!props.data[0]) return <div className={styles.listContainer}>
        <h2 style={{
            ...defaultStyle,
            ...transitionStyles[props.animationState]
        }}>Ничего не найдено</h2>
    </div>

    return <div className={styles.listContainer}>
            <ul className={styles.list} ref={ref} style={{
                ...defaultStyle,
                ...transitionStyles[props.animationState]
            }}>
                { getItems() }
            </ul>
        </div>
    
});

ListUl.displayName = 'ListUl';

export default ListUl;