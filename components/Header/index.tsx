import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const [searchQueryValue, setSearchQueryValue] = useState('');
    const router = useRouter();

    const logoPath = "/svgs/logo.svg";
    const searchSvgPath = "/svgs/search.svg";
    
    const searchSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        router.push({
            pathname: '/search',
            query: {
                q: searchQueryValue
            }
        });
    }

    const changeSearchForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryValue(e.target.value);
    }

    const getSearchForm = (props: {isMobile?: boolean; isDesktop?: boolean}): JSX.Element => {
        return <div className={classNames(styles.searchContainer, {
            [styles.searchContainerDesktop]: props.isDesktop,
            [styles.searchContainerMobile]: props.isMobile
        })}>
            <form className={styles.searchForm} onSubmit={searchSubmit}>
                <input className={styles.searchInput} type="text" name="search" placeholder="Поиск" onChange={changeSearchForm} value={searchQueryValue}/>
                <button className={styles.searchButton}>
                    <Image src={searchSvgPath} width={18} height={18} />
                </button>
            </form>
        </div>
    }

    return (<header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <div className={styles.left}>
                    <Link href="/">
                        <a className={styles.logoWrapper}>
                            <Image src={logoPath} width={154} height={20} />
                        </a>
                    </Link>
                </div>
                { getSearchForm({isDesktop: true}) }
                <div className={styles.right}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link href="/movie">
                                <a className={styles.itemHref}>Фильмы</a>
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link href="/tv">
                                <a className={styles.itemHref}>Сериалы</a>
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link href="/person">
                                <a className={styles.itemHref}>Актеры</a>
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.containerBottom}>
                { getSearchForm({isMobile: true}) }
            </div>
        </div>
    </header>)
}

export default Header;