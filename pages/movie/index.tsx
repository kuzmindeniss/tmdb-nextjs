import { LayoutContent, LayoutError } from "components/Layout";
import PersonInfo from "components/PersonInfo";
import PopularFilmsList from "components/PopularFilmsList";
import { IPopularFilmsObject } from "components/PopularFilmsList/types";
import PopularPeopleList from "components/PopularPeopleList";
import { IPopularPeopleObject } from "components/PopularPeopleList/types";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { TMDBErrorObject } from "types";

const Movie: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (props.error) return <LayoutError>
        {props.error}
    </LayoutError>

    return (<LayoutContent>
        <Head>
            <title>Популярные фильмы</title>
        </Head>
        <PopularFilmsList filmsObj={props.moviesObj} type="movie" />
    </LayoutContent>)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query.page || "1";
    const movieRaw = await fetch(`${process.env.URL}/api/get/movie/popular/` + page);
    const filmsObj: IPopularFilmsObject | TMDBErrorObject = await movieRaw.json();
    console.log(filmsObj);

    if ((filmsObj as TMDBErrorObject).errors) return {
        props: {
            error: (filmsObj as TMDBErrorObject).errors[0]
        }
    }
  
    return {
        props: {
            moviesObj: filmsObj
        }
    }
}

export default Movie;