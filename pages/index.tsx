import FilmsSelectionList from 'components/FilmsSelectionList'
import MainSlider from 'components/MainSlider'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { ISliderItem } from 'components/MainSlider/types';
import { LayoutContent } from 'components/Layout';

const Home: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const sliderData: ISliderItem[] = [
        {
            title: "Матрица: Воскрешение",
            description: "Продолжение истории, рассказанной в первом фильме \"МАТРИЦА\", воссоединяющее кинематографических картин Нео и Тринити, когда они отправляются обратно в Матрицу и еще глубже в кроличью нору. Новое захватывающее приключение с действием и эпическим масштабом, действие которого разворачивается в знакомом, но еще более провокационном мире, где реальность более субъективна, чем когда-либо, и все, что требуется, чтобы увидеть правду, - это освободить свой разум.",
            imageUrl: "/slider_img/first.jpg",
            id: 624860,
        },
        {
            title: "Обитель зла: Раккун-Сити",
            description: "Раккун-Сити, где когда-то располагался фармацевтический гигант Umbrella и вовсю бурлила жизнь, превратился в город-призрак. Компания давно переехала, но на ее месте глубоко под землей набирает силу великое зло. Когда оно вырвется на свободу, единственный шанс выжить уцелевшей горстке людей — сплотиться и узнать всю правду о корпорации Umbrellа.",
            imageUrl: "/slider_img/second.jpg",
            id: 460458,
        },
        {
            title: "Дюна",
            description: "Наследник знаменитого дома Атрейдесов Пол отправляется вместе с семьёй на одну из самых опасных планет во Вселенной — Арракис. Здесь нет ничего, кроме песка, палящего солнца, гигантских чудовищ и основной причины межгалактических конфликтов — невероятно ценного ресурса, который называется меланж. В результате захвата власти Пол вынужден бежать и скрываться, и это становится началом его эпического путешествия. Враждебный мир Арракиса приготовил для него множество тяжёлых испытаний, но только тот, кто готов взглянуть в глаза своему страху, достоин стать избранным.",
            imageUrl: "/slider_img/third.jpg",
            id: 438631,
        }
    ];


    return (<LayoutContent>
        <MainSlider items={sliderData} intervalMs={10000} sizes={{ height: 675, width: 1200 }} />
        <FilmsSelectionList data={props.movies} firstSelectionType="tvs-popular-online" type="tv" selectionTypes={["tvs-popular-online", "tvs-popular-forrent", "tvs-popular-ontv"]} />
    </LayoutContent>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const moviesRaw = await fetch(`${process.env.URL}/api/get-tvs/popular/online`);
    const movies = await moviesRaw.json();
    return {
        props: {
            movies
        },
    }
}


export default Home;