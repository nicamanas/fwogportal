import { Outlet } from 'react-router-dom'
import { Modals } from '@generouted/react-router'

import ResponsiveAppBar from '../components/ResponsiveAppBar';

// display navigation bar throughout app
export default function App() {
  return (
    <div>
      <header>
        <ResponsiveAppBar/>
      </header>
      
      <main style={{ margin: 20 }}>
        <Outlet/>
      </main>

      <Modals/>
    </div>
  )
}