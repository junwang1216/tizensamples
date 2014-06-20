// Remove this for running standalone App ----
function backAppsHome() {
    history.go(-1);
}
// -------------------------------------------

jQuery(document).ready(function() {
    jQuery("#filter").bind("click", function (event) {
        var text = jQuery("#filterText");
        _find(text.val());
        
        event.preventDefault();
    });
    
    jQuery("#filterSelect li").bind("click", function (event) {
        jQuery("#filterText").val(jQuery(this).html());
        
        event.preventDefault();
    });
    
    init();
});

/* General */
function _loadMediaList(medias) {
    console.log("MediaPlayer: MediaServer has called browseCallback");
    console.log("found " + medias.length + " medias.");
    var tbody = '',
        template = '<tr style="background: #DCDCDC"><td>#TYPE</td><td>#DISPLAYNAME</td><td>#PATH</td><td>#SIZE</td></tr>';

    for (var i = 0; i < medias.length; i++) {
        tbody += template.replace("#TYPE", medias[i].Type)
            .replace("#DISPLAYNAME", medias[i].DisplayName)
            .replace("#PATH", medias[i].Path)
            .replace("#SIZE", medias[i].Size);
    }

    jQuery("#media_table tbody").html(tbody);
}

function _scanNetwork(srv) {
    console.log("MediaPlayer: New MediaServer Found");
    console.log("MediaServer id: " + srv.id);
    console.log("MediaServer friendlyName: " + srv.friendlyName);

    if (srv.root) {
        console.log("MediaPlayer: MediaServer root folder: " + srv.root.id);
        srv.browse(srv.root.id, "+DisplayName", 0, 0, _loadMediaList, _error);
    }
    else
        console.log("MediaServer not browsable");
}

function _find(filter) {
    tizen.mediaserver.scanNetwork(function (srv) {
        if (srv.root) {
            srv.find(srv.root.id, filter, "+DisplayName", 0, 0, _loadMediaList, _error);
        }
        else
            console.log("MediaServer not browsable");
    });
}

function _error(msg) {
    jQuery("#error").html(msg.message);
    
    setTimeout(function () {
        jQuery("#error").html(" ");
    }, 3000);
}

/* Initialize */
function init() {
    tizen.mediaserver.scanNetwork(_scanNetwork);
}

