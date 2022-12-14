import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/App';
import {MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
                <App/>
            </NotificationsProvider>
        </MantineProvider>
    </React.StrictMode>
);
