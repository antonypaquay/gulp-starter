$(document).ready(function() {
  alert("Javascript is running");
  (function($) {
    //Sorry IE :(
    outdatedBrowser({
      bgColor: "#00A0E6",
      color: "#ffffff",
      lowerThan: "transform",
      languagePath: ""
    });
  })(jQuery);
});
