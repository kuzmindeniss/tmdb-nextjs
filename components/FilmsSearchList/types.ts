import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from "types";

export type SearchListSlugs = "movies" | "tv-shows"

export interface IFilmsSearchList {
    initialData: ContentDataType[]
    initialType: ContentTypes
}

export interface IListUlProps {
    data: ContentDataType[]
    type: ContentTypes
    animationDuration: number
    animationState: string
}

export interface IFilmsSearchItemProps {
    item: ContentDataType
    type: ContentTypes
}

export interface IFilmsSearchMovieItemProps {
    item: IDataMovie
}

export interface IFilmsSearchTVItemProps {
    item: IDataTV
}