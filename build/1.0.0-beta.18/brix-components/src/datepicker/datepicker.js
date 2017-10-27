/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=DatePicker
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/datepicker/
        Temporary

    # DatePicker

    日期选择器。

    ```html
    <!-- 日期 -->
    <div bx-name="components/datepicker" data-type="date"></div>
    <!-- 时间 -->
    <div bx-name="components/datepicker" data-type="time"></div>
    ```

    ## 配置

    配置项   | 类型           | 默认值       | 说明
    :------- | :------------- | :----------- | :----------
    date     | string         | `new Date()` | 当前选中的日期。
    type     | string         | `'all'`      | 指定日期选择器的类型，可选值有 `'all'`、`'date'`、`'month'`、`'year'`、`'time'`、`'hour'`、`'minute'`、`'second'`。多个类型之间用空格隔开。
    range    | array          | `[]`         | 设置可选日期的范围。下面列举了一些合法值。
    excluded | array or false | `false`      | 设置禁选日期的范围。合法值同 `range`。

    ## 方法
    * .val( [ value ] )
        获取或设置选中的日期。
    * .range( [ value ] )
        获取或设置可选日期的范围。
    * .excluded( [ value ] )
        获取或设置禁选日期的范围。
    
    ## 事件

    事件类型          | 说明
    :---------------- | :----------
    change.datepicker | 当日期组件变化时被触发。事件监听函数接受 3 个参数：`event`、`date`、`type`。参数 `event` 是一个 [jQuery 事件对象]；参数 `date` 是一个 [moment 对象]；参数 `type` 指示了发生变化的属性，可选值有：年份 `'year'`、月份 `'month'`、日 `'date'`、时间 `'time'`、小时 `'hour'`、分 `'minute'`、秒 `'second'`、`undefined`。

 */
