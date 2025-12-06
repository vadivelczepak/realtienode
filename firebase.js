const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
  type: process.env.FIREBASE_type,
  privatekey_id: process.env.FIREBASE_private_key_id,
  private_key:  process.env.FIREBASE_private_key,
  client_email: process.env.FIREBASE_client_email,
  client_id: process.env.FIREBASE_client_id,
  auth_uri: process.env.FIREBASE_auth_uri,
  token_uri: process.env.FIREBASE_token_uri,
  auth_provider_cert_url: process.env.FIREBASE_auth_provider_x509_cert_url,
  client_cert_url: process.env.FIREBASE_client_x509_cert_url,
  universe_domain: process.env.FIREBASE_universe_domain,
  }),
});

const db = admin.firestore();
module.exports = db;
