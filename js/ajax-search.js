jQuery(document).ready(function ($) {
    // var $searchInput = $('#ajax-search .elementor-search-form__input');
    // var $resultsContainer = $('#search-results'); // Create a container to display results
     var searchTimeout;

    
        if (window.innerWidth < 768) {
            // If the viewport width is less than 768 pixels, use mobile elements
            console.log('Width < 768', window.innerWidth);
            var $searchInput = $('#mobile-ajax-search .elementor-search-form__input');
            var $resultsContainer = $('#mobile-search-results');
        } else {
            // If the viewport width is 768 pixels or more, use desktop elements
            console.log('Width >= 768', window.innerWidth);
            var  $searchInput = $('#ajax-search .elementor-search-form__input');
            var  $resultsContainer = $('#search-results');
        }
    
    


    console.log('$searchInput',$searchInput);
    console.log('$resultsContainer',$resultsContainer);
    // Hide the results container on page load
    $resultsContainer.hide();

    $searchInput.on('input', function () {
        clearTimeout(searchTimeout);
        var query = $(this).val();

        if (query.length > 2) {
            // Delay the search by 300 milliseconds to wait for the user to finish typing
            searchTimeout = setTimeout(function () {
                performSearch(query);
            }, 300);
        } else {
            // Clear the results and hide the container when the input is too short
            $resultsContainer.empty().hide();
        }
    });

    // Toggle the results container when clicking outside the input box
    $(document).on('click', function (e) {
        if (!$searchInput.is(e.target) && !$resultsContainer.is(e.target) && $resultsContainer.has(e.target).length === 0) {
            $resultsContainer.hide();
        }
    });

    function performSearch(query) {
        $.ajax({
            url: ajaxsearch.ajaxurl,
            type: 'post',
            data: {
                action: 'search',
                query: query
            },
            success: function (response) {
                var results = JSON.parse(response);
                displayResults(results);
            }
        });
    }
    function displayResults(results) {
        $resultsContainer.empty(); // Clear previous results
        if (results.length > 0) {
            // Create an object to group results by type
            var groupedResults = {};
    
            // Group results by their type
            results.forEach(function (result) {
                if (!groupedResults[result.type]) {
                    groupedResults[result.type] = [];
                }
                groupedResults[result.type].push(result);
            });
    
            // Iterate through the grouped results
            for (var type in groupedResults) {
                var typeResults = groupedResults[type];
                
                // Create a new <ul> for each group
                var ul = $('<ul>');
                
                // Add a title for the group
                ul.append('<h3 class="predictive-search__heading">' + type + '</h3>');
                
                // Iterate through the results in this group
                typeResults.forEach(function (result) {
                    var resultItem = $('<li class="predictive-search__list-item">');
                    var anchorTag = $('<a class="predictive-search__item--link" href="' + result.permalink + '">');
                    var divContent = $('<div class="predictive-search__item-content">');
                    if(result.featured_image.length > 0){
                        anchorTag.append( result.featured_image );
                    }
                    divContent.append( '<h3 class="predictive-search__item-heading h5">'+ result.title+'</h3>' );
                    if (result.type == 'products') {
                        if (result.price.maxVariantPrice.amount === result.price.minVariantPrice.amount) {
                            divContent.append('<div class="price price--on-sale "><span class="price-item price-item--sale price-item--last"><span class="money" doubly-currency="PKR">$' + result.price.maxVariantPrice.amount + ' ' + result.price.minVariantPrice.currencyCode + '</span></span></div>');
                        } else {
                            divContent.append('<div class="price price--on-sale "><span class="price-item price-item--regular"><span class="money">$' + result.price.maxVariantPrice.amount + ' ' + result.price.minVariantPrice.currencyCode + '</span></span>  <span class="price-item price-item--sale price-item--last"><span class="money" doubly-currency="PKR">$' + result.price.minVariantPrice.amount + ' ' + result.price.minVariantPrice.currencyCode + '</span></span></div>');
                        }
                    }
                    anchorTag.append(divContent);
                    resultItem.append(anchorTag);
                    ul.append(resultItem);
                });
                
                // Append the <ul> for this group to the results container
                $resultsContainer.append(ul);
            }
    
            // Show the results container when there are results
            $resultsContainer.show();
        } else {
            // Hide the container and display a message when no results are found
            $resultsContainer.hide().html('<p>No results found.</p>');
        }
    }
    
});
