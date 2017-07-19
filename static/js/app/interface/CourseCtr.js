define([
    'app/util/ajax'
], function(Ajax) {
    return {
        /**
         * 分页查询私课
         * @param config {start, limit, coachCode}
         */
        getPageCourse(config, refresh) {
            return Ajax.get("622110", config, refresh);
        },
        // 详情查询私课
        getCourse(code, refresh) {
            return Ajax.get("622111", {code}, refresh);
        },
        /**
         * 新增私课
         * @param config {skCycle, skStartDatetime, skEndDatetime, price, coachCode}
         */
        addCourse(config) {
            return Ajax.post("622100", config);
        },
        /**
         * 新增私课
         * @param config {code, skCycle, skStartDatetime, skEndDatetime, price}
         */
        editCourse(config) {
            return Ajax.post("622102", config);
        },
        // 删除私课
        deleteCourse(code) {
            return Ajax.post("622101", {code});
        }
    };
})
