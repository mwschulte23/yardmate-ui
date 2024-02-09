import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      "phc_HtwVBn8TwZB5yKHakukzUI1rlLnCmh9ySFND2KcS4ia", // TODO replace w/ env
      {
        api_host: "https://app.posthog.com",
      }
    );
  },
};