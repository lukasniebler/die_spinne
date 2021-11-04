const puppeteer = require('puppeteer')
const datensatzInstanzen = [
    'https://testinstanz-natfak:8890',
    'https://wp-plugin-lorem-ipsum:8890',];

datensatzInstanzen.forEach(item => {
    async function getVisual() {
        try {
            const URL = item;
            const browser = await puppeteer.launch({
                slowMo: 250,
            });
            const page = await browser.newPage();
    
            await page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
            });
            await page.goto(URL);
            await page.screenshot({ path: `./Data/${item.substring(7)}_screenshot_1920.png` }); //Später Länderkürzel noch optimieren
            const h1 = await page.$eval("h1", el => el.innerText);
            console.log(h1);
    
            await browser.close();
        } catch (error) {
            console.error(error)
        }
    }
    
    getVisual()
});

/*


/**
 * Aufgaben...
 * - a11y
 * - h1 & h2
 * - Bilder Alt-Texte
 * - Screenshot
 * - 
 */