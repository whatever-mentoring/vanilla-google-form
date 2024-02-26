// import { router } from "./lib/router";
import { router } from "./lib/router";
import { routes } from "./routes";
import "./styles/index.css";

const app = document.getElementById("app") as HTMLElement;
router(app, routes);
