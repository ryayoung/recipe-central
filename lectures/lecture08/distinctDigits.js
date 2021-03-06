/***
 * Excerpted from "Seven Databases in Seven Weeks",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/pwrdata for more book information.
***/
distinctDigits = function(phone){
  var number = phone.components.number + '',
      seen = [],
      result = [],
      i = number.length;

  while(i--) {
    seen[+number[i]] = 1;
  }

  for (var i = 0; i < 10; i++) {
    if (seen[i]) {
      result[result.length] = i;
    }
  }

  return result;
}

db.system.js.insertOne({_id: 'distinctDigits', value: distinctDigits})
