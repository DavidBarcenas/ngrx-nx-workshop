<div align="center">
  <h1>NGRX Workshop</h1>
  <p>Refreshing ngrx concepts with angular to make applications more reactive. This workshop was part of ng-conf 2021 and is taught by Alex Okrushko, a member of the ngrx team.</p>
</div>

<div align="center">
  <img src="./.readme-static/angular.svg" alt="Angular" width="90" />
  <img src="./.readme-static/ngrx.svg" alt="NGRX" width="90" />
  <img src="./.readme-static/nx.svg" alt="NX" width="90" />
</div>

## Features

- Built with [NX](https://nx.dev/), a very useful and powerful tool
- Creation of a store application with an nrgrx architecture
- Description of flows through actions, selectors, effects and much more

## Installation

1. To clone and run this application, you'll need [Git](https://git-scm.com) and
   [Node.js](https://nodejs.org/en/download/) installed on your computer. _Optional_ you can install
   [Yarn](https://yarnpkg.com/getting-started/install).

2. Clone this repository

```bash
git clone https://github.com/DavidBarcenas/ngrx-nx-workshop.git
```

3. Go to project folder

```bash
cd ngrx-nx-workshop
```

4. Install project dependencies

```bash
yarn install
```

5. Run the app (build the code, watch for file changes, and serve up the site locally)

```bash
yarn nx run-many --target=serve --projects=store,api
```

**Note: Install nx globally to invoke the command directly using nx**

## Directories

These are the main directories where we work.

`api` - Backend of our store made with nest.js

`store` - Store built with angular

`libs` - Shared interfaces for the backend and frontend

Feel free to fork this project and improve it. Give a ⭐️ if you like this project!
