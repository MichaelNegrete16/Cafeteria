import '../styles/globals.css'
import { QuiescoProvider } from '../context/QuiescoProvider'

function MyApp({ Component, pageProps }) {
  return (
    <QuiescoProvider>
      <Component {...pageProps} />
    </QuiescoProvider>
  )
}

export default MyApp
