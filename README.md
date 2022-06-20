# Rails 7 with React JSX Components

This repo features React JSX code being used in Rails 7. My project goals were to get React JSX working in Rails, to make a fetch call and POST data back to Rails, to implement CSRF protection, and to implement a CSS style framework (TailwindCSS).

## Features
  - React JSX Hello World route with input box and submit at `http://localhost:3000/helloworld`
  - React JSX New User creation at `http://localhost:3000/users/new`
  - TailwindCSS
  - Postgresql
  - Rails 7

## Ruby version: `3.1.1`

## System dependencies
  - Node v16+
  - Ruby v3
  - Postgresql databse v14

## Configuration
Run `npm i` and then `npm run build` to build the Javascript files.
Run `rails tailwindcss:build` to build the CSS

## Database creation
Edit `config/database.yml` and add your host, port, username, and password.
Run `rails db:create`

## Database initialization
Run `rails db:migrate`

## Start the app
Start your `postgres` database
Run `rails s`

If you are developing run: `bin/dev` to initiate hot loading

## See the results
Goto your browswer and navigate to `http://localhost:3000`
Visit one of the example end points:
  - `http://localhost:3000/helloworld`
  - `http://localhost:3000/users/new`

---

## Manual Setup
If you are just curious how to setup your own Rails 7 app with React JSX components and don't want to clone this repo then follow my actions below. This is how I implemented the first steps of getting a Hello World route with JSX view working.

```shell
rails new myapp --javascript=esbuild --databse=postgresql
cd myapp
gem add react-rails
bundle install
```

`package.json` (insert the snippet below)
```json
  "dependencies": {
    "@hotwired/stimulus": "^3.0.1",
    "@hotwired/turbo-rails": "^7.1.3",
    "esbuild": "^0.14.46",
    "esbuild-plugin-import-glob": "^0.1.1",
    "esbuild-rails": "^1.0.3",
    "react": "^17.0.2",
    "react_ujs": "^2.6.1",
    "react-dom": "^17.0.2"
  },
  "scripts": {
    "build": "./esbuild.config.js",
    "watch": "./esbuild.config.js --watch"
  }
```

```shell
npm i
touch esbuild.config.js
```

Be sure to set `#!/usr/local/bin/node` below to the path of your node install.
You can find it with `which node`

`esbuild.config.js`
```javascript
#!/usr/local/bin/node
const path = require('path');
const rails = require('esbuild-rails');
const ImportGlobPlugin = require('esbuild-plugin-import-glob').default;

require('esbuild')
  .build({
    entryPoints: ['application.js'],
    bundle: true,
    sourcemap: true,
    watch: process.argv.includes('--watch'),
    outdir: path.join(process.cwd(), 'app/assets/builds'),
    absWorkingDir: path.join(process.cwd(), 'app/javascript'),
    loader: { '.js': 'jsx' },
    publicPath: 'assets',
    plugins: [rails(), ImportGlobPlugin()],
  })
  .catch(() => process.exit(1));
```

```shell
rails g controller helloworld
```

`app/controllers/helloworld_controller.rb`
```ruby
class HelloworldController < ApplicationController
  def index
  end
end
```

```shell
touch app/view/helloworld/index.html.erb
```

`app/view/helloworld/index.html.erb`
```html
<h1>Hello World from Rails!</h1>
<%= react_component("HelloWorld") %>
```

```shell
mkdir app/javascript/components
touch app/javascript/components/HelloWorld.jsx
touch app/javascript/components/index.js
```

`app/javascript/components/HelloWorld.jsx`
```jsx
import React from 'react';

export default function HelloWorld() {
  return <h1>Hello World from Reactjs!</h1>;
}
```

`app/javascript/components/index.js`
```javascript
import components from './**/*.jsx';

let componentsContext = {};
components.forEach(component => {
  componentsContext[component.name.replace('.jsx', '').replace(/--/g, '/')] =
    component.module.default;
});

const ReactRailsUJS = require('react_ujs');

ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
ReactRailsUJS.handleEvent('turbo:load', ReactRailsUJS.handleMount, false);
ReactRailsUJS.handleEvent('turbo:frame-load', ReactRailsUJS.handleMount, false);
ReactRailsUJS.handleEvent(
  'turbo:before-render',
  ReactRailsUJS.handleUnmount,
  false
);
```

`app/javascript/application.js`
```javascript
// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import './controllers';
import './components';
```

`config/routes.rb`
```ruby
Rails.application.routes.draw do
  get 'helloworld', to: 'helloworld#index'
end
```

`config/database.yml`
```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  host: <YOUR DB HOST HERE>
  port: <YOUR DB PORT HERE>
  username: <YOUR DB USER HERE>
  password: <YOUR DB PASSWORD HERE>
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: reactrails_development
```

That's it! Enjoy!