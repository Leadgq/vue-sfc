export default defineComponent({
    props: {
        title: {
            type: String,
            required: false
        },
        showLabel: {
            type: Boolean,
            required: false,
        }
    },
    name: "tsx-component",
    setup(props, {emit, slots}) {
        const renderLabel = () => {
            return (
                props.showLabel && <span>123466</span>
            )
        }
        const renderHeader = () => {
            const header = slots.header && slots.header()
            return (
                <div>
                    {header}
                </div>
            )
        }
        const renderFooter = () => {
            const footer = slots.footer && slots.footer()
            return (
                <div>
                    {footer}
                </div>
            )
        }
        return () => {
            return <div>
                <span>{props.title}</span>
                {renderLabel()}
                {renderHeader()}
                {renderFooter()}
            </div>;
        };
    },
});
