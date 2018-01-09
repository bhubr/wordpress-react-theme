<?php
$permalink_bits = explode( '/', get_option( 'permalink_structure' ) );
array_shift( $permalink_bits );
array_pop( $permalink_bits );
$permalink_struct = array_reduce($permalink_bits, function( $str, $bit ) {
		return $str . '/:' . str_replace( '%', '', $bit );
}, '' );

$users = array_map( function( $user ) {
	return [
		'id'   => $user->ID,
		'slug' => $user->user_nicename,
		'name' => $user->display_name,
		'url'  => $user->user_url
	];
}, get_users() );

$categories = array_map( function( $cat ) {
	return [
		'id'   => $cat->term_id,
		'slug' => $cat->slug
	];
}, get_terms( 'category' ) );

$state = json_encode( [
	'meta'           => [
		'path'         => $_SERVER['REQUEST_URI'],
		'status'       => $response_code,
		'strings'      => isset( $strings ) ? $strings : [],
		'postsPerPage' => get_option('posts_per_page'),
		'users'        => $users,
		'categories'   => $categories,
		'permaStruct'  => $permalink_struct
	],
	'comments'    => [
		'form'      => [
			'isPending' => false,
		  'error'     => null,
		  'statusMessage' => 'testtest'
		],
		'perPost'   => $commentsPerPost
	],
	'posts'       => [
		'query'     => '',
		'items'     => $posts_mapped,
		'isLoading' => false,
		'lastError' => null
	]
] ); ?>
			<script type='text/javascript'>
			window.INITIAL_STATE = <?php echo $state; ?>;
			window.REST_URL = '<?php echo get_option('siteurl'); ?>/wp-json/wp/v2';
			window.COMMENTS_POST_URL = '<?php echo get_option('siteurl'); ?>/wp-comments-post.php';
			</script>
			<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/bundle.react.js?ver=0.2.1-alpha&t=<?php echo time(); ?>'></script>
		</div> <!-- close .wrapper -->
		<footer>
			<div class="wrapper">
				<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'reago-theme' ) ); ?>"><?php printf( __( 'Proudly powered by %s and %s', 'reago-theme' ), 'WordPress', 'React' ); ?></a>
			</div>
		</footer>
		<?php wp_footer(); ?>
	</body>
</html>
