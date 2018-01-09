<?php
require 'header.php';
?>
<div class="grid">

	<div id="root" class="col-2-3 content-wrapper">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php echo $post->ID; ?>">
			<h2 data-contains="title"><?php the_title(); ?></h2>
			<div class="meta">
				<small><?php the_time('F jS, Y'); ?> by <?php the_author_posts_link(); ?></small>
			</div>
			<div data-contains="content" class="content"><?php the_content(); ?></div>
		</article>
	<?php endwhile; ?>
		<div class="navigation"><p><?php posts_nav_link(); ?></p></div>
	<?php else : ?>
		<p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>
	</div>

	<div class="col-1-3 sidebar">
	<?php dynamic_sidebar('bmft-sidebar'); ?>
	</div>
</div>

<?php require 'footer.php';
