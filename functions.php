<?php


add_action( 'wp_enqueue_scripts', 'bmft_enqueue_styles' );

/**
 * Enqueue MaterializeCSS styles and scripts, along with dependencies (jQuery)
 */
function bmft_enqueue_styles() {

	// CSS
	wp_enqueue_style('main', get_template_directory_uri() . '/style.css', array(), filemtime(get_template_directory() . '/style.css'), false);
	// wp_enqueue_style('pure-grids', get_template_directory_uri() . '/purecss/grids.css', array(), filemtime(get_template_directory() . '/style.css'), false);

	// JS
	wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-2.1.1.min.js', array('jquery'), '2.1.1', false);

}

add_action( 'after_setup_theme', 'bmft_add_menu_support' );

/**
 * Add support for menus
 */
function bmft_add_menu_support() {
	// add_theme_support( 'menus' );
	register_nav_menus( array(
		'main-menu' => __( 'Main Menu', 'wpbfmtheme' )
	) );
}


add_action( 'widgets_init', 'bmft_register_sidebar' );

/**
 * Register the sidebar
 */
function bmft_register_sidebar() {
	// Area 1, located at the top of the sidebar.
	register_sidebar( array(
		'name' => __( 'Primary Widget Area', 'wpbfmtheme' ),
		'id' => 'bmft-sidebar',
		'description' => __( 'The primary widget area', 'wpbfmtheme' ),
		'before_widget' => '<li>',
		'after_widget' => '</li>',
		'before_title' => '<h3>',
		'after_title' => '</h3>',
	) );

}
