import { useEffect } from "react";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/index.css';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600&family=Josefin+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600&family=Lobster&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
}
