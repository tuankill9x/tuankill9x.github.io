//update token
$("form").submit(function () {
    $("input[name='" + csfr_token_name + "']").val($.cookie(csfr_cookie_name));
});

//datatable
$(document).ready(function () {
    $('#cs_datatable').DataTable({
        "order": [[0, "desc"]],
        "aLengthMenu": [[15, 30, 60, 100], [15, 30, 60, 100, "All"]]
    });
});

$(function () {
    if ($("#tags_1").length != 0) {
        $('#tags_1').tagsInput({width: 'auto'});
    }
});

$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-red',
    radioClass: 'iradio_flat-red'
});

function get_sub_categories(val) {
    var data = {
        "parent_id": val
    };
    data[csfr_token_name] = $.cookie(csfr_cookie_name);

    $.ajax({
        type: "POST",
        url: base_url + "admin_category/get_sub_categories",
        data: data,
        success: function (response) {
            $('#subcategories').children('option:not(:first)').remove();
            $("#subcategories").append(response);
        }
    });
}

function get_categories_by_lang(val) {
    var data = {
        "lang_id": val
    };
    data[csfr_token_name] = $.cookie(csfr_cookie_name);

    $.ajax({
        type: "POST",
        url: base_url + "admin_category/get_categories_by_lang",
        data: data,
        success: function (response) {
            $('#categories').children('option:not(:first)').remove();
            $("#categories").append(response);
        }
    });
}

function get_gallery_categories_by_lang(val) {
    var data = {
        "lang_id": val
    };
    data[csfr_token_name] = $.cookie(csfr_cookie_name);

    $.ajax({
        type: "POST",
        url: base_url + "admin_category/gallery_categories_by_lang",
        data: data,
        success: function (response) {
            $('#categories').children('option:not(:first)').remove();
            $("#categories").append(response);
        }
    });
}

function get_menu_links_by_lang(val) {
    var data = {
        "lang_id": val
    };
    data[csfr_token_name] = $.cookie(csfr_cookie_name);

    $.ajax({
        type: "POST",
        url: base_url + "admin/get_menu_links_by_lang",
        data: data,
        success: function (response) {
            $('#parent_links').children('option:not(:first)').remove();
            $("#parent_links").append(response);
        }
    });
}

//datetimepicker
$(function () {
    $('#datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });
});

$('#cb_scheduled').on('ifChecked', function () {
    $("#date_published_content").show();
    $("#input_date_published").prop('required', true);
});
$('#cb_scheduled').on('ifUnchecked', function () {
    $("#date_published_content").hide();
    $("#input_date_published").prop('required', false);
});

//Multi Image Previev
window.onload = function () {
    var MultifileUpload = document.getElementById("Multifileupload");
    if (MultifileUpload) {
        MultifileUpload.onchange = function () {
            if (typeof (FileReader) != "undefined") {
                var MultidvPreview = document.getElementById("MultidvPreview");
                MultidvPreview.innerHTML = "";
                var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                for (var i = 0; i < MultifileUpload.files.length; i++) {
                    var file = MultifileUpload.files[i];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var img = document.createElement("IMG");
                        img.height = "100";
                        img.width = "100";
                        img.src = e.target.result;
                        img.id = "Multifileupload_image";
                        MultidvPreview.appendChild(img);
                        $("#Multifileupload_button").show();
                    }
                    reader.readAsDataURL(file);
                }
            } else {
                alert("This browser does not support HTML5 FileReader.");
            }
        }
    }
};


/*
*
* Video Upload Functions
*
* */

$("#video_embed_code").on("change keyup paste", function () {
    var embed_code = $("#video_embed_code").val();
    $("#video_preview").attr('src', embed_code);

    if ($("#video_embed_code").val() == '') {
        $("#selected_image_file").attr('src', '');
    }
});


