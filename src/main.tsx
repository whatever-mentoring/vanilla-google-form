import { createRoot } from "./lib/dom";
import App from "./app";

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
