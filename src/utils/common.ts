/**
 * @description: 时间格式化
 * @param: date 时间戳, 不传默认返回发当前
 * @param: fmt 格式
 */
export function getFormatDate(dateStr: string, format = 'YYYY-mm-dd') {
    let ret;
    let fmt = format;
    const date = dateStr ? new Date(dateStr) : new Date();
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString(), // 秒
        'c+': date.getMilliseconds().toString(), // 毫秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
        }
    }
    return fmt;
}


/**
 * 比较前端定义菜单与后端权限菜单，获取最终权限路由
 * @param sourceTree 见config/app.ts 定义
 * @param targetTree  接口返回的权限路由
 * @return array
 */

export const getDeepTreeData = (sourceTree, targetTree) => {
    const temp = [];
    for (const item of targetTree) {
        debugger;
        let target = {};
        const itemInSourceTree = sourceTree.find(sourceItem => item.url === sourceItem.url);
        if(itemInSourceTree) {
            target = {
                ...itemInSourceTree,
                children: []
            };
        }
        if(item.children && item.children.length) {
            target.children = getDeepTreeData(itemInSourceTree.children, item.children);
        }
        temp.push(target);
    }
    return temp;
};


/**
 * 设置Eltree默认选中节点
 * @param sourcetree 源树据
 * @param target  接收参数
 * @returns
 */

export const getFlatDeepTreeData = (sourcetree, target) => {
    for (const item of sourcetree) {
        if(item.children && item.children.length) {
            getFlatDeepTreeData(item.children,target);
        }else {
            // 当穷尽到最后一层路由时，收集选中路由
            target.push(item);
        }
    }
    return target;
};
