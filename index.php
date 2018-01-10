<?php
require 'header.php';
?>
<div class="grid">

	<div id="root" class="col-2-3 content-wrapper">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php echo $post->ID; ?>">
			<h2 data-contains="title"><a href=" <?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<div class="meta">
				<small><?php the_time('F jS, Y'); ?> by <?php the_author_posts_link(); ?></small>
			</div>
			<div data-contains="content" class="content"><?php the_content(); ?></div>
		</article>
		<?php
		// If comments are open or we have at least one comment, load up the comment template.
	 if ( comments_open() ) :
	     comments_template();
			 $comments = get_comments( [
			 		 	'post_id' => $post->ID,
						'order'   => 'ASC'
	 					// 'status' => 'approve' //Change this to the type of comments to be displayed
			 ] );
			 $commentsPerPost = [ (int)$post->ID => reago_build_comments_tree( $comments ) ];
	 endif;
		?>
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
