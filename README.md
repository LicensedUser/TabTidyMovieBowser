START IN CONSOLE: node TabTidyMovieBowser.js

This script automates a Chrome browser session using Puppeteer, with the following functionalities:

    Browser Setup:
        It launches Chrome with a persistent user data directory, enabling saved states like cookies, history, and bookmarks across sessions.
        The browser is started in a non-headless mode, so it is visible for debugging or interactive use.
        Additional browser configurations are applied, such as disabling sandboxing, popups, notifications, and certificate warnings.

    Opening the Initial Page:
        A new browser tab is opened, and it navigates to the URL https://8filmai.dad.
        The viewport of the tab is customized (set to zero dimensions), making its content invisible.

    Tab Management:
        The script retrieves all open tabs. If there are multiple tabs, it closes the first unused one to streamline the session.
        If only one tab is open, it ensures a secondary hidden tab is created, which loads a blank page and makes its content invisible.

    Adding Bookmarks:
        The script programmatically modifies the browser's bookmarks by accessing the "Bookmarks" file stored in the user data directory.
        A new bookmark is added to the browser's bookmark bar, linking to the https://8filmai.dad website.

    HELP ++++ I WAND to add websites like ('https://iwatchsouthpark.com/','https://ww4.123moviesfree.net/movies/','https://fmovies.international/') TO Bookmark Bar AUTOMATICALLY WHEN SCRIPT STARTS

    Managing Open Tabs:
        A periodic check (every 2 seconds) ensures that only the primary tab remains open.
        Any additional tabs are automatically closed, maintaining a clean and minimal browser session.

    Keeping the Browser Open:
        The script prevents itself from terminating, keeping the browser session active indefinitely. This is useful for long-running tasks or ongoing monitoring.

Use Case
This script is ideal for automating browser interactions with persistent states, such as frequent NewTABS\NewWindows\ReddirectAD's\POP-Up's heavily display in these websites.
