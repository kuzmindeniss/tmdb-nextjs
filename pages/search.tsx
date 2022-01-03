import FilmsSearchList from "components/FilmsSearchList";
import { LayoutContent } from "components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { IDataMovie } from "types";

const Search: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (<LayoutContent>
        <FilmsSearchList initialType="movie" initialData={props.movies}/>
    </LayoutContent>)
}

export const getServerSideProps: GetServerSideProps  = async (context) => {
    let name = '';
    if (context.query.q) name = encodeURI(context.query.q as string);
    const moviesRaw = await fetch(`${process.env.URL}/api/search/movies/` + name);
    const movies = await moviesRaw.json();

    if (movies.sucess === false) return {
        props: {
            movies: []
        }
    }

    return {
        props: {
            movies
        },
    }
}

export default Search;