import { LayoutContent, LayoutError } from "components/Layout";
import PersonInfo from "components/PersonInfo";
import PopularFilmsList from "components/PopularFilmsList";
import { IPopularFilmsObject } from "components/PopularFilmsList/types";
import { IPopularPeopleObject } from "components/PopularPeopleList/types";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { TMDBErrorObject } from "types";

const TV: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (props.error) return <LayoutError>
        {props.error}
    </LayoutError>

    return (<LayoutContent>
        <Head>
            <title>Популярные серилы</title>
        </Head>
        <PopularFilmsList type="tv" filmsObj={props.tvsObj} />
    </LayoutContent>)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query.page || "1";
    const movieRaw = await fetch(`${process.env.URL}/api/get/tv/popular/` + page);
    let tvsObj: IPopularFilmsObject | TMDBErrorObject | null;
    try {
        tvsObj = await movieRaw.json();
    } catch (e) {
        tvsObj = null;
    }

    if (tvsObj !== null && (tvsObj as TMDBErrorObject).errors) return {
        props: {
            error: (tvsObj as TMDBErrorObject).errors[0]
        }
    }
  
    return {
        props: {
            tvsObj: tvsObj
        }
    }
}

export default TV;