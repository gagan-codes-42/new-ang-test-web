var $zoho = $zoho || {};
$zoho.salesiq = $zoho.salesiq || {
  widgetcode:
    'a2ecda784a340d70746df564711c7240665f0310890af9243ea2a26be7bc48ac937d826d2e3bebd062e47bf4d0d9a6bc',
  values: {},
  ready: function () {
    $zoho.salesiq.floatbutton.coin.hidetooltip();
    $zoho.salesiq.floatbutton.visible('hide');
  },
};
let d = document;
let s = d.createElement('script');
s.type = 'text/javascript';
s.id = 'zsiqscript';
s.defer = true;
s.src = 'https://salesiq.zoho.in/widget';
let t = d.getElementsByTagName('script')[0];
t.parentNode.insertBefore(s, t);
d.write("<div id='zsiqwidget'></div>");

var w = window;
var p = w.location.protocol;
if (p.indexOf('http') < 0) {
  p = 'http' + ':';
}
var f = d.getElementsByTagName('script')[0],
  s2 = d.createElement('script');
s2.type = 'text/javascript';
s2.async = false;
if (s2.readyState) {
  s2.onreadystatechange = function () {
    if (s2.readyState == 'loaded' || s2.readyState == 'complete') {
      s2.onreadystatechange = null;
      try {
        loadwaprops(
          '2573bc7da3e92eab51bb19bfd146149c6',
          '24603acffe2dc3666cd9aa108db3ef5f1',
          '2d47b39dd546b05d11af6c5058991d924757035ba063f0df6',
          '2be0ef5a93a61d2f78a31871ad591bfb2c45137be9522690f',
          0.0
        );
      } catch (e) {}
    }
  };
} else {
  s2.onload = function () {
    try {
      loadwaprops(
        '2573bc7da3e92eab51bb19bfd146149c6',
        '24603acffe2dc3666cd9aa108db3ef5f1',
        '2d47b39dd546b05d11af6c5058991d924757035ba063f0df6',
        '2be0ef5a93a61d2f78a31871ad591bfb2c45137be9522690f',
        0.0
      );
    } catch (e) {}
  };
}
s2.src = p + '//marketinghub.zoho.in/hub/js/WebsiteAutomation.js';
f.parentNode.insertBefore(s2, f);
