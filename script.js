$(document).ready( function() {

	// define basic variables
	var listObject = $(".student-list");
	var itemsInList = listObject.children().length;
	var pageCount = calcPageCount();
	var pageStartingIndex = calcStartingIndex();
    var keyword = '';
	var currentPage = 1;
    var fadeTime = 0;
    var recordsPerPage = 10;

    // focus the cursor on the keyword input
    $("#keyword").focus();

    // function returns the starting index for the current page
    function calcStartingIndex() {
    	return parseInt( (parseInt(currentPage) - 1) * recordsPerPage );
    }

    // function returns the number of pages necessary
	function calcPageCount() {
		return Math.ceil( parseInt(itemsInList) / 10 );
	}

	// function hides all children
	function hideAllChildren() {
		// loop through children
		for ( var i = 0; i < listObject.children().length; i++ ) {
			// if child exists
			if ( listObject.children()[i] ) {
				// hide the child
				listObject.children()[i].style.display = 'none';
			}
		}
	}

	// function displays important variables in the console
	function displayVariablesConsole() {
		
		// clear the console
		console.clear();
		
		// display information
		console.log("itemsInList = " + itemsInList);
		console.log("pageCount = " + pageCount);
		console.log("currentPage = " + currentPage);
		console.log("pageStartingIndex = " + pageStartingIndex);

	}

	function createSearchBox() {

		// create outer div element for search
		$newDiv = document.createElement("div");

		// set class for outer div element
        $newDiv.setAttribute("class", "student-search");

        // create input element
		$input = document.createElement("input");
        $input.setAttribute("name", "keyword");
        $input.setAttribute("id", "keyword");
        $input.setAttribute("placeholder", "Search for students...");
        $input.setAttribute("style", "margin-right: 5px");

        // create button element
		$button = document.createElement("button");
		$button.innerText = "Search";

        // append input and button elements to the div element
		$newDiv.appendChild($input);
		$newDiv.appendChild($button);

        // append the outer div to the page
		$(".page-header").append($newDiv);

		// append 'No Records Found' box
		$(".page-header").append('<p class="no-records">No Records Found</p>');

	}

    // function takes the keyword and the currentPage values and shows the appropriate children
	function displayChildren() {

	    // if currentPage (global) is not a number then set it to page 1
		if ( isNaN(currentPage) ) currentPage = 1;

		// calculate the starting index for the current page
		pageStartingIndex = calcStartingIndex();

		// hide all children
		hideAllChildren();

		// if keyword (global) exists then show children that contain keyword
		if ( keyword.length > 0 ) {

			// define arrayOfFound array (local to stylePage function)
		    var arrayOfFound = [ ];

			// reset itemsInList (global) and pageCount (global)
			itemsInList = 0;
			pageCount = 0;

			// loop through the children
			for ( var i = 0; i < listObject.children().length; i++ ) {
				// if child exists and the keyword is found in the child
				if ( listObject.children()[i] && listObject.children()[i].innerText.indexOf(keyword) !== -1 ) {
					// add one to the itemsInList (global) variable
					itemsInList++;
					// add current index to array of indexes that contain the keyword
					arrayOfFound.push(i);
				}
			}

			// if array of children found by keyword is blank
			if ( !arrayOfFound || arrayOfFound.length === 0 ) {
				// show the 'no records found' element
				$(".no-records").show();
			// else
			} else {
				// hide the 'no records found' element
				$(".no-records").hide();
			}

			// set the length of itemsInList (global) and pageCount (global)
			itemsInList = arrayOfFound.length;
			pageCount = calcPageCount();

			$(".student-list").hide();

			if ( arrayOfFound.length > 0 ) {

				// set the index to the first index on the current page
				var j = calcStartingIndex();

				// display important variables in the console
				//displayVariablesConsole();

				var foundIndex = 0;
				// loop through this page's section of the array
				for ( j = pageStartingIndex; (j < pageStartingIndex + 10) && (j < itemsInList ); j++ ) {
					// set the foundIndex variable to the value of the next 'found' index
					foundIndex = arrayOfFound[j];
					// display the 'found' child
					listObject.children()[foundIndex].style.display = 'block';
				}

			}

		// otherwise show a paginated list of all the children
		} else {

			// display important variables in the console
			//displayVariablesConsole();

			// loop through children in the list
			for ( var k = pageStartingIndex; k < pageStartingIndex + 10; k++ ) {
				// if child exists
				if ( listObject.children()[k] ) {
					// show child
					listObject.children()[k].style.display = 'block';
				}
			}

		}

		$(".student-list").show();

		// if pagination exists remove
		if ( $(".pagination") ) {
			$(".pagination").remove();
		}

        // if only one page of children then don't display pagination
		if ( pageCount > 1 ) {

	        // create list element for pagination
	        var $div = document.createElement("div");
            $div.setAttribute('class',"pagination");

	        // create list element for pagination
	        var $ul = document.createElement("ul");

	        for ( var l = 1; l <= pageCount; l++ ) {

	            // create li element
	            var $li = document.createElement("li");
	            // create anchor element
	            var $a = document.createElement('a');

	            // set anchor tag values
	            $a.setAttribute('href',"#");
	            if ( l === currentPage ) {
	                $a.setAttribute('class',"active");
	            }
	            $a.innerHTML = l;

	            // append anchor to li
	            $li.appendChild($a);

	            // append li to list
	            $ul.appendChild($li);

	            // append li to list
	            $div.appendChild($ul);

	        	$(".pagination").remove();
	            $($div).insertAfter(".student-list");

	        }

	    }

	}

	function runEvent(e) {

		var targetID = e.target.getAttribute("id");

		if ( targetID === "keyword" ) {
	    	// set the value of the keyword (global) variable
	    	keyword = $("#keyword").val().toLowerCase();
		}

    	// run the page styling function
    	displayChildren();
    
	}

	// if pagination button is clicked then update the page
	$(".page").on("click", ".pagination li a", function(e) {

    	currentPage = parseInt( $(this).text() );

		runEvent(e);

	});

	// if keyword input field is being typed in then update the page
    $(".page-header").on("keyup", "#keyword", function(e) {
    	
    	currentPage = 1;

		runEvent(e);

    });

	// display the search box
	// createSearchBox();

	// call display function first time
	displayChildren();

});