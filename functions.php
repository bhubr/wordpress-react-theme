<?php


add_action( 'wp_enqueue_scripts', 'mft_enqueue_styles' );

/**
 * Enqueue MaterializeCSS styles and scripts, along with dependencies (jQuery)
 */
function mft_enqueue_styles() {

	// CSS
	wp_enqueue_style('main', get_template_directory_uri() . '/style.css', array(), filemtime(get_template_directory() . '/style.css'), false);

	// JS
	wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-2.1.1.min.js', array('jquery'), '2.1.1', false);

}
