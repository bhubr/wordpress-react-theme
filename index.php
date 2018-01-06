<?php require 'header.php'; ?>

<div class="grid">

	<div id="root" class="col-2-3 content-wrapper">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<article id="post-<?php echo $post->ID; ?>">
			<h2 data-contains="title"><?php the_title(); ?></h2>
			<div data-contains="content" class="content"><?php the_content(); ?></div>
		</article>
	<?php endwhile; else : ?>
		<p><?php esc_html_e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>
	</div>

	<div class="col-1-3 sidebar">
	<?php dynamic_sidebar('bmft-sidebar'); ?>
	</div>
</div>

<script type='text/javascript' src='http://wpgit.drogon.tls/wp-content/themes/wordpress-simplest-theme-ever/js/bundle.react.js?ver=0.2.1-alpha&t=<?php echo time(); ?>'></script>
<?php require 'footer.php';
