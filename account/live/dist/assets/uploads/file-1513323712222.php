<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="icon" href="https://www.vatfile.com/wp-content/uploads/2017/10/fevi.jpg" type="image/gif" sizes="16x16">
    <title>
        <?php wp_title( '|', true, 'right' ); ?>
    </title>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <?php wp_head();?>
</head>

<body>

    <section id="top-bar">
        <div class="container">

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <ul class="social-links">
                    <li><a href="https://www.instagram.com/vatfile/"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.facebook.com/vatfile"><i class="fa fa-facebook-square" aria-hidden="true"></i></a></li>
                    <li><a href="https://twitter.com/vatfile"><i class="fa fa-twitter-square" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.pinterest.com/vatfile/"><i class="fa fa-pinterest-square" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/13463316/"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
                </ul>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <ul class="login-nav">
									<a href="tel:+97143437233"><li><span><i class="fa fa-mobile" aria-hidden="true"></i></span>+971 4 343 7233</li></a>
									<a href="tel:+971509812389"><li><span><i class="fa fa-mobile" aria-hidden="true"></i></span>+971 50 98 123 89</li></a>
									<a href="tel:+971565202784"><li><span><i class="fa fa-mobile" aria-hidden="true"></i></span>+971 56 520 2784</li></a>
				<!-- 					
                    <li class="help-navQ1"><a href="#">Help</a></li>
                    <li class="Login-navQ1"><a href="#">Login</a></li> -->
                </ul>
            </div>
        </div>

    </section>
    <!-- 	<div class="blog-masthead">
		<div class="container">
			<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/vat-logo.png"></a>
			<nav class="blog-nav navbar-right">
				<?php wp_list_pages( '&title_li='); ?>
			</nav>
		</div>
	</div> -->

    <section role="banner" class="blog-masthead">
        <div class="container mb-padd">

            <nav class="navbar navbar-default blog-masthead">
                <div class="container-fluid mb-padd">
<div class="container">
	<div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 mb-padd">
		
	
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" title="<?php echo get_bloginfo('description'); ?>" href="<?php echo home_url(); ?>"><img class="img-responsive logo-img" src="<?php echo get_template_directory_uri(); ?>/images/vat-logo.png" /></a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                   
	<?php
            wp_nav_menu( array(
                'menu'              => 'primary',
                'theme_location'    => 'primary',
                'depth'             => 2,
                'container'         => 'div',
                'container_class'   => 'collapse navbar-collapse',
                'container_id'      => 'bs-example-navbar-collapse-1',
                'menu_class'        => 'nav navbar-nav navbar-right',
                'fallback_cb'       => 'WP_Bootstrap_Navwalker::fallback',
                'walker'            => new WP_Bootstrap_Navwalker())
            );
        ?>
                    <!-- /.navbar-collapse -->

                </div></div>
                <!-- /.container-fluid -->
            </nav>
</div>
        </div>
    </section>

    <!-- <div class="container">

		<div class="blog-header">
			<h1 class="blog-title"><a href="<?php bloginfo('wpurl');?>"><?php echo get_bloginfo( 'name' ); ?></a></h1>
			<p class="lead blog-description">
				<?php echo get_bloginfo( 'description' ); ?>
			</p>
		</div>
	</div> -->