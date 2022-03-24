// documento creado manualmente para setear el cssBaseline, en todos los navegadores se renderizara igual la pagina

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { CssBaseline } from '@nextui-org/react';


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: <>{initialProps.styles}</>
      };
    }
  
    render() {
      return (
        <Html lang="es">
          <Head>{CssBaseline.flush()}</Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
  
  export default MyDocument;

// sobrescribe documento, enriquecer head ... etc
{/* <Html lang="es">
      <Head >
          <title>Hola mundo</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html> */}