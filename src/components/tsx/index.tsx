export default defineComponent({
    props: {
        title: {
            type: String,
            required: false
        }
    },
    name: "tsx-component",
    setup(props, {emit, slots}) {

        return () => {
            return <div>
                <span>{props.title}</span>
            </div>;
        };
    },
});
