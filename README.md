# Meetapp - Mobile

Mobile APP made for the MeetApp project using React Native.

## What is Meetapp?

- It's an app where the users can sign up for free and create Meetups for other users to join and meet.
- Users can use this app only to subscribe to other users meetups and unsubscribe from them.
- The creation of meetups is made on the MeetApp Web version of the app. You can find it [here](https://github.com/igorsouza-dev/meetapp-frontend).

<div align="center">
<img src="demo.gif" height="400">
</div>

## Where is the backend?

- You can find the backend [here](https://github.com/igorsouza-dev/meetapp-backend).

## Before starting

You should change some files before running the project.
This file should export the base URL of your backend and the [OneSignal](https://onesignal.com/) ID. I'm using OneSignal for the push notifications.
At `src/index.js`:

```
class Index extends Component {
  constructor(props) {
    super(props);
    OneSignal.init('c135a8d2-f0e0-4071-a596-3f56042925c3');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
```

Inform your OneSignal ID at `OneSignal.init('c135a8d2-f0e0-4071-a596-3f56042925c3');`
Then, change the baseURL of axios at `services/api` to your api address.

#### Disclaimer

This project was tested **only** on Android.

---

<div align="center">
This project was made during the Rockeseat's Gostack Bootcamp 8.0 as a challenge in order to get the certification.
</div>
