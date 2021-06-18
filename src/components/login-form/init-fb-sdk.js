import { APP_CONFIG } from "@/utils";

/* eslint-disable no-undef */
const facebookAppId = APP_CONFIG.VUE_APP_FACEBOOK_APP_ID;

export function initFacebookSdk() {
  return new Promise(resolve => {
    // wait for facebook sdk to initialize before starting the vue app
    window.fbAsyncInit = function() {
      FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: "v10.0"
      });

      FB.AppEvents.logPageView();

      // // auto authenticate with the api if already logged in with facebook
      // FB.getLoginStatus(({ authResponse }) => {
      //   console.log(authResponse);
      //   resolve({ authResponse });
      // });
    };

    // load facebook sdk script
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}
