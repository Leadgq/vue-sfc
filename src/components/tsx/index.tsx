export default defineComponent({
    props: {
        title: {
            type: String,
            required: false
        },
        width: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        showIcon: {
            type: Boolean,
            required: false,
        }
    },
    name: "tsx-component",
    setup(props, {emit, slots}) {
        const renderFooter = () => {
            const footer = slots.footer && slots.footer()
            return <div>{footer}</div>
        }
        const renderHeader = () => {
            return (
                <div class="flex justify-between items-center">
                    <div>{props.title}</div>
                    {props.showIcon && <div>icon</div>}
                </div>
            )
        }
        const renderCenter = () => {
            const center = slots.center && slots.center()
            return <div class="flex-1  overflow-auto">{center}</div>
        }
        return () => {
            return <div style={`width:${props.width};height:${props.height}`}>
                <div class='w-full h-full flex flex-col'>
                    {renderHeader()}
                    {renderCenter()}
                    {renderFooter()}
                </div>
            </div>;
        };
    },
});
