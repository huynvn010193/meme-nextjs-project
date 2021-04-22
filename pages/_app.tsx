import App, { AppContext, AppProps } from 'next/app';
import { Header } from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    <div id="root">
      <Header />
      <Component {...pageProps} />;
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  // Check gọi API để user login.
  return { ...appProps }
}

export default MyApp;
