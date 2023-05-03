import { App } from "vue";

export const registerDirectives = (app: App) => {
    app.directive('scroll', {
        mounted(el: HTMLElement, binding) {
            binding.value();
            const callBack = () => {
                const result = el.scrollHeight - el.scrollTop === el.clientHeight;
                if (result) {
                    binding.value();
                }
            }
            el.addEventListener("scroll", callBack);
        }
    })
    app.directive('lazy', {
        async mounted(el: HTMLImageElement, binding) {
            const def = await import("@/assets/vue.svg");
            el.src = def.default;
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio > 0) {
                    el.src = binding.value;
                    observer.unobserve(el);
                }
              }
            );
            observer.observe(el);
        }
    })
}
