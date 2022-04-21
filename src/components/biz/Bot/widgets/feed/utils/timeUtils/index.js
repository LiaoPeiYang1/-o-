/**
 * @file timeUtil 时间时长显示转换
 * @author v_liaopeiyangs
 */

export function getVideoDuration(videoDurationNum) {
    const videoDurationStr = videoDurationNum.toString();
    let formatVideoDuration;
    // 兼容之间数据mock直接返的格式数据 先转一边字符串 判断了再转数字
    if (videoDurationStr.indexOf(':') === -1) {
        const result = Number(videoDurationStr);
        const h = Math.floor(result / 3600);
        const m = Math.floor((result % 3600) / 60);
        const s = result % 60;
        const showM = m > 10 ? m : '0' + m;
        const showS = s > 10 ? s : '0' + s;
        formatVideoDuration = result >= 3600 ? `${h}:${showM}:${showS}` : `${m}:${showS}`;
    }
    else {
        formatVideoDuration = videoDurationStr;
    }
    return formatVideoDuration;
}