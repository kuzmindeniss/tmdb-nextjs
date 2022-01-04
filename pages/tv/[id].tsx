import FilmsSelectionList from "components/FilmsSelectionList";
import { LayoutContent, LayoutError } from "components/Layout";
import RecommendationsList from "components/RecommendationsList";
import TVReview from "components/Review/TV";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { IDataDetailedMovie, IDataTV } from "types";

const TV: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    if (props.error) return (
        <LayoutError>
            <h1>{props.error.status_message}</h1>
        </LayoutError>
    )

    return (<>
        <Head>
            <title>{(props.tv as IDataTV).name || 'Сериал'}</title>
        </Head>
        <TVReview item={props.tv}/>
        <LayoutContent>
            <RecommendationsList data={props.recommendations} type="tv"/>
            <FilmsSelectionList data={props.similar} type="tv" />
        </LayoutContent>
    </>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch data from external API
    const id = context.query.id || " ";
    const tvRaw = await fetch(`${process.env.URL}/api/get/tv/` + id)
    const tv = await tvRaw.json();

    if (tv.success === false) return {
        props: {
            error: tv
        }
    }

    const recommendations = tv.recommendations ? tv.recommendations.results : [];
    const similar = tv.similar ? tv.similar.results : [];

    return {
        props: {
            tv: tv,
            recommendations,
            similar
        }
    }
  }

export default TV;