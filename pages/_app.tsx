import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { LayoutHeader } from 'components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <LayoutHeader>
            <Component {...pageProps} />
        </LayoutHeader>
    )
}

export default MyApp
