
# A React Native Authentication boilerplate to get you started on your consumer app. 
A shell consumer app with Facebook Auth and Email/Pwd auth using react native, expo, uikitten, and firebase. 

### Live Demo on Expo
![IMAGE ALT TEXT HERE](https://raw.githubusercontent.com/PramodVemulapalli/reactnative-expo-uikitten-firebase-auth/master/assets/icons/expo-min.png)

### Video Demo

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/pDNQ4_IJ9TM/0.jpg)](http://www.youtube.com/watch?v=pDNQ4_IJ9TM)

### **How to Install**

1.  Clone the repository using

    git clone 

2. Change your directory by running `cd reactnative-expo-uikitten-firebase-auth`

3. Run `yarn install` to install all the required packages.

4. Run `sudo chmod -R 777 ./node_modules` in order to open all privileges to the
node_modules folder.

5. Create a firebase instance at firebase.google.com and copy the web app
credentials and paste them in the file config/auth/firebase_info_real.js

![](https://cdn-images-1.medium.com/max/1600/1*kZxubbAasJXYsWKr22Z-Sg.png)

6. On the firebase authentication panel, you need to enable the Email-Password
and Facebook Authentication modes.

![](https://cdn-images-1.medium.com/max/1600/1*MnVh25OBH4y2v8ED0Mj1lQ.png)

7. Create a facebook app at developers.facebook.com and copy the App ID and
paste it in the config/auth/facebook_info_real.js file.

![](https://cdn-images-1.medium.com/max/1600/1*J8L60ymr_PARz-pxXabwqQ.png)

8. Go into Expo XDE ( If you donot already have it then please set it up as
described here [https://expo.io/tools](https://expo.io/tools)) and select open
project and you should be able see the app in your iOS or android simulator or
your mobile device if you have Expo app installed.

![](https://cdn-images-1.medium.com/max/1600/1*Q4G4oFuBkeUIMxlRA4vMlg.png)



### **Overview**

I recently started playing with React Native for Mobile App Development. The
allure of using front-end javascript skills to build mobile apps was too much to
resist and I have always been a huge fan of the React-Redux framework and so I
figured this would be a lot of fun. Stephen Grider’s courses on Udemy ([React
Native](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/overview)
and [Advanced React
Native](https://www.udemy.com/react-native-advanced/learn/v4/overview)) were an
excellent place to start as he covers many common workflows that we see in
consumer apps.

![](https://cdn-images-1.medium.com/max/1200/1*Lzv9CyfcdZqyq1Fgu8Kx1A.png)

Having taken those courses and wanting to put my new found skills to test, I
decided to build a basic consumer app which will take users via a swiper screen,
login via Email/Password or Facebook, and then logout. Such a shell app would be
a first step towards building an MVP (Minimum Viable Produc t) consumer app.
While I found a lot of resources online about how to implement just the
Email/Password page or Facebook authentication, I did not however find a
end-to-end implementation of the authentication workflow that uses Expo and
Firebase and which also has a loading spinner during authentication transitions
etc. It turned out that such an implementation is non-trivial and so I figured I
share my work so that others might benefit or correct me where needed. The
workflow for the app is shown below and the code base is available here:
[https://github.com/PramodVemulapalli/reactnative-expo-uikitten-firebase-auth](https://github.com/PramodVemulapalli/reactnative-expo-uikitten-firebase-auth)

![](https://cdn-images-1.medium.com/max/2000/1*slrjDYveFn6L5qHRg4JZ_w.png)
<span class="figcaption_hack">Workflow of
[reactnative-expo-uikitten-firebase-auth](https://github.com/PramodVemulapalli/reactnative-expo-uikitten-firebase-auth)
App</span>

The core features of the app boilerplate are as follows:

1.  Have a swiper screen that explains the app
1.  Allow the users to Sign in or Sign up with Email-Password or Facebook
1.  Take the user to the main screen where the user can navigate via tabs
1.  Allow the user to logout and bring them back to the swiper screen

This workflow can be seen in many consumer apps such as Doordash or Ubereats and
so on.

![](https://cdn-images-1.medium.com/max/2000/1*XDfhf7k9uH-2BQY59guRBQ.png)
<span class="figcaption_hack">Doordash’s Authentication workflow</span>


### **The Architecture**

The architecture for the app uses React Native for the mobile app and I used the
Expo tools to run react native. Expo’s XDE makes the developer’s life really
easy when it comes to building React Native apps and testing it on different
mobile OS platforms and I was also able to benefit from expo’s minimal Facebook
api that allows you to incorporate Facebook authentication in a simple manner.
On the backend side, I like server-less architectures and Google Firebase’s
real-time database with its built in authentication capabilities, and Google
Cloud functions are awesome tools to build your server-less backend upon. While
I just used the built-in authentication capabilities of Firebase and did not
have to rely on Cloud functions, those could come in handy incase you are
implementing custom authentication workflows. The counterparts for these
technologies in the AWS world would be Amazon Lambda functions and DynamoDB but
those are tools for a different day. In the below diagram, I have laid out the
typical server-based and server-less architectures and the architecture of the
current implementation.

![](https://cdn-images-1.medium.com/max/1600/1*HzRFDR7kiIOYyEEs7S5L9w.png)

### **Prerequisites**

It is important that you have a background in React, Redux, and React Native to
understand the below content and I would suggest Stephen Grider’s courses on
Udemy are a great place to gain more knowledge on those topics. If you are
already familiar with these technologies then let’s dive into the details.

### Key modules used in this implementation

I wanted to go over the contents of the package.json file and explain how they
are used:

1.  Expo — Apart from it’s use as an XDE, I also used the the AppLoading component
in the login screen and the Facebook object in authentication.
1.  React, Redux, React-Redux, React-Thunk, and React-Native — For setting up the
React-Redux-React Native framework for the mobile app.
1.  Firebase — For interacting with Firebase.
1.  React-Navigation — For setting up the stack navigator and tab navigator for the
app. Recommended by Expo.
1.  React-Native-UI-Kitten — I used the kitten theme for the entire project as it
gives the UX a fun fanta color
1.  React-Native-Elements — Used for Buttons and the login form for SignIn and
SignUp.
1.  React-Native-Swiper — For the walk-through swipe screen in the app.
1.  React-Native-Loading-Spinner-Overlay — To show the loading spinner during screen
transitions during authentication workflows.
1.  Validator — To do form validation on the SignIn and SignUp form.
1.  *React-Native-Keyboard-Aware-S*croll-View — This is to automatically scroll the
SignUp Form when the user is inputing values at the bottom of the form.

### **Key Implementation Details**

#### Facebook Login with Firebase

The facebook login screen is triggered by calling
Facebook.logInWithReadPermissionsAsync function provided by Expo in an action
that is triggered when the user presses the ‘login with Facebook’ button on the
app.

    //File Location: /actions/facebook_actions.js 
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(fbappid, {
        permissions: ['public_profile', 'email']
      });

If the token is successfully returned by this function after user login then the
token can be passed to the Firebase using the signInWithCredential function as
shown below.

    //File Location: /action/facebook_actions.js
    var credential = firebase.auth.FacebookAuthProvider.credential(token);
      try {
        await firebase.auth().signInWithCredential(credential);
      } ...

This above code shows how the facebook token obtained by using the Facebook
object in Expo can be used for authentication in Firebase using Facebook Login.

#### Navigate from anywhere

The ability to issue navigation commands from the action creators is very
helpful. This is especially true when using firebase where the callback
functions are directly triggered by firebase upon changes in in authentication
status etc.

This can be accomplished by this elegant code snippet provided here by unexge
[https://github.com/react-community/react-navigation/issues/1439](https://github.com/react-community/react-navigation/issues/1439)

You can pass the top-level navigator to a service and dispatch actions from that
service from within the actions creators.

    // App.js

    import NavigatorService from './utils/navigator';

    ..............

    return (
            <Provider store={this.store}>
              <View style={styles.container}>
                <LoginNavigator
                ref={navigatorRef => {
                  NavigatorService.setContainer(navigatorRef);
                }}/>
              </View>
            </Provider>
          );

### Conclusion

I hope the boilerplate code will help you get a head start on your consumer app.
It would be great if you can provide feedback or would like to collaborate to
improve upon this project. Many thanks to the code contributors to the above
libraries.

### [PramodVemulapalli](https://medium.com/@vpramod1)

A product guy by day, tinkerer by night, and a dreamer by nature

