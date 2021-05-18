Some years ago Bas Goverde, of [Mr. X2 Studios](https://play.google.com/store/apps/developer?id=Mr.+X2+Studios), and I worked on a proof of concept game called [Cardventure](https://github.com/Devilly/cardventure). While this has never been released we enjoyed playing it quite a bit.

This is a port of the Unity game into JavaScript, making the game playable almost always and everywhere.

```javascript

(await import(`../posts/${postIdentifier}/js/main.js`)).default({
    canvas,
    postIdentifier
})

```
