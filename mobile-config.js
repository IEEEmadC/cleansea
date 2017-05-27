App.info({
  id: 'com.solis.CleanSea',
  name: 'CleanSea',
  description: 'Veja quais praias estão livres de bactérias! Which Beaches are germ-free',
  author: 'Rafael Solis Melo',
  email: 'rsmelo_@hotmail.com',
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi'    : 'mobile_configs/waveIcon.png',
  'android_hdpi'    : 'mobile_configs/waveIcon.png',
  'android_xhdpi'   : 'mobile_configs/waveIcon.png',
  'android_xxhdpi'  : 'mobile_configs/waveIcon.png',
  'android_xxxhdpi' : 'mobile_configs/waveIcon.png',

  'ios_spotlight_2x': 'mobile_configs/waveIcon.png',
  'ios_settings_3x' : 'mobile_configs/waveIcon.png',
  'iphone_2x'       : 'mobile_configs/waveIcon.png',
  'ipad_2x'         : 'mobile_configs/waveIcon.png',
  'iphone_3x'       : 'mobile_configs/waveIcon.png'
  // ... more screen sizes and platforms ...
});
// App.launchScreens({
//   'iphone': 'splash/Default~iphone.png',
//   'iphone_2x': 'splash/Default@2x~iphone.png',
//   // More screen sizes and platforms...
// });
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