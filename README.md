# Portfolio Insights

Portfolio Insights is a [React](https://facebook.github.io/react/) app that
graphs stock value vs. sentiment over time. It can also pull in news articles
and twitter sentiment and generate fun bubble charts.

In its current form, the app can run on the web and natively on iOS and
Android. All of the application logic is shared across the three platforms. The
only platform-specific code is the actual rendering. This allows each platform
to have a UI that's tailored towards it while still sharing code from platform
to platform.

## Directory Structure

`web`, `ios`, and `android` directories house the boilerplate project project
files necessary to run/compile in different forms (web vs native).

The application code can be found in the `app` directory. Everything under the
`app` directory except the `native` and `web` directories is shared across web
and native apps. This means when we fix a bug in one place, it'll get fixed on
all three platforms!

The rest of the app is structured using the client code from my
[react-redux-webpack-boilerplate](https://github.com/kauffecup/react-redux-webpack-boilerplate).
For more info on the technologies used read that!

## Running the apps

Prerequisites:

  1. Have node!
  1. `npm install`

### Web

To run in "development mode", simply:

```sh
npm run web-dev
```

Then all you need to do is hit `localhost:3001`.

In development mode, react modules and redux reducers are hot-reloaded -
whenever you hit save it pops them into the browser without you needing to
refresh the page.

To create and run a production bundle, simply:

```sh
npm run web-bundle
```

This will create a `bundle.js` file as a sibling to `index.html` under
`web/public`. You will then need to serve these two files using a static
resource server. That's it!

### iOS

  1. Xcode 7.0 or higher is required
  1. `npm install -g react-native-cli`
  1. Open `ios/PortfolioInsights.xcodeproj`

#### To run in "development mode" (using the simulator).

  1. Hit ⌘-R in your iOS simulator to reload the app and see your change!
     (alternatively you can hit the play button). When you make changes to
     your application JS all you need to do is hit ⌘-R on the simulator and your
     changes will magically be there.

#### To create the production bundle

  1. `npm run ios-bundle`

#### To run the production bundle in the simulator

  1. Navigate to `ios/AppDelegate.m`
  1. Comment out line 34:

```objective-c
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
```

  1. Uncomment out line 42:

```objective-c
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

  1. What this just did was point the xcode project to the bundle you built from
     running `npm run ios-bundle` instead of from server kicked off by react
     packger when just hitting run.
  1. Now either hit ⌘-R or hit the play button to run your codes

#### To run the production bundle on an actual device

  1. Follow all the same steps as above.
  1. In Xcode, change the device from the simulator to your device
  1. Under `product > scheme` click `edit scheme` (⌘<) and change from `debug`
     to `release`
  1. Hit either ⌘-R or the play button to build the app and run it on your
     device

[More Info + Troubleshooting](http://facebook.github.io/react-native/docs/running-on-device-ios.html#content)

### Android

Not yet fully supported. Don't even try it!

## Dot Files

  1. .editorconfig - maintain consistent coding styles across IDEs.
    [official website](http://editorconfig.org/)
  1. .eslintrc - pluggable JS linter. config is based on AirBnbs rules, with
    a twist! [offical website](http://eslint.org/)
  1. .flowconfig - static JS type checker. currently not using it, but this file
    was autogenerated. perhaps one day i'll use it!
    [official website](http://flowtype.org/)
