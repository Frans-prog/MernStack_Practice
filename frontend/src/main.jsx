import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter} from 'react-router-dom'
import * as ReactDOM from 'react-dom/client'
import * as React from 'react'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
