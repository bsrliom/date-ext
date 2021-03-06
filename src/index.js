Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
    let info = {}
    info.yyyy = this.getFullYear()
    info.YY = info.yyyy.toString().substr(-2)
    info.MM = this.getMonth() + 1
    info.dd = this.getDate()
    info.hh = this.getHours()
    info.mm = this.getMinutes()
    info.ss = this.getSeconds()
    info.ms = this.getMilliseconds()
    for (let x in info) {
        let v = (info[x] - 9) > 0 ? info[x] : '0' + info[x] * 1
        fmt = fmt.replace(x, v)
    }
    return fmt
}

Date.prototype.addStr = function (str) {
    let [int, unit] = str.trim().split(/\s+/)
    int = parseInt(int, 10)
    if (isNaN(int)) {
        throw new Error('String can not be parsed!')
    }
    if (unit === 'year') {
        let y = this.getFullYear() + int * 1
        this.setFullYear(y)
    } else if (unit === 'month') {
        let y = this.getFullYear(),
            m = this.getMonth() + int * 1
        while (m > 11) {
            this.setFullYear(++y)
            m -= 12
        }
        while (m < 0) {
            this.setFullYear(--y)
            m += 12
        }
        this.setMonth(m)
    } else {
        let now = this.getTime()
        let timer = 1
        switch (unit) {
            case 'week':
                timer = 7 * 24 * 3600;
                break;
            case 'day':
                timer = 24 * 3600;
                break;
            case 'hour':
                timer = 3600;
                break;
            case 'minute':
                timer = 60;
                break;
            case 'second':
                timer = 1;
                break;
            default:
                throw new Error('String can not be parsed!')
        }
        this.setTime(now + int * timer * 1000)
    }
    return this
}

// export default {}