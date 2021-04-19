//function home slider
$('#home-slider').owlCarousel({
    autoplay: true,
    navigation: true,
    rtl: rtl,
    dots: false,
    lazyLoad: true,
    slideSpeed: 3000,
    paginationSpeed: 1000,
    margin: 0,
    navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
    responsive: {
        0: {
            items: 1,
            nav: true,
        },
        600: {
            items: 2,
            nav: true,
        },
        1000: {
            items: 3,
            nav: true,
        },
        2000: {
            items: 4,
            nav: true,
        }
    }

});

//first template slider
$('#first-tmp-home-slider').owlCarousel({
    autoplay: true,
    loop: true,
    rtl: rtl,
    navigation: true, // показывать кнопки next и prev
    slideSpeed: 3000,
    paginationSpeed: 1000,
    items: 1,
    lazyLoad: true,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false,
    onInitialize: function (event) {
        if ($('#owl-random-post-slider .item').length <= 1) {
            this.settings.loop = false;
        }
    },
});


//function random slider
$('#random-slider').owlCarousel({
    autoplay: true,
    loop: true,
    rtl: rtl,
    navigation: true, // показывать кнопки next и prev
    slideSpeed: 3000,
    paginationSpeed: 1000,
    items: 1,
    lazyLoad: true,
    dots: false,
    nav: true,
    navText: ["<i class='fa fa-angle-left random-arrow-prev' aria-hidden='true'></i>", "<i class='fa fa-angle-right random-arrow-next' aria-hidden='true'></i>"],
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false,
    onInitialize: function (event) {
        if ($('#owl-random-post-slider .item').length <= 1) {
            this.settings.loop = false;
        }
    },
});

//function  slider
$(window).load(function () {
    $('#post-detail-slider').owlCarousel({
        navigation: true, // показывать кнопки next и prev
        slideSpeed: 3000,
        paginationSpeed: 1000,
        rtl: rtl,
        items: 1,
        dots: false,
        nav: true,
        autoHeight: true,
        navText: ["<i class='fa fa-angle-left post-detail-arrow-prev' aria-hidden='true'></i>", "<i class='fa fa-angle-right post-detail-arrow-next' aria-hidden='true'></i>"],
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false,
        onInitialize: function (event) {
            if ($('#owl-random-post-slider .item').length <= 1) {
                this.settings.loop = false;
            }
        },
    });
});

//add animation to slider arrows

$('#home-slider .owl-prev').addClass('animated fadeIn');
$('#home-slider .owl-next').addClass('animated fadeIn');


//update token
$("form").submit(function () {
    $("input[name='" + csfr_token_name + "']").val($.cookie(csfr_cookie_name));
});

$('input[type="checkbox"].flat-blue, input[type="radio"].flat-blue').iCheck({checkboxClass: "icheckbox_minimal-grey", radioClass: "iradio_minimal-grey", increaseArea: "20%"});


//scroll to top
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
});
$('.scrollup').click(function () {
    $("html, body").animate({scrollTop: 0}, 700);
    return false;
});

// Search Modal
$("[data-toggle='modal-search']").click(function () {
    //if click open
    $('body').toggleClass('search-open');
    return false;
});

$(".modal-search .s-close").click(function () {
    //close modal
    $('body').removeClass('search-open');
    return false;
});


//show slider navigation on hover

$(document).ready(function () {
    $('#home-slider').hover(
        function () {
            $("#home-slider .owl-nav").css({"display": "block"});
        },

        function () {
            $("#home-slider .owl-nav").css({"display": "none"});
        }
    );

    $('#first-tmp-home-slider').hover(
        function () {
            $("#first-tmp-home-slider .owl-nav").css({"display": "block"});
        },

        function () {
            $("#first-tmp-home-slider .owl-nav").css({"display": "none"});
        }
    );
});

//ajax function make comment
$(document).ready(function () {
    $('#make-comment').on('click', function () {

        var comment = $('#comment_text').val();
        var post_id = $('#comment_post_id').val();
        var user_id = $('#comment_user_id').val();

        //validation
        if (comment.trim() == '') {
            $('#comment_text').addClass('has-error');
        } else {
            $('#comment_text').removeClass("has-error");
        }
        if (comment.length > 999) {
            $('#comment_text').addClass('has-error');
            return false;
        }
        //post
        if (comment && post_id && user_id) {
            $('.comment-loader-container').show();
            var limit = parseInt($("#vr_comment_limit").val());
            var data = {
                "comment": comment,
                "post_id": post_id,
                "user_id": user_id,
                "parent_id": 0,
                "limit": limit,
            };
            data[csfr_token_name] = $.cookie(csfr_cookie_name);
            $.ajax({
                method: 'POST',
                url: base_url + "home/add_comment_post",
                data: data,
            })
                .done(function (response) {
                    $('#comment_text').val('');
                    $('.comment-loader-container').hide();
                    document.getElementById("comment-result").innerHTML = response;
                });
        }
        return false;
    });
});

//fucntion show sub comment box
function showSubCommentBox(comment_id) {
    if (comment_id) {
        $('.leave-reply-sub-body').hide();
        if ($('#sub_comment_' + comment_id).is(':visible')) {
            $('leave-reply-sub-body').hide();
        } else {
            $('#sub_comment_' + comment_id).show();
        }
    }
}

