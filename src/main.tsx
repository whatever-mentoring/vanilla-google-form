import App from "./app";
import { render } from "./lib/dom";

const app = document.getElementById("app") as HTMLElement;
render(app, App);
