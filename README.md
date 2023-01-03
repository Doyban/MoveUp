## 1. Install dependencies:

Navigate to the project repo directory.

Run:

```npm install```

assuming node installed in PC.

## 2. Run the development server:

Run:

```npm run dev```

This will run a server so game automatically opens in your defualt browser with browser-sync properties. It will also start a watch process, so you can change the source and the process will recompile and refresh the browser automatically.

### Android vs iOS differences

1. In App Purchases (IAP): `Android` requires to have `store.refresh()` **after**  `store.order()`. On the other hand, `iOS` will work only in the opposite order with the `store.refresh()` being placed **before** `store.register()`. It can be easily debugged what the server returns using `JSON.stringify(store.products)` on a real device with `Android Studio`/`Xcode` as per https://github.com/j3k0/cordova-plugin-purchase/issues/1241#issuecomment-1365849897.
2. "x" button in main menu: `iOS` should **not** have it, whereas `Android` should have.
