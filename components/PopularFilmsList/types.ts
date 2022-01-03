import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from "types";

export interface IPopularFilmsObject {
    popularObj: IPopularFilmsObject
}

export interface IPopularFilmsObject {
    page: number,
    results: ContentDataType[]
    total_results: number
    total_pages: number
}

export interface IPopularFilmsListProps {
    filmsObj: IPopularFilmsObject;
    type: ContentTypes;
}