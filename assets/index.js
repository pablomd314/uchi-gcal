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

function fullDay(day){
  var ret;
  switch(day) {
    case 'M':
      ret = "monday";
      break;
    case 'T':
      ret = "tuesday";
      break;
    case 'W':
      ret = "wednesday";
      break;
    case 'Th':
      ret = "thursday";
      break;
    case 'F':
      ret = "friday";
      break;
  }
  return ret;
}

function addToCalendar(){
  var txt = $('textarea')[0].value.split('\n');
  var numclasses = txt.length/5;
  for (var i = 0; i < numclasses; i++){
    var class_name = txt[i*5];
    var class_code_and_section = txt[i*5 + 1];
    var class_code = class_code_and_section.slice(0,10);
    var class_section = class_code_and_section.slice(11);
    var class_type_and_days = txt[i*5 + 2];
    var class_type = class_type_and_days.split('\t')[0];
    var class_days = class_type_and_days.split('\t')[1].split(' ');
    var class_times = txt[i*5 + 3].split('-');
    var class_location = txt[i*5 + 4];
    var indexOfSpace = class_days.indexOf("");

    if(indexOfSpace > 0){
  	  class_days.splice(indexOfSpace);
    }


    var start_date = $( "#datepicker" ).datepicker( "getDate" );
    if(class_days[0] !== "M"){
      start_date.next()[fullDay(class_days[0])]();
    }

    var start_time = Date.parse(start_date);
    var start_ampm = class_times[0].slice(-2);
    var start_hours = Number(class_times[0].split(':')[0]);
    if(start_ampm === 'pm' && start_hours !== 12){
      start_hours += 12;
    }
    var start_minutes = class_times[0].split(':')[1].slice(0,2);
    start_time.setHours(start_hours);
    start_time.setMinutes(start_minutes);

    var end_time = start_time.clone();
    var end_ampm = class_times[1].slice(-2);
    var end_hours = Number(class_times[1].split(':')[0]);
    if(end_ampm === 'pm' && end_hours !== 12){
      end_hours += 12;
    }
    var end_minutes = class_times[1].split(':')[1].slice(0,2);
    end_time.setHours(end_hours);
    end_time.setMinutes(end_minutes);

    
    var class_days_recurrence_format = class_days.map(twoLetterDay).join(',');
    var number_of_repetitions = (class_days.length)*10;
    var recurrence_string =`RRULE:FREQ=WEEKLY;BYDAY=${class_days_recurrence_format};COUNT=${number_of_repetitions}`;
    var event = {
      'summary': class_name,
      'location': class_location,
      'start': {
        'dateTime': start_time.toString("yyyy-MM-ddTHH:mm:ss"),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': end_time.toString("yyyy-MM-ddTHH:mm:ss"),
        'timeZone': 'America/Chicago'
      },
      'recurrence': [
        recurrence_string
      ],
      'reminders': {
        'useDefault': true,
      }
    };
    console.log(event);
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
    request.execute(function(event) {
      console.log('Event created: ' + event.htmlLink);
    });
  }
}
