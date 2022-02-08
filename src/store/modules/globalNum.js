import '@/js/date.format.js'

const now = new Date(new Date().toLocaleDateString()).getTime()
const nowEnd = now + 3600 * 1000 * 24 - 1
const nowEndDate = new Date(nowEnd).format('YYYY-MM-DD HH:mm:ss')
const lastPartMonth = now - 3600 * 1000 * 24 * 15
const lastPartMonthDate = new Date(lastPartMonth).format('YYYY-MM-DD HH:mm:ss')
const lastWeek = now - 3600 * 1000 * 24 * 7
const lastWeekDate = new Date(lastWeek).format('YYYY-MM-DD HH:mm:ss')
const lastMonth = now - 3600 * 1000 * 24 * 30
const lastMonthDate = new Date(lastMonth).format('YYYY-MM-DD HH:mm:ss')
const nowStart = now

const globalNum = {
    state: {
        now,
        lastPartMonth,
        lastPartMonthDate,
        lastWeek,
        lastWeekDate,
        nowStart,
        nowEnd,
        nowEndDate, // Date类型的数据,兼容返回特定格式的接口
        lastMonth,
        lastMonthDate,
    },
}

export default globalNum