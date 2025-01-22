const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  // Path to your custom user data directory
  const userDataDir = path.join(__dirname, 'chrome-user-data');

  const browser = await puppeteer.launch({
    executablePath: '/home/sasha/.cache/puppeteer/chrome/linux-132.0.6834.83/chrome-linux64/chrome',
    headless: false, // Keep the browser visible
    defaultViewport: null,
    userDataDir: userDataDir, // Use a persistent user data directory
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-popup-blocking',
      '--ignore-certificate-errors',
      '--disable-notifications'
    ]
  });

  // Open the first page
  const firstPage = await browser.newPage();
  await firstPage.goto('https://8filmai.dad');
  console.log('First page loaded.');
  await firstPage.setViewport({ width: 0, height: 0 });

  // Get all open tabs (pages)
  const pages = await browser.pages();

  if (pages.length > 1) {
    // Close the first unused tab
    await pages[0].close();
    console.log('First unused tab closed.');
  } else {
    // Open a new hidden tab
    const newTab = await browser.newPage();
    await newTab.setViewport({ width: 1, height: 1 }); // Minimize the tab's visibility
    await newTab.goto('about:blank'); // Load a blank page to avoid potential navigation issues

    // Ensure the body is available before modifying its style
    await newTab.waitForSelector('body');
    await newTab.evaluate(() => {
      document.body.style.visibility = 'hidden'; // Hide contents
    });

    console.log('A hidden tab has been opened.');
  }

  // Path to the Bookmarks file inside the user data directory
  const bookmarksFilePath = path.join(userDataDir, 'Default', 'Bookmarks');

  // Add a bookmark programmatically
  const addBookmark = () => {
    fs.readFile(bookmarksFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading bookmarks file:', err);
        return;
      }

      const bookmarks = JSON.parse(data);

      // Add a new bookmark
      bookmarks.roots.bookmark_bar.children.push({
        type: 'url',
        name: '8Filmai',
        url: 'https://8filmai.dad'
      });

      // Save the updated bookmarks
      fs.writeFile(bookmarksFilePath, JSON.stringify(bookmarks, null, 2), (err) => {
        if (err) {
          console.error('Error writing bookmarks file:', err);
        } else {
          console.log('Bookmark added.');
        }
      });
    });
  };

  // Call function to add a bookmark
  addBookmark();

  // Your existing code for managing tabs and closing unused ones
  const checkTabsLoop = async () => {
    setInterval(async () => {
      const pages = await browser.pages(); // Get all open pages/tabs
      if (pages.length > 1) {
        // Close any extra tabs/windows
        for (let i = 1; i < pages.length; i++) {
          if (!pages[i].isClosed()) {
            await pages[i].close();
            console.log(`Closed extra tab/window: ${await pages[i].url()}`);
          }
        }
      } else {
        console.log('Only the first tab is open.');
      }
    }, 200); // Check every 2 seconds
  };

  checkTabsLoop(); // Start the loop

  console.log('Browser is running. Bookmarks should be saved.');

  // Keep the browser open indefinitely
  await new Promise(() => {}); // Prevents the script from exiting
})();
