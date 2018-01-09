<?php
require 'header.php';
$msg_page_doesnt_exist = esc_html__( "You landed in the wrong place! Page %s doesn't exist.", 'reago-theme' );
$msg_page_try_this = esc_html__( "Why don't you check out one of our latest articles?", 'reago-theme' );
$msg_404_not_found = esc_html__( '404 Not Found', 'reago-theme' );
$strings = [
  'explain'  => $msg_page_doesnt_exist,
  'suggest'  => $msg_page_try_this,
  'notfound' => $msg_404_not_found
];
?>
<div class="grid">

	<div id="root" class="col-2-3 content-wrapper">
    <h2><?php echo $msg_404_not_found; ?></h2>
		<p>
      <img src="https://media.giphy.com/media/1AzW5Fw4DFdja/giphy.gif" alt="Rolling Cat" />
    </p>
    <p>
      <?php printf( $msg_page_doesnt_exist,  $_SERVER['REQUEST_URI'] ); ?>
    </p>
    <p>
      <?php echo $msg_page_try_this; ?>
    </p>
    <ul>
      <?php
      foreach( $posts_mapped as $p ) {
        echo '<li><a href="' . $p['link']  . '">' . $p['title'] . '</a></li>';
      }
      ?>
    </ul>
	</div>

	<div class="col-1-3 sidebar">
	<?php dynamic_sidebar('bmft-sidebar'); ?>
	</div>
</div>

<?php require 'footer.php';
