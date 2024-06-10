import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";

class App {
    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url];
        const mainContent = document.querySelector('#mainContent');
        mainContent.innerHTML = await page.render();
        await page.afterRender();
    }
}

export default App;
