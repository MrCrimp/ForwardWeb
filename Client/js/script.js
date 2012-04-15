/* Author:
    JFO
*/
 
$(function(){ //sandbox
      
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
        cleanText();
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
            cleanText();
            return;
        }
        console.log("song '" + $.trim(key) + "' not found");
    }
    
    function cleanText(){
        $('[style]', '#songtext').removeAttr('style');
        $('#songtext > *').addClass('text');
    }
    
   function getCharacterOffsetWithin(range, node) {
        var treeWalker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_TEXT,
            function(node) {
                var nodeRange = document.createRange();
                nodeRange.selectNode(node);
                return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                    NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            },
            false
        );
    
        var charCount = 0;
        while (treeWalker.nextNode()) {
            charCount += treeWalker.currentNode.length;
        }
        if (range.startContainer.nodeType == 3) {
            charCount += range.startOffset;
        }
        return charCount;
  }
  
  function insertTextAtCursor(text) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode( document.createTextNode(text) );
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text;
        }
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
                        cleanText();
                        console.log($("#songtext").html());
                        saveSong();
                    });
                    
            $('body').on('keyup click','.text', function() {
                var el = document.getElementById("songtext");
                var range = window.getSelection().getRangeAt(0);
                var offset = getCharacterOffsetWithin(range, el);
                $('#pos').text(offset);            
              });
                    
            $(window).on("hashchange", restoreSong);
                        
            restoreSong();
            
            $('#songtext').scroller({disabled:true, theme:'ios',
                onClose: function(v,o){
                            $("#songtext").scroller('option',{disabled:true});
                            console.log('scroller disabled');
                },
                onSelect: function(val){
                    restoreSelection();
                    insertTextAtCursor(val);
                }
            });
            
            // Handle tap/mousedown hold
            (function(){
                
                $(".text","#songtext")
                    .hammer({prevent_default:false,tap_double:false, tap:false,transform:false,drag:false, css_hacks:false})                
                    .on("hold", ".text", function onTapHold(ev) {
                         /*ev: originalEvent: The original DOM event.
                            position: An object with the x and y position of the gesture (e.g. the position of a tap and the center position of a transform).
                            touches: An array of touches, containing an object with the x and the y position for every finger.
                            */
                         //find selection ?                         
                         console.log('fired insert chord');
                         $("#songtext")
                         .scroller('option',{disabled:false}).scroller('show');
                    });
                
            })($);
            
            if ($("#songtitle").text().trim() === "[Song title]") selectText("songtitle");
    }
    
    function handleTextPasting(){        
            $('[contenteditable]').live('paste', function()
            {
                var $this = $(this);            
                //more code here to remember caret position, etc            
                $('#clipboard').val('').focus(); //put the focus in the hidden textarea so that, when the paste actually occurs, it's auto-sanitized by the textarea            
                setTimeout(function() //then this will be executed immediately after the paste actually occurs
                {
                    $this.focus();
                    document.execCommand('insertHTML', true, $('#clipboard').val());
                });
            });
    }
    
    function saveSelection() {
        var result = null;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                result = sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            result = document.selection.createRange();
        }
        $("#songtext").data("cursor", saveSelection())
        return result;
    }
    
    function restoreSelection(range) {
        range = range || $("#songtext").data("cursor");
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    }
    // --------------------------------------
    // main.js
    // --------------------------------------   
    $("#main").load('static/main.html',  function(){
                    
            initEditor();
            
            $('ul.nav > li').draggable({
                    //containment:'#songtext', 
                    helper:'clone', 
                    opacity:0.35, 
                    cursor:'move',
                    cursorAt: {top:35},
                    start: function(ev, ui){
                        //var pos = $(ui.helper).offset();
                    }
            });
            
            handleTextPasting();                        
    });
    
    
}); //sandbox


