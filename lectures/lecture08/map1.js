/***
 * Excerpted from "Seven Databases in Seven Weeks",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/pwrdata for more book information.
***/
map = function() {
  var digits = distinctDigits(this);
    // Emit key is Math.floor(this.location.longitude)
  emit({
    digits: digits,
    country: this.components.country
  }, {
    count : 1
  });
}
