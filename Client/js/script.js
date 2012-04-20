/* Author:
    JFO
*/

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

$(function(){ //sandbox
    
    // --------------------------------------
    // harmonic.js
    // --------------------------------------
    var re_chord_in_text = /(\[chord\s+)([a-hA-H]{1}#?b?.{0,5})\]/g,
        re_comma_in_text = /(,,)([a-hA-H]{1}#?b?.{0,5})(,,)+/g
 alts = {
    names : "major|m|min|dim|dom|sus|aug|add|+|7|9|11|13|b5|b11|b13".split("|")
 },
 
 modifications = ["m", "M", "aug", "dim", "sus", "add9", "m6", "m7", "m9", 
    								"maj7", "maj9", "mmaj7", "-5", "11", "13", "5", "6", "6add9", 
									"7", "7-5", "7maj5", "7sus4", "9"] ,
                                    
 special_chords = ["A/C#", "A/E", "A/F", "A/G", "A/G#", "Am/C", "Am/E", "Am/F", 
									"Am/F#", "Am/G", "Am/G#", "C/E", "C/F", "C/G", "D/A", "D/B", 
									"D/Bb", "D/C", "D/F#", "E/B", "E/C#", "E/D", "E/D#", "E/F", 
									"E/F#", "E/G", "E/G#", "Em/B", "Em/C#", "Em/D", "Em/D#", 
									"Em/F", "Em/F#", "Em/G", "Em/G#", "F/A", "F/C", "F/D", "F/D#", 
									"F/E", "F/G", "Fm/C", "G/B", "G/D", "G/E", "G/F", "G/F#"] ,

 simpleTranspose = {"Db":"C#", "C#":"Db", "Eb":"D#", "D#":"Eb", "Gb":"F#", "F#":"Gb", "Ab":"G#", "G#":"Ab", "Bb":"A#", "A#":"Bb"} ,

 chordPosition = {"B#":0, "C":0, "C#":1, "Db":1, "D":2, "D#":3, "Eb":3, "E":4, "Fb":4, "E#":5, "F":5, "F#":6, "Gb":6, 
								"G":7, "G#":8, "Ab":8, "A":9, "A#":10, "Bb":10, "B":11, "Cb":11} ,

chords = { "C" : ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"], 

					"C#" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
					"Db" : ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
					"D" : ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"], 
					"D#" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],	// not a common key sig
					"Eb" : ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
					"E" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
					"F" : ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
					"F#" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
					"Gb" : ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
					"G" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"],
					"G#" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], 
					"Ab" : ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
					"A" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "Bb", "B"],
					"A#" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],	// not a common key sig
					"Bb" : ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
					"B" : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] 
} ;

//  relative minors
chords["Am"] = chords["C"] ;	
chords["Am"][8] = "G#" ;
chords["A#m"] = chords["C#"] ;	
chords["Bbm"] = chords["Db"] ;
chords["Bm"] = chords["D"] ;	
chords["Bm"][10] = "A#" ;
chords["Cm"] = chords["Eb"] ;
chords["C#m"] = chords["E"] ;
chords["Dbm"] = chords["F"] ;	
chords["Dm"] = chords["F"] ;	
chords["Dm"][1] = "C#" ;
chords["D#m"] = chords["F#"] ;	
chords["Ebm"] = chords["Gb"] ;
chords["Em"] = chords["G"] ;	
chords["Em"][8] = "G#" ;	
chords["Em"][10] = "A#" ;
chords["Fm"] = chords["Ab"] ;
chords["F#m"] = chords["A"] ;
chords["Gbm"] = chords["Gb"] ;	
chords["Gm"] = chords["Bb"] ;	
chords["Gm"][1] = "C#" ;	
chords["Gm"][7] = "F#" ;
chords["G#m"] = chords["B"] ;
chords["Abm"] = chords["Ab"] ;


//[ { 'Label 1': { x: 'x', y: 'y', z: 'z' }, 'Label 2': { a: 'a', b: 'b' } }, { 'Label 3': { 1: '1', 2: '2' }, 'Label 4': { 4: '4', 5: '5' } } ]
//var wheels = [{'Chord': toObj(chords["C"]), 'Label 2': { a: 'a', b: 'b' } }}];

