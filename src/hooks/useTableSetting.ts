import { onMounted, nextTick, ref } from 'vue';

function getElementTop(el: HTMLElement): number {
    if (el && el.offsetParent) {
        return getElementTop(el.offsetParent as HTMLElement) + el.offsetTop;
    }
    return el.offsetTop;
}

function setTableMaxHeight(id: string, num = 120): number {
    const scrollHeight = document.body.scrollHeight;
    const offsetTop = getElementTop(document.getElementById(id) as HTMLElement);
    const maxHeight = scrollHeight - offsetTop - num;
    return maxHeight;
}

type containerOps = {
    id?: string;
    offsetBottom?: number;
};

// 设置table的自适应高度值
export default function useTableSetting({ id = 'xc-table', offsetBottom = 120 }: containerOps = {}) {
    const maxTableHeight = ref(0);
    onMounted(async () => {
        setTimeout(() => {
            maxTableHeight.value = setTableMaxHeight(id, offsetBottom);
        }, 200);
    });
    return {
        maxTableHeight,
        setTableMaxHeight,
    };
}
