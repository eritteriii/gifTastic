$(document).ready(function(){
    
    var gifs = [
        "Spongebob", "Seinfeld", "Friends", "Scrubs"
    ];

    function makeButton(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();

        for (var i=0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.addClass("btn-primary")
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    $(document).on("click", ".gif-button", function(){
        $("#gifs").empty();
        $(".gif-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=UvZ4TmXaqh6zfs84N8kVF54lWGklaPWr&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            var results = response.data;

            for ( var i = 0; i < results.length; i++){
                var gifDiv = $("<div class=\"item\">");

                var rating = results[i].rating;

                var p = $("<p>").text("This GIF is rated " + rating + ".");

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var gifStill = $("<img>");
                gifStill.attr("src", still);
                gifStill.attr("data-still", still);
                gifStill.attr("data-animate", animated);
                gifStill.attr("data-state", "still");
                gifStill.addClass("gif-image");

                gifDiv.append(p);
                gifDiv.append(gifStill);

                $("#gifs").append(gifDiv);
            }
        });
    });

    $(document).on("click", ".gif-image", function(){

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add").on("click", function(event){
        event.preventDefault();
        var newGif = $("input").eq(0).val();

        if (newGif.length > 2){
            gifs.push(newGif);
        }

        makeButton(gifs, "gif-button", "#buttons");
    });


    makeButton(gifs, "gif-button", "#buttons");
});