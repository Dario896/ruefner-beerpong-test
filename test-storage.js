'use strict';
// Only loaded by the test app. Isolates the app's local DB from the production app.
(() => {
  const originalKey = 'ruefner-pong-v1';
  const testKey = 'ruefner-pong-test-v1';
  const originalGet = Storage.prototype.getItem;
  const originalSet = Storage.prototype.setItem;
  const originalRemove = Storage.prototype.removeItem;
  const originalKeyMethod = Storage.prototype.key;
  const mapKey = (storage, key) => storage === window.localStorage && String(key) === originalKey ? testKey : key;
  Storage.prototype.getItem = function(key) { return originalGet.call(this, mapKey(this,key)); };
  Storage.prototype.setItem = function(key,value) { return originalSet.call(this, mapKey(this,key),value); };
  Storage.prototype.removeItem = function(key) { return originalRemove.call(this, mapKey(this,key)); };
  // Do not migrate existing shared data: it may contain production profiles.
})();
