

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
  ├── /scss
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

### Install dependencies
```
> $ yarn install
```

### Runs the app in the development mode
Build and open your browser to http://localhost:3000.
```
> $ yarn start
```

### Launches the test runner in the interactive watch mode
```
> $ yarn test
```

### Builds the app for production to the build folder
```
> $ yarn build
```

### Dependencies

- [`react`](https://github.com/facebook/react)
- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [`prismic`](https://github.com/prismicio/javascript-kit)

[![Prismic Dependency Status](https://david-dm.org/prismicio/reactjs-starter.svg)](https://david-dm.org/prismicio/reactjs-starter)
