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

  $base_path = $_SERVER['REQUEST_URI'];

  // Get the post ids
  $post_ids = array_map( function( $post ) {
  	return $post['id'];
  }, $posts_mapped );

  // If this is a single post/page, assign url => post id
  if( is_single() ) {
    $posts_per_url = [
      $base_path => $post_ids[0]
    ];
  }
  else {
    // $has_previous_page = ! empty( get_previous_posts_link( 'prev' ) );
    $has_next_page = ! empty( get_next_posts_link( 'next' ) );
    // echo "$has_previous_page $has_next_page";
		// 'hasPrevious' => $has_previous_page,
		// 'hasNext' => $has_next_page,
		// 'page'    => get_query_var('paged')
    // Check if we're on a paged archive with page > 1
    $match_page_regex = '/(.*?)(page\/\d+?)/';
    $does_match = preg_match($match_page_regex, $base_path, $matches);

    // Does match: extract page and archive base path
    if( $does_match ) {
      $base_path = $matches[1];
      $page = (int)(substr($matches[2], 5));
    }

    // Otherwise page = 1
    else {
      $page = 1;
    }

    $posts_per_url = [
      $base_path => [
        'numPages' => $has_next_page ? $page + 1 : $page,
        $page      => $post_ids
      ]
    ];
    // isset( $posts_per_url ) ? [ $base_path => [
    //   $page =>
    // ] ] : []
    // $base_path = $does_match ? $matches[1] : $_SERVER['REQUEST_URI'];
    //
    // echo "$base_path $page<br>";

    // var_dump($matches);
    // var_dump($does_match);

    // if( ! $matches )
    // $base_path = $matches[1];
  }
}
$commentsPerPost = [];

$msg_page_doesnt_exist = esc_html__( "You landed in the wrong place! Page %s doesn't exist.", 'reago-theme' );
$msg_page_try_this = esc_html__( "Why don't you check out our latest articles?", 'reago-theme' );
$strings = [
    'explain'   => $msg_page_doesnt_exist,
    'suggest'   => $msg_page_try_this,
    'notfound'  => __( '404 Not Found', 'reago-theme' ),
    'months' => [
        __('January'),
        __('February'),
        __('March'),
        __('April'),
        __('May'),
        __('June'),
        __('July'),
        __('August'),
        __('September'),
        __('October'),
        __('November'),
        __('December')
    ],
    'publishedOn' => __('Published on ', 'reago-theme'),
    'by'          => __(' by ', 'reago-theme'),
    'dateFmt'     => __('F j, Y', 'reago-theme')
];
// $posts_slug_id_map = array_reduce( $posts, 'reago_map_slug_id', [] );
?>