var key = "C", 
    wheels = [ { 'chord': toObj(chords[key]), 'modification': toObj(modifications), 'base': toObj(chords[key]) }];


 function toObj(arr){
      var o = {'':''};
      $.each(arr, function(i,val){
          o[val] = val;    
      });
      return o;
    }

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
    
    function cleanText(){ 
        $('[style]', '#songtext').removeAttr('style');
    }
    
    function formatText(){        
        $('#songtext > *').addClass('text');
        // fix http://jsbin.com/uxuzux
        var formatted = $("#songtext").html().replace( chords_in_text  , "<span class='chord'><span class='inner'>$2</span></span>" )
        $("#songtext").html(formatted);
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
        if(!text) return;        
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
                    .on("keydown", function(){
                        cleanText();
                    })
                    .on("blur",function(){   
                        console.log("text blur")
                        if( $(this).data("modalopen") ) return;                        
                        cleanText();
                        //console.log($("#songtext").html());
                        saveSong();
                    }).on("focus", function(){
                        console.log("text edit");
                    }).on("selectstart", function(){
                        console.log("selectstart");
                        
                    });
                    
            $('body').on('keyup click','.text', function() {
                var el = document.getElementById("songtext");
                var range = window.getSelection().getRangeAt(0);
                var offset = getCharacterOffsetWithin(range, el);
                $('#pos').text(offset);            
              });
                    
            $(window).on("hashchange", restoreSong);
                        
            restoreSong();
            
            $('#songtext').scroller({disabled:true, theme:'ios', wheels:wheels,
                onClose: function(v,o){
                            $("#songtext").data("modalopen",false);
                            $("#songtext").scroller('option',{disabled:true});
                            console.log('scroller disabled');
                },
                onSelect: function(val){
                    $("#songtext").focus();
                    restoreSelection();
                    insertTextAtCursor('[chord ' + val + ']');
                    formatText();
                },
                beforeShow: function(el,inst){
                    console.log('modalactive');
                    document.activeElement.blur();
                    $("#songtext").blur().data("modalopen",true);   
                                      
                   // ..must find a way to hide the iPad keyboard here..
                }
            });
            
            // Handle tap/mousedown hold
            (function(){
                
                $("#songtext")
                    .hammer({prevent_default:false,tap_double:false, tap:false,transform:false,drag:true, css_hacks:false})   
                    .bind("hold", function(ev){
                        /*ev: originalEvent: The original DOM event.
                            position: An object with the x and y position of the gesture (e.g. the position of a tap and the center position of a transform).
                            touches: An array of touches, containing an object with the x and the y position for every finger.
                            */
                            
                        console.log('hold works');
                        // don't show dialog if a word is selected
                        if( saveSelection() ) return false;
                        //$("#songtext").blur();
                        $("#songtext").scroller('option',{disabled:false}).scroller('show');
                        //return false;
                    });
                
            })($);
            
            // live insert chords with keyboard
            $("[contenteditable].text")
              .on("keypress",function(e){
                  
                  if ( e.keyCode == 91 && e.keyCode !=  44 ) saveSelection();
                  // only continue on ] or ,
                  if ( e.keyCode != 93 && e.keyCode !=  44 ) return;             
                  // wait for keyup, then insert the requested chord
                  $(this).one("keyup", function(){                
                        var lyrics = $(this).html(),
                          chord_span="<span class='chord'><span class='inner'>$2</span></span>",
                          formatted;
                        // test to void executing on other bracketed expressions or just a comma
                        if ( !re_chord_in_text.test(lyrics) && !re_comma_in_text.test(lyrics) ) return;
                                           
                        formatted = lyrics.replace( re_chord_in_text, chord_span )
                                      .replace( re_comma_in_text, chord_span );
                      
                    console.log("chord added");
                    $(this).html(formatted);
                    restoreSelection();
                  });
              
              });
            
            if ($("#songtitle").text().trim() === "[Song title]") selectText("songtitle");
                        
            handleTextPasting();     
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
        // returns false if selection length is 0
        var result;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                result = sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            result = document.selection.createRange();
        }
        $("#songtext").data("cursor", result)
        console.log('cursor saved');
        return result.endOffset > result.startOffset;
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
            console.log('cursor restored');
        }
    }
    
    
    // --------------------------------------
    // main.js
    // --------------------------------------   
    $("#main").load('static/main.html',  function(){
                        
            initEditor(/*songs.all()*/);
            
            // need some form of client template to output a list of songs
            
            /*window.mySwipe = new Swipe( document.getElementById('slider'), {
                callback: function(index, elem) {
                    //on swipe
                    if( $("[contenteditable:focus]").length ){
                        mySwipe.prev(); //cancel swipe
                    }
                },
                transitionEnd: function(index, elem) {
                    //swipe done, load more content in background
                }
            }); */       
            
            // -- sidebar.js
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
    });
    
    
}); //sandbox


