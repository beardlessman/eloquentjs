var names = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
  
    exports.name = function(number) {
      return names[number];
    };
    exports.number = function(name) {
      return names.indexOf(name);
    };
    
    function require(name) {
        var code = new Function("exports", readFile(name));
        var exports = {};
        code(exports);
        return exports;
      }
      
      console.log(require("weekDay").name(1));