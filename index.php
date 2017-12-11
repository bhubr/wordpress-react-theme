<?php require 'header.php'; ?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

	<h2><?php the_title(); ?></h2>
	<div class="content"><?php the_content(); ?></div>

<?php endwhile; else : ?>
	<p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
<?php endif; ?>

<?php require 'footer.php';