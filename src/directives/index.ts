import {App} from "vue";

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
}
