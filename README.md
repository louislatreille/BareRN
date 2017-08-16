# BareRN

Instructions to follow to make everything work

1. Project configuration
1.1. Run react-native init "AppName"
1.2. cd AppName
1.3. Run npm install react-native-admob
1.4. Run npm install react-native-google-signin
1.5. Run npm install aws-sdk
1.6. Run npm install react-navigation
1.6. Copy android/settings.gradle
1.7. Copy android/build.gradle
1.8. Copy android/app/build.gradle
1.9. Copy android/app/src.../MainApplication.java
1.10. Copy index.android.js
1.11. Rename component in main index.js (app/index.js)
1.12. Relink the component in index.android.js
1.13. Copy this project app folder into the new project
2. Google Signin configuration
2.1. Register your google signin app (https://console.developers.google.com/apis/dashboard, https://developers.google.com/identity/sign-in/android/start-integrating)
2.2. Update google-services.json (android/app/)
2.3. Update google signin webClientId (app/screens/SigninScreen.js)
3. Admob configuration
3.1. Register an app in admob
3.2. Change the ad unit ID in app/screens/SigninScreen.js
4. Amazon Cognito configuration
4.1. Register a new amazon cognito application
4.2. Update the IdendityPoolId (app/screens/SigninScreen)
5. AWS dynamoDB configuration
5.1. Create desired tables in dynamoDB