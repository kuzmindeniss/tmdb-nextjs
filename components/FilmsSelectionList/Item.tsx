import Image from 'next/image';
import React from 'react';
import { IDataMovie, IDataTV } from 'types';
import { IFilmItemProps } from './types';
import MovieItem from './MovieItem';
import TVItem from './TVItem';

const Item: React.FC<IFilmItemProps> = (props: IFilmItemProps) => {
    switch(props.type) {
        case "movie":
            return <MovieItem  item={props.item as IDataMovie} />
            break;
        case "tv":
            return <TVItem  item={props.item as IDataTV} />
            break;
        default:
            return null
    }
}

export default Item;