<?php
session_start();
// added in v4.0.0
require_once 'autoload.php';
$f3=require('../lib/base.php');
use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
use Facebook\Entities\AccessToken;
use Facebook\HttpClients\FacebookCurlHttpClient;
use Facebook\HttpClients\FacebookHttpable;

// start session

// init app with app id and secret
FacebookSession::setDefaultApplication( '283048915376662','c4ef0f3930a1ec08ad4d48c65b8fe734' );

// login helper with redirect_uri

    $helper = new FacebookRedirectLoginHelper('http://asdqwe.cba.pl/fb/1353/test.php' );

try {
  $session = $helper->getSessionFromRedirect();
} catch( FacebookRequestException $ex ) {
  // When Facebook returns an error
} catch( Exception $ex ) {
  // When validation fails or other local issues
}

// see if we have a session
if ( isset( $session ) ) {
  // graph api request for user data
  $request = new FacebookRequest( $session, 'GET', '/me' );
  $response = $request->execute();
  // get response
  $graphObject = $response->getGraphObject();

		$fbid = $graphObject->getProperty('id');              // To Get Facebook ID
 	    $fbuname = $graphObject->getProperty('username');  // To Get Facebook Username
 	    $fbfullname = $graphObject->getProperty('name'); // To Get Facebook full name
	    $femail = $graphObject->getProperty('email');    // To Get Facebook email ID
            
	/* ---- Session Variables -----*/
	    $_SESSION['FBID'] = $fbid;           
	    $_SESSION['USERNAME'] = $fbuname;
        $_SESSION['FULLNAME'] = $fbfullname;
	    $_SESSION['EMAIL'] =  $femail;
    //echo '<pre>'. print_r( $graphObject,1 ) . '</pre>';
      

   

    $f3->reroute('../index.php');


} else {
  // show login url
echo $helper->getLoginUrl();
  //echo '<a href="' . $helper->getLoginUrl() . '">Login</a>';
}

?>				