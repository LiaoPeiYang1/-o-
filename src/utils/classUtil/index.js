/**
 * @file classUtil class相关操作
 * @author dingyang
 */

/**
 * addClass
 * @description 为ele添加class
 */
export function addClass(ele, cls) {
    const eleClasses = ele.className; // 获取 class 内容
    const blank = (eleClasses !== '') ? ' ' : ''; // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'
    const newClasses = eleClasses + blank + cls; // 组合原来的 class 和需要添加的 class
    ele.className = newClasses; // 替换原来的 class
}

/**
 * removeClass
 * @description 为ele移除class
 */
export function removeClass(ele, cls) {
    let eleClasses = ' ' + ele.className + ' '; // 获取 class 内容, 并在首尾各加一个空格
    eleClasses = eleClasses.replace(/(\s+)/gi, ' '); // 将多余的空字符替换成一个空格
    let newClasses = eleClasses.replace(' ' + cls + ' ', ' '); // 在原来的 class 替换掉首尾加了空格的 class
    newClasses = newClasses.replace(/(^\s+)|(\s+$)/g, ''); // 去掉首尾空格
    ele.className = newClasses; // 替换原来的 class
}
