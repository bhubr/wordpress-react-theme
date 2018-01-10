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

/**
 * Map a Post object to a REST API-like structure
 */
 function reago_map_post_fields( $posts ) {
	 $site_url_length = strlen( get_option( 'siteurl' ) );
	 return array_map( function( $post ) use( $site_url_length ) {
		 $permalink = get_permalink( $post->ID );
	   return [
			 'id'      => $post->ID,
			 'title'   => $post->post_title,
			 'content' => apply_filters( 'the_content', $post->post_content ),
			 'slug'    => $post->post_name,
			 'link'    => substr( $permalink, $site_url_length ),
			 'author'  => (int)$post->post_author,
			 'date'    => $post->post_date
		 ];
	 }, $posts );
}

// function build_comments_tree( $comments, $parent = 0 ) {
// 	//echo "COMMENTS BEFORE filtering against $parent ";var_dump($comments);echo "\n";
// 	$this_level_comms = array_filter( $comments, function( $comment ) use( $parent ) {
// 		// var_dump($comment); echo $parent . ' ' . gettype($parent) . "\n\n";
// 		return $comment['parent'] === $parent;
// 	} );
// 	// echo "parent after filtering root: $parent\n\n";
// 	// echo "filtered P ==> "; var_dump($this_level_comms); // echo " C ===> "; var_dump($comments); echo "\n\n";
// 	$children = array_filter( $comments, function( $comment ) use( $parent ) {
// 		// var_dump($comment); echo $parent . ' ' . gettype($parent) . "\n\n";
// 		return $comment['parent'] !== $parent;
// 	} );
// 	// echo "children "; var_dump($children); echo "\n\n";
// 	$mapped_thing = array_map( function( $parent_comm ) use( $children ) {
// 		echo "parent before assigning children ===>   ";var_dump($parent_comm); echo "\n\n";
// 		$parent_comm['children'] = build_comments_tree( $children, $parent_comm['id'] );
// 		echo "parent after assigning children ===>   ";var_dump($parent_comm); echo "\n\n";
// 		return $parent_comm;
// 	}, $this_level_comms );
//
// 	var_dump('MAPPED THING BEFORE RETURNING');
// 	var_dump($mapped_thing); echo "\n\n\n";
// 	return $mapped_thing;
// }

function build_comments_tree( $comments, $parent, $indent = 0 ) {
		$output = [];
		foreach( $comments as $idx => $comment ) {
				printf("%{$indent}s current parent: %d, this parent: %d, this id: %d, this content: %s\n", "", $parent, $comment['parent'], $comment['id'], substr($comment['content'], 0, 30));
				if( $comment['parent'] === $parent ) {
						$output[] = $comment;
						unset( $comments[ $idx ] );
						$children = build_comments_tree( $comments, $comment['id'], $indent + 4 );
						if( !empty( $children ) ) {
							$comment['children'] = $children;
						}
				}
		}
		return $output;
}

function reago_build_comments_tree( $comments ) {
	// var_dump($comments);
	// return [];
	return array_map( function( $comment ) {
		return [
			'id'      => (int)$comment->comment_ID,
			'post'    => (int)$comment->comment_post_ID,
			'parent'  => (int)$comment->comment_parent,
			'content' => $comment->comment_content
		];
	}, $comments );

	// return build_comments_tree( $comments, $parent = 0 );
}

/**
 * Map a Post slug to an id
 */
 // function reago_map_slug_id( $carry = [], $post ) {
	//  $carry[ $post->post_name ] = $post->ID;
	//  return $carry;
 // }
