App.info({
  id: 'com.solis.CleanSea',
  name: 'CleanSea',
  description: 'Veja quais praias estão livres de bactérias! Find which Beaches are germ-free',
  author: 'Rafael Solis Melo',
  email: 'rsmelo_@hotmail.com',
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi'    : 'mobile_configs/icons/android/icon-48-mdpi.png',
  'android_hdpi'    : 'mobile_configs/icons/android/icon-72-hdpi.png',
  'android_xhdpi'   : 'mobile_configs/icons/android/icon-96-xhdpi.png',
  'android_xxhdpi'  : 'mobile_configs/icons/android/icon-144-xxhdpi.png',
  'android_xxxhdpi' : 'mobile_configs/icons/android/icon-192-xxxhdpi.png',

  'ios_spotlight_2x': 'mobile_configs/icons/ios/icon-57.png',
  'ios_settings_3x' : 'mobile_configs/icons/ios/icon-60-3x.png',
  'iphone_2x'       : 'mobile_configs/icons/ios/icon-80-2x.png',
  'ipad_2x'         : 'mobile_configs/icons/ios/icon-72-2x.png',
  'iphone_3x'       : 'mobile_configs/icons/ios/icon-80-2x.png'
  // ... more screen sizes and platforms ...
});
App.launchScreens({
  'android_mdpi_landscape': 'mobile_configs/screens/android/screen-mdpi-portrait.png',
  'android_mdpi_portrait': 'mobile_configs/screens/android/screen-mdpi-portrait.png',
  'android_hdpi_landscape': 'mobile_configs/screens/android/screen-hdpi-portrait.png',
  'android_hdpi_portrait': 'mobile_configs/screens/android/screen-hdpi-portrait.png',
  'android_xhdpi_portrait': 'mobile_configs/screens/android/screen-xhdpi-portrait.png',

  'iphone_2x': 'mobile_configs/screens/ios/screen-iphone-portrait-2x.png',
  'iphone5': 'mobile_configs/screens/ios/screen-iphone-portrait.png',
  'iphone6': 'mobile_configs/screens/ios/screen-iphone-portrait-667h.png',
  'iphone6p_portrait': 'mobile_configs/screens/ios/screen-iphone-portrait-736h.png',
  // ... more screen sizes and platforms ...
});
// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
// Pass preferences for a particular PhoneGap/Cordova plugin.
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
// // Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// // generated config.xml. 'Universal Links' is shown as an example here.
// App.appendToConfig(`
//   <universal-links>
//     <host name="localhost:3000" />
//   </universal-links>
// `);