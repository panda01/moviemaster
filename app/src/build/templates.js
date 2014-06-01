angular.module("myApp").run(["$templateCache", function($templateCache) {

  $templateCache.put("/src/modules/services/nav/header-centered/header-centered.html",
    "<div class='nav-header flexbox row {{nav.classes.cont}}'>\n" +
    "\t<div class='flex1 left nav-header-left-cont'>\n" +
    "\t\t<div class='flexbox row'>\n" +
    "\t\t\t<div ng-repeat='button in nav.buttons.left' class='nav-header-left flex1 {{button.classes.cont}}'>\n" +
    "\t\t\t\t<a ng-if='!button.html' ng-show='button.href' class='nav-header-button nav-header-icon-button {{button.classes.button}}' ng-href = '{{button.href}}'>\n" +
    "\t\t\t\t\t<i class='nav-header-icon-button-icon {{button.icon}}'></i>\n" +
    "\t\t\t\t\t<div class='nav-header-icon-button-text' ng-bind-html='button.iconHtml'></div>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<div ng-if='!button.html' ng-hide='button.href' class='nav-header-button nav-header-icon-button {{button.classes.button}}' ng-click = 'button.click()'>\n" +
    "\t\t\t\t\t<i class='nav-header-icon-button-icon {{button.icon}}'></i>\n" +
    "\t\t\t\t\t<div class='nav-header-icon-button-text' ng-bind-html='button.iconHtml'></div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<a ng-if='button.html' ng-show='button.href' class='nav-header-button {{button.classes.button}}' ng-href = '{{button.href}}' ng-bind-html='button.html'></a>\n" +
    "\t\t\t\t<div ng-if='button.html' ng-hide='button.href' class='nav-header-button {{button.classes.button}}' ng-click = 'button.click()' ng-bind-html='button.html'></div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<h3 class='flex3 center nav-header-title-cont {{nav.title.classes.cont}}'>\n" +
    "\t\t<a ng-show='nav.title.href' class='nav-header-title' ng-href = '{{nav.title.href}}' ng-bind-html='nav.title.html'></a>\n" +
    "\t\t<div ng-hide='nav.title.href' class='nav-header-title' ng-click = 'nav.title.click()' ng-bind-html='nav.title.html'></div>\n" +
    "\t</h3>\n" +
    "\t<div class='flex1 right nav-header-right-cont'>\n" +
    "\t\t<div class='flexbox row'>\n" +
    "\t\t\t<div ng-repeat='button in nav.buttons.right' class='nav-header-right flex1 {{button.classes.cont}}'>\n" +
    "\t\t\t\t<a ng-if='!button.html' ng-show='button.href' class='nav-header-button nav-header-icon-button {{button.classes.button}}' ng-href = '{{button.href}}'>\n" +
    "\t\t\t\t\t<i class='nav-header-icon-button-icon {{button.icon}}'></i>\n" +
    "\t\t\t\t\t<div class='nav-header-icon-button-text' ng-bind-html='button.iconHtml'></div>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<div ng-if='!button.html' ng-hide='button.href' class='nav-header-button nav-header-icon-button {{button.classes.button}}' ng-click = 'button.click()'>\n" +
    "\t\t\t\t\t<i class='nav-header-icon-button-icon {{button.icon}}'></i>\n" +
    "\t\t\t\t\t<div class='nav-header-icon-button-text' ng-bind-html='button.iconHtml'></div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<a ng-if='button.html' ng-show='button.href' class='nav-header-button {{button.classes.button}}' ng-href = '{{button.href}}' ng-bind-html='button.html'></a>\n" +
    "\t\t\t\t<div ng-if='button.html' ng-hide='button.href' class='nav-header-button {{button.classes.button}}' ng-click = 'button.click()' ng-bind-html='button.html'></div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/services/nav/footer-flex/footer-flex.html",
    "<div class='nav-footer flexbox row {{nav.classes.cont}}'>\n" +
    "\t<div ng-repeat='button in nav.buttons' class='flex1 nav-footer-button-cont {{button.classes.cont}}'>\n" +
    "\t\t<a ng-if='!button.html' ng-show='button.href' class='nav-footer-button nav-footer-icon-button {{button.classes.button}}' ng-href = '{{button.href}}'>\n" +
    "\t\t\t<i class='nav-footer-icon-button-icon {{button.icon}}'></i>\n" +
    "\t\t\t<div class='nav-footer-icon-button-text' ng-bind-html='button.iconHtml'></div>\n" +
    "\t\t</a>\n" +
    "\t\t<div ng-if='!button.html' ng-hide='button.href' class='nav-footer-button nav-footer-icon-button {{button.classes.button}}' ng-click = 'button.click()'>\n" +
    "\t\t\t<i class='nav-footer-icon-button-icon {{button.icon}}'></i>\n" +
    "\t\t\t<div class='nav-footer-icon-button-text' ng-bind-html='button.iconHtml'></div>\n" +
    "\t\t</div>\n" +
    "\t\t<a ng-if='button.html' ng-show='button.href' class='nav-footer-button' ng-href = '{{button.href}}' ng-bind-html='button.html'></a>\n" +
    "\t\t<div ng-if='button.html' ng-hide='button.href' class='nav-footer-button' ng-click = 'button.click()' ng-bind-html='button.html'></div>\n" +
    "\t</div>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/header/header.html",
    "<div class='header {{classes.cont}}' ng-controller='HeaderCtrl'>\n" +
    "\t<div class='header-fixed' ng-include='nav.template'></div>\n" +
    "\t<div class='header-spacer'>&nbsp;</div>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/footer/footer.html",
    "<div class='footer {{classes.cont}}' ng-controller='FooterCtrl'>\n" +
    "\t<div class='footer-fixed' ng-include='nav.template'></div>\n" +
    "\t<div class='footer-spacer'>&nbsp;</div>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/home/home.html",
    "<div class='home' ng-controller='HomeCtrl'>\n" +
    "home body content here\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/login/login.html",
    "<div ng-controller='LoginCtrl' class='login'>\n" +
    "\t<div app-login forgot-pass='forgotPass' login='login'></div>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/signup/signup.html",
    "<div ng-controller='SignupCtrl' class='signup'>\n" +
    "\t<div app-signup signup='signup'></div>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/passwordReset/password-reset.html",
    "<div class='password-reset center center-margin padding' ng-controller='PasswordResetCtrl'>\n" +
    "<div class='text-center'>\n" +
    "\tCheck your email for your reset code and enter it below!<br />\n" +
    "\tIt may take a few minutes to arrive and make sure to check your SPAM folder :(\n" +
    "</div>\n" +
    "<form class='jrg-forminput-form' name='passResetForm' ng-submit='submitForm()'>\n" +
    "\t<div class='input-group no-label'>\n" +
    "\t\t<div jrg-forminput no-label='1' placeholder='Email' ng-model='formVals.email' opts='' required></div>\n" +
    "\t\t<div jrg-forminput no-label='1' placeholder='Reset Key' ng-model='formVals.password_reset_key' opts='' required></div>\n" +
    "\t\t<div jrg-forminput no-label='1' type='password' placeholder='New Password (6+ characters)' ng-model='formVals.password' opts='' required ng-minlength='6'></div>\n" +
    "\t\t<div jrg-forminput no-label='1' type='password' placeholder='Confirm Password' ng-model='formVals.password_confirm' opts='' required></div>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<button class='btn btn-primary btn-block jrg-forminput-submit' type='submit' >Update Password</button>\n" +
    "\t<div class='text-info'>{{msgNotify}}</div>\n" +
    "</form>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/logout/logout.html",
    "<div class='logout' ng-controller='LogoutCtrl'>\n" +
    "Logging out..\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/userDelete/user-delete.html",
    "<div ng-controller='UserDeleteCtrl'>\n" +
    "Deleting user.. This cannot be undone and all data will be removed!\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/callback/callback-twitter-auth/callback-twitter-auth.html",
    "<div ng-controller='CallbackTwitterAuthCtrl'>\n" +
    "\tLoading..\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/callback/callback-facebook-auth/callback-facebook-auth.html",
    "<div ng-controller='CallbackFacebookAuthCtrl'>\n" +
    "\tLoading..\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/dev-test/test/test.html",
    "<div class='test' ng-controller='TestCtrl'>\n" +
    "\tTest\n" +
    "\t<br /><br />\n" +
    "\t\n" +
    "\t<!--<div hm-tap='tapIt($event, {})' hm-swipeleft='swipeIt($event, \"left\", {})' hm-swiperight='swipeIt($event, \"right\", {})' hm-options='{swipe_velocity: 0.1}' style='min-height:100px;'>-->\n" +
    "\t<div ng-click='tapIt($event, {})' ng-swipe-left='swipeIt($event, \"left\", {})' ng-swipe-right='swipeIt($event, \"right\", {})' style='min-height:100px;'>\n" +
    "\t\t{{user}}\n" +
    "\t</div>\n" +
    "\t\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/dev-test/design/design.html",
    "<div ng-controller='DesignCtrl'>\n" +
    "\t\n" +
    "\t<div class='margin-xlarge-tb'>\n" +
    "\t\t<h2>buttons</h2>\n" +
    "\t\t<div class='margin'>\n" +
    "\t\t\t<a class='btn-link'>Link</a>\n" +
    "\t\t</div>\n" +
    "\t\t<div class='margin'>\n" +
    "\t\t\t<span class='btn'>Btn</span>\n" +
    "\t\t\t<span class='btn btn-primary'>Primary</span>\n" +
    "\t\t\t<span class='btn btn-warning'>Warning</span>\n" +
    "\t\t\t<span class='btn btn-danger'>Danger</span>\n" +
    "\t\t\t<span class='btn btn-success'>Success</span>\n" +
    "\t\t\t<span class='btn btn-info'>Info</span>\n" +
    "\t\t\t<span class='btn btn-inverse'>Inverse</span>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<div class='margin-xlarge-tb'>\n" +
    "\t\t<h2>typography</h2>\n" +
    "\t\t\n" +
    "\t\t<div class='margin-large-tb'>\n" +
    "\t\t\t<h4>font families</h4>\n" +
    "\t\t\t<div class=''>Normal: The quick brown fox jumped over the lazy dog..</div>\n" +
    "\t\t</div>\n" +
    "\t\t\n" +
    "\t\t<div class='margin-large-tb'>\n" +
    "\t\t\t<h4>font sizes</h4>\n" +
    "\t\t\t<div class='h1'>xxx large</div>\n" +
    "\t\t\t<div class='h2'>xx large</div>\n" +
    "\t\t\t<div class='h3'>x large</div>\n" +
    "\t\t\t<div class='h4'>large</div>\n" +
    "\t\t\t<div class='h5'>normal</div>\n" +
    "\t\t\t<div class='h6'>small</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<div class='margin-xlarge-tb'>\n" +
    "\t\t<h2>colors</h2>\n" +
    "\t\t\n" +
    "\t\t<div class='design-color-item margin-small-tb {{color.class}}' ng-repeat='color in colors'>\n" +
    "\t\t\t<div class='design-color-swatch'>&nbsp;</div><div class='design-color-text'>{{color.class}}</div>\n" +
    "\t\t\t<div class='design-color-color'>{{color.class}}</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/dev-test/socketio/socketio.html",
    "<div ng-controller='SocketioCtrl'>\n" +
    "\tsocketio (chat) demo\n" +
    "\t<br />\n" +
    "\tTry opening up a second browser (tab/window) and talking to yourself!\n" +
    "\t<br />\n" +
    "\t<br />\n" +
    "\t\n" +
    "\tAdd new message:\n" +
    "\t<br />\n" +
    "\t<input type='text' ng-model='formVals.socketMsg' placeholder='new message here' />\n" +
    "\t<br />\n" +
    "\t<button class='btn' ng-click='addMessage({})'>Add It!</button>\n" +
    "\t\n" +
    "\t<br />\n" +
    "\t<br />\n" +
    "\t<div ng-repeat='data in socketData'>{{data.msg}}</div>\n" +
    "</div>"
  );

  $templateCache.put("/src/modules/pages/dev-test/social/social.html",
    "<div ng-controller='SocialCtrl'>\n" +
    "\t\n" +
    "\t<!--\n" +
    "\t<div class='btn' ng-click='shareFacebook()'>Share Facebook</div>\n" +
    "\t<br /><br />\n" +
    "\t-->\n" +
    "\t\n" +
    "\t<div class='btn' ng-click='shareFacebookFeed()'>Share Facebook Feed</div>\n" +
    "\t<br /><br />\n" +
    "\t\n" +
    "\t<div class='btn' ng-click='shareTwitter()'>Share Twitter</div>\n" +
    "\t<br /><br />\n" +
    "\t\n" +
    "</div>"
  );

}]);
