import FilmsSelectionList from "components/FilmsSelectionList";
import { LayoutContent, LayoutError } from "components/Layout";
import RecommendationsList from "components/RecommendationsList";
import MovieReview from "components/Review/Movie";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { IDataDetailedMovie } from "types";

const Movie: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (props.error) return (
        <LayoutError>
            <h1>{props.error.status_message}</h1>
        </LayoutError>
    )
    
    return (<>
        <MovieReview item={props.movie}/>
        <LayoutContent>
            <RecommendationsList data={props.recommendations} type="movie"/>
            <FilmsSelectionList data={props.similar} type="movie" />
        </LayoutContent>
    </>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Fetch data from external API
    const id = context.query.id || " ";
    const movieRaw = await fetch(`${process.env.URL}/api/get/movie/` + id);
    const movie = await movieRaw.json();

    if (movie.success === false) return {
        props: {
            error: movie
        }
    }

    const recommendations = movie.recommendations ? movie.recommendations.results : [];
    const similar = movie.similar ? movie.similar.results : [];
  
    return {
        props: {
            movie,
            recommendations,
            similar
        }
    }
  }

export default Movie;