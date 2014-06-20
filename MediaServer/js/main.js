// Remove this for running standalone App ----
function backAppsHome() {
    history.go(-1);
}
// -------------------------------------------

jQuery(document).ready(function() {
    jQuery("#doFiltering").bind("click", function (event) {
        var text = jQuery("#filterText");
        jQuery("#information").html("");
        _find(text.val());

        event.preventDefault();
    });

    jQuery("#filterSelect li").bind("click", function (event) {
        jQuery("#filterText").val(jQuery(this).html());
        jQuery("#information").html("");

        event.preventDefault();
    });

    jQuery("#close").bind("click", function (event) {
        jQuery("#detail").hide();
        jQuery("#list").show();

        event.preventDefault();
    });

    init();
});

var media = {
    server: null,
    items: {}
};

/* General */
function _loadMediaList(medias) {
    var tbody = '',
        template = '<tr id="index_#ID" style="background: #DCDCDC; cursor: pointer;"><td>#TYPE</td><td>#DISPLAYNAME</td><td>#SIZE</td></tr>';

    for (var i = 0; i < medias.length; i++) {
        tbody += template.replace("#TYPE", medias[i].Type)
            .replace("#ID", i)
            .replace("#DISPLAYNAME", medias[i].DisplayName)
            .replace("#SIZE", medias[i].Size ? medias[i].Size : "");
        media.items["index_" + i] = medias[i];
    }

    jQuery("#media_table tbody").html(tbody);

    jQuery("#media_table tbody tr").bind("click", function(event) {
        var id = jQuery(this).attr("id"),
            items = media.items[id],
            key, html = "", template;

        template = '<p><label>#KEY:</label>#VALUE</p>';
        for (key in items) {
            html += template.replace("#KEY", key)
                .replace("#VALUE", items[key]);
        }
        jQuery("#detailList").html(html);

        jQuery("#detail").show();
        jQuery("#list").hide();

        event.preventDefault();
    });
}

function _scanNetwork(srv) {
    if (srv.root) {
        media.server = srv;
        _browser();
    }
    else {
        showInfo("INFO", "No media server(s).");
    }
}

function _browser() {
    if (media.server) {
        media.server.browse(media.server.root.id, "+Type", 0, 0, _loadMediaList, _error);
    }
    else {
        showInfo("ERROR", "No media server(s).");
    }
}

function _find(filter) {
    if (media.server) {
        media.server.find(media.server.root.id, filter, "+Type", 0, 0, _loadMediaList, _error);
    }
    else {
        showInfo("ERROR", "No media server(s).");
    }
}

function showInfo(level, message) {
    var css = (level === "ERROR") ? "#993333" : "#666666";
    jQuery("#information").html(message);
    jQuery("#information").css({color: css});
}

function _error(msg) {
    showInfo("ERROR", msg.message);
}

/* Initialize */
function init() {
    tizen.mediaserver.scanNetwork(_scanNetwork);
}
