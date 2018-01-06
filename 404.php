<?php require 'header.php';
$msg_page_doesnt_exist = esc_html__( "You landed in the wrong place! Page %s doesn't exist.", 'reago-theme' );
$msg_page_try_this = esc_html__( "Why don't you check out one of our latest articles?", 'reago-theme' );
$latest_posts = get_posts( [ 'suppress_filters' => false ] );
$latest_post_data = array_map( function( $p ) {
    return [
      'id'    => $p->ID,
      'link'  => get_permalink( $p->ID ),
      'title' => $p->post_title,
      // 'slug'  => $p->post_name
    ];
}, $latest_posts );

?>
<div class="grid">

	<div id="root" class="col-2-3 content-wrapper">
    <h2><?php esc_html_e( '404 Not Found' ); ?></h2>
		<p>
      <img src="https://media.giphy.com/media/1AzW5Fw4DFdja/giphy.gif" alt="Rolling Cat" />
    </p>
    <p>
      <?php printf( $msg_page_doesnt_exist,  $_SERVER['REQUEST_URI'] ); ?>
      </p>
      <p>
      <?php echo $msg_page_try_this; ?>
      <ul>
        <?php
        foreach( $latest_post_data as $p ) {
          echo '<li><a href="' . $p['link']  . '">' . $p['title'] . '</a></li>';
        }
        ?>
      </ul>
    </p>
	</div>

	<div class="col-1-3 sidebar">
	<?php dynamic_sidebar('bmft-sidebar'); ?>
	</div>
</div>

<?php require 'footer.php';
