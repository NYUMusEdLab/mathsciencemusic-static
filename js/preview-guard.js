'use strict';
document.addEventListener('DOMContentLoaded',function(){if (['localhost','127.0.0.1'].includes(location.hostname)) { document.querySelectorAll('form').forEach(function(form) { form.addEventListener('submit',function(event) {event.preventDefault();event.stopImmediatePropagation();alert('Preview: no subscription was sent.');},true); }); }});
