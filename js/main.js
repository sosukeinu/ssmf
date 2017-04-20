$(function() { // on Document Ready
    // Noise Filter
    var debug = true;

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Event Triggers (examples)
    // on click
    $('body').on('click', 'button[id^="id_"]', function(event) {
        event.preventDefault();
        var clicked = $(this).attr('id');
        debug && console.log('clicked: ' + clicked);
    });
    // on focus
    $('body').on('focus', 'div[id^="id_"]', function(event) {
      event.preventDefault();
      var focused = $(this).attr('id');
      debug && console.log('focused: ' + focused);
    });
    // on select checkbox
    $('body').on('change', 'input[type=checkbox]', function(event) {
      event.preventDefault();
      var checked = $(this).attr('id');
      debug && console.log('checked: ' + checked);
    });
    // on double click edit span
    $('body').on('dblclick', 'span[class=edit]', function(event) {
      event.preventDefault();
      var edit = $(this).attr('id');
      debug && console.log('edit: ' + edit);
    });
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\!Event Triggers

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Helper funcs
    function isInt(n) {
        return +n === n && !(n % 1);
    }

    function jsonSafe(string) {
        var result = $.trim(string.replace(/ /g, "_"));
        return result;
    }

    function displaySafe(string) {
        var result = $.trim(string.replace(/_/g, " "));
        return result;
    }

    Object.size = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\!Helper funcs

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // \\\\ Components
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    // filter.html
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Live Filter
    function filter(term) {
        // search
        console.log(term);
        var count = $('div[data-search-val*="' + term + '"]').length;
        console.log(count);
        if (count > 0) {
            $('div[data-search-val]:not(:contains(' + term + '))').hide();
        } else {
            // alert the user there are no matches
            $("span.message").html(
                '<div class="alert alert-warning alert-dismissible" role="alert"> \
          <button type="button" class="close" data-dismiss="alert" \ aria-label="Dismiss">Dismiss</button> \
          Your search found no matches. \
        </div>'
            );
        }
    }

    function removeFilter() {
        // clear all searches
        $('div[data-search-val]').show();
    }

    function search(force) {
        // decide whether to search or clear all searches
        var existingString = $.trim($("#search_term").val().toLowerCase());
        // remove existing messages
        $("span.message").html("");
        if (existingString === "") {
            removeFilter();
            return;
        }
        if (!force && existingString.length < 3) {
            return; //wasn't enter, not > 2 char
        }
        filter(existingString);
    }
    $('body').on('keyup', '#search_term', function(event) {
        // set the timer on the keyup event
        clearTimeout($.data(this, 'timer'));
        if (event.keyCode == 13)
            search(true);
        else
            $(this).data('timer', setTimeout(search, 500));
    });
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\!Live Filter
    // !filter.html
    // responsive_table.html
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Inline Edit
    var inlineEdit = false;

    $('body').on('click', 'button[id=inline-edit]', function(event) {
        event.preventDefault();
        if (inlineEdit){
          $('button[id=inline-edit]').html('Enable Inline Editing');
          $("td[data-link='true']").wrapInner('<a href="#"></a>');
          inlineEdit = false;
        } else {
          $('button[id=inline-edit]').html('Disable Inline Editing');
          $("td a").replaceWith(function() { return this.innerHTML; });
          inlineEdit = true;
        }
    });

    $('body').on('dblclick', 'td[data-inline-edit=true]', function(event) {
        if (inlineEdit) {
            var text = $.trim($(this).text());

            $(this).empty();
            $(this).append('<input id="current-edit" value="' + text + '" type="text" />');
            $(this).children('input').select();
            $(this).keypress(function(event) {
                if (event.keyCode == 13) {
                    var new_text = $('#current-edit').val();
                    debug && console.log('new text: ' + new_text);
                    debug && console.log('this: ' + $(this).html());
                    debug && console.log('this parent: ' + $(this).parent().html());
                    $(this).empty();
                    $(this).html(new_text);
                    debug && console.log('new this: ' + $(this).html());
                }
            });
        } else {
            return;
        }

    });
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\!Inline Edit
    // !responsive_table.html
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\AJAX Approximation
    function jsonTraverse(obj, func) {
      debug = false;
      debug && console.log('object: ' + JSON.stringify(obj));
      var objectLength = Object.size(obj);
      debug && console.log('object length: ' + objectLength);
      var childLength = Object.size(obj.children);
      debug && console.log('children length: ' + childLength);
      debug && console.log('object type: ' + typeof(obj));
      debug = false;
      if (typeof(obj) === 'object' && objectLength === 5) {
          func.apply(this, [obj]);
      }
      for (var i in obj) {
          if (found) {
              break;
          }
          debug = false;
          debug && console.log('i in object: ' + i);
          debug && console.log('i in object length: ' + i.length);
          debug && console.log('i in object type: ' + typeof(i));
          // func.apply(this,[i]);
          if (obj[i] !== null && typeof(obj[i]) === 'object') {
              //descending recursively down the object tree
              jsonTraverse(obj[i], func);
          }
          debug = false;
      }
      return columns;
    }

    function returnResults(id) {
        var example_data = {

        };

        return example_data[parseInt(id)];
    }
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\!AJAX Approximation

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // \\\\ !Components
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

}); // ! on Document Ready
