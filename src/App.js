import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Root } from './components/Root';
import { Provider } from 'react-redux';
import { store } from './reducers';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Box className="App">
                    <Root />
                </Box>
            </BrowserRouter>
        </Provider>
    );
}

store.subscribe(() => console.log(store.getState()));
export default App;
