<?php 
// Adding js for Ajax results
function oceanwp_child_enqueue_parent_style() {
	wp_enqueue_script('jquery');
	wp_enqueue_script('ajax-search', get_stylesheet_directory_uri() . '/js/ajax-search.js', array('jquery'), '1.0', true);
	wp_localize_script('ajax-search', 'ajaxsearch', array('ajaxurl' => admin_url('admin-ajax.php')));
	
}

add_action( 'wp_enqueue_scripts', 'oceanwp_child_enqueue_parent_style' );

// Show Ajax results
function ajax_search() {
	$query = sanitize_text_field($_POST['query']);
	$results = array();

	// Search through custom post type wps_product
	$wps_product_args = array(
		 'post_type' => 'wps_products',
		 's' => $query,
		 'post_status' => 'publish', // Show only published posts
		 'posts_per_page' => 4 // Limit results to 4
	);
	$wps_product_query = new WP_Query($wps_product_args);

	if ($wps_product_query->have_posts()) {
		 while ($wps_product_query->have_posts()) {
			  $wps_product_query->the_post();
			  $product = getProductById(get_the_ID());
			  $results[] = array(
					'title' => get_the_title(),
					'permalink' => $product->onlineStoreUrl,
					'type' => 'products',
					'featured_image' => get_the_post_thumbnail(get_the_ID(), 'thumbnail'), // Add the featured image
					'price' => unserialize($product->priceRangeV2),
			  );
		 }
	}

	// Search through regular posts
	$post_args = array(
		 'post_type' => 'post',
		 's' => $query,
		 'post_status' => 'publish', // Show only published posts
		 'posts_per_page' => 2 // Limit results to 4
	);
	$post_query = new WP_Query($post_args);

	if ($post_query->have_posts()) {
		 while ($post_query->have_posts()) {
			  $post_query->the_post();
			  $results[] = array(
					'title' => get_the_title(),
					'permalink' => get_permalink(),
					'type' => 'Blog',
					'featured_image' => get_the_post_thumbnail(get_the_ID(), 'thumbnail') // Add the featured image
			  );
		 }
	}

	// Search through pages
	$page_args = array(
		 'post_type' => 'page',
		 's' => $query,
		 'post_status' => 'publish', // Show only published posts
		 'posts_per_page' => 2 // Limit results to 4
	);
	$page_query = new WP_Query($page_args);

	if ($page_query->have_posts()) {
		 while ($page_query->have_posts()) {
			  $page_query->the_post();
			  $results[] = array(
					'title' => get_the_title(),
					'permalink' => get_permalink(),
					'type' => 'WebPage',
					'featured_image' => get_the_post_thumbnail(get_the_ID(), 'thumbnail') // Add the featured image
			  );
		 }
	}

	// Return JSON response
	wp_reset_postdata();
	echo json_encode($results);
	wp_die();
}


add_action('wp_ajax_search', 'ajax_search');
add_action('wp_ajax_nopriv_search', 'ajax_search');


// get Product Shopify url using product ID
function getProductById($id) {
	global $wpdb; // Assuming you have access to the WordPress database connection object

	// Define the table name
	$table_name = $wpdb->prefix . 'shopwp_products';

	// Prepare the SQL query
	$query = $wpdb->prepare("SELECT * FROM $table_name WHERE postId = %d", $id);

	// Execute the query
	$product = $wpdb->get_row($query);

	// Check if a row was found
	if ($product) {
		 return $product;
	} else {
		 return null; // No matching row found
	}
}
