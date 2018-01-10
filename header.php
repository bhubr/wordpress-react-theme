<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo( 'name' ); ?></title>
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="wrapper">
      <header>
        <h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
      </header>
      <nav>
        <?php wp_nav_menu( [
          'location'  => 'main-menu',
          'container' => false
        ] ); ?>
      </nav>
<?php
// Get latest posts on a 404 not found
$response_code = http_response_code();
if( $response_code === 404 ) {
  $posts = get_posts( [ 'suppress_filters' => false ] );
}
$posts_mapped = reago_map_post_fields( $posts );
if( $response_code !== 404 ) {
  $post_ids = array_map( function( $post ) {
  	return $post['id'];
  }, $posts_mapped );
  $posts_per_url = is_single() ? $post_ids[0] : $post_ids;
}
$commentsPerPost = [];

// $posts_slug_id_map = array_reduce( $posts, 'reago_map_slug_id', [] );
?>
