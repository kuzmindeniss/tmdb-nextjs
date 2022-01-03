import styles from './MainSlider.module.scss';
import { IMainSliderItemProps } from './types';
import Image from 'next/image';
import Link from 'next/link';

const SliderItem: React.FC<IMainSliderItemProps> = (props: IMainSliderItemProps) => {
    const id = props.item.id;

    return (
        <li className={styles.imgContainer} style={{
            width: props.width
        }}>
            <div className={styles.backgroundContainer}>
                <Image alt="photo" className={styles.img} src={ props.item.imageUrl } layout="fill" />
                <div className={styles.gradient}></div>
            </div>
            <div className={styles.textContainer}>
                <span className={styles.title}>
                    { props.item.title }
                </span>
                <span className={styles.description}>
                    { props.item.description }
                </span>
                <div className={styles.buttons}>
                    <Link href={`/movie/${id}`}>
                        <a className={styles.button}>
                            Детали
                        </a>
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default SliderItem;