const puppeteer = require("puppeteer");

// Data for generating content
const details = [
  {
    title: "Best Headphones to buy in 2021",
    asin: [
      "B00XBC3BF0",
      "B08P329YL4",
      "B08HMWZBXC",
      "B08T9L3YK8",
      "B092HFX4DN",
      "B08SBW2T8V",
      "B08TBXT2QG",
      "B07TC1GC68",
      "B08R59YH7W",
      "B08TQPZV5S",
      "B093K7YD89",
    ],
  },
  {
    title: "Best knives to buy in 2021",
    asin: [
      "B00XBC3BF0",
      "B08P329YL4",
      "B08HMWZBXC",
      "B08T9L3YK8",
      "B092HFX4DN",
      "B08SBW2T8V",
      "B08TBXT2QG",
      "B07TC1GC68",
      "B08R59YH7W",
      "B08TQPZV5S",
      "B093K7YD89",
    ],
  },
];

// for each item of array
// log the title
// log each asin one by one
function looper(arr) {
  console.log("Start");
  for (let i = 0; i < arr.length; i++) {
    let newArr = arr[i];
    (async () => {
      const url = "https://rezathematic.github.io/formtest/"; // get URL
      const browser = await puppeteer.launch({ headless: false }); // launch chrome
      const page = await browser.newPage(); // create new page
      await page.goto(url, { waitUntil: "networkidle2" }); // enter the URL
      await page.type("#name", newArr.title); // Type in the post Title
      console.log(`Entered title: ${newArr.title}`);
      // Type inside the WYSIWYG
      //   const editFrame = await page
      //     .frames()
      //     .find((f) => f.name() === "acf-editor-40_ifr");
      //   const frameInputContent = await editFrame.$("#tinymce");
      // Loop over the Array and type details for each ASIN number
      for (let j = 0; j < newArr.asin.length; j++) {
        console.log(j + 1);
        let productTitle = await page.type(
          "#textarea",
          `${j + 1}. [amazon fields="${newArr.asin[j]}" value="title"]`
        );
        await page.type("#textarea", String.fromCharCode(13));

        let productButton = await page.type(
          "#textarea",
          `[amazon fields="${newArr.asin[j]}" value="button"]`
        );
        await page.type("#textarea", String.fromCharCode(13));

        let productDescription = await page.type(
          "#textarea",
          `[amazon fields="${newArr.asin[j]}" value="description"]`
        );
        await page.type("#textarea", String.fromCharCode(13));

        console.log(`Entered ASIN: ${j}`);
      }
      //   await page.click('input[type="submit"]');
    })();
    console.log("Logged all the items");
  }
}

looper(details);
