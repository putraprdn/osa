import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