define(
    [
        'jquery', 'underscore', 'moment',
        'components/base', 'brix/event',
        './datepicker.tpl.js'
    ],
    function(
        $, _, moment,
        Brix, EventManager,
        template
    ) {

        var NAMESPACE = '.datepicker'
        var TYPES = 'second minute hour time date month year'
        var DATE_PATTERN = 'YYYY-MM-DD'
        var TIME_PATTERN = 'HH:mm:ss'
        var DATE_TIME_PATTERN = DATE_PATTERN + ' ' + TIME_PATTERN

        function DatePicker() {}
        DatePicker.NAMESPACE = NAMESPACE
        DatePicker.TYPES = TYPES
        DatePicker.DATE_PATTERN = DATE_PATTERN
        DatePicker.TIME_PATTERN = TIME_PATTERN
        DatePicker.DATE_TIME_PATTERN = DATE_TIME_PATTERN
        DatePicker.typeMap = function(type) {
            if (_.indexOf(['all', '', undefined], type) !== -1) type = TYPES
            var result = {}
            _.each(type.split(/\s+/), function(item /*, index*/ ) {
                result[item] = true
            })

            result.time = result.time || result.hour || result.minute || result.second
            return result
        }

        _.extend(DatePicker.prototype, Brix.prototype, {
            options: {
                date: moment(), // date dateShadow
                type: 'all',
                range: [],
                excluded: [],
                unlimit: false
            },
            init: function() {
                // 修正选项 range，转换成一维数组
                this.options.range = _.flatten(this.options.range)
                this.options.excluded = _.flatten(this.options.excluded)

                // 支持不限
                if (this.options.unlimit) this.options.unlimit = moment(
                    this.options.unlimit,
                    _.isString(this.options.unlimit) && DATE_TIME_PATTERN
                )

                // 构造 this.data
                this.data = this.data || {}
                this.data.options = this.options
                this.data.moment = moment
                this.data.date = moment(
                    this.options.date,
                    _.isString(this.options.date) && DATE_TIME_PATTERN
                )

                // 初始值为不限
                if (this.options.unlimit &&
                    this.options.unlimit.toDate().getTime() === this.data.date.toDate().getTime()) {
                    this.__unlimit = this.options.unlimit
                }

                // { time: bool, date: bool, month: bool, year: bool, all: bool }
                this.data.typeMap = DatePicker.typeMap(this.options.type)
            },
            render: function() {
                this.$element = $(this.element)
                    .append(
                        _.template(template)(this.data)
                    )

                var $manager = this.$manager = new EventManager('bx-')
                $manager.delegate(this.$element, this)

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()
            },
            // 获取或设置选中的日期。
            val: function(value) {
                var milliseconds = this.data.date.toDate().getTime()

                if (value) {
                    // 取消 unlimit 模式
                    this.__unlimit = false

                    this.data.date = moment(
                        value,
                        _.isString(value) && DATE_TIME_PATTERN
                    )

                    var same = this.data.date.toDate().getTime() === milliseconds
                    var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                    this.trigger(changeEvent, moment(this.data.date))

                    if (!same) this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()

                    return this
                }

                return moment(this.__unlimit || this.data.date)
            },
            range: function(value) {
                if (value) {
                    this.options.range = _.flatten(value)
                    this._renderDatePicker()
                    return this
                }
                return this.options.range
            },
            excluded: function(value) {
                if (value) {
                    this.options.excluded = _.flatten(value)
                    this._renderDatePicker()
                    return this
                }
                return this.options.excluded
            },
            // 在 .yearpicker .monthpicker .datepicker 之间切换（滑动效果）
            _slide: function(event, from, to) {
                // _slide(from, to)
                if (arguments.length == 2) {
                    to = from
                    from = event
                }
                this.$element.find(from).slideUp('fast')
                this.$element.find(to).slideDown('fast')
            },
            // 点击 minus plus
            _move: function(event /* jshint unused:false */ , unit, dir) {
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) this.data.date = moment().startOf('day')

                // 取消 unlimit 模式
                this.__unlimit = false

                var date = this.data.date
                var milliseconds = date.toDate().getTime()

                if (unit === 'period') {
                    this._renderYearPicker(dir)._renderDatePicker()
                    return
                }

                // year month date
                date.add(dir, unit)

                var same = date.toDate().getTime() === milliseconds
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [moment(date), unit])

                if (!same) this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            _active: function(event, unit) {
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) this.data.date = moment().startOf('day')

                // 取消 unlimit 模式
                this.__unlimit = false

                var date = this.data.date
                var milliseconds = date.toDate().getTime()
                var $target = $(event.target)
                    // .toggleClass('active')
                    // $target.siblings().removeClass('active').end()

                date.set(unit, +$target.attr('data-value'))

                var same = date.toDate().getTime() === milliseconds
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [moment(date), unit])

                if (!same) this._renderYearPicker()._renderMonthPicker()._renderDatePicker()

                switch (unit) {
                    case 'year':
                        if (this.data.typeMap.year) break
                        this._slide('.yearpicker', '.monthpicker')
                        break
                    case 'month':
                        if (this.data.typeMap.month) break
                        this._slide('.monthpicker', '.datepicker')
                        break
                }
            },
            _hooks: {
                38: 1, // up
                40: -1 // down
            },
            _changeTime: function(event, extra, unit, units) {
                // 取消 unlimit 模式
                this.__unlimit = false

                var date = this.data.date

                // submit
                if (extra === undefined && unit === undefined && units === undefined) {
                    var submitEvent = $.Event('change' + NAMESPACE)
                    this.trigger(submitEvent, [moment(date), 'time'])
                    return
                }

                var milliseconds = date.toDate().getTime()

                if (event.type === 'keydown') {
                    if (!this._hooks[event.which]) return
                    extra = this._hooks[event.which] || 0
                }
                if (event.type === 'blur' || event.type === 'focusout') {
                    //fixed format bug
                     if(!isNaN(parseInt(event.target.value,10))){
                        this.data.date.set(unit, event.target.value)
                        extra = 0
                     }
                }
                date.add(extra, units)

                event.preventDefault()
                event.stopPropagation()

                var same = date.toDate().getTime() === milliseconds
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [moment(date), unit])

                if (!same) this._renderTimePicker()._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            _changeHour: function(event, extra) {
                this._changeTime(event, extra, 'hour', 'hours')
            },
            _changeMinute: function(event, extra) {
                this._changeTime(event, extra, 'minute', 'minutes')
            },
            _changeSecond: function(event, extra) {
                this._changeTime(event, extra, 'second', 'seconds')
            },
            __isUnlimitMode: function() {
                return (
                    this.options.unlimit && (
                        this.__unlimit ||
                        this.options.unlimit.toDate().getTime() === this.data.date.toDate().getTime()
                    )
                ) && true || false
            },
            _renderYearPicker: function(dir) {
                dir = dir || 0

                var date = this.data.date
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $title = this.$element.find('.yearpicker .picker-header h4')
                var $body = this.$element.find('.yearpicker .picker-body')

                var limit = 20
                var data = $body.data()
                var current = date.get('year')
                data.start = (data.start || (current - current % limit)) + dir * limit
                data.end = data.start + limit - 1

                $title.text(data.start + ' - ' + data.end)
                $body.empty()
                for (var i = data.start; i <= data.end; i++) {
                    $('<span>').text(i).attr('data-value', i)
                        .attr('bx-click', '_active("year")')
                        .addClass(!unlimitMode && current === i ? 'active' : '')
                        .appendTo($body)
                }

                return this
            },
            _renderMonthPicker: function() {
                var date = this.data.date
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $title = this.$element.find('.monthpicker .picker-header h4')
                var $body = this.$element.find('.monthpicker .picker-body')
                $title.text(date.get('year'))
                $body.empty()
                    // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                    // ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月','十月', '十一', '十二']
                var months = function() {
                    var result = []
                    for (var i = 1; i <= 12; i++) {
                        result.push(i < 10 ? '0' + i : i)
                    }
                    return result
                }()
                _.each(months, function(item, index) {
                    $('<span>').text(item).attr('data-value', index)
                        .addClass(!unlimitMode && date.get('month') === index ? 'active' : '')
                        .attr('bx-click', '_active("month")')
                        .appendTo($body)
                })

                return this
            },
            _renderDatePicker: function() {
                var date = this.data.date
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var days = date.daysInMonth()
                var startDay = moment(date).date(1).day()
                var range = this.options.range
                var excluded = this.options.excluded

                var $title = this.$element.find('.datepicker .picker-header h4')
                var $body = this.$element.find('.datepicker .picker-body .datepicker-body-value')

                $title.text(date.format('YYYY - MM'))
                $body.empty()
                for (var i = 0; i < startDay; i++) {
                    $('<span class="inactive">')
                        .appendTo($body)
                }
                for (var ii = 1; ii <= days; ii++) {
                    $('<span>').text(ii).attr('data-value', ii)
                        .addClass(!unlimitMode && date.date() === ii ? 'active' : '')
                        .addClass(!inRange(ii) || inExcluded(ii) ? 'disabled' : '')
                        .attr('bx-click', '_active("date")')
                        .appendTo($body)
                }
                return this

                function inRange(ii) {
                    if (!range.length) return true
                    var cur = moment(date).startOf('day').set('date', ii)
                    var min, max
                    for (var i = 0; i < range.length; i += 2) {
                        min = range[i] && moment(
                            range[i],
                            _.isString(range[i]) && DATE_TIME_PATTERN
                        ).startOf('day')
                        max = range[i + 1] && moment(
                            range[i + 1],
                            _.isString(range[i + 1]) && DATE_TIME_PATTERN
                        ).startOf('day')
                        if (min && max) {
                            var tmpMin = moment.min(min, max)
                            var tmpMax = moment.max(min, max)
                            min = tmpMin
                            max = tmpMax
                        }
                        if (min && max && cur.diff(min, 'days') >= 0 && cur.diff(max, 'days') <= 0) return true
                        if (min && !max && cur.diff(min, 'days') >= 0) return true
                        if (!min && max && cur.diff(max, 'days') <= 0) return true
                        if (!min && !max) return true
                    }
                    return false
                }

                function inExcluded(ii) {
                    if (!excluded.length) return false
                    var cur = moment(date).startOf('day').set('date', ii)
                    var min, max
                    for (var i = 0; i < excluded.length; i += 2) {
                        min = excluded[i] && moment(
                            excluded[i],
                            _.isString(excluded[i]) && DATE_TIME_PATTERN
                        ).startOf('day')
                        max = excluded[i + 1] && moment(
                            excluded[i + 1],
                            _.isString(excluded[i + 1]) && DATE_TIME_PATTERN
                        ).startOf('day')
                        if (min && max) {
                            var tmpMin = moment.min(min, max)
                            var tmpMax = moment.max(min, max)
                            min = tmpMin
                            max = tmpMax
                        }
                        if (min && max && cur.diff(min, 'days') >= 0 && cur.diff(max, 'days') <= 0) return true
                        if (min && !max && cur.diff(min, 'days') >= 0) return true
                        if (!min && max && cur.diff(max, 'days') <= 0) return true
                        if (!min && !max) return true
                    }
                    return false
                }
            },
            _renderTimePicker: function() {
                var date = moment(this.data.date)

                var inputs = this.$element.find('.timepicker div.timepicker-group input')
                inputs.eq(0).val(date.format('HH'))
                inputs.eq(1).val(date.format('mm'))
                inputs.eq(2).val(date.format('ss'))

                return this
            },
            _unlimit: function( /*event*/ ) {
                var unlimit = this.options.unlimit
                this.__unlimit = unlimit

                var same = unlimit.isSame(this.data.date)
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [unlimit, 'date'])

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            destroy: function() {
                this.$manager.undelegate(this.$element, this)
            }
        })

        return DatePicker
            // return Brix.extend({})
    }
)
/*
    Reference:
        [Bootstrap Component Sample](http://zombiej.github.io/bootstrap-components-3.0/)
    TODO
        multi types
        disable year month date
        disable input
        multi calendar
    Event Test Case
        $('body').on('ch ch.a ch.b', function(event) {
            console.log(event.type, event.namespace)
        })
        $('body').trigger('ch.a.b')
 */