//ajax function make sub comment
function makeSubComment(parent_id) {
    var comment = $('#comment_text_' + parent_id).val();
    var post_id = $('#comment_post_id').val();
    var user_id = $('#comment_user_id').val();

    //validation
    if (comment.trim() == '') {
        $('#comment_text_' + parent_id).addClass('has-error');
    } else {
        $('#comment_text_' + parent_id).removeClass("has-error");
    }
    if (comment.length > 999) {
        $('#comment_text_' + parent_id).addClass('has-error');
        return false;
    }

    //post
    if (comment && post_id && user_id && parent_id) {
        $('.sub-comment-loader-container').show();

        var count = $("#visible_comment_count").val();

        var data = {
            "comment": comment,
            "post_id": post_id,
            "user_id": user_id,
            "parent_id": parent_id,
            "count": count,
        };

        data[csfr_token_name] = $.cookie(csfr_cookie_name);

        $.ajax({
            method: 'POST',
            url: base_url + "home/add_comment_post",
            data: data
        })
            .done(function (response) {
                $('#comment_text_' + parent_id).val('');
                $('.sub-comment-loader-container').hide();
                document.getElementById("comment-result").innerHTML = response;
                $('.leave-reply').show();
            });
    }
    return false;
}

//function delete comment
function deleteComment(title, content, id) {
    $.confirm({
        title: title,
        content: content,
        buttons: {
            Delete: function () {

                var limit = parseInt($("#vr_comment_limit").val());

                var data = {
                    "id": id,
                    "limit": limit,
                };

                data[csfr_token_name] = $.cookie(csfr_cookie_name);

                $.ajax
                ({
                    type: 'POST',
                    url: base_url + "home/delete_comment_post",
                    data: data,
                    success: function (response) {
                        document.getElementById("comment-result").innerHTML = response;
                    },
                    error: function (response) {

                    }
                });
            },
            Cancel: function () {

            },
        }
    });
}

//load more comments
function load_more_comments(post_id) {
    var limit = parseInt($("#vr_comment_limit").val());
    var data = {
        "post_id": post_id,
        "limit": limit,
    };

    $('.comment-loader').show();
    data[csfr_token_name] = $.cookie(csfr_cookie_name);

    $.ajax({
        method: 'POST',
        url: base_url + "home/load_more_comments",
        data: data
    })
        .done(function (response) {
            setTimeout(function () {
                $('.comment-loader').hide();
                $("#vr_comment_limit").val(limit + 5);
                document.getElementById("comment-result").innerHTML = response;
            }, 500);

        });
}

//add att to iframe
$(document).ready(function () {
    $('iframe').attr("allowfullscreen", "");
});

$(document).ready(function ($) {
    "use strict";

    //magnific popup
    $('.image-popup').magnificPopup({
        type: 'image',
        titleSrc: function (item) {
            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
        },
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        removalDelay: 100, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = "mfp-zoom-out";
            }
        },
        fixedContentPos: true,

    });
});

//make reaction
function make_reaction(post_id, reaction, lang) {
    var data = {
        post_id: post_id,
        reaction: reaction,
        lang: lang
    };
    data[csfr_token_name] = $.cookie(csfr_cookie_name);
    $.ajax({
        method: "POST",
        url: base_url + "home/save_reaction",
        data: data
    }).done(function (response) {
        document.getElementById("reactions_result").innerHTML = response
    })
}

//view poll results
function view_poll_results(a) {
    $("#poll_" + a + " .question").hide();
    $("#poll_" + a + " .result").show()
}

//view poll option
function view_poll_options(a) {
    $("#poll_" + a + " .result").hide();
    $("#poll_" + a + " .question").show()
}

//poll
$(document).ready(function () {
    var a;
    $(".poll-form").submit(function (d) {
        d.preventDefault();
        if (a) {
            a.abort()
        }
        var b = $(this);
        var c = b.find("input, select, button, textarea");
        var f = b.serializeArray();
        f.push({name: csfr_token_name, value: $.cookie(csfr_cookie_name)});
        var e = $(this).attr("data-form-id");
        a = $.ajax({url: base_url + "home/add_vote", type: "post", data: f,});
        a.done(function (g) {
            c.prop("disabled", false);
            if (g == "voted") {
                $("#poll-error-message-" + e).show()
            } else {
                document.getElementById("poll-results-" + e).innerHTML = g;
                $("#poll_" + e + " .result").show();
                $("#poll_" + e + " .question").hide()
            }
        })
    })
});

$(document).ready(function () {
    $(".filters .btn").click(function () {
        $(".filters .btn").removeClass('active');
        $(this).addClass('active');
    });

    //masonry
    $(function () {
        var self = $("#masonry");

        self.imagesLoaded(function () {
            self.masonry({
                gutterWidth: 0,
                isAnimated: true,
                itemSelector: ".gallery-item"
            });
        });

        $(".filters .btn").click(function (e) {
            e.preventDefault();

            var filter = $(this).attr("data-filter");

            self.masonryFilter({
                filter: function () {
                    if (!filter) return true;
                    return $(this).attr("data-filter") == filter;
                }
            });
        });
    });
});