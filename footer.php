<?php

$state = json_encode( [
	'meta'        => [
		'path'      => $_SERVER['REQUEST_URI'],
		'status'    => $response_code,
		'messages'  => isset( $messages ) ? $messages : []
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
			</script>
			<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/bundle.react.js?ver=0.2.1-alpha&t=<?php echo time(); ?>'></script>
		</div> <!-- close .wrapper -->
		<footer>
			<div class="wrapper">
				<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'wpbmftheme' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'wpbmftheme' ), 'WordPress' ); ?></a>
			</div>
		</footer>
		<?php wp_footer(); ?>
	</body>
</html>
