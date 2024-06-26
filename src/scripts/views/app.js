import DrawerInitiator from "../utils/drawer-initiator";
import UrlParser from "../routes/url-parser";
import { routes, checkAccess } from "../routes/routes";

class App {
    constructor({ button, drawer, content }) {
        this._button = button;
        this._drawer = drawer;
        this._content = content;

        this._initialAppShell();

        window.addEventListener('userLoggedIn', () => {
            this.renderPage();
            window.location.reload();
        });
    }

    _initialAppShell() {
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content,
        });
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        if (checkAccess(url)) {
            const page = routes[url];
            this._content.innerHTML = await page.render();
            await page.afterRender();
        }
    }
}

export default App;
