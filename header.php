<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo( 'name' ); ?></title>
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="wrapper">
      <header>
        <h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
      </header>
      <nav>
        <?php wp_nav_menu( [
          'location'  => 'main-menu',
          'container' => false
        ] ); ?>
      </nav>