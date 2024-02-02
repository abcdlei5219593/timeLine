import { onMounted, nextTick, ref, onUnmounted } from 'vue';

function getElementTop(el: HTMLElement): number {
    if (el && el.offsetParent) {
        return getElementTop(el.offsetParent as HTMLElement) + el.offsetTop;
    }
    return el.offsetTop;
}

export function setTableMaxHeight(id: string, num = 120): number {
    // debugger;
    const scrollHeight = document.body.offsetHeight;
    const offsetTop = getElementTop(document.getElementById(id) as HTMLElement);
    const maxHeight = scrollHeight - offsetTop - num;
    return maxHeight;
}

type containerOps = {
    id?: string;
    offsetBottom?: number;
};

// 设置table的自适应高度值
export default function useTableSetting({ id = 'xc-table', offsetBottom = 100 }: containerOps = {}) {
    const maxTableHeight = ref(0);
    const setHeight = () => {

        maxTableHeight.value = setTableMaxHeight(id, offsetBottom);
    };
    onMounted(async () => {
        setTimeout(setHeight, 200);
        window.addEventListener('resize', setHeight);
    });
    onUnmounted(() =>{
        window.removeEventListener('resize', setHeight);
    });
    return {
        maxTableHeight,
        setTableMaxHeight,
    };
}
