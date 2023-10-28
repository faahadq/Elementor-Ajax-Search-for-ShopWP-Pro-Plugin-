# ShopWP Pro Plugin - Ajax Search Integration

This README provides instructions for integrating an Ajax search functionality for the ShopWP Pro Plugin, which enables you to fetch product data from your Shopify store and display search results on your WordPress website.

## Files Included

1. **functions.php**: This file contains the PHP code required for handling the Ajax search functionality. Add the code within this file to your theme's `functions.php`.

2. **js/ajax-search.js**: This JavaScript file includes the frontend logic for the Ajax search. You can either append this code to an existing JavaScript file in your WordPress theme or use this file as-is. Ensure that you enqueue this script properly using WordPress' `wp_enqueue_script` function.

## Installation and Setup

Follow these steps to configure the Ajax search functionality for ShopWP Pro Plugin:

1. **Copy the PHP Code**:

   - Open the `functions.php` file provided in this package.
   - Copy the entire content of the file (incase you want to add a new Javescript file for ajax search else don't copy the enquire script part ).
   - Navigate to your WordPress theme's directory.
   - Open your theme's `functions.php` file with a code editor.
   - Paste the copied PHP code at the end of your `functions.php` file.

2. **Copy the JavaScript Code**:

   - Open the `js/ajax-search.js` file included in this package.
   - Copy the entire content of the file.

3. **Option 1: Add JavaScript Code to an Existing File**:

   - If you already have an existing JavaScript file in your theme, open that file.
   - Append the copied JavaScript code to the end of your existing JavaScript file.

4. **Option 2: Use the Provided JavaScript File**:

   - If you prefer to use the provided JavaScript file, follow these steps:
     - Copy the `ajax-search.js` file from this package to your theme's JavaScript folder.
     - Enqueue the script in your theme by adding the following code to your `functions.php`:

     ```php
     function enqueue_ajax_search_script() {
         wp_enqueue_script('ajax-search', get_template_directory_uri() . '/js/ajax-search.js', array('jquery'), '1.0', true);
     }
     add_action('wp_enqueue_scripts', 'enqueue_ajax_search_script');
     ```

5. **Configure Ajax Search Parameters**:

   - Inside the `ajax-search.js` file, you can customize the search parameters to match your specific requirements. For example, you may need to adjust the search form ID and the way results are displayed.

6. **Test Your Ajax Search**:

   - Save all changes.
   - Visit your WordPress site and use the search functionality to test the Ajax search. It should now fetch results from your Shopify store and display them dynamically without the need to reload the entire page.

## Customization

You can further customize the search functionality by modifying the PHP and JavaScript code to meet your specific needs. Refer to the comments within the code for guidance on making these customizations.

If you encounter any issues or have questions, don't hesitate to seek support.

Enjoy the enhanced search functionality with ShopWP Pro Plugin and Ajax!
