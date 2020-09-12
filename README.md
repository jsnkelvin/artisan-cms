# BoilerplateAngular10

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
boilerplate-angular-10/
  |- mocks/
  |  |- dummy-data.json
  |  |- middleware.js
  |  |- routes.json
  |- src/
  |  |- app/
  |  |  |- pages
  |  |  |  |- <app component per module>
  |  |- shared/
  |  |  |- services
  |  |  |  |- core
  |  |  |  |  |- <core httpclient method>
  |  |  |  |  <service per module>
  |  |  |- guards
  |  |  |  |- <guards for routing (canActivate, canDeactivate, etc)>
  |  |  |- pipes
  |  |  |  |- <custom pipe>
  |  |  |- common
  |  |  |  |- <reusable code>
  |  |  |- models
  |  |  |  |- <interface>
  |  |  |- interceptors
  |  |  |  |- <http interceptor>
  |- assets/
  |  |- <static files>
  |- environments/
  |  |- <env variable>
  |- package.json
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run mock:server` to access dummy data via [JSON Server](https://github.com/typicode/json-server)

## How it works

Run `JSON Server` and serve angular. See an example on example service & home component

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
