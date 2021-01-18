## Dreyever; ensuring the aspect ratio
### 2018-09-01

While creating [Dreyever](https://github.com/Devilly/dreyever) we have thought about the different aspect ratios screens can have. Dreyever is a platforming game where horizontal movement is key and making fast, yet calculated decisions should become an important part of the gameplay. With this in mind we decided making the view of the game more wide than high would be a no-brainer. (The other way around the time you have between seeing something appear on screen and having to respond to it would be too short.)

Here rose the question of how to accomplish this. First of all we enforced the phone to be in landscape mode. On a phone with a 4:3 aspect ratio this would still mean a lot of focus would go to the vertical layers in the game instead of the more important horizontal progress one has to make. As we're currently focusing on the Android platform we went looking into its options to enforce a certain aspect ratio.

According to [the official documentation](https://developer.android.com/guide/practices/screens-distribution) it's possible to set a maximum aspect ratio and prevent resizeability. However, on this page it also states following.

> Note: If your app is not resizable, you should test how it behaves on as many devices as possible. Check to see if all controls are visible. Some devices let the user force apps into full screen display, which will resize them.

We want to prevent less than ideal aspect ratios as much as possible. That's why we started searching for a way to set the aspect ratio from within the game itself. [pixelRect](https://docs.unity3d.com/ScriptReference/Camera-pixelRect.html) is one of the available options. This property allows you to define a rectangle in [Screen](https://docs.unity3d.com/ScriptReference/Screen.html) space which the cameras view will be rendered to.

We're aiming for a 16:9 aspect ratio because of the horizontal focus together with the fact that this is a common format. 16:9 can also be written as 16/9 ≈ 1.78. If the screen aspect ratio is smaller than ~1.78 the screen is too high for the aspect ratio. In this case we can set the width of the pixelRect to the screen width and have to calculate the height based on this width.

```
float height = Screen.width / desiredAspectRatio;
Camera.main.pixelRect = Rect(0, (Screen.height - height) / 2, Screen.width, height);
```

desiredAspectRatio is ~1.78, we're using the main camera and we're vertically centering the rect in the available screen space. If the screen aspect ratio would be the bigger than ~1.78 we have to adapt the width of the pixelRect.

```
float width = Screen.height * desiredAspectRatio;
Camera.main.pixelRect = new Rect((Screen.width - width) / 2, 0, width, Screen.height);
```

We now have a [letterboxed](https://en.wikipedia.org/wiki/Letterboxing_(filming)) game which will always have the desired aspect ratio.