<?php

add_action( 'wp_enqueue_scripts', 'reago_enqueue_styles' );

/**
 * Enqueue MaterializeCSS styles and scripts, along with dependencies (jQuery)
 */
function reago_enqueue_styles() {

	// CSS
	wp_enqueue_style('main', get_template_directory_uri() . '/style.css', array(), filemtime(get_template_directory() . '/style.css'), false);
	// wp_enqueue_style('pure-grids', get_template_directory_uri() . '/purecss/grids.css', array(), filemtime(get_template_directory() . '/style.css'), false);
	if( WP_DEBUG ) {
		wp_enqueue_style('debug', get_template_directory_uri() . '/debug.css', array('main'), filemtime(get_template_directory() . '/debug.css'), false);
	}

	// JS
	wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-2.1.1.min.js', array('jquery'), '2.1.1', false);

}

add_action( 'after_setup_theme', 'reago_after_setup' );

/**
 * Add support for menus
 */
function reago_after_setup() {
	// add_theme_support( 'menus' );
	register_nav_menus( array(
		'main-menu' => __( 'Main Menu', 'reago-theme' )
	) );
	load_theme_textdomain( 'reago-theme', get_template_directory() . '/languages' );
}


add_action( 'widgets_init', 'reago_register_sidebar' );

/**
 * Register the sidebar
 */
function reago_register_sidebar() {
	// Area 1, located at the top of the sidebar.
	register_sidebar( array(
		'name' => __( 'Primary Widget Area', 'reago-theme' ),
		'id' => 'bmft-sidebar',
		'description' => __( 'The primary widget area', 'reago-theme' ),
		'before_widget' => '<li id="%1$s" class="widget %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3>',
		'after_title' => '</h3>',
	) );

}

function get_relative_link( $post_id ) {
	$permalink = get_permalink( $post_id );
	$site_url_length = strlen( get_option( 'siteurl' ) );
	return substr( $permalink, $site_url_length );
}

/**
 * Map a Post object to a REST API-like structure
 */
 function reago_map_post_fields( $post ) {
	 // $carry[ $post->ID ] =
   return [
		 'id'      => $post->ID,
		 'title'   => $post->post_title,
		 'content' => $post->post_content,
		 'slug'    => $post->post_name,
		 'link'    => get_relative_link( $post->ID ),
		 'author'  => (int)$post->post_author,
		 'date'    => $post->post_date
	 ];
	 // return $carry;
 }

/**
 * Map a Post slug to an id
 */
 // function reago_map_slug_id( $carry = [], $post ) {
	//  $carry[ $post->post_name ] = $post->ID;
	//  return $carry;
 // }