function get_video_from_url() {

    var url = $("#video_url").val();

    if (url) {
        var data = {
            "url": url,
        };

        data[csfr_token_name] = $.cookie(csfr_cookie_name);

        $.ajax({
            type: "POST",
            url: base_url + "admin_post/get_video_from_url",
            data: data,
            success: function (response) {
                $("#video_embed_code").html(response);
                if (response != "Invalid Url") {
                    $("#video_embed_preview").attr('src', response);
                    $("#video_embed_preview").show();
                }
            }
        });

        $.ajax({
            type: "POST",
            url: base_url + "admin_post/get_video_thumbnail",
            data: data,
            success: function (response) {
                $("#video_thumbnail_url").val(response);
                $("#selected_image_file").attr('src', response);
            }
        });
    }
}

$("#video_thumbnail_url").on("change keyup paste", function () {
    var url = $("#video_thumbnail_url").val();
    $("#selected_image_file").attr('src', url);
    $('input[name="post_image_id"]').val('');
});

//reset file input
function reset_file_input(id) {
    $(id).val('');
    $(id + "_label").html('');
    $(id + "_button").hide();
}

//reset preview image
function reset_preview_image(id) {
    $(id).val('');
    $(id + "_image").remove();
    $(id + "_button").hide();
}

//delete post video
function delete_post_video(post_id) {

    var data = {
        "post_id": post_id,
    };

    data[csfr_token_name] = $.cookie(csfr_cookie_name);
    $.ajax({
        type: "POST",
        url: base_url + "admin_post/delete_post_video",
        data: data,
        success: function (response) {
            document.getElementById("post_selected_video").innerHTML = " ";
            $(".btn-delete-post-video").hide();
        }
    });
}


//check all checkboxes
$("#checkAll").click(function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
});

//show hide delete button
$('.checkbox-table').click(function () {
    if ($(".checkbox-table").is(':checked')) {
        $(".btn-table-delete").show();
    } else {
        $(".btn-table-delete").hide();
    }
});

//delete selected posts
function delete_selected_posts($message) {

    if (confirm($message)) {

        var post_ids = [];

        $("input[name='checkbox-table']:checked").each(function () {
            post_ids.push(this.value);
        });

        var data = {
            'post_ids': post_ids,
        };

        data[csfr_token_name] = $.cookie(csfr_cookie_name);

        $.ajax({
            type: "POST",
            url: base_url + "admin_post/delete_selected_posts",
            data: data,
            success: function (response) {
                location.reload();
            }
        });
    }

};

//delete selected comments
function delete_selected_comments(message) {
    if (confirm(message)) {

        var comment_ids = [];

        $("input[name='checkbox-table']:checked").each(function () {
            comment_ids.push(this.value);
        });

        var data = {
            'comment_ids': comment_ids,
        };

        data[csfr_token_name] = $.cookie(csfr_cookie_name);

        $.ajax({
            type: "POST",
            url: base_url + "admin/delete_selected_comments",
            data: data,
            success: function (response) {
                location.reload();
            }
        });
    }

};

//delete post main image
function delete_post_main_image(post_id) {

    var data = {
        "post_id": post_id,
    };

    data[csfr_token_name] = $.cookie(csfr_cookie_name);
    $.ajax({
        type: "POST",
        url: base_url + "admin_post/delete_post_main_image",
        data: data,
        success: function (response) {

            $('.btn-delete-main-img').hide();
            $("#selected_image_file").attr('src', '');

            document.getElementById("post_selected_video").innerHTML = " ";
            $(".btn-delete-post-video").hide();
        }
    });
}

$(document).ajaxStop(function () {

    $('input[type="checkbox"].square-purple, input[type="radio"].square-purple').iCheck({
        checkboxClass: 'icheckbox_square-purple',
        radioClass: 'iradio_square-purple',
        increaseArea: '20%' // optional
    });

    $('#cb_scheduled').on('ifChecked', function () {
        $("#date_published_content").show();
        $("#input_date_published").prop('required', true);
    });
    $('#cb_scheduled').on('ifUnchecked', function () {
        $("#date_published_content").hide();
        $("#input_date_published").prop('required', false);
    });

});



