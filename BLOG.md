# Development Blog

## 2019-Apr-24 @tailorvj

Microphone was blocked by Chrome due to security policy. I added a click event listener to mic.js that enables the AudioContext. 

Details about Chrome's AudioContext security policy:

https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

On top of that, I had to provide startMic() with an AudioContext from Microphone() instead of a new AudioContext() to make it work. 

## 2019-Apr-22 @tailorvj

I'm starting to integrate rbvj as a FullPageOS app. 

Current Features:

* Opens up on patch /0/0/20 by default
* Deploys to Heroku

Demo URL

https://sheltered-island-26844.herokuapp.com
