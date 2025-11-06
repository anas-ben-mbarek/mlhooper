<?php
/**
 * ML Hooper Theme Functions
 */

// Theme Setup
function ml_hooper_setup() {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'ml-hooper'),
    ));
}
add_action('after_setup_theme', 'ml_hooper_setup');

// Enqueue Scripts
function ml_hooper_scripts() {
    // React App
    wp_enqueue_script(
        'ml-hooper-app',
        get_template_directory_uri() . '/build/bundle.js',
        array(),
        '1.0.0',
        true
    );
    
    // Localize script for REST API
    wp_localize_script('ml-hooper-app', 'mlHooper', array(
        'apiUrl' => home_url('/wp-json/wp/v2/'),
        'nonce' => wp_create_nonce('wp_rest'),
        'siteUrl' => home_url(),
        'themePath' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'ml_hooper_scripts');

// Enable CORS for REST API
function ml_hooper_rest_cors() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-WP-Nonce');
        return $value;
    });
}
add_action('rest_api_init', 'ml_hooper_rest_cors', 15);

// Contact Form Endpoint
function ml_hooper_register_contact_endpoint() {
    register_rest_route('ml-hooper/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'ml_hooper_handle_contact',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'ml_hooper_register_contact_endpoint');

function ml_hooper_handle_contact($request) {
    $params = $request->get_json_params();
    
    $to = get_option('admin_email');
    $subject = 'ML Hooper Contact Form Submission';
    $message = "Name: {$params['name']}\nEmail: {$params['email']}\n\nMessage:\n{$params['message']}";
    $headers = array('Content-Type: text/plain; charset=UTF-8');
    
    $sent = wp_mail($to, $subject, $message, $headers);
    
    return new WP_REST_Response(array('success' => $sent), 200);
}

// Add featured image to REST API
function ml_hooper_add_featured_image() {
    register_rest_field('post',
        'featured_image_url',
        array(
            'get_callback' => function($post) {
                return get_the_post_thumbnail_url($post['id'], 'full');
            },
            'schema' => null,
        )
    );
}
add_action('rest_api_init', 'ml_hooper_add_featured_image');
?>