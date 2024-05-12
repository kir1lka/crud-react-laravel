import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store, { persistor } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";

import { RouterProvider } from "react-router-dom";
import router from "./Navigation";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>
);
