/* Author:
    JFO
*/
 
$(function(){
      
    // --------------------------------------
    // editor.js
    // --------------------------------------
    function selectText(element) {
        var doc = document, result='';
        var text = doc.getElementById(element);    
    
        if (doc.body.createTextRange) { // ms
            var range = doc.body.createTextRange();
            range.moveToElementText(text);
            result = range.select();
        } else if (window.getSelection) { // moz, opera, webkit
            var selection = window.getSelection();            
            result = text.innerText;
            var range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);            
        }
        return result;
    }
    
    function saveSong(){
        // Check if "key" exists in the storage
        var key = $.trim($("#songtitle").text());
        var value = $.jStorage.get(key);
        if(value){ 
            // save a backup before deleting
            $.jStorage.set(key+"_prev", value);
            $.jStorage.deleteKey(key);
        }
        // if not - load the data from the server
     	value = {title:key, text:$("#songtext").html()}
     	// and save it
    	$.jStorage.set(key,value);
        console.log("saved song '" + key + "'");
    }
    
    function restoreSong(){
        // Check if "key" exists in the storage
        var key = window.location.href.split('#')[1];
        if(!key){            
            return;
        }
        var value = $.jStorage.get($.trim(key));
        if(value){ 
            $("#songtitle").text(value.title);
            $("#songtext").html(value.text);
            return;
        }
        console.log("song '" + $.trim(key) + "' not found");
    }
    
    function initEditor(){
        $("#songtitle")
                .on("keydown", 
                        function(e){
                            if (e.keyCode == 13){
                                $(this).trigger("blur");
                                $("div.text").focus();
                            }
                        })
                 .on("blur", saveSong);
                 
            $("#songtext")
                    .on("blur",function(){            
                        console.log($("#songtext").html());
                        saveSong();
                    });
                    
            $(window).on("hashchange", restoreSong);
            
            restoreSong();
            
            if ($("#songtitle").text().trim() === "[Song title]") selectText("songtitle");
    }
    
    // --------------------------------------
    // main.js
    // --------------------------------------   
    $("#main").load('static/main.html',  function(){
        
            //$("canvas").css({position:"relative"}).wrapAll("<div class='canvasWrap'/>"); 
            
            $('.draggable').draggable(/*{axis:'x'}*/);
            
            initEditor();
            
    });
    
});


