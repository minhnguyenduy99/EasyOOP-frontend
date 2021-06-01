import AOS from "aos";
import "aos/dist/aos.css";
// ..

export default {
  install(Vue) {
    AOS.init({
      once: true
    });
    Vue.prototype.$AOS = AOS;
  }
};
