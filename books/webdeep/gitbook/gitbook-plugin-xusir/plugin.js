require(["gitbook", "jQuery"], function (gitbook, $) {

    $('.book-header .fa-align-justify').addClass('fa-list-ul')
    $('.page-inner').off

    gitbook.events.on('start', function (e, config) {

    })
    gitbook.events.on('page.change', function () {
        $(function () {
            $('code.hljs').each(function (i, block) {
                hljs.lineNumbersBlock(block);
            });
        })

        $('pre code').each(function (i, block) {
            //空格替换成 &nbsp;
            var code = $(block).html().replace(/ /g, '&nbsp;');
            $(block).html(code)
            hljs.highlightBlock(block);
        });
        $('h2,h3,h4').hover(function () {
            $(this).find('.fa-link').show()
        }, function () {
            $(this).find('.fa-link').hide()
        })

        var titles = [];
        $('h2,h3').each(function (index, node) {
            titles.push(node)
        })

        function debounce(fn, wait) {
            var timer = null;
            return function () {
                var context = this
                var args = arguments
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                timer = setTimeout(function () {
                    fn.apply(context, args)
                }, wait)
            }
        }

        $('.body-inner').bind("scroll", debounce(function () {
                var _this = $(this)

                var scrollTop = _this.scrollTop() + 60
                var topTitle = null
                for (var index in titles) {
                    var title = titles[index]
                    if (title.offsetTop > scrollTop) {
                        continue
                    }
                    if (!topTitle) {
                        topTitle = title
                    } else if (title.offsetTop >= topTitle.offsetTop) {
                        topTitle = title
                    }
                }
                if (topTitle) {
                    let clsName = `.right.page-toc .${topTitle.id}`
                    $('.right .h2,.right .h3').removeClass('active')
                    $(clsName).addClass('active')
                }
            }, 300)

        )
    })


});