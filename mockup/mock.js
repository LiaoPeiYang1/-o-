module.exports = {
    ok: data => {
        return {
            success: true,
            result: data
        };
    },
    globalFail: msg => {
        return {
            success: false,
            message: {
                global: msg && msg.toString() || ''
            }
        };
    },
    list: (result, page = {}) => {
        return {
            success: true,
            page: {
                totalCount: page.totalCount || 100,
                pageNo: page.pageNo || 1,
                pageSize: page.pageSize || 15,
                orderBy: page.orderBy || 'id',
                order: page.order || 'desc',
                result: result || []
            }
        };
    },
    fail: msg => {
        return {
            success: false,
            message: msg || ''
        };
    }
};
