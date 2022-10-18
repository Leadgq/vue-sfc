import {EffectScope} from "vue"

const useMouseHook = () => {
    const x = ref(0)
    const y = ref(0)

    function handler(e: MouseEvent) {
        x.value = e.x
        y.value = e.y
    }

    window.addEventListener('mousemove', handler)

    onScopeDispose(() => {
        window.removeEventListener('mousemove', handler)
    })
    return {x, y}
}
const createSharedComposable = (composable: any): any => {
    let subscribers = 0
    let state: boolean | null, scope: EffectScope | null
    const dispose = () => {
        if (scope && --subscribers <= 0) {
            scope.stop()
            state = scope = null
        }
    }
    return (...args: any[]) => {
        subscribers++
        if (!state) {
            scope = effectScope(true);
            state = scope.run(() => composable(...args))
        }
        onScopeDispose(dispose)
        return state
    }
}
export const useSharedMouse = createSharedComposable(useMouseHook);
