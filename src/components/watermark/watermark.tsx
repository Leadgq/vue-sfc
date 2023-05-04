import {useWatermark} from "@/tools/hook/hook";
import {Ref} from "vue";

export default defineComponent({
    name: "watermark",
    props: {
        text: {
            type: String,
            required: false,
            default: "版权所有",
        },
        fontSize: {
            type: Number,
            default: 40,
            required: false,
        },
        gap: {
            type: Number,
            default: 5,
            required: false,
        },
    },
    setup(props, {emit, slots}) {
        let watermark: Ref<null | HTMLDivElement> = ref(null);
        let flag = ref(0);
        let observer: Ref<MutationObserver | null> = ref(null);
        const findWatermark = () => document.querySelector(".watermark")
        // generate watermark
        const genderWatermark = () => {
            const {base64, styleSize} = useWatermark(props).value;
            if (watermark.value) watermark.value.remove();
            watermark.value = document.createElement("div")!;
            watermark.value.style.background = `url(${base64})`;
            watermark.value.style.backgroundSize = `${styleSize}px ${styleSize}px`;
            watermark.value.style.backgroundRepeat = "repeat";
            watermark.value.style.position = "absolute";
            watermark.value.style.zIndex = "9999";
            watermark.value.style.inset = "0";
            watermark.value.style.pointerEvents = "none";
            const watermarkContainer = findWatermark();
            watermarkContainer?.appendChild(watermark.value);
        }
        // change watermark
        watchEffect(() => {
            flag.value
            const defaultContent = slots.default && slots.default();
            if (!findWatermark() || !defaultContent) return;
            genderWatermark();
        }, {flush: 'post'})

        // observer watermark
        onMounted(() => {
            observer.value = new MutationObserver((mutationsList) => {
                for (const mutationRecord of mutationsList) {
                    // remove node run effect
                    for (const dom of mutationRecord.removedNodes) {
                        if (dom === watermark.value) flag.value++;
                    }
                    // modify node style run effect
                    if (mutationRecord.target === watermark.value) flag.value++;
                }
            })
            observer.value.observe(findWatermark()!, {childList: true, subtree: true, attributes: true})
        })
        onUnmounted(() => {
            watermark.value?.remove();
            observer.value?.disconnect();
            observer.value = null;
        })
        const renderContent = () => {
            const defaultContent = slots.default && slots.default();
            return <>{defaultContent}</>;
        };
        return () => {
            return <div class="relative watermark">{renderContent()}</div>;
        };
    },
});
