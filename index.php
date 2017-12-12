<?php require 'header.php'; ?>

<div class="pure-g">

	<div class="pure-u-3-4 content-wrapper">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<h2><?php the_title(); ?></h2>
		<div class="content"><?php the_content(); ?></div>

	<?php endwhile; else : ?>
		<p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>
	</div>

	<div class="pure-u-1-4 sidebar">
	<?php dynamic_sidebar('bmft-sidebar'); ?>
	</div>
</div>
<?php require 'footer.php';