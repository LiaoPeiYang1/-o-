/**
 * @file hooks/useDataRefresh
 * @description 列表换一换
 * @author v_liaopeiyangs
 */

import _ from 'lodash';
import {useMemo, useCallback, useState, useEffect} from 'react';

const PAGE_SIZE = 3;

export default cardsData => {
    const cardsLength = _.get(cardsData, 'length', '');

    const [pageNo, setPageNo] = useState(1);
    const [showPageData, setShowPageData] = useState([]);

    const PageCount = useMemo(() => (Math.ceil(cardsLength / PAGE_SIZE)), [cardsLength]);

    // 换一换
    const handleDataRefresh = useCallback(() => {
        if (pageNo < PageCount) {
            setPageNo(pre => pre + 1);
        }
        else {
            setPageNo(1);
        }
    }, [pageNo, PageCount]);
    // 查看更多
    const handleDataMore = useCallback(() => setShowPageData(cardsData), [cardsData]);

    useEffect(() => {
        const showCards = _.slice(cardsData, PAGE_SIZE * (pageNo - 1), PAGE_SIZE * pageNo);
        setShowPageData(showCards);
    }, [pageNo, cardsLength, cardsData]);

    return {
        showPageData,
        handleDataRefresh,
        handleDataMore
    };
};