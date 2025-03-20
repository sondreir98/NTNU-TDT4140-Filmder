# Filmder

Filmder is a social platform designed to simplify movie selection among friends and acquaintances. The platform allows users to easily find and choose movies using recommendations, filtering options, and a swipe function that makes exploring different movies fun and intuitive. With Filmder, users can mark which movies they like and dislike, create movie nights with friends, and see which movies everyone at a gathering can agree on. Filmder facilitates a simple and social experience where you can avoid long discussions about movie selection and instead quickly find a movie everyone wants to see.

By offering multiple filtering and recommendation features, Filmder helps customize the movie selection to the individual user's taste and preferences. The platform creates an engaging experience by facilitating a fun and social process of finding a movie, while also allowing you to keep track of which movies you and your friends have enjoyed.

## Setup

`git clone <url>` - Download the repository to your computer

`cd filmder` - Move into the project

`pnpm install` - Install all packages

`pnpm dev` - Start the app in development mode

## Scripts

`pnpm dev` - Start the app in development mode

`pnpm build` - Build the app for production

`pnpm preview` - Start the production app

`pnpm check` - Check and fix safe linting and format errors

`pnpm check:unsafe` - Check and fix both safe and unsafe linting and format errors

## Recommended VSCode extentions

[Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) - Enable format on save functionality for Biome

[Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) - Makes sure everyone writes consistent git commits

[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Write faster tailwindstyling via autofinishing functionality

[Pretty Typescript Erros](https://marketplace.visualstudio.com/items?itemName=YoavBls.pretty-ts-errors) - Quickly unwrap complex typeerrors in Typescript

[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) and [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) - Write and preview Markdown more easily

[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) - Makes sure everyone writes consistent Markdown

## Libraries and frameworks

[Typescript](https://www.typescriptlang.org/docs/)

[React](https://react.dev/)

[React Router](https://reactrouter.com/start/library/installation)

[Vite](https://vite.dev/guide/)

[Vitest](https://vitest.dev/guide/)

[Biome](https://biomejs.dev/)

[Tailwind](https://tailwindcss.com/docs/)

[Firebase](https://firebase.google.com/docs/web/setup)

[Playwright] (https://playwright.dev/)

## Testing

Run these two commands first;

`pnpm install` - Install all packages including playwright

`npx firebase emulators:start` - Run a firebase emulator so that the tests are run locally

After the emulator is running you can open a new terminal.

Run `pnpm playwright test` to run your tests.

For a single file, run `pnpm playwright test tests/example.spec.ts`

For a specific test, run `pnpm playwright test -g "should login user"`

## Pair programming

After retrospective nr. 1 we have decided to utilize pair programming in future work.
We have decided not to include documentation about this in individual commits in git, to make the commit history as clean as possible.

We have managed to achieve this, and each member has pair programmed with the others members in the group. This text in this readme file serves as documentation for this. In future retrospectives there is a possibility of opening for a discussion about if documentation for pair-programming should be revised, and instead be included in the individual commits as per agile developement.
