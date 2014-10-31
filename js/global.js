$(document).ready(function(){
    
    //zeroclipboard setup
    var client = new ZeroClipboard($("#lorem-copy, #twitter-copy, #youtube-copy, #vimeo-copy, #soundcloud-copy, #facebook-copy"), {
         moviePath: "./ZeroClipboard.swf"
    });
    client.on( "load", function(client) {
        client.on( "complete", function(client, args) {
        // `this` is the element that was clicked
        this.style.display = "none";
        alert("Copied text to clipboard: " + args.text );
        });
    });
    
    $.getJSON("data.json", function(json) {
        
        var update = function(site){
            var selection = $("#" + site + "-select").val();
            $("#" + site + "-embed").html((json["embeds"][site][selection]));
            $("#" + site + "-textarea").val((json["embeds"][site][selection]));
        };
 
        $('#youtube-embed').html((json["embeds"]["youtube"]["clips"]));
        $('#youtube-textarea').val((json["embeds"]["youtube"]["clips"]));
        $("#youtube-select").on('change', function() {
            update('youtube');
        });
        
        $('#twitter-embed').html((json["embeds"]["twitter"]["tweet"]));
        $('#twitter-textarea').val((json["embeds"]["twitter"]["tweet"]));
        $("#twitter-select").on('change', function() {
            update('twitter');
        });
        
        $('#vimeo-embed').html((json["embeds"]["vimeo"]["clips"]));
        $('#vimeo-textarea').val((json["embeds"]["vimeo"]["clips"]));
        $("#vimeo-select").on('change', function() {
            update('vimeo');
        });
        
        $('#vine-embed').html((json["embeds"]["vine"]["simple"]));
        $('#vine-textarea').val((json["embeds"]["vine"]["simple"]));
        $("#vine-select").on('change', function() {
            update('vine');
        });
        
        $('#soundcloud-embed').html((json["embeds"]["soundcloud"]["bach-classic"]));
        $('#soundcloud-textarea').val((json["embeds"]["soundcloud"]["bach-classic"]));
        $("#soundcloud-select").on('change', function() {
            update('soundcloud');
        });
        
        var instagram_selection = localStorage.getItem("instagram_selection") || "mona";
        $('#instagram-embed').html((json["embeds"]["instagram"][instagram_selection]));
        $('#instagram-textarea').val((json["embeds"]["instagram"][instagram_selection]));
        $('#instagram-select').val(instagram_selection);
        $("#instagram-select").on('change', function() {
            selection = $("#instagram-select").val();
            localStorage.setItem("instagram_selection", selection);
            location.reload();
        });
        
        $('#facebook-embed').html((json["embeds"]["facebook"]["pagepost"]));
        $('#facebook-textarea').val((json["embeds"]["facebook"]["pagepost"]));
        $("#facebook-select").on('change', function() {
            update('facebook');
            FB.XFBML.parse();
        });
        
        var pinterest_selection = localStorage.getItem("pinterest_selection") || "boardwidget";
        $('#pinterest-embed').html((json["embeds"]["pinterest"][pinterest_selection]));
        $('#pinterest-textarea').val((json["embeds"]["pinterest"][pinterest_selection]));
        $('#pinterest-select').val(pinterest_selection);
        $("#pinterest-select").on('change', function() {
            var selection = $("#pinterest-select").val();
            localStorage.setItem("pinterest_selection", selection);
            location.reload();
        });
    });

});
