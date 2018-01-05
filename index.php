<?php require 'header.php'; ?>

<div class="grid">

	<div class="col-2-3 content-wrapper">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<h2><?php the_title(); ?></h2>
		<div class="content"><?php the_content(); ?></div>

	<?php endwhile; else : ?>
		<p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>
	</div>

	<div class="col-1-3 sidebar">
	<?php dynamic_sidebar('bmft-sidebar'); ?>
	</div>
</div>
<?php require 'footer.php';
