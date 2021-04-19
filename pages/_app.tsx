import { Header } from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div id="root">
      <Header />
      <Component {...pageProps} />;
    </div>
  )
}

export default MyApp;
