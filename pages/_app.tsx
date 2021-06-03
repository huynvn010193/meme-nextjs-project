import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import App, { AppContext, AppProps } from "next/app";
import cookie from "cookie";
import Head from "next/head";
import { useMemo } from "react";
import es6Promise from "es6-promise";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { parseJwt } from "../helpers";

es6Promise.polyfill();

function MyApp({ Component, pageProps, router }: AppProps) {
  const pathname = router.pathname;
  const hiddenFooter = useMemo(() => {
    const excluded = ["/", "/login", "/posts/[postId]"];
    const currentRouter = pathname;
    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname]);

  const hiddenHeader = useMemo(() => {
    const excluded = ["/register", "/login"];
    const currentRouter = pathname;
    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname]);

  return (
    <div id="root">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1, maximum-scale=1"
        />
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Meme Project" />
        <meta name="author" content="etheme.com" />
        <link rel="icon" href="/favicon.ico" />
        <title>Meme Project</title>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="/fonts/font-awesome/css/font-awesome.css"
        />
        <link rel="stylesheet" href="/fonts/emotion/style.css" />

        {/* JAVA SCRIPT */}
        {/* require */}
        {/*  */}
        {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
        {/*[if lt IE 9]>
	      <![endif]*/}
      </Head>
      {!hiddenHeader && <Header />}
      <main>
        <Component {...pageProps} />;
      </main>
      {!hiddenFooter && <Footer />}
    </div>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookieStr = appContext.ctx.req.headers.cookie;
  const token = cookie.parse(cookieStr).token;
  const objUser = parseJwt(token);
  // Check gọi API để user login.
  return { ...appProps };
};

export default MyApp;
