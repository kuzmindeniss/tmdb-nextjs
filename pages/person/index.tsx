import { LayoutContent, LayoutError } from "components/Layout";
import PersonInfo from "components/PersonInfo";
import PopularPeopleList from "components/PopularPeopleList";
import { IPopularPeopleObject } from "components/PopularPeopleList/types";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { TMDBErrorObject } from "types";

const Person: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (props.error) return <LayoutError>
        {props.error}
    </LayoutError>

    return (<LayoutContent>
        <PopularPeopleList popularObj={props.peopleObj}/>
    </LayoutContent>)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query.page || "1";
    const peopleRaw = await fetch(`${process.env.URL}/api/get/person/popular/` + page);
    const peopleObj: IPopularPeopleObject | TMDBErrorObject = await peopleRaw.json();
    console.log(peopleObj);

    if ((peopleObj as TMDBErrorObject).errors) return {
        props: {
            error: (peopleObj as TMDBErrorObject).errors[0]
        }
    }
  
    // Pass data to the page via props
    return {
        props: {
            peopleObj
        }
    }
}

export default Person;