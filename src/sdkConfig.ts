// Your SDK settings for browser.
// Replace authorizationKey with your client-side SDK key.
const config: SplitIO.IBrowserSettings = {
  core: {
    authorizationKey: '<your-sdk-key>',
    key: '<customer-key>'
  }
};

export default config;

// Replace the following with the name of your feature flags
export const feature_flag_1 = 'test_feature_flag';
export const feature_flag_2 = 'test_another_flag';
export const feature_flag_3 = 'test_something_else';
