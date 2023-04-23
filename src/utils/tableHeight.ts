/**
 * @description: table高度自适应
 * @param: height为自定义table高度
 */
export function setTableHeight(height: number) {
    let tableHeight = 0
    const lastH = 937 - height;
    tableHeight = document.body.clientHeight - lastH;
    return tableHeight
}
