// rafc

import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Navbar } from '../ui'

interface Props {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

    // const router = useRouter();
    // console.log(router);
    // saco la info del window
    console.log({origin});
    
    

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Frank Fernandez" />
                <meta name="description" content={`Información sobre el pokémon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />

                <meta property="og:title" content={ `Información sobre ${title}` } />
                <meta property="og:description" content={ `Esta es la pñagina sobre ${title}` } />
                <meta property="og:image" content={ `${ origin }/img/banner.jpg` } />
                {/* <meta property="og:image" content="http://localhost:3000/img/banner.jpg" /> */}

            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
