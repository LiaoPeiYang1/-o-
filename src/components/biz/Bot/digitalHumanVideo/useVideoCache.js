/**
 * @file useVideoCache 处理视频缓存
 * @author sunwen05
 */

import {useCallback, useEffect, useState, useRef} from 'react';
import _ from 'lodash';
import axios from 'axios';

const MAX_FETCH_COUNT = 2;

export default props => {
    const {current, list} = props;

    // 缓存结果匹配表
    const [cacheMap, setCacheMap] = useState({});
    // 延迟下载排队队列
    const [queueList, setQueueList] = useState([]);
    // 延迟队列处理中
    const [queueListLoading, setQueueListLoading] = useState(false);
    // 高优先级视频是否在下载中，对象类型防止多个视频处于高优先级
    const [currentLoading, setCurrentLoading] = useState({});

    // 存放不依赖项
    const dependenceRef = useRef();

    // 判断当前是否有高优先级视频在处理
    const isCurrentsLoading = useCallback(() => _.sum(_.values(currentLoading)), [currentLoading]);

    // 下载视频
    const fetchData = useCallback(async (url, isCurrent, isReload) => {
        // 视频是否已缓存
        if (cacheMap[url]) {
            isCurrent && setCurrentLoading(prev => ({...prev, [url]: false}));
            return;
        }
        return await axios.get(url, {
            responseType: 'blob',
            withCredentials: false
        }).then(res => {
            // 将缓存好的视频放入cacheMap中
            const blobSrc = URL.createObjectURL(res.data); // IE10+
            setCacheMap(prev => ({...prev, [url]: blobSrc}));
        }).catch(() => {
            // 如果视频缓存失败，则进行一次重试
            if (!isReload) {
                fetchData(url, isCurrent, true);
            }
        }).finally(() => {
            // 是当前播放视频则将loading状态设为false
            isCurrent && setCurrentLoading(prev => ({...prev, [url]: false}));
        });
    }, [cacheMap]);
    dependenceRef.current = {fetchData};

    // 监听高优先级视频
    useEffect(() => {
        if (current) {
            // console.log('current: ', current);
            // 是当前播放视频，则将loading状态设置为true
            setCurrentLoading(prev => ({...prev, [current]: true}));
            dependenceRef.current.fetchData(current, true);
        }
    }, [current, setCurrentLoading]);

    // 监听低优先级视频，直接存入排队队列
    useEffect(() => {
        setQueueList(prev => ([...list, ...prev]));
    }, [list]);

    // 监听当前高优先级视频缓存状态，若无高优先级视频缓存，则开始缓存排队队列
    useEffect(() => {
        if (!isCurrentsLoading() && !_.isEmpty(queueList) && !queueListLoading) {
            // console.log('fetch queue: ', queueList);
            setQueueListLoading(true);
            // 取前N位开始进行缓存
            const runList = queueList.slice(0, MAX_FETCH_COUNT);
            setQueueList(prev => prev.slice(MAX_FETCH_COUNT));
            Promise.all(_.map(runList, url => dependenceRef.current.fetchData(url))).then(() => {
                setQueueListLoading(false);
            });
        }
    }, [queueListLoading, queueList, isCurrentsLoading]);

    return cacheMap;
};