import { APP_CONFIG } from "@/utils";

/* eslint-disable no-undef */
var auth2;
export function signIn() {
  return new Promise((resolve, reject) => {
    auth2
      .signIn({
        scope: "profile email",
        prompt: "select_account"
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

export const initGoogleSdk = () => {
  const GOOGLE_CLIENT_ID = APP_CONFIG.VUE_APP_GOOGLE_APP_ID;

  gapi.load("auth2", function() {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: GOOGLE_CLIENT_ID,
      // Request scopes in addition to 'profile' and 'email'
      scope: "profile email"
    });
  });
};
