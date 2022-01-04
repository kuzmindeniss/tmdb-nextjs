import FilmsSelectionList from "components/FilmsSelectionList";
import { LayoutContent, LayoutError } from "components/Layout";
import PersonInfo from "components/PersonInfo";
import RecommendationsList from "components/RecommendationsList";
import MovieReview from "components/Review/Movie";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { IDataActor, IDataDetailedMovie } from "types";

const Person: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (props.error) return (
        <LayoutError>
            <h1>{props.error.status_message}</h1>
        </LayoutError>
    )

    return (<LayoutContent>
        <Head>
            <title>{(props.actor as IDataActor).name || 'Актер'}</title>
        </Head>
        <PersonInfo item={props.actor} tvCredits={props.tvCredits} movieCredits={props.movieCredits}/>
    </LayoutContent>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch data from external API
    const id = context.query.id || " ";
    const actorRaw = await fetch(`${process.env.URL}/api/get/person/` + id);
    const actor = await actorRaw.json();

    if (actor.success === false) return {
        props: {
            error: actor
        }
    }
  
    // Pass data to the page via props
    return {
        props: {
            actor,
            tvCredits: actor.tv_credits,
            movieCredits: actor.movie_credits
        }
    }
}

export default Person;