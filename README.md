

# Jeff Waterfall Personal Website (WIP)

## Structure

### Folder
The folder structure follows the [Create React App](https://github.com/facebook/create-react-app) folder structure.

```
/build                    build destination
/public                   static assets (compiled into /build)
/src                      app source code
  ├── /components
  ├── /config
  ├── /containers
  ├── /libs
  ├── /styles
  ├── index.js
  ├── index.scss

```

### Application
```
┌-----------------┐
| index.html      |
|┌---------------┐|   ┌-----------------┐
|| index.js      |--->|                 |
|└---------------┘|   └-----------------┘
|┌---------------┐|
|| main.css      ||
|└---------------┘|
└-----------------┘

index.js
  ├── PrismicApp.js
        ├── App/App.js
          ├── Post
          ├── Posts
          ├── Header
          ├── Footer
```

### Styles
- The global styles are using [SCSS](https://sass-lang.com/)
- React components use [Styled Components](https://www.styled-components.com)
- Sass is compiled via [Node Sass Chokidar](https://www.npmjs.com/package/node-sass-chokidar) CLI
- SCSS and Styled Components variables are shared via a json file (`/src/styles/variables.json`), using [Node Sass json importer](https://www.npmjs.com/package/node-sass-json-importer) (CLI option).

### Install dependencies
```
> $ yarn install
```

### Runs the app in the development mode
Build and open your browser to http://localhost:3000.
```
> $ yarn start
```
Don't clear console buffer
```
> $ FORCE_COLOR=true yarn start | cat
```

### Launches the test runner in the interactive watch mode
```
> $ yarn test
```
Uses [Jest](https://facebook.github.io/jest/)

### Builds the app for production to the build folder
```
> $ yarn build
```

### Dependencies

#### Major
- [`react`](https://github.com/facebook/react)
- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [`prismic`](https://github.com/prismicio/javascript-kit)

#### Minor
- [styled-components](https://github.com/styled-components/styled-components)
- [styled-transition-group](https://github.com/gabiseabra/styled-transition-group)
- [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)
- [node-sass-json-importer](https://github.com/Updater/node-sass-json-importer)
- [react-lazy-load](https://github.com/loktar00/react-lazy-load)
- [react-helmet](https://github.com/nfl/react-helmet)

### Ideas!
- Animations technique:  [FLIPing](https://css-tricks.com/animating-layouts-with-the-flip-technique/)
- More animation: [Pose](https://popmotion.io/pose/)

##### Prismic reactjs-starter Dependencies Status
[![Prismic Dependency Status](https://david-dm.org/prismicio/reactjs-starter.svg)](https://david-dm.org/prismicio/reactjs-starter)
