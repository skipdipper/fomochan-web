import Layout from '../common/components/Layout'
import { UserContext } from '../common/context/UserContext'
import '../styles/globals.css'

import { useState, useMemo } from "react"


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  // const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* </UserContext.Provider><UserContext.Provider value={userValue}> */}

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}



export default MyApp
