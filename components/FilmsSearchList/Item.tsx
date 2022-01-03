import { IDataMovie, IDataTV } from 'types';
import MovieItem from './MovieItem';
import TVItem from './TVItem';
import { IFilmsSearchItemProps } from './types';

const Item: React.FC<IFilmsSearchItemProps> = (props: IFilmsSearchItemProps) => {
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