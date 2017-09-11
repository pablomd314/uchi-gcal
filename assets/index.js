function twoLetterDay(day){
  var ret;
  switch(day) {
    case 'M':
      ret = "MO";
      break;
    case 'T':
      ret = "TU";
      break;
    case 'W':
      ret = "WE";
      break;
    case 'Th':
      ret = "TH";
      break;
    case 'F':
      ret = "FR";
      break;
  }
  return ret;
}

function addToCalendar(){
  var txt = this.$$('textarea')[0].value.split('\n');
  var numclasses = x.length/5;
  for (var i = 0; i < numclasses; i++){
    var class_name = txt[i*5];
    var class_code_and_section = txt[i*5 + 1];
    var class_code = class_code_and_section.slice(0,10);
    var class_section = class_code_and_section.slice(11);
    var class_type_and_days = txt[i*5 + 2];
    var class_type = class_type_and_days.split('\t')[0];
    var class_days = class_type_and_days.split('\t')[1].split(' ');
    var class_time = txt[i*5 + 3];
    var class_location = txt[i*5 + 4];
  }
  
  if(indexOfSpace > 0){
	  class_days.splice(indexOfSpace);
  }
  
  var class_days_recurrence_format = class_days.map(f).join(',');
  var number_of_repetitions = (class_days.length)*10;
  var recurrence_string =`RRULE:FREQ=WEEKLY;BYDAY=${class_days_recurrence_format};COUNT=${number_of_repetitions}`
  var event = {
    'summary': class_name,
    'location': class_location,
    'start': {
      'dateTime': '2015-05-28T09:00:00-07:00',
      'timeZone': 'America/Chicago'
    },
    'end': {
      'dateTime': '2015-05-28T17:00:00-07:00',
      'timeZone': 'America/Chicago'
    },
    'recurrence': [
      recurrence_string
    ],
    'reminders': {
      'useDefault': true,
    }
  };
}
