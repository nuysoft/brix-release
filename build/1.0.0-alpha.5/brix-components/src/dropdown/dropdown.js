/* global define, window, document */
/*
    http://thx.github.io/brix-site/readme.html?name=Dropdonw
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/dropdown/
        Temporary

    # Dropdown

    下拉框组件。

    ```html
    <select bx-name="components/dropdown">
        <option value="1">Action</option>
        <option value="2">Another action</option>
        <option value="3">Something else here</option>
    </select>
    ```

    ## 配置
    
    配置项    | 类型              | 默认值  | 说明
    :-------- | :---------------- | :------ | :----------
    data      | array             | -       | 可选。下拉框中的数据。默认从子节点 `<optgroup>` 和 `<option>` 读取。
    value     | string            | -       | 可选。下拉框的值。
    searchbox | boolean           | `false` | 可选。是否开启下拉框中的输入框。可选值有 `false`、`true`、`'enter'`。
    popover   | boolean or number | `false` | 可选。是否为下拉框的条目配置 `bx-name="components/popover"`。可选值有 `false`、`true`、`width`。

    ## 方法

    * .val( [ value ] )
        设置或读取下拉框的值。
    * .data( [ data ] )
        设置或读取下拉框中的数据。

    ## 事件

    事件类型        | 说明
    :-------------- | :----------
    change.dropdown | 当值发生变化时被触发。
    search.dropdown | 见配置项 `searchbox`。
    
    ## 参考
    * http://getbootstrap.com/components/#dropdowns
    * http://silviomoreto.github.io/bootstrap-select/
 */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'components/base', 'brix/event',
        './dropdown.tpl.js'
    ],
    function(
        $, _,
        Loader, Brix, EventManager,
        template
    ) {
        var NAMESPACE = '.dropdown'
        var compiledTemplate = _.template(template)

        function Dropdown(options) {
            if (options && options.element) {
                if ('select' !== options.element.nodeName.toLowerCase()) {
                    return new CustomDropdown(options)
                }
            }
        }

        _.extend(Dropdown.prototype, Brix.prototype, {
            options: {
                name: undefined,
                label: undefined,
                value: undefined,
                data: [],
                disabled: undefined,

                width: undefined, // data-width="100" data-width="100px" data-width="100%"
                className: undefined, // { data-class | data-className | className: ''}
                justify: false, // 两端对齐 data-justify="true|false"

                searchbox: false, // false | true | keyup | enter
                placeholder: '搜索关键词',
                _searchboxEvent: 'keyup', // keyup | enter

                popover: false, // true | width
                _popoverWidth: ''
            },
            init: function() {
                this.$element = $(this.element).hide()
                this.$manager = new EventManager('bx-')

                var options = this.options

                // 如果没有提供选项 data，则从节点 select 的 option 收集数据
                if (!options.data.length) {
                    options.data = this._parseDataFromSelect(this.$element)
                } else {
                    // 如果提供了选项 data，则逆向填充节点 select 的 option
                    this._fixFlattenData(this.options.data)
                    this._fillSelect()
                }

                // 是否允许多选
                options.multiple = this.$element.prop('multiple')

                // 节点是否被禁用
                options.disabled = this.$element.prop('disabled')

                // value => [value] 
                if (options.value === undefined) options.value = []
                if (!_.isArray(options.value)) options.value = [options.value]

                // 初始化节点 select 的选中状态（值）
                if (options.value.length) this.$element.val(options.value)

                // 初始化选项 label、value
                var $selectedOptions = this.$element.find('option:selected')
                options.label = _.map($selectedOptions, function(item) {
                    return $.trim($(item).text())
                }).join(', ')
                options.value = _.map($selectedOptions, function(item) {
                    return $(item).attr('value')
                })

                // 初始化选项 name
                options.name = this.$element.attr('name')

                // 解析选项 searchbox
                if (options.searchbox) {
                    if (options.searchbox === true) {
                        options._searchboxEvent = 'keyup'
                    } else {
                        options._searchboxEvent = options.searchbox
                        options.searchbox = true
                    }
                }

                // 解析选项 popover
                if (options.popover) {
                    if (options.popover !== true) {
                        options._popoverWidth = options.popover
                        options.popover = true
                    }
                }

                // data-class => data-className
                if (this.options.class) this.options.className = this.options.class
            },
            render: function() {
                this.$relatedElement = $(
                    compiledTemplate(
                        _.extend({}, this.options, {
                            isActive: function(value, cur) {
                                return _.contains(value, cur) || _.contains(value, cur + '')
                            }
                        })
                    )
                ).insertBefore(this.$element)

                var width = this.options.width
                if (width) {
                    if (parseInt(width) == width) width += 'px'
                    this.$relatedElement.css({
                        width: width,
                        'min-width': width
                    })
                }

                // 类样式 data-className
                if (this.options.className) {
                    this.$relatedElement.addClass(this.options.className)
                }

                this.$manager.delegate(this.$element, this)
                this.$manager.delegate(this.$relatedElement, this)

                if (this.options.popover) Loader.boot(this.$relatedElement)

                // this._responsive()
                this._autoHide()
            },
            toggle: function( /*event*/ ) {
                this.$relatedElement.toggleClass('open')
                return this
            },
            show: function() {
                this.$relatedElement.addClass('open')
                return this
            },
            hide: function() {
                this.$relatedElement.removeClass('open')
                return this
            },
            /*
                .val( value )
                .val()
            */
            val: function(value) {
                // this.$element.val()
                var that = this
                var options = this.options

                var oldValue = function() {
                    var $target = that.$relatedElement.find('ul.dropdown-menu > li.active > a')
                    return _.map($target, function(item) {
                        var $item = $(item)
                        var itemValue = $item.attr('value')
                        return itemValue !== undefined ? itemValue : $.trim($item.text())
                    })
                }()

                // .val()
                if (value === undefined) return options.multiple ? oldValue : oldValue[0]

                // .val( value )
                if (!_.isArray(value)) value = [value]
                value = _.map(value, function(item) {
                    return item + ''
                })

                var data = [] /* [{ label: '', value: '', selected: true|false }] */
                _.each(this.options.data, function(item /*, index*/ ) {
                    if (item.children) {
                        _.each(item.children, function(childItem /*, index*/ ) {
                            childItem.selected = _.contains(value, childItem.value) || _.contains(value, childItem.value + '')
                            if (childItem.selected) data.push(childItem)
                        })
                    } else {
                        item.selected = _.contains(value, item.value) || _.contains(value, item.value + '')
                        if (item.selected) data.push(item)
                    }
                })

                // 未知值
                // if (!data.length) return

                // 如果值没有发生变化，则直接返回
                if (
                    oldValue.sort().join('') ===
                    _.map(data, function(item) {
                        return item.value
                    }).sort().join('')
                ) return this

                // #19 支持 event.preventDefault()
                // 应该先触发 change.dropdown 事件，然后检测事件的默认行为是否被阻止，然后才是改变样式！
                var event = $.Event('change' + NAMESPACE)
                var extra = _.map(data, function(item) {
                    return {
                        name: options.name,
                        label: item.label,
                        value: item.value
                    }
                })
                this.trigger(event, [options.multiple ? extra : extra[0]])
                if (event.isDefaultPrevented()) return this

                // 更新模拟下拉框的内容
                this.$relatedElement.find('button.dropdown-toggle > span.dropdown-toggle-label').text(
                    _.map(data, function(item) {
                        return item.label
                    }).join(', ')
                )

                // 更新原生下拉框的值
                this.$element.val(
                    _.map(data, function(item) {
                        return item.value
                    })
                )

                // 更新模拟下拉框的选中状态
                var $menu = this.$relatedElement.find('ul.dropdown-menu')
                _.each(oldValue, function(item) {
                    $menu.find('li:has([value="' + item + '"])')
                        .removeClass('active')
                        .find('input:checkbox')
                        .prop('checked', false)
                })
                _.each(data, function(item) {
                    $menu.find('li:has([value="' + item.value + '"])')
                        .addClass('active')
                        .find('input:checkbox')
                        .prop('checked', true)
                })

                this.$element
                    .triggerHandler('change')

                return this
            },
            data: function(data) {
                // .data()
                if (data === undefined) return this.options.data

                // .data(data)
                this.options.data = this._fixFlattenData(data)
                this._fillSelect()

                var $menu = this.$relatedElement.find('ul.dropdown-menu')
                var $newMenu = $(
                    compiledTemplate(this.options)
                ).find('ul.dropdown-menu')

                $menu.replaceWith($newMenu)

                this.$manager.delegate(this.$relatedElement, this)

                if (this.options.popover) Loader.boot(this.$relatedElement)

                return this
            },
            select: function(event /*, trigger*/ ) {
                var $target = $(event.currentTarget)
                var value = $target.attr('value')
                var label = $.trim($target.text())

                switch (this.options.multiple) {
                    case true:
                        var $li = $target.closest('li').toggleClass('active')
                        $target.find('input:checkbox').prop('checked', $li.hasClass('active'))
                        break
                    case false:
                        this.val(value !== undefined ? value : label)
                        this.toggle()
                        break
                }

                // #8 如果在 change.dropdown 中再次改变值，则会和下面的代码冲突
                // $target.closest('li').addClass('active')
                //     .siblings().removeClass('active')
            },
            search: function(event) {
                if (event.type === 'keyup') {
                    var key = event.keyCode

                    // 忽略不产生输入的辅助按键
                    //    command            modifiers                   arrows
                    if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) return

                    // 如果选项 searchbox 为 `'enter'`，则只响应 enter 键
                    if (this.options._searchboxEvent === 'enter' && key !== 13) return
                }

                var seed = $(event.target).val()
                this.trigger('search' + NAMESPACE, seed)
            },
            filter: function(seed, all) {
                // ( event, seed )
                if (seed.type) {
                    seed = all
                    all = false
                }

                // var $lis = this.$relatedElement.find('ul.dropdown-menu li').hide()
                // $lis.has('> a:contains("' + seed + '")').show() // 显示匹配 text 的选项

                // 性能优化 #10 https://jsfiddle.net/3z7qyzvv/3/
                // 1. display > .hide/show()
                // 2. .filter() > .has()
                var $lis = this.$relatedElement.find('ul.dropdown-menu li')
                if (!seed) {
                    $lis.css('display', 'list-item')
                } else {
                    $lis.css('display', 'none')
                    $lis.filter(':contains("' + seed + '")').show()
                        .css('display', 'list-item')
                }

                if (all) $lis.has('> a[value*="' + seed + '"]').show() // 显示匹配 value 的选项
            },
            disabled: function(disabled) {
                // .disabled()
                if (disabled === undefined) return this.options.disabled

                // .disabled( true | false )
                this.options.disabled = disabled
                this.$element.prop('disabled', disabled)
                this.$relatedElement[disabled ? 'addClass' : 'removeClass']('disabled')
                return this
            },
            submit: function() {
                var $target = this.$relatedElement.find('ul.dropdown-menu > li.active > a')
                var value = _.map($target, function(item) {
                    var $item = $(item)
                    return $item.attr('value') !== undefined ? $item.attr('value') : $.trim($item.text())
                })
                this.val(value)
                this.toggle()
            },
            _parseDataFromSelect: function($select) {
                var children = _.filter($select.children(), function(child /*, index*/ ) {
                    // <optgroup> <option>
                    return /optgroup|option/i.test(child.nodeName)
                })
                return _.map(children, function(child /*, index*/ ) {
                    var $child = $(child)
                    return /optgroup/i.test(child.nodeName) ? {
                        label: $child.attr('label'),
                        children: _parseOptions($child.children())
                    } : _parseOption(child)
                })

                function _parseOptions(options) {
                    return _.map(options, function(option /*, index*/ ) {
                        return _parseOption(option)
                    })
                }

                function _parseOption(option) {
                    var $option = $(option)
                    return $option.hasClass('divider') ? 'divider' : {
                        label: $.trim($option.text()),
                        value: $option.attr('value'),
                        selected: $option.prop('selected')
                    }
                }
            },
            _fixFlattenData: function(data) {
                return _.map(data, function(item, index, context) {
                    return (context[index] = _.isObject(item) ? item : {
                        label: item,
                        value: item
                    })
                })
            },
            _fillSelect: function() {
                var $select = this.$element.empty()
                _.each(this.options.data, function(item) {
                    if (item.children && item.children.length) {
                        var $optgroup = $('<optgroup>').attr('label', item.label)
                        _.each(item.children, function(item /*, index*/ ) {
                            _genOption(item).appendTo($optgroup)
                        })
                        $optgroup.appendTo($select)

                    } else {
                        _genOption(item).appendTo($select)
                    }
                })

                function _genOption(item) {
                    // item { label: '', value: '', selected: true|false }
                    return $('<option>')
                        .attr('value', item.value)
                        .prop('selected', item.selected)
                        .text(item.label)
                }
            },
            _responsive: function() {
                var $window = $(window)
                var $relatedElement = this.$relatedElement
                var $menu = $relatedElement.find('ul.dropdown-menu')
                $(window).on('scroll', function() {
                    var offset = $relatedElement.offset()
                    var top = offset.top - $window.scrollTop()
                    var button = $window.scrollTop() + $window.height() - offset.top - $relatedElement.outerHeight()
                    var placement = button >= top ? 'button' : 'top'
                    switch (placement) {
                        case 'button':
                            $menu.css('max-height', top - 10)
                            break
                        case 'top':
                            $menu.css('max-height', button - 10)
                            break
                    }
                })
            },
            _autoHide: function() {
                var that = this
                var type = 'click.dropdown_autohide_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (that.$relatedElement.has(event.target).length) return
                        that.hide()
                    })
            },
            destroy: function() {
                this.$manager.undelegate(this.$element)
                this.$manager.undelegate(this.$relatedElement)

                this.$relatedElement.remove()

                var type = 'click.dropdown_autohide_' + this.clientId
                $(document.body).off(type)
            }
        })

        /*
            非 Select Dropdown
        */

        function CustomDropdown() {}

        _.extend(CustomDropdown.prototype, Dropdown.prototype, {
            init: function() {
                this.$element = $(this.element)
                this.$relatedElement = this.$element
                this.$manager = new EventManager('bx-')

                this._fixFlattenData(this.options.data)

                // 初始化选项 name
                this.options.name = this.$element.attr('name')
            },
            render: function() {
                if (this.options.value !== undefined) this.val(this.options.value)

                this.$manager.delegate(this.$relatedElement, this)

                // this._responsive()
                this._autoHide()
            },
            val: function(value) {
                var that = this
                var oldValue = function() {
                    var $target = that.$element.find('ul.dropdown-menu > li.active > a')
                    var oldValue = $target.attr('value')
                    if (oldValue === undefined) oldValue = $.trim($target.text())
                    return oldValue
                }()

                // .val()
                if (value === undefined) return oldValue

                // .val( value )
                var data /* { label: '', value: '', selected: true|false } */
                if (_.isObject(value)) data = value
                else _.each(that.$element.find('ul.dropdown-menu > li'), function(item /*, index*/ ) {
                    var $item = $(item)
                    var $target = $item.find('> a')
                    var targetValue = $target.attr('value')
                    var targetText = $.trim($target.text())
                    if (
                        (targetValue !== undefined && targetValue == value) ||
                        (targetValue === undefined && targetText == value)
                    ) {
                        data = {
                            name: that.options.name,
                            label: targetText,
                            value: targetValue !== undefined ? targetValue : targetText
                        }
                    }
                })

                // 未知值
                if (!data) return

                // 更新模拟下拉框的内容（先更新了再比较值是否有变化，因为此时渲染的内容可能是错误的！）
                this.$relatedElement.find('button.dropdown-toggle > span.dropdown-toggle-label')
                    .text(data.label)

                // 将 data.value 转换为字符串，是为了避免检测 `1 === '1'` 失败（旧值 oldValue 总是字符串）
                if (('' + data.value) === oldValue) return this

                // 更新模拟下拉框的选中状态
                this.$relatedElement.find('ul.dropdown-menu')
                    .find('li:has([value="' + oldValue + '"])')
                    .removeClass('active')
                    .end()
                    .find('li:has([value="' + data.value + '"])')
                    .addClass('active')

                this.trigger('change' + NAMESPACE, data)

                return this
            },
            data: function(data) {
                // .data()
                if (data === undefined) return this.options.data

                // .data(data)
                this.options.data = this._fixFlattenData(data)

                var $menu = this.$relatedElement.find('ul.dropdown-menu')
                var $newMenu = $(
                    compiledTemplate(this.options)
                ).find('ul.dropdown-menu')

                $menu.replaceWith($newMenu)

                this.$manager.delegate(this.$relatedElement, this)

                return this
            }
        })

        return Dropdown
    }
)

/*
    responsive http://silviomoreto.github.io/bootstrap-select/
 */