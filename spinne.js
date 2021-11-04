const puppeteer = require('puppeteer')
const datensatzInstanzen = [
    'https://testinstanz-natfak:8890',
    'https://wp-plugin-lorem-ipsum:8890',];


    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
              
        // Regular expression to identify HTML tags in 
        // the input string. Replacing the identified 
        // HTML tag with a null string.
        return str.replace( /(<([^>]+)>)/ig, '');
    }

datensatzInstanzen.forEach(item => {
    async function getVisual() {
        try {
            const URL = item;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
    
            await page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
            });
            await page.goto(URL);
            
            await page.screenshot({ path: `./Data/${removeTags(item.substring(7))}_screenshot_1920.png` });
            
            const h1 = await page.$eval('h1', el => el.innerText);
            console.log('h1 on ' + item + ' is: ' + h1);

            const h2 = await page.$eval('h2', el => el.innerText);
            console.log('h1 on ' + item + ' is: ' + h2);

            const entry_Text = await page.$eval('p', el => el.innerText);
            console.log('Entry Text is: ' + entry_Text);
    
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