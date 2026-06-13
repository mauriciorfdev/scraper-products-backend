import puppeteer from 'puppeteer-core';

function onlyMainProduct(mainProduct, product) {
  let isOnlyMainProduct = true;
  const otherProducts = ['FIDEO', 'PASTA'];
  product = product.toUpperCase();
  otherProducts.forEach((p) => {
    if (product.includes(p) || product.includes(p + 'S')) {
      isOnlyMainProduct = false;
      return isOnlyMainProduct;
    }
  });
  return isOnlyMainProduct;
}

async function scrapeService() {
  const url = 'https://super.lider.cl/search?q=salsa+de+tomate';

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH,
    headless: false, // Run with a visible UI
  });

  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'upgrade-insecure-requests': '1',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,en;q=0.8',
  });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('[data-testid="item-stack"]');

  const productsLinks = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('div[data-testid="item-stack"] a'),
    ).map((link) => {
      return { text: link.innerText, href: link.href };
    });
  });

  const filteredProductsLinks = productsLinks.filter((link) =>
    onlyMainProduct('SALSA', link.text),
  );
  /* console.log('filtered:', filteredProductsLinks);
  console.log('filtered length:', filteredProductsLinks.length); */

  let products = [];

  for (let newLink of filteredProductsLinks) {
    const newTab = await browser.newPage();
    await newTab.goto(newLink.href, { waitUntil: 'networkidle2' });

    await newTab.waitForSelector('.pb2');

    let result = await newTab.evaluate(() => {
      const name = document.querySelector('h1').innerText;
      const brand = document.querySelector('a[data-seo-id]').innerText;
      const sections = Array.from(document.querySelectorAll('.pb2'));
      const ingSection = sections.filter(
        (elem) => elem.querySelector('h3')?.innerText === 'Ingredientes',
      );
      const ingredients =
        ingSection.length == 0
          ? ''
          : ingSection[0].querySelector('span').innerText;
      return { name, brand, ingredients };
    });
    result.sourceUrl = newLink.href;
    products.push(result);
    await newTab.close();
  }

  await browser.close();
  return products;
}

export { scrapeService };